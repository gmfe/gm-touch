#!/usr/bin/env node

/**
 * 以 lerna.json 的 version 为唯一真相源,自动同步:
 *   1. 各 package.json 的 version
 *   2. 各 package.json 中 dependencies / devDependencies / optionalDependencies
 *      里对内部包(@gm-touch 开头)的引用,统一改成 ^<version>
 *
 * 故意不同步 peerDependencies —— peer 应保持宽松范围,只在跨 major 时手动改。
 *
 * 用法:
 *   yarn sync-versions          写入,把所有不一致的地方改成 lerna.json 的版本
 *   yarn sync-versions:check    只检查,不一致则以非 0 退出(可作 CI 或 pre-commit 护栏)
 */
const fs = require('fs')
const path = require('path')

const check = process.argv.includes('--check')
const root = path.resolve(__dirname, '..')

const lerna = JSON.parse(fs.readFileSync(path.join(root, 'lerna.json'), 'utf8'))
const version = lerna.version

if (!version) {
  console.error('❌ lerna.json 没有 version 字段(independent 模式不支持本脚本)')
  process.exit(1)
}

const FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies']
const packagesDir = path.join(root, 'packages')

// 第一遍:收集所有内部包名 + 各 package.json 内容
const entries = []
const internalPkgs = new Set()
for (const name of fs.readdirSync(packagesDir)) {
  const pkgPath = path.join(packagesDir, name, 'package.json')
  if (!fs.existsSync(pkgPath)) continue
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  internalPkgs.add(pkg.name)
  entries.push({ pkgPath, pkg })
}

// 第二遍:找出所有与 lerna version 不一致的地方
const target = `^${version}`
const mismatches = []

for (const { pkgPath, pkg } of entries) {
  if (pkg.version !== version) {
    mismatches.push({ pkgPath, pkg, field: 'version', key: null, from: pkg.version, to: version })
  }
  for (const field of FIELDS) {
    const deps = pkg[field]
    if (!deps) continue
    for (const key of Object.keys(deps)) {
      if (internalPkgs.has(key) && deps[key] !== target) {
        mismatches.push({ pkgPath, pkg, field, key, from: deps[key], to: target })
      }
    }
  }
}

// 报告
console.log(`lerna.json version = ${version}`)
if (mismatches.length === 0) {
  console.log(`✅ 所有内部包及内部引用均已同步到 ${version}`)
  process.exit(0)
}

console.log(`发现 ${mismatches.length} 处不一致:`)
for (const m of mismatches) {
  const loc = m.field === 'version' ? 'version' : `${m.field}.${m.key}`
  console.log(`  ${m.pkg.name}  ${loc}:  ${m.from}  ->  ${m.to}`)
}

if (check) {
  console.error('\n❌ 检查未通过:请先运行 yarn sync-versions 再提交/发版')
  process.exit(1)
}

// 写入:先把所有改动应用到 pkg 对象,再按文件统一写回(避免漏写)
for (const m of mismatches) {
  if (m.field === 'version') {
    m.pkg.version = m.to
  } else {
    m.pkg[m.field][m.key] = m.to
  }
}

const dirtyFiles = new Set(mismatches.map((m) => m.pkgPath))
let count = 0
for (const { pkgPath, pkg } of entries) {
  if (!dirtyFiles.has(pkgPath)) continue
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
  count++
}

console.log(`\n✨ 已写入 ${count} 个文件,同步到 ${version}`)
console.log('   peerDependencies 不会被改动,如需调整请手动处理')
