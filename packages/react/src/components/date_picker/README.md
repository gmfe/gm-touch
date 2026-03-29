# DatePicker 日期选择器

单个日期选择器组件，提供月份切换和日期选择功能。

## 基本使用

```jsx
import { DatePicker } from '@gm-touch/react'

function App() {
  const [selected, setSelected] = useState(null)

  return (
    <DatePicker
      selected={selected}
      onSelect={setSelected}
    />
  )
}
```

## Props

### selected

- **类型**: `Object` (Date 对象)
- **默认值**: 无
- **必填**: 否

当前选中的日期。

```jsx
<DatePicker
  selected={new Date()}
  onSelect={handleSelect}
/>
```

### onSelect

- **类型**: `Function`
- **默认值**: 无
- **必填**: 是

日期选中回调函数，参数为选中的日期（Date 对象）。

```jsx
<DatePicker
  onSelect={(date) => {
    console.log('选中的日期:', date)
  }}
/>
```

### min

- **类型**: `Object` (Date 对象)
- **默认值**: 无
- **必填**: 否

可选的最小日期。早于此日期的日期将被禁用。

```jsx
<DatePicker
  min={new Date()}
  onSelect={handleSelect}
/>
```

### max

- **类型**: `Object` (Date 对象)
- **默认值**: 无
- **必填**: 否

可选的最大日期。晚于此日期的日期将被禁用。

```jsx
<DatePicker
  max={new Date('2025-12-31')}
  onSelect={handleSelect}
/>
```

### disabledDate

- **类型**: `Function`
- **默认值**: 无
- **必填**: 否

自定义日期是否可选。传入参数为 Date 对象，返回 `true` 表示禁用该日期，`false` 表示可选。当设置此属性时，`min` 和 `max` 属性将失效。

```jsx
<DatePicker
  disabledDate={(date) => {
    // 禁用周末
    const day = date.getDay()
    return day === 0 || day === 6
  }}
  onSelect={handleSelect}
/>
```

### className

- **类型**: `String`
- **默认值**: 无
- **必填**: 否

自定义容器类名。

```jsx
<DatePicker
  className="my-date-picker"
  onSelect={handleSelect}
/>
```

### style

- **类型**: `Object`
- **默认值**: 无
- **必填**: 否

自定义容器样式。

```jsx
<DatePicker
  style={{ width: 400 }}
  onSelect={handleSelect}
/>
```

## 完整示例

### 基本使用

```jsx
import { useState } from 'react'
import { DatePicker } from '@gm-touch/react'

function BasicExample() {
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <div>选中的日期: {selected ? selected.toLocaleDateString() : '未选择'}</div>
      <DatePicker
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  )
}
```

### 限制日期范围

```jsx
import { useState } from 'react'
import { DatePicker } from '@gm-touch/react'
import moment from 'moment'

function RangeExample() {
  const [selected, setSelected] = useState(null)

  return (
    <DatePicker
      selected={selected}
      onSelect={setSelected}
      min={moment().toDate()}
      max={moment().add(10, 'days').toDate()}
    />
  )
}
```

### 自定义禁用日期

```jsx
import { useState } from 'react'
import { DatePicker } from '@gm-touch/react'

function CustomDisabledExample() {
  const [selected, setSelected] = useState(null)

  return (
    <DatePicker
      selected={selected}
      onSelect={setSelected}
      disabledDate={(date) => {
        // 禁用周末
        const day = date.getDay()
        return day === 0 || day === 6
      }}
    />
  )
}
```

### 预设选中日期

```jsx
import { useState } from 'react'
import { DatePicker } from '@gm-touch/react'

function PreselectedExample() {
  const [selected, setSelected] = useState(new Date())

  return (
    <DatePicker
      selected={selected}
      onSelect={setSelected}
    />
  )
}
```

## 设计说明

### 功能特性

- **月份切换**: 通过左右箭头按钮切换月份
- **日期高亮**: 当前选中的日期会高亮显示
- **今天标记**: 当天的日期会有特殊标记
- **禁用状态**: 超出范围的日期会显示为禁用状态

### 交互逻辑

1. 点击左右箭头可以切换月份
2. 点击日期可以选中
3. 选中日期后，页面会自动定位到该日期所在的月份

### 样式说明

- 使用 Flexbox 布局
- 左右箭头按钮使用 SVG 图标
- 继承 Calendar 组件的核心功能

## 依赖关系

DatePicker 组件依赖于以下组件：

- `Calendar`: 日历核心组件
- `Flex`: 布局组件

## 注意事项

1. 日期对象必须是标准的 JavaScript Date 对象
2. `disabledDate` 函数优先级高于 `min` 和 `max`
3. 组件使用 `moment` 进行日期处理
