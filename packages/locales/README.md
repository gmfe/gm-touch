# @gm-touch/locales

## 简介

@gm-touch/locales 是 gm-touch 组件库的国际化语言包，提供多语言支持功能。该包支持简体中文、繁体中文（香港）、英文和泰语四种语言。

通过简单的 API，可以轻松实现组件库的多语言切换，语言设置会自动保存到 localStorage，刷新页面后依然生效。

## 特性

- 🌍 **多语言支持**：支持简体中文、繁体中文（香港）、英文、泰语
- 💾 **持久化存储**：语言设置自动保存到 localStorage
- 🔄 **运行时切换**：支持在应用运行时动态切换语言
- 🎯 **自动回退**：当翻译文本不存在时，自动回退到 key 的最后一部分
- 📦 **轻量级**：体积小巧，无外部依赖

## 安装

```bash
# 使用 npm
npm install @gm-touch/locales

# 使用 yarn
yarn add @gm-touch/locales
```

## API

### setLocaleAndStorage(lng)

设置语言并保存到 localStorage

**参数：**

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| lng | 语言代码 | string | - | 是 |

**语言代码：**

- `'zh'` - 简体中文
- `'zh-HK'` - 繁体中文（香港）
- `'en'` - 英文
- `'th'` - 泰语

**示例：**

```javascript
import { setLocaleAndStorage } from '@gm-touch/locales'

// 设置为简体中文
setLocaleAndStorage('zh')

// 设置为繁体中文
setLocaleAndStorage('zh-HK')

// 设置为英文
setLocaleAndStorage('en')

// 设置为泰语
setLocaleAndStorage('th')
```

### setLocale(lng)

设置语言（不保存到 localStorage）

**参数：**

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| lng | 语言代码 | string | - | 是 |

**示例：**

```javascript
import { setLocale } from '@gm-touch/locales'

// 临时设置为英文（不保存）
setLocale('en')
```

### getLocale(text)

获取指定文本的翻译

**参数：**

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| text | 翻译 key | string | - | 是 |

**返回值：** 翻译后的文本（string）

**翻译规则：**
1. 优先返回当前语言的翻译文本
2. 如果翻译不存在，回退到简体中文的翻译
3. 如果简体中文翻译也不存在，返回 key 的最后一部分（通过 `__` 分割）

**示例：**

```javascript
import { getLocale, setLocale } from '@gm-touch/locales'

// 设置为英文
setLocale('en')

// 获取翻译
const text = getLocale('common.confirm')
console.log(text) // 输出: Confirm

// 如果翻译不存在，返回 key 的最后一部分
const missing = getLocale('some.missing.__key')
console.log(missing) // 输出: key
```

## 使用

### 应用初始化时设置语言

```javascript
import { setLocaleAndStorage } from '@gm-touch/locales'

// 在应用入口处设置语言
function App() {
  useEffect(() => {
    // 从用户设置中获取语言偏好
    const userLanguage = getUserLanguagePreference()
    setLocaleAndStorage(userLanguage)
  }, [])

  return <div>...</div>
}
```

### 语言切换器

```javascript
import { setLocaleAndStorage } from '@gm-touch/locales'

function LanguageSwitcher() {
  const handleLanguageChange = (lng) => {
    setLocaleAndStorage(lng)
    // 可能需要刷新页面或重新渲染组件以应用新语言
    window.location.reload()
  }

  return (
    <select onChange={(e) => handleLanguageChange(e.target.value)}>
      <option value="zh">简体中文</option>
      <option value="zh-HK">繁體中文（香港）</option>
      <option value="en">English</option>
      <option value="th">ไทย</option>
    </select>
  )
}
```

### 获取当前语言

```javascript
// 当前语言保存在 localStorage 中
const currentLanguage = window.localStorage.getItem('_gm-touch_locales_lng_') || 'zh'
```

## 翻译文件

翻译文件位于 `src/` 目录下：

- `zh.json` - 简体中文
- `zh-HK.json` - 繁体中文（香港）
- `en.json` - 英文
- `th.json` - 泰语

如果需要添加新的翻译或修改现有翻译，请更新对应的 JSON 文件。

## 注意事项

- **初始化顺序**：建议在应用初始化时就设置好语言，避免组件加载时语言未设置导致的闪现
- **存储键名**：localStorage 使用的键名为 `_gm-touch_locales_lng_`，请避免覆盖
- **默认语言**：如果没有设置过语言，默认使用简体中文
- **刷新页面**：修改语言后，某些组件可能需要刷新页面才能完全应用新语言
- **key 命名规范**：翻译 key 建议使用 `__` 分割的命名空间格式，如 `common.confirm`，这样在翻译缺失时能提供有意义的回退文本

## 相关包

- **[@gm-touch/react](../react)** - 核心组件库（依赖此包）
- **[@gm-touch/sortable](../sortable)** - 拖拽排序组件

## License

ISC
