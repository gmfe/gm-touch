# MoreSelect 高级选择器

高级下拉选择器组件，支持单选、多选、搜索、分组等功能。

## 何时使用

- 需要从大量数据中选择一项或多项时
- 需要支持搜索过滤的选择器
- 需要支持分组显示的选择器
- 需要支持异步搜索数据的选择器
- 需要支持键盘操作（上下键选择）的场景

## 代码演示

### 基础用法

最简单的单选用法。

```jsx
import MoreSelect from '@gm-touch/components/more_select'

const data = [
  { value: 1, text: '南山' },
  { value: 2, text: '福田' },
  { value: 3, text: '罗湖' },
  { value: 4, text: '宝安' }
]

<MoreSelect
  data={data}
  selected={selected}
  onSelect={(selected) => {
    console.log('已选:', selected)
  }}
/>
```

### 禁用状态

设置 `disabled` 属性禁用选择器。

```jsx
<MoreSelect
  disabled
  data={data}
  selected={selected}
  onSelect={(selected) => {
    console.log('已选:', selected)
  }}
/>
```

### 不显示清除按钮

设置 `disabledClose` 属性，单选模式下不显示清除按钮。

```jsx
<MoreSelect
  disabledClose
  data={data}
  selected={selected}
  onSelect={(selected) => {
    console.log('已选:', selected)
  }}
/>
```

### 多选模式

设置 `multiple` 属性启用多选模式。

```jsx
<MoreSelect
  multiple
  data={data}
  selected={mulSelected}
  onSelect={(selected) => {
    console.log('已选:', selected)
  }}
/>
```

### 拼音搜索

设置 `renderListFilterType` 为 `'pinyin'` 启用拼音搜索。

```jsx
<MoreSelect
  data={data}
  selected={selected}
  onSelect={(selected) => {
    console.log('已选:', selected)
  }}
  renderListFilterType='pinyin'
/>
```

### 自定义占位符

```jsx
<MoreSelect
  data={data}
  selected={selected}
  onSelect={(selected) => {
    console.log('已选:', selected)
  }}
  placeholder='请选择区域'
  searchPlaceholder='搜索区域名称'
/>
```

### 同步搜索

通过 `onSearch` 实现同步搜索过滤。

```jsx
<MoreSelect
  data={data}
  selected={selected}
  onSelect={(selected) => {
    console.log('已选:', selected)
  }}
  onSearch={(searchValue) => {
    // 同步直接过滤 data
    return data.filter(item => item.text.includes(searchValue))
  }}
/>
```

### 异步搜索

通过 `onSearch` 返回 Promise 实现异步搜索。

```jsx
<MoreSelect
  data={data}
  selected={selected}
  onSelect={(selected) => {
    console.log('已选:', selected)
  }}
  onSearch={(searchValue) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = data.filter(item => item.text.includes(searchValue))
        resolve(result)
      }, 1000)
    })
  }}
/>
```

### 分组列表

设置 `isGroupList` 属性启用分组列表模式。

```jsx
const groupData = [
  {
    label: '南山',
    children: [
      { value: 1, text: '科技园' },
      { value: 2, text: '大冲' },
      { value: 3, text: '大新' }
    ]
  },
  {
    label: '宝安',
    children: [
      { value: 21, text: '西乡' },
      { value: 22, text: '固戍' }
    ]
  }
]

<MoreSelect
  isGroupList
  data={groupData}
  selected={selected}
  onSelect={(selected) => {
    console.log('已选:', selected)
  }}
/>
```

### 分组多选

```jsx
<MoreSelect
  isGroupList
  multiple
  data={groupData}
  selected={mulSelected}
  onSelect={(selected) => {
    console.log('已选:', selected)
  }}
/>
```

### 自定义列表高度

```jsx
<MoreSelect
  data={data}
  selected={selected}
  onSelect={(selected) => {
    console.log('已选:', selected)
  }}
  listHeight='240px'
/>
```

### 自定义渲染

通过 `renderSelected` 和 `renderListItem` 自定义渲染。

```jsx
<MoreSelect
  data={data}
  selected={selected}
  onSelect={(selected) => {
    console.log('已选:', selected)
  }}
  renderSelected={(item) => (
    <div>
      <strong>{item.text}</strong>
    </div>
  )}
  renderListItem={(item) => (
    <div>
      <span style={{ color: 'red' }}>{item.text}</span>
    </div>
  )}
/>
```

### 自定义过滤函数

通过 `renderListFilter` 自定义过滤逻辑。

```jsx
<MoreSelect
  data={data}
  selected={selected}
  onSelect={(selected) => {
    console.log('已选:', selected)
  }}
  renderListFilter={(data, searchValue) => {
    // 自定义过滤逻辑
    return data.map(group => ({
      ...group,
      children: group.children.filter(item =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    })).filter(group => group.children.length > 0)
  }}
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| data | 数据源，单选为 `[{value, text}]`，分组为 `[{label, children: [{value, text}]}]` | array | - | 是 |
| selected | 已选项，单选为对象，多选为数组 | object \| array | - | 否 |
| onSelect | 选择项的回调函数 | (selected: object \| object[]) => void | - | 是 |
| multiple | 是否多选 | boolean | `false` | 否 |
| disabled | 是否禁用 | boolean | `false` | 否 |
| disabledClose | 单选模式下是否不显示清除按钮 | boolean | `false` | 否 |
| placeholder | 占位符文本 | string | - | 否 |
| searchPlaceholder | 搜索框占位符文本 | string | - | 否 |
| onSearch | 搜索回调函数，支持同步和异步 | (query: string, data: array) => void \| Promise | - | 否 |
| delay | 搜索防抖延迟时间（毫秒） | number | `500` | 否 |
| renderListFilter | 自定义过滤函数 | (data: array, query: string) => array | - | 否 |
| renderListFilterType | 内置过滤类型，可选 `'default'` 或 `'pinyin'` | string | `'default'` | 否 |
| renderSelected | 自定义已选项的渲染 | (item: object) => ReactNode | `(item) => item.text` | 否 |
| renderListItem | 自定义列表项的渲染 | (item: object) => ReactNode | `(item) => item.text` | 否 |
| listHeight | 列表高度 | string | `'180px'` | 否 |
| isGroupList | 是否为分组列表 | boolean | `false` | 否 |
| popoverType | 弹出框触发方式，可选 `'focus'` 或 `'realFocus'` | string | `'focus'` | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |
| popupClassName | 弹出框自定义类名 | string | - | 否 |
| isInPopup | 是否在弹出层中 | boolean | `false` | 否 |
| isKeyboard | 是否支持键盘操作 | boolean | `false` | 否 |
| onKeyDown | 键盘按下回调 | (event: KeyboardEvent) => void | `_.noop` | 否 |

### 方法

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| apiDoFocus | 聚焦选择器 | - |
| apiDoSelectWillActive | 选中当前键盘激活的项 | - |

## 数据结构说明

### 单选数据结构

```jsx
const data = [
  { value: 1, text: '南山' },
  { value: 2, text: '福田' },
  { value: 3, text: '罗湖' }
]
```

### 分组数据结构

```jsx
const groupData = [
  {
    label: '南山',
    children: [
      { value: 1, text: '科技园' },
      { value: 2, text: '大冲' }
    ]
  },
  {
    label: '宝安',
    children: [
      { value: 21, text: '西乡' },
      { value: 22, text: '固戍' }
    ]
  }
]
```

### selected 说明

- 单选模式下，`selected` 为单个对象或 `null`
- 多选模式下，`selected` 为对象数组
- `selected` 使用的是对象引用而非值引用，这样可以解耦 selected 和 data 的关系
- 在搜索场景下，即使 data 变化，selected 仍然能正确显示

## 注意事项

- 组件默认会滚动到已选项位置
- 搜索支持防抖，默认延迟 500ms
- 异步搜索时会显示 loading 状态
- 键盘操作支持上下键选择，回车键确认
- 多选模式下每个已选项都会显示删除按钮
- 单选模式下默认显示清除按钮，可通过 `disabledClose` 隐藏
- 分组模式下，`data` 必须包含 `label` 和 `children` 字段

## 更新日志
