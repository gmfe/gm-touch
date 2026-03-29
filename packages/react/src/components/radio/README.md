# Radio 单选框

单选框组件，用于在一组选项中选择一个。

## 代码演示

### 基础用法

最简单的用法。

```jsx
import { Radio } from 'gm-touch'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <Radio
      checked={checked}
      onChange={() => setChecked(!checked)}
    >
      选项一
    </Radio>
  )
}
```

### 禁用状态

禁用单选框。

```jsx
import { Radio } from 'gm-touch'

function App() {
  return (
    <Radio disabled>
      禁用的选项
    </Radio>
  )
}
```

### 带描述信息

为单选框添加描述信息。

```jsx
import { Radio } from 'gm-touch'

function App() {
  return (
    <Radio desc="这是额外的描述信息">
      选项一
    </Radio>
  )
}
```

### RadioGroup 单选组

使用 RadioGroup 管理一组单选框。

```jsx
import { Radio, RadioGroup } from 'gm-touch'

function App() {
  const [value, setValue] = useState(1)

  return (
    <RadioGroup
      value={value}
      onChange={setValue}
    >
      <Radio value={1}>选项一</Radio>
      <Radio value={2}>选项二</Radio>
      <Radio value={3}>选项三</Radio>
    </RadioGroup>
  )
}
```

### 横向排列

单选框横向排列。

```jsx
import { Radio, RadioGroup } from 'gm-touch'

function App() {
  const [value, setValue] = useState(1)

  return (
    <RadioGroup
      value={value}
      onChange={setValue}
      inline
    >
      <Radio value={1}>选项一</Radio>
      <Radio value={2}>选项二</Radio>
      <Radio value={3}>选项三</Radio>
    </RadioGroup>
  )
}
```

## API

### Radio Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| checked | 是否选中 | `boolean` | `false` | 否 |
| children | 显示内容 | `ReactNode` | - | 否 |
| className | 类名 | `string` | - | 否 |
| style | 样式 | `CSSProperties` | - | 否 |
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| desc | 描述信息 | `ReactNode` | - | 否 |
| inline | 是否横向排列 | `boolean` | `false` | 否 |
| onChange | 状态变化时的回调 | `(checked: boolean) => void` | `() => {}` | 否 |
| value | 值 | `number` | - | 否 |

### RadioGroup Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| value | 当前选中的值 | `any` | - | 否 |
| onChange | 状态变化时的回调 | `(value: any) => void` | `() => {}` | 否 |
| children | 子元素 | `ReactNode` | - | 否 |
| className | 类名 | `string` | - | 否 |
| style | 样式 | `CSSProperties` | - | 否 |
| inline | 是否横向排列 | `boolean` | `false` | 否 |
