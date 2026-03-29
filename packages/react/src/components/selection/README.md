# Selection

选择区域组件，用于显示当前选中的项，通常与弹出层配合使用。内部组件，用于构建其他选择类组件。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| selected | 当前选中的值，单选时为 null 或对象 | `any` | - | 否 |
| onSelect | 点击选择区域的回调函数 | `function` | - | 是 |
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| renderSelected | 自定义渲染选中项 | `function` | `item => item.text` | 否 |
| placeholder | 未选中时的占位文本 | `string` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### 特性说明

- **自动图标状态**：组件内置 IconDownUp 图标，会根据弹出层状态自动切换箭头方向
- **灵活的选中项渲染**：通过 `renderSelected` 函数可以自定义选中项的显示方式
- **禁用状态**：支持禁用状态，禁用时不会触发 `onSelect` 回调
- **占位文本**：未选中时显示占位文本

## 示例

### 基础用法

```jsx
import { Selection } from '@gm-touch/react'

function App() {
  return (
    <Selection
      onSelect={() => console.log('点击选择区域')}
      placeholder='请选择'
    />
  )
}
```

### 显示选中项

```jsx
import { Selection } from '@gm-touch/react'

function App() {
  const selected = { value: 1, text: '已选项' }

  return (
    <Selection
      selected={selected}
      onSelect={() => console.log('点击选择区域')}
    />
  )
}
```

### 禁用状态

```jsx
import { Selection } from '@gm-touch/react'

function App() {
  return (
    <Selection
      disabled
      onSelect={() => console.log('不会触发')}
      placeholder='禁用状态'
    />
  )
}
```

### 自定义渲染选中项

```jsx
import { Selection } from '@gm-touch/react'

function App() {
  const selected = { value: 1, text: '深圳', extra: '广东省' }

  const renderSelected = (item) => {
    return `${item.text} (${item.extra})`
  }

  return (
    <Selection
      selected={selected}
      onSelect={() => console.log('点击选择区域')}
      renderSelected={renderSelected}
    />
  )
}
```

### 与 Popover 配合使用

```jsx
import { Selection, Popover } from '@gm-touch/react'
import { useState } from 'react'

function App() {
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)

  const list = [
    { value: 1, text: '选项一' },
    { value: 2, text: '选项二' },
    { value: 3, text: '选项三' }
  ]

  return (
    <Popover
      visible={visible}
      onVisibleChange={setVisible}
      content={
        <div>
          {list.map(item => (
            <div
              key={item.value}
              onClick={() => {
                setSelected(item)
                setVisible(false)
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
      }
    >
      <Selection
        selected={selected}
        onSelect={() => setVisible(true)}
        placeholder='请选择'
      />
    </Popover>
  )
}
```

### 完整示例

```jsx
import { Selection, Popover } from '@gm-touch/react'
import { useState } from 'react'

function CitySelector() {
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)

  const cities = [
    { value: 1, text: '深圳', code: 'SZ' },
    { value: 2, text: '北京', code: 'BJ' },
    { value: 3, text: '上海', code: 'SH' },
    { value: 4, text: '广州', code: 'GZ' }
  ]

  const renderSelected = (item) => {
    return item ? `${item.text} (${item.code})` : ''
  }

  return (
    <Popover
      visible={visible}
      onVisibleChange={setVisible}
      content={
        <div style={{ maxHeight: '200px', overflow: 'auto' }}>
          {cities.map(city => (
            <div
              key={city.value}
              style={{
                padding: '10px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer'
              }}
              onClick={() => {
                setSelected(city)
                setVisible(false)
              }}
            >
              <div>{city.text}</div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                {city.code}
              </div>
            </div>
          ))}
        </div>
      }
    >
      <Selection
        selected={selected}
        onSelect={() => setVisible(true)}
        renderSelected={renderSelected}
        placeholder='请选择城市'
      />
    </Popover>
  )
}
```

## 注意事项

1. **内部组件**：此组件主要用于构建其他选择类组件，不是为直接使用而设计
2. **弹出层集成**：当与 Popover 配合使用时，图标会自动根据弹出层状态切换方向
3. **选中值格式**：`selected` 可以是任意类型，`renderSelected` 负责将其转换为显示文本
4. **回调处理**：`onSelect` 回调通常用于触发弹出层的显示
5. **样式定制**：组件使用 `t-selection` 类名，可以通过 CSS 进一步定制样式
6. **使用场景**：
   - 作为 Select 组件的基础
   - 自定义选择器
   - 任何需要显示选中项并与弹出层配合的场景

## 相关组件

- [IconDownUp](../icon_down_up/README.md) - 上下箭头图标组件
- [Select](../select/README.md) - 下拉选择器组件
- [Popover](../popover/README.md) - 弹出层组件
