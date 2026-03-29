# Transfer 穿梭框

用于在两个列表之间进行数据双向转移的组件，支持树形结构数据的穿梭操作。

## 基本用法

```jsx
import React from 'react'
import Transfer from '@gm-touch/transfer'

function App() {
  const [selectedValues, setSelectedValues] = useState([])

  const list = [
    {
      value: 1,
      text: '蔬菜',
      children: [
        {
          value: 11,
          text: '叶菜',
          children: [
            { value: 111, text: '皇帝菜' },
            { value: 112, text: '金不换' }
          ]
        },
        {
          value: 12,
          text: '甘蓝',
          children: [
            { value: 121, text: '甘蓝1' },
            { value: 122, text: '甘蓝2' }
          ]
        }
      ]
    },
    {
      value: 2,
      text: '冻品',
      children: [
        {
          value: 21,
          text: '冻猪肉',
          children: [
            { value: 211, text: '五花肉' },
            { value: 212, text: '猪脚' }
          ]
        }
      ]
    }
  ]

  return (
    <div style={{ height: '500px' }}>
      <Transfer
        list={list}
        selectedValues={selectedValues}
        onSelectValues={setSelectedValues}
      />
    </div>
  )
}
```

## Props

### 必填属性

| 属性名 | 类型 | 说明 |
|--------|------|------|
| list | `Array` | 数据列表，支持树形结构 |
| selectedValues | `Array` | 已选中的值数组 |
| onSelectValues | `Function` | 选择变化的回调函数，参数为最新的选中值数组 |

### 可选属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| leftTitle | `String` | `'待选择'` | 左侧列表标题 |
| leftWithFilter | `Boolean \| Function` | `true` | 左侧是否显示搜索框，可传入自定义过滤函数 |
| leftPlaceHolder | `String` | `'搜索'` | 左侧搜索框占位符 |
| rightTitle | `String` | `'已选择'` | 右侧列表标题 |
| rightWithFilter | `Boolean \| Function` | `true` | 右侧是否显示搜索框，可传入自定义过滤函数 |
| rightPlaceHolder | `String` | `'搜索'` | 右侧搜索框占位符 |
| className | `String` | - | 自定义类名 |
| style | `Object` | - | 自定义样式 |

## 数据结构

`list` 属性接收一个树形结构的数组，每个节点包含以下字段：

```typescript
interface TransferNode {
  value: string | number  // 节点的唯一标识
  text: string             // 节点显示的文本
  children?: TransferNode[] // 子节点数组（可选）
}
```

## 使用示例

### 基础用法

```jsx
import Transfer from '@gm-touch/transfer'

const [selectedValues, setSelectedValues] = useState([])

<Transfer
  list={dataList}
  selectedValues={selectedValues}
  onSelectValues={setSelectedValues}
/>
```

### 自定义标题

```jsx
<Transfer
  list={dataList}
  selectedValues={selectedValues}
  onSelectValues={setSelectedValues}
  leftTitle="可选用户"
  rightTitle="已选用户"
/>
```

### 禁用搜索功能

```jsx
<Transfer
  list={dataList}
  selectedValues={selectedValues}
  onSelectValues={setSelectedValues}
  leftWithFilter={false}
  rightWithFilter={false}
/>
```

### 自定义样式

```jsx
<Transfer
  list={dataList}
  selectedValues={selectedValues}
  onSelectValues={setSelectedValues}
  className="my-transfer"
 ={{ border: '1px solid #ddd' }}
/>
```

## 注意事项

1. **容器高度**：组件需要父容器设置明确的高度，建议使用 `style={{ height: '500px' }}` 或通过 CSS 设置高度。

2. **数据唯一性**：确保 `list` 中每个节点的 `value` 值是唯一的，否则可能导致选择异常。

3. **受控组件**：`selectedValues` 和 `onSelectValues` 必须配合使用，通过 `onSelectValues` 回调更新 `selectedValues` 状态。

4. **数据引用**：建议传入数据的副本（使用 `.slice()`），避免直接修改原始数据。

5. **搜索过滤**：默认开启搜索功能，支持节点文本的模糊匹配。如需自定义过滤逻辑，可传入过滤函数。

## 交互说明

- 点击中间的向右按钮（▶），将左侧选中项移动到右侧
- 点击中间的向左按钮（◀），将右侧选中项移动到左侧
- 按钮在有选中项时会高亮显示（主题色背景）
- 支持多选操作，可同时选中多个节点进行转移
