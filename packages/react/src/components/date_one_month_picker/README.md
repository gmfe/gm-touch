# DateOneMonthPicker 单月日期选择器

单月日期选择器组件，显示单个月份的日历视图，支持月份切换和日期选择。

## 基本使用

```jsx
import { DateOneMonthPicker } from '@gm-touch/react'

function App() {
  const [selected, setSelected] = useState(new Date())

  return (
    <DateOneMonthPicker
      selected={selected}
      onSelect={setSelected}
    />
  )
}
```

## Props

### selected

- **类型**: `Object` (Date 对象)
- **默认值**: `new Date()`
- **必填**: 是

当前选中的日期。

```jsx
<DateOneMonthPicker
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
<DateOneMonthPicker
  selected={selected}
  onSelect={(date) => {
    console.log('选中的日期:', date)
  }}
/>
```

## 完整示例

### 基本使用

```jsx
import { useState } from 'react'
import { DateOneMonthPicker } from '@gm-touch/react'

function BasicExample() {
  const [selected, setSelected] = useState(new Date())

  return (
    <div>
      <div>选中的日期: {selected.toLocaleDateString()}</div>
      <DateOneMonthPicker
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  )
}
```

### 选择特定日期

```jsx
import { useState } from 'react'
import { DateOneMonthPicker } from '@gm-touch/react'

function SpecificDateExample() {
  const [selected, setSelected] = useState(new Date('2025-03-15'))

  const handleSelect = (date) => {
    setSelected(date)
    console.log('选择了日期:', date)
  }

  return (
    <DateOneMonthPicker
      selected={selected}
      onSelect={handleSelect}
    />
  )
}
```

### 获取选中的日期

```jsx
import { useState } from 'react'
import { DateOneMonthPicker } from '@gm-touch/react'

function GetDateExample() {
  const [selected, setSelected] = useState(new Date())

  return (
    <div>
      <DateOneMonthPicker
        selected={selected}
        onSelect={(date) => {
          setSelected(date)
          // 格式化日期输出
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const day = String(date.getDate()).padStart(2, '0')
          console.log(`选择的日期: ${year}-${month}-${day}`)
        }}
      />
      <p>当前选择: {selected.toLocaleDateString('zh-CN')}</p>
    </div>
  )
}
```

## 设计说明

### 功能特性

- **单月视图**: 只显示单个月份的日历
- **月份切换**: 通过左右箭头按钮切换月份
- **今天标记**: 当天的日期会有特殊标记
- **当前月高亮**: 只能选择当前月份的日期，其他月份的日期显示为禁用状态

### 组件结构

DateOneMonthPicker 由以下子组件组成：

- `Header`: 显示当前年月，并提供月份切换按钮
- `Week`: 显示星期标题（日、一、二、三、四、五、六）
- `Content`: 显示日期网格
- `Day`: 单个日期单元格

### 交互逻辑

1. 点击左箭头切换到上个月
2. 点击右箭头切换到下个月
3. 只能选择当前显示月份的日期
4. 点击日期后触发 `onSelect` 回调

### 日期网格

- 组件显示 42 个日期单元格（6 行 × 7 列）
- 包含当前月份的所有日期
- 显示上个月末尾和下个月开头的日期以填充网格（但显示为禁用状态）
- 当天的日期会有特殊标记

### 样式说明

- 使用 Flexbox 布局
- 日期网格自动换行
- 禁用的日期（非当前月）有特殊样式
- 当前选中的日期会高亮显示
- 今天的日期有特殊标记

## 子组件说明

### Header

显示当前年月和切换按钮的头部组件。

**Props**:
- `month`: moment 对象，表示当前显示的月份
- `onChange`: 切换月份的回调函数，参数为 `+1`（下个月）或 `-1`（上个月）

### Week

显示星期标题的组件。

**特点**:
- 使用国际化方式显示星期名称
- 从周日到周六依次显示

### Content

日期网格内容组件。

**Props**:
- `selected`: 当前选中的日期
- `day`: moment 对象，表示当前显示的月份
- `onSelect`: 日期选择回调函数

**逻辑**:
- 生成 42 个日期单元格
- 判断每个日期是否属于当前月份
- 判断每个日期是否是今天
- 判断每个日期是否被选中

### Day

单个日期单元格组件。

**Props**:
- `value`: moment 对象，表示该日期
- `index`: 数字，表示在网格中的位置
- `disabled`: 布尔值，表示是否禁用
- `isNow`: 布尔值，表示是否是今天
- `active`: 布尔值，表示是否被选中
- `onSelect`: 点击回调函数

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

DateOneMonthPicker 组件依赖于以下组件：

- `Flex`: 布局组件
- `moment`: 日期处理库

## 与其他日期选择器的区别

| 组件 | 月份数量 | 适用场景 |
|------|---------|---------|
| `DateOneMonthPicker` | 单月 | 简单的日期选择，空间有限 |
| `DatePicker` | 单月（带切换） | 标准的日期选择器 |
| `DateRangePicker` | 双月 | 选择日期范围 |

## 注意事项

1. 日期对象必须是标准的 JavaScript Date 对象
2. 组件内部使用 `moment` 进行日期处理
3. 只能选择当前显示月份的日期
4. 默认选中日期为当天（`new Date()`）
5. 每次切换月份时，显示的月份会更新，但选中的日期保持不变
