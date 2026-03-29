# Select 选择器

下拉选择器，用于从一组选项中选择一个。

## 代码演示

### 基础用法

最简单的用法。

```jsx
import Select from 'gm-touch/select'

function App() {
  const [value, setValue] = useState(0)

  const list = [
    { value: 0, text: '南山' },
    { value: 1, text: '福田' },
    { value: 2, text: '宝安' },
    { value: 3, text: '罗湖' }
  ]

  return (
    <Select
      data={list}
      value={value}
      onChange={setValue}
    />
  )
}
```

### 禁用状态

禁用选择器。

```jsx
import Select from 'gm-touch/select'

function App() {
  const list = [
    { value: 0, text: '南山' },
    { value: 1, text: '福田' }
  ]

  return (
    <Select
      data={list}
      value={0}
      onChange={() => {}}
      disabled
    />
  )
}
```

### 禁用选项

禁用列表中的某些选项。

```jsx
import Select from 'gm-touch/select'

function App() {
  const [value, setValue] = useState(0)

  const list = [
    { value: 0, text: '南山' },
    { value: 1, text: '福田' },
    { value: 2, text: '宝安不可用', disabled: true },
    { value: 3, text: '罗湖' }
  ]

  return (
    <Select
      data={list}
      value={value}
      onChange={setValue}
    />
  )
}
```

### 自定义列表类名

为下拉列表添加自定义类名。

```jsx
import Select from 'gm-touch/select'

function App() {
  const [value, setValue] = useState(0)

  const list = [
    { value: 0, text: '南山' },
    { value: 1, text: '福田' }
  ]

  return (
    <Select
      data={list}
      value={value}
      onChange={setValue}
      listName='custom-select-list'
    />
  )
}
```

### 嵌套在弹出层中

当选择器本身就在弹出层中时，使用 `isInPopup` 属性。

```jsx
import Select from 'gm-touch/select'

function App() {
  const [value, setValue] = useState(0)

  const list = [
    { value: 0, text: '南山' },
    { value: 1, text: '福田' }
  ]

  return (
    <Popover>
      <Select
        data={list}
        value={value}
        onChange={setValue}
        isInPopup
      />
    </Popover>
  )
}
```

### 自定义渲染项

使用 `renderItem` 自定义列表项的渲染。

```jsx
import Select from 'gm-touch/select'

function App() {
  const [value, setValue] = useState(0)

  const list = [
    { value: 0, text: '南山', extra: '10km' },
    { value: 1, text: '福田', extra: '15km' }
  ]

  const renderItem = item => (
    <div>
      <div>{item.text}</div>
      <div className='t-text-gray'>{item.extra}</div>
    </div>
  )

  return (
    <Select
      data={list}
      value={value}
      onChange={setValue}
      renderItem={renderItem}
    />
  )
}
```

## API

### Select Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| data | 选项数据 | `Array<{text: string, value: any, disabled?: boolean}>` | - | 是 |
| value | 当前选中的值 | `any` | - | 是 |
| onChange | 选项变化时的回调 | `(value: any) => void` | - | 是 |
| children | 子元素（通常不使用） | `ReactNode` | - | 否 |
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| className | 类名 | `string` | - | 否 |
| listName | 下拉列表的类名 | `string` | - | 否 |
| style | 样式 | `CSSProperties` | - | 否 |
| isInPopup | 是否在弹出层中使用 | `boolean` | `false` | 否 |
| renderItem | 自定义列表项渲染 | `(item: any) => ReactNode` | - | 否 |

## 注意事项

- 组件会自动计算下拉列表的宽度，基于 `on` 和 `off` 文本的较大值
- 当 `isInPopup` 为 `true` 时，会正确处理嵌套弹出层的情况
- 列表最大高度为 `250px`，超出会显示滚动条
