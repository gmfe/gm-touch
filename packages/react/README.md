# @gm-touch/react

## 简介

@gm-touch/react 是 gm-touch 组件库的核心包，提供了一套专为触屏设备设计的 React UI 组件。该组件库主要用于工位屏系统，包括新架构和老架构的应用场景。

组件库采用 React + Mobx 技术栈开发，提供了 34+ 个常用 UI 组件，涵盖了表单、布局、浮层、数据展示等多个类别，能够满足触屏应用的大部分需求。

## 特性

- 📱 **触屏优化**：专为触屏设备交互设计，提供流畅的手势操作体验
- 🎨 **统一样式**：所有组件使用统一的 `t-` 前缀样式类，支持通过 CSS 变量自定义主题
- 🌍 **国际化支持**：配合 @gm-touch/locales 包实现多语言切换
- 📦 **完整组件**：提供 34+ 个组件，覆盖常见业务场景
- 🛠 **TypeScript 支持**：提供完整的类型定义文件
- 📖 **Storybook 文档**：每个组件都有详细的交互式文档和示例

## 安装

```bash
# 使用 npm
npm install @gm-touch/react

# 使用 yarn
yarn add @gm-touch/react
```

### peerDependencies

本包依赖以下 peer packages，请确保项目中已安装：

```json
{
  "peerDependencies": {
    "@gm-common/tool": "^2.4.1",
    "@svgr/webpack": "^4.3.2",
    "classnames": "^2.2.6",
    "lodash": "^4.17.14",
    "moment": "^2.24.0",
    "prop-types": "^15.7.2",
    "react": "^16.12.0",
    "react-dom": "^16.12.0"
  }
}
```

## 使用

### 基础用法

```jsx
import { Button, Modal, DatePicker } from '@gm-touch/react'

function App() {
  return (
    <div>
      <Button type="primary">点击按钮</Button>
    </div>
  )
}
```

### 按需引入

```jsx
// 推荐：按需引入组件，减少打包体积
import Button from '@gm-touch/react/components/button'
import Modal from '@gm-touch/react/components/modal'
```

### 配置国际化

```jsx
import { setLocaleAndStorage } from '@gm-touch/locales'

// 设置为简体中文
setLocaleAndStorage('zh')

// 设置为繁体中文（香港）
setLocaleAndStorage('zh-HK')

// 设置为英文
setLocaleAndStorage('en')

// 设置为泰语
setLocaleAndStorage('th')
```

## 组件列表

### 表单组件

| 组件 | 说明 |
|------|------|
| **Button** | 按钮，支持多种类型和样式 |
| **Input** | 输入框 |
| **InputNumber** | 数字输入框 |
| **Checkbox** | 复选框 |
| **Radio** | 单选框 |
| **RadioGroup** | 单选框组 |
| **Switch** | 开关 |
| **Select** | 选择器 |
| **DatePicker** | 日期选择器 |
| **DateRangePicker** | 日期范围选择器 |
| **DateOneMonthPicker** | 单月日期选择器 |
| **Calendar** | 日历 |
| **RangeCalendar** | 日期范围日历 |
| **Keyboard** | 自定义键盘 |
| **NumberKeyboard** | 数字键盘 |
| **MoreSelect** | 多选选择器 |
| **Transfer** | 穿梭框 |

### 布局组件

| 组件 | 说明 |
|------|------|
| **Flex** | 弹性布局 |
| **Row** | 栅格行 |
| **Col** | 栅格列 |
| **List** | 列表 |
| **LayoutRoot** | 根布局容器 |

### 浮层组件

| 组件 | 说明 |
|------|------|
| **Modal** | 模态框 |
| **CleanModal** | 简洁模态框 |
| **RightSideModal** | 右侧抽屉模态框 |
| **Dialog** | 对话框 |
| **Drawer** | 抽屉 |
| **Popover** | 气泡卡片 |
| **Popup** | 弹出层 |
| **PopupContentConfirm** | 带确认按钮的弹出层内容 |
| **Tip** | 提示 |
| **NProgress** | 顶部进度条 |

### 数据展示

| 组件 | 说明 |
|------|------|
| **Tabs** | 标签页 |
| **Tree** | 树形控件 |
| **Collapse** | 折叠面板 |
| **Progress** | 进度条 |
| **ProgressCircle** | 环形进度条 |
| **IconDownUp** | 上下箭头图标 |
| **Storage** | 存储组件 |

### 反馈组件

| 组件 | 说明 |
|------|------|
| **Loading** | 加载中 |
| **LoadingChunk** | 分块加载 |
| **LoadingFullScreen** | 全屏加载 |

### 样式变量

所有组件使用统一的 `.t-` 前缀样式类，样式变量定义在 `css_variable.js` 中。

当前版本支持通过覆盖 CSS 变量来自定义主题：

```javascript
import { CSSVariable } from '@gm-touch/react'

// CSSVariable 包含了所有样式变量定义
// 包括主色调、文字颜色、边框颜色、间距等
// 具体的变量名和默认值请参考源码
```

## 开发

### 启动 Storybook

```bash
# 在根目录执行
yarn start
```

启动后会自动打开浏览器，或在终端中查看具体的端口号和访问地址。

### 构建文档

```bash
yarn build
```

## 注意事项

- **React 版本**：要求 React >= 16.12.0
- **样式隔离**：组件使用 `.t-` 前缀避免样式冲突
- **Mobx 集成**：部分组件内部使用 Mobx 进行状态管理
- **触屏优化**：所有组件针对触屏设备进行了优化，建议在触屏设备上测试
- **国际化配置**：使用组件前建议先配置国际化语言包

## 相关包

- **[@gm-touch/locales](../locales)** - 国际化语言包
- **[@gm-touch/sortable](../sortable)** - 拖拽排序组件

## 相关仓库

- [gmfe](https://github.com/gmfe/gmfe) - 老架构组件库
- [gm-pc](https://github.com/gmfe/gm-pc) - 新架构 PC 组件库
- [gm-mobile](https://github.com/gmfe/gm-mobile) - 移动端组件库

## License

ISC
