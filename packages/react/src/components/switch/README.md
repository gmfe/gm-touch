# Switch 开关

开关选择器，用于在两个互斥的状态之间切换。

## 代码演示

### 基础用法

最简单的用法。

```jsx
import Switch from 'gm-touch/switch'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <Switch
      checked={checked}
      onChange={setChecked}
    />
  )
}
```

### 带文字

开启和关闭时显示不同的文字。

```jsx
import Switch from 'gm-touch/switch'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <Switch
      checked={checked}
      onChange={setChecked}
      on='上架'
      off='下架'
    />
  )
}
```

### 大尺寸

使用大尺寸的开关。

```jsx
import Switch from 'gm-touch/switch'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <Switch
      checked={checked}
      onChange={setChecked}
      size='lg'
    />
  )
}
```

### 大尺寸带文字

大尺寸开关配合文字显示。

```jsx
import Switch from 'gm-touch/switch'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <Switch
      checked={checked}
      onChange={setChecked}
      on='开启'
      off='关闭'
      size='lg'
    />
  )
}
```

### 禁用状态

禁用开关。

```jsx
import Switch from 'gm-touch/switch'

function App() {
  return (
    <Switch
      checked={false}
      onChange={() => {}}
      disabled
    />
  )
}
```

### 小尺寸

使用小尺寸的开关。

```jsx
import Switch from 'gm-touch/switch'

function App() {
  const [checked, setChecked] = useState(false)

  return (
    <Switch
      checked={checked}
      onChange={setChecked}
      size='small'
    />
  )
}
```

## API

### Switch Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| checked | 是否选中 | `boolean` | - | 是 |
| onChange | 状态变化时的回调 | `(checked: boolean) => void` | `() => {}` | 否 |
| on | 开启时的文字 | `ReactNode` | `''` | 否 |
| off | 关闭时的文字 | `ReactNode` | `''` | 否 |
| size | 开关大小 | `'lg' \| 'small'` | - | 否 |
| disabled | 是否禁用 | `boolean` | `false` | 否 |
