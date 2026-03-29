# Calendar 日历

日历组件，提供单日期选择和日期范围选择功能。是 DatePicker 和 DateRangePicker 的核心组件。

## 组件导出

该组件导出两个组件：

- `Calendar`: 单日期选择日历
- `RangeCalendar`: 日期范围选择日历

## 基本使用

### Calendar（单日期选择）

```jsx
import { Calendar } from '@gm-touch/react'

function App() {
  const [selected, setSelected] = useState(null)

  return (
    <Calendar
      selected={selected}
      onSelect={setSelected}
      currentYearAndMonth={moment()}
    />
  )
}
```

### RangeCalendar（日期范围选择）

```jsx
import { RangeCalendar } from '@gm-touch/react'

function App() {
  const [begin, setBegin] = useState(null)
  const [end, setEnd] = useState(null)

  return (
    <RangeCalendar
      begin={begin}
      end={end}
      onSelect={(begin, end) => {
        setBegin(begin)
        setEnd(end)
      }}
      currentYearAndMonth={moment()}
    />
  )
}
```

## Calendar Props

### selected

- **类型**: `Object` (Date 对象)
- **默认值**: 无
- **必填**: 否

当前选中的日期。

```jsx
<Calendar
  selected={new Date()}
  onSelect={handleSelect}
  currentYearAndMonth={moment()}
/>
```

### onSelect

- **类型**: `Function`
- **默认值**: `_.noop`
- **必填**: 否

日期选中回调函数，参数为选中的日期（Date 对象）。

```jsx
<Calendar
  onSelect={(date) => {
    console.log('选中的日期:', date)
  }}
  currentYearAndMonth={moment()}
/>
```

### min

- **类型**: `Object` (Date 对象)
- **默认值**: 无
- **必填**: 否

可选的最小日期。早于此日期的日期将被禁用。

```jsx
<Calendar
  min={new Date()}
  onSelect={handleSelect}
  currentYearAndMonth={moment()}
/>
```

### max

- **类型**: `Object` (Date 对象)
- **默认值**: 无
- **必填**: 否

可选的最大日期。晚于此日期的日期将被禁用。

```jsx
<Calendar
  max={new Date('2025-12-31')}
  onSelect={handleSelect}
  currentYearAndMonth={moment()}
/>
```

### disabledDate

- **类型**: `Function`
- **默认值**: 无
- **必填**: 否

自定义日期是否可选。传入参数为 `(date, { begin, end })`，返回 `true` 表示禁用该日期，`false` 表示可选。当设置此属性时，`min` 和 `max` 属性将失效。

```jsx
<Calendar
  disabledDate={(date) => {
    // 禁用周五
    return moment(date).get('day') === 5
  }}
  onSelect={handleSelect}
  currentYearAndMonth={moment()}
/>
```

### className

- **类型**: `String`
- **默认值**: 无
- **必填**: 否

自定义容器类名。

```jsx
<Calendar
  className="my-calendar"
  onSelect={handleSelect}
  currentYearAndMonth={moment()}
/>
```

### style

- **类型**: `Object`
- **默认值**: 无
- **必填**: 否

自定义容器样式。

```jsx
<Calendar
  style={{ width: 400 }}
  onSelect={handleSelect}
  currentYearAndMonth={moment()}
/>
```

## RangeCalendar Props

### begin

- **类型**: `Object` (Date 对象)
- **默认值**: 无
- **必填**: 否

开始日期。

```jsx
<RangeCalendar
  begin={new Date()}
  onSelect={handleSelect}
  currentYearAndMonth={moment()}
/>
```

### end

- **类型**: `Object` (Date 对象)
- **默认值**: 无
- **必填**: 否

结束日期。

```jsx
<RangeCalendar
  begin={new Date()}
  end={new Date()}
  onSelect={handleSelect}
  currentYearAndMonth={moment()}
/>
```

### onSelect

- **类型**: `Function`
- **默认值**: `_.noop`
- **必填**: 否

日期选中回调函数，参数为 `(begin, end)`，都是 Date 对象。注意：`end` 可能为 `null`。

```jsx
<RangeCalendar
  onSelect={(begin, end) => {
    console.log('开始日期:', begin)
    console.log('结束日期:', end)
  }}
  currentYearAndMonth={moment()}
/>
```

### currentYearAndMonth

- **类型**: `Object` (moment 对象)
- **默认值**: 无
- **必填**: 是

当前显示的年月。

```jsx
<RangeCalendar
  currentYearAndMonth={moment()}
  onSelect={handleSelect}
/>
```

### min

- **类型**: `Object` (Date 对象)
- **默认值**: 无
- **必填**: 否

可选的最小日期。

```jsx
<RangeCalendar
  min={new Date()}
  onSelect={handleSelect}
  currentYearAndMonth={moment()}
/>
```

### max

- **类型**: `Object` (Date 对象)
- **默认值**: 无
- **必填**: 否

可选的最大日期。

```jsx
<RangeCalendar
  max={new Date('2025-12-31')}
  onSelect={handleSelect}
  currentYearAndMonth={moment()}
/>
```

### disabledDate

- **类型**: `Function`
- **默认值**: 无
- **必填**: 否

自定义日期是否可选。

```jsx
<RangeCalendar
  disabledDate={(date, { begin, end }) => {
    // 根据已选择的日期限制可选范围
    if (begin && !end) {
      const diff = moment(date).diff(moment(begin), 'days')
      return Math.abs(diff) > 6
    }
    return false
  }}
  onSelect={handleSelect}
  currentYearAndMonth={moment()}
/>
```

### className

- **类型**: `String`
- **默认值**: 无
- **必填**: 否

自定义容器类名。

### style

- **类型**: `Object`
- **默认值**: 无
- **必填**: 否

自定义容器样式。

## 完整示例

### Calendar 基本使用

```jsx
import { useState } from 'react'
import { Calendar } from '@gm-touch/react'
import moment from 'moment'

function BasicCalendarExample() {
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <div>选中的日期: {selected ? selected.toLocaleDateString() : '未选择'}</div>
      <Calendar
        selected={selected}
        onSelect={setSelected}
        currentYearAndMonth={moment()}
      />
    </div>
  )
}
```

### Calendar 限制日期范围

```jsx
import { useState } from 'react'
import { Calendar } from '@gm-touch/react'
import moment from 'moment'

function RangeLimitCalendarExample() {
  const [selected, setSelected] = useState(null)

  return (
    <Calendar
      selected={selected}
      onSelect={setSelected}
      currentYearAndMonth={moment()}
      min={moment().toDate()}
      max={moment().add(10, 'days').toDate()}
    />
  )
}
```

### Calendar 自定义禁用日期

```jsx
import { useState } from 'react'
import { Calendar } from '@gm-touch/react'
import moment from 'moment'

function CustomDisabledCalendarExample() {
  const [selected, setSelected] = useState(null)

  return (
    <Calendar
      selected={selected}
      onSelect={setSelected}
      currentYearAndMonth={moment()}
      disabledDate={(date) => {
        // 禁用周五
        return moment(date).get('day') === 5
      }}
    />
  )
}
```

### RangeCalendar 基本使用

```jsx
import { useState } from 'react'
import { RangeCalendar } from '@gm-touch/react'
import moment from 'moment'

function BasicRangeCalendarExample() {
  const [begin, setBegin] = useState(null)
  const [end, setEnd] = useState(null)

  return (
    <div>
      <div>
        选择范围: {begin ? begin.toLocaleDateString() : '未选择'} ~ {end ? end.toLocaleDateString() : '未选择'}
      </div>
      <RangeCalendar
        begin={begin}
        end={end}
        onSelect={(begin, end) => {
          setBegin(begin)
          setEnd(end)
        }}
        currentYearAndMonth={moment()}
      />
    </div>
  )
}
```

### RangeCalendar 限制选择范围

```jsx
import { useState } from 'react'
import { RangeCalendar } from '@gm-touch/react'
import moment from 'moment'

function RangeLimitRangeCalendarExample() {
  const [begin, setBegin] = useState(null)
  const [end, setEnd] = useState(null)

  return (
    <RangeCalendar
      begin={begin}
      end={end}
      onSelect={(begin, end) => {
        setBegin(begin)
        setEnd(end)
      }}
      currentYearAndMonth={moment()}
      disabledDate={(date, { begin, end }) => {
        // 限制选择范围在7天以内
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

## 设计说明

### 组件结构

日历组件由以下子组件组成：

- `Header`: 显示当前年月
- `Week`: 显示星期标题
- `Content`: 显示日期网格
- `Day`: 单个日期单元格

### RangeCalendar 选择逻辑

1. **初始状态**: `begin` 和 `end` 都为 `null`
2. **第一次点击**: 设置为 `begin`，`end` 为 `null`
3. **第二次点击**:
   - 如果点击的是同一天：`begin` 和 `end` 都设为该日期
   - 如果点击的是更早的日期：交换 `begin` 和 `end`
   - 如果点击的是更晚的日期：设置为 `end`
4. **都有值时点击**: 清空当前选择，开始新的选择

### 日期网格

- 显示 42 个日期单元格（6 行 × 7 列）
- 包含当前月份的所有日期
- 显示上个月末尾和下个月开头的日期
- 当天的日期有特殊标记
- 选中范围内的日期会高亮显示

### 样式说明

- 使用 Flexbox 布局
- 日期网格按行排列
- 不同状态的日期有不同的样式类名：
  - `t-calendar-day-old`: 上个月的日期
  - `t-calendar-day-new`: 下个月的日期
  - `t-calendar-day-now`: 今天的日期
  - `active`: 选中范围内的日期
  - `t-calendar-day-begin`: 范围开始日期
  - `t-calendar-day-end`: 范围结束日期
  - `t-calendar-day-disabled`: 禁用的日期

## 子组件说明

### Header

显示当前年月的头部组件。

**Props**:
- `value`: moment 对象，表示当前显示的年月

### Week

显示星期标题的组件。

**特点**:
- 使用国际化方式显示星期名称
- 从周日到周六依次显示

### Content

日期网格内容组件。

**Props**:
- `currentYearAndMonth`: moment 对象，表示当前显示的年月
- `begin`: moment 对象，表示开始日期
- `end`: moment 对象，表示结束日期
- `onSelect`: 日期选择回调函数
- `min`: 最小可选日期
- `max`: 最大可选日期
- `disabledDate`: 自定义禁用函数

### Day

单个日期单元格组件。

**Props**:
- `value`: moment 对象，表示该日期
- `currentYearAndMonth`: moment 对象，表示当前显示的年月
- `begin`: moment 对象，表示开始日期
- `end`: moment 对象，表示结束日期
- `onClick`: 点击回调函数
- `disabled`: 是否禁用

## Calendar 与 RangeCalendar 的关系

`Calendar` 组件实际上是 `RangeCalendar` 的简化版本：

```javascript
const Calendar = props => {
  const { selected, onSelect, ...rest } = props

  const handleSelect = begin => {
    onSelect(begin)
  }

  return (
    <RangeCalendar
      {...rest}
      begin={selected}
      end={selected}  // 将 begin 和 end 都设为 selected
      onSelect={handleSelect}
    />
  )
}
```

## 国际化支持

组件使用 `@gm-touch/locales` 提供的国际化方法显示星期名称：

```javascript
import { getLocale } from '@gm-touch/locales'

const weekDays = [
  getLocale('week__日'),  // 日
  getLocale('week__一'),  // 一
  getLocale('week__二'),  // 二
  getLocale('week__三'),  // 三
  getLocale('week__四'),  // 四
  getLocale('week__五'),  // 五
  getLocale('week__六')   // 六
]
```

## 依赖关系

日历组件依赖于以下组件和库：

- `Flex`: 布局组件
- `moment`: 日期处理库
- `lodash`: 工具函数库
- `classnames`: 类名处理库

## 使用场景

- **DatePicker**: 使用 `Calendar` 组件，添加月份切换功能
- **DateRangePicker**: 使用两个 `RangeCalendar` 组件，实现双月视图
- **独立使用**: 可以直接使用 `Calendar` 或 `RangeCalendar` 构建自定义的日期选择界面

## 注意事项

1. 日期对象必须是标准的 JavaScript Date 对象
2. `currentYearAndMonth` 必须是 moment 对象
3. `disabledDate` 函数接收的第二个参数包含当前已选择的 `begin` 和 `end`，方便实现复杂的限制逻辑
4. 组件使用 `moment` 进行日期处理
5. `RangeCalendar` 的 `onSelect` 回调中，`end` 可能为 `null`
6. `Calendar` 本质上是 `begin` 和 `end` 相同的 `RangeCalendar`
