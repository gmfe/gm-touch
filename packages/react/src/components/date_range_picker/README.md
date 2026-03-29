# DateRangePicker 日期范围选择器

日期范围选择器组件，支持选择开始日期和结束日期，显示两个月份的日历视图。

## 基本使用

```jsx
import { DateRangePicker } from '@gm-touch/react'

function App() {
  const [begin, setBegin] = useState(null)
  const [end, setEnd] = useState(null)

  return (
    <DateRangePicker
      begin={begin}
      end={end}
      onChange={(begin, end) => {
        setBegin(begin)
        setEnd(end)
      }}
    />
  )
}
```

## Props

### begin

- **类型**: `Object` (Date 对象)
- **默认值**: 无
- **必填**: 否

开始日期。

```jsx
<DateRangePicker
  begin={new Date()}
  onChange={handleChange}
/>
```

### end

- **类型**: `Object` (Date 对象)
- **默认值**: 无
- **必填**: 否

结束日期。

```jsx
<DateRangePicker
  begin={new Date()}
  end={new Date()}
  onChange={handleChange}
/>
```

### onChange

- **类型**: `Function`
- **默认值**: 无
- **必填**: 否

日期范围选择变化回调函数。参数为 `(begin, end)`，`begin` 和 `end` 都是 Date 对象。注意：`end` 可能为 `null`（只选择了开始日期时）。

```jsx
<DateRangePicker
  onChange={(begin, end) => {
    console.log('开始日期:', begin)
    console.log('结束日期:', end)
  }}
/>
```

### min

- **类型**: `Object` (Date 对象)
- **默认值**: 无
- **必填**: 否

可选的最小日期。早于此日期的日期将被禁用。

```jsx
<DateRangePicker
  min={new Date()}
  onChange={handleChange}
/>
```

### max

- **类型**: `Object` (Date 对象)
- **默认值**: 无
- **必填**: 否

可选的最大日期。晚于此日期的日期将被禁用。

```jsx
<DateRangePicker
  max={new Date('2025-12-31')}
  onChange={handleChange}
/>
```

### disabledDate

- **类型**: `Function`
- **默认值**: 无
- **必填**: 否

自定义日期是否可选。传入参数为 `(date, { begin, end })`，返回 `true` 表示禁用该日期，`false` 表示可选。当设置此属性时，`min` 和 `max` 属性将失效。

```jsx
<DateRangePicker
  disabledDate={(date, { begin, end }) => {
    // 限制选择范围在7天以内
    if (begin && !end) {
      const diff = moment(date).diff(moment(begin), 'days')
      return Math.abs(diff) > 6
    }
    return false
  }}
  onChange={handleChange}
/>
```

## 完整示例

### 基本使用

```jsx
import { useState } from 'react'
import { DateRangePicker } from '@gm-touch/react'

function BasicExample() {
  const [begin, setBegin] = useState(null)
  const [end, setEnd] = useState(null)

  const handleChange = (begin, end) => {
    setBegin(begin)
    setEnd(end)
  }

  return (
    <div>
      <div>
        选择范围: {begin ? begin.toLocaleDateString() : '未选择'} ~ {end ? end.toLocaleDateString() : '未选择'}
      </div>
      <DateRangePicker
        begin={begin}
        end={end}
        onChange={handleChange}
      />
    </div>
  )
}
```

### 预设日期范围

```jsx
import { useState } from 'react'
import { DateRangePicker } from '@gm-touch/react'

function PreselectedExample() {
  const [begin, setBegin] = useState(new Date('2020-01-17'))
  const [end, setEnd] = useState(new Date('2020-03-23'))

  return (
    <DateRangePicker
      begin={begin}
      end={end}
      onChange={(begin, end) => {
        setBegin(begin)
        setEnd(end)
      }}
    />
  )
}
```

### 限制日期范围

```jsx
import { useState } from 'react'
import { DateRangePicker } from '@gm-touch/react'
import moment from 'moment'

function RangeLimitExample() {
  const [begin, setBegin] = useState(null)
  const [end, setEnd] = useState(null)

  return (
    <DateRangePicker
      begin={begin}
      end={end}
      onChange={(begin, end) => {
        setBegin(begin)
        setEnd(end)
      }}
      min={moment().toDate()}
      max={moment().add(10, 'days').toDate()}
    />
  )
}
```

### 限制选择范围：7天

```jsx
import { useState } from 'react'
import { DateRangePicker } from '@gm-touch/react'
import moment from 'moment'

function CustomRangeExample() {
  const [begin, setBegin] = useState(null)
  const [end, setEnd] = useState(null)

  return (
    <DateRangePicker
      begin={begin}
      end={end}
      onChange={(begin, end) => {
        setBegin(begin)
        setEnd(end)
      }}
      disabledDate={(date, { begin, end }) => {
        // 只选择了开始日期时，限制只能选择前后6天内
        if (begin && !end) {
          if (+moment(date) > +moment(begin).add(6, 'days')) {
            return true
          }
          if (+moment(date) < +moment(begin).add(-6, 'days')) {
            return true
          }
        }
        return false
      }}
    />
  )
}
```

### 禁用周末

```jsx
import { useState } from 'react'
import { DateRangePicker } from '@gm-touch/react'

function DisableWeekendExample() {
  const [begin, setBegin] = useState(null)
  const [end, setEnd] = useState(null)

  return (
    <DateRangePicker
      begin={begin}
      end={end}
      onChange={(begin, end) => {
        setBegin(begin)
        setEnd(end)
      }}
      disabledDate={(date) => {
        const day = date.getDay()
        return day === 0 || day === 6
      }}
    />
  )
}
```

## 设计说明

### 功能特性

- **双月视图**: 同时显示两个月份的日历，方便选择日期范围
- **智能切换**: 点击日期后，日历会自动切换到合适的月份
- **范围高亮**: 选中的日期范围会高亮显示
- **自动排序**: 无论用户如何选择，组件会自动将较早的日期作为开始日期
- **同一天选择**: 点击同一天两次会将开始和结束日期设为同一天

### 交互逻辑

1. **第一次点击**: 选择开始日期
2. **第二次点击**:
   - 如果点击的是同一天，将开始和结束日期都设为该天
   - 如果点击的是更早的日期，交换开始和结束日期
   - 如果点击的是更晚的日期，设置为结束日期
3. **第三次点击**: 清空当前选择，开始新的选择

### 组件结构

DateRangePicker 由以下子组件组成：

- `Header`: 显示已选择的日期范围
- `Two`: 渲染两个并排的日历视图
- `RangeCalendar`: 单个日历组件（来自 calendar 包）

### 样式说明

- 使用 Flexbox 布局
- 两个日历之间有固定间距
- 顶部显示当前选择的日期范围
- 左右箭头控制两个日历的月份切换

## 选择策略

组件的日期选择逻辑如下：

1. **初始状态**: `begin` 和 `end` 都为 `null`
2. **点击第一个日期**: 设置为 `begin`，`end` 为 `null`
3. **点击第二个日期**:
   - 如果和 `begin` 相同：`begin` 和 `end` 都设为该日期
   - 如果比 `begin` 早：`begin` 和 `end` 交换
   - 如果比 `begin` 晚：设为 `end`
4. **点击第三个日期**: 清空当前范围，开始新的选择

## 依赖关系

DateRangePicker 组件依赖于以下组件：

- `RangeCalendar`: 范围日历组件
- `Flex`: 布局组件

## 注意事项

1. 日期对象必须是标准的 JavaScript Date 对象
2. `disabledDate` 函数接收的第二个参数包含当前已选择的 `begin` 和 `end`，方便实现复杂的限制逻辑
3. `onChange` 回调中的 `end` 可能为 `null`，需要处理这种情况
4. 组件使用 `moment` 进行日期处理
5. 两个日历视图始终显示连续的两个月份
