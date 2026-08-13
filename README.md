# gm-touch

## 描述

gm-touch是一个UI组件库，用于运行在触屏设备的项目中，包括新架构和老架构的工位屏系统。

项目主要使用了React + Mobx + Javascript技术栈，通过lerna和yarn进行引入库和命令行的管理，并使用npm进行版本管理并发布在npm上。

除了gm-touch外，gmfe中还有其他类型的UI组件库，如[老架构组件库gmfe](https://github.com/gmfe/gmfe)，[新架构组件库gm-pc](https://github.com/gmfe/gm-pc)，[移动端组件库gm-mobile](https://github.com/gmfe/gm-mobile)等。

## 预安装

- [NodeJS](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/getting-started/install)
- [Git](https://git-scm.com/downloads)
- [VSCode](https://code.visualstudio.com/download)（推荐）

## 安装

1. 打开你想安装的目录

2. 在目录下打开Terminal（MacOS）或Command Prompt（Windows）或Virtual Console（Linux）

3. 下载代码到本地目录，如果无法下载，可能是因为没有相关权限，请找相关人员解决
    ```sh
    git clone git@github.com:gmfe/gm-touch.git
    ```
4. 通过VSCode打开项目并打开终端

5. 安装所有依赖
    ```sh
    yarn
    ```

6. 配置依赖
   ```sh
   lerna bootstrap
   ```
   说实话我也不知道为什么要这么做，但是不这么做的话编译时会报错，提示缺少某些依赖

7. 启动项目
    ```sh
    yarn start
    ```
    成功后浏览器会自动弹出页面，如果没有弹出，可以在[这里](http://localhost:57003/)查看，内容是生成的文档

## 版本发布

该项目是一个为其他项目服务的库，需要持续发布版本。发布由 GitHub Actions 自动完成（配置见 `.github/workflows/release.yml`），**本地不需要登录 npm，也不用手动执行发布命令**。

> CI 用的是 `lerna publish from-package`：它只会把各子包 `package.json` 里写明、但 npm 上还不存在的版本发出去。所以发版 = 「在本地把版本号改对 → push 到 master → CI 负责发布」。

### 发版步骤

1. 确保当前分支代码已 commit 并 push 到远程

2. 修改 `lerna.json` 的 `version` 为新版本号（例如 `2.3.7`）。这是整个仓库唯一的版本源头

3. 运行同步脚本，自动把所有子包的 `version`，以及它们之间互相引用的 `dependencies` / `devDependencies`，全部对齐到新版本号：
    ```sh
    yarn sync-versions
    ```
    脚本会逐条列出改动并写入。`peerDependencies` 不会被改动（原因见下文）

4. 检查改动无误后，提交并推送：
    ```sh
    git add -A
    git commit -m "v2.3.7"
    git push origin master
    ```

5. 推送到 master 后会自动触发 Release workflow。CI 完成依赖安装后，会把几个子包发布到 npm。到 GitHub → Actions 页面查看执行结果（绿勾即成功）

### 关于内部包之间的版本引用

- 子包之间互相引用（如 `@gm-touch/react` 引用 `@gm-touch/locales`）写的是普通 `dependencies` / `devDependencies`，由 `yarn sync-versions` 自动跟随主版本号，无需手动维护。
- `peerDependencies` 不会被脚本改动。peer 应当保持宽松范围（如 `^2.3.5` 表示兼容所有 2.x 版本），平时不需要动；只有跨大版本升级（如整体升到 `3.0.0`）时，才需要手动把 `^2.x` 改成 `^3.0.0`。

### 版本号约定

- 正式版：`2.3.7`
- 预发布版：在版本号末尾加 prerelease 标识，例如 `2.3.7-beta.0`。`.0` 表示第几个 beta，修补发布新的 beta 时递增为 `beta.1`、`beta.2`，以此类推

> 注意：当前 CI 只配置了正式版（latest）的自动发布。若要发布 beta / alpha 版本（带对应 dist-tag），需要额外配置 workflow，或参考根目录 `package.json` 中的 `publish-beta` / `publish-alpha` 脚本。

## 样式

前缀 .t-xxx， t 表示 touch

css 变量都在 variable.less，未来提供主题自定义
