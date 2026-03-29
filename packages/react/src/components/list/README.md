# List

列表组件，支持单选、多选、分组等功能，适用于选择列表、菜单列表等场景。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 列表数据，单选格式：`[{value, text, disabled}]`，分组格式：`[{label, children: [{value, text, disabled}]}]` | `array` | - | 是 |
| selected | 选中的值，单选时为单个值，多选时为数组 | `any` \| `array` | - | 否 |
| onSelect | 选中项变化时的回调，单选时返回单个值，多选时返回数组 | `function` | `() => {}` | 否 |
| multiple | 是否支持多选 | `boolean` | `false` | 否 |
| isGroupList | 是否为分组列表 | `boolean` | `false` | 否 |
| isScrollTo | 是否滚动到选中项（需要设置固定高度或 maxHeight） | `boolean` | `false` | 否 |
| renderItem | 自定义列表项渲染 | `function` | `(item) => item.text` | 否 |
| getItemProps | 获取列表项的额外属性（少用） | `function` | `() => ({})` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### 数据格式

**单选列表数据**：
```js
const data = [
  { value: '1', text: '选项 1' },
  { value: '2', text: '选项 2', disabled: true },
  { value: '3', text: '选项 3' }
]
```

**分组列表数据**：
```js
const groupData = [
  {
    label: '分组一',
    children: [
      { value: '1', text: '选项 1' },
      { value: '2', text: '选项 2' }
    ]
  },
  {
    label: '分组二',
    children: [
      { value: '3', text: '选项 3' },
      { value: '4', text: '选项 4', disabled: true }
    ]
  }
]
```

## 示例

### 基础用法（单选）

```jsx
import { List } from '@gm-touch/react'
import { observable } from 'mobx'

const data = [
  { value: '南山', text: '南山' },
  { value: '福田', text: '福田' },
  { value: '龙岗', text: '龙岗' },
  { value: '罗湖', text: '罗湖' }
]

const store = observable({
  selected: null,
  setSelected(selected) {
    this.selected = selected
  }
})

function App() {
  return (
    <div style={{ width: '200px' }}>
      <List
        data={data}
        selected={store.selected}
        onSelect={selected => store.setSelected(selected)}
      />
    </div>
  )
}
```

### 多选列表

```jsx
import { List } from '@gm-touch/react'
import { observable } from 'mobx'

const data = [
  { value: '南山', text: '南山' },
  { value: '福田', text: '福田' },
  { value: '龙岗', text: '龙岗' },
  { value: '罗湖', text: '罗湖' }
]

const store = observable({
  selected: [],
  setSelected(selected) {
    this.selected = selected
  }
})

function App() {
  return (
    <div style={{ width: '200px' }}>
      <List
        multiple
        data={data}
        selected={store.selected}
        onSelect={selected => store.setSelected(selected)}
      />
    </div>
  )
}
```

### 分组列表

```jsx
import { List } from '@gm-touch/react'
import { observable } from 'mobx'

const groupData = [
  {
    label: '广东省',
    children: [
      { value: 'sz', text: '深圳' },
      { value: 'gz', text: '广州' }
    ]
  },
  {
    label: '北京市',
    children: [
      { value: 'bj', text: '北京' }
    ]
  }
]

const store = observable({
  selected: null,
  setSelected(selected) {
    this.selected = selected
  }
})

function App() {
  return (
    <div style={{ width: '200px' }}>
      <List
        data={groupData}
        isGroupList
        selected={store.selected}
        onSelect={selected => store.setSelected(selected)}
      />
    </div>
  )
}
```

### 禁用选项

```jsx
import { List } from '@gm-touch/react'

const data = [
  { value: '1', text: '可选项 1' },
  { value: '2', text: '禁用项', disabled: true },
  { value: '3', text: '可选项 3' }
]

function App() {
  const [selected, setSelected] = React.useState(null)

  return (
    <div style={{ width: '200px' }}>
      <List
        data={data}
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  )
}
```

### 自定义列表项

```jsx
import { List } from '@gm-touch/react'

const data = [
  { value: '1', text: '选项 1', desc: '描述信息' },
  { value: '2', text: '选项 2', desc: '描述信息' },
  { value: '3', text: '选项 3', desc: '描述信息' }
]

function App() {
  const [selected, setSelected] = React.useState(null)

  return (
    <div style={{ width: '300px' }}>
      <List
        data={data}
        selected={selected}
        onSelect={setSelected}
        renderItem={(item, index) => (
          <div>
            <div>{item.text}</div>
            <div style={{ fontSize: '12px', color: '#999' }}>
              {item.desc}
            </div>
          </div>
        )}
      />
    </div>
  )
}
```

### 自动滚动到选中项

```jsx
import { List } from '@gm-touch/react'

const data = [
  { value: '1', text: '选项 1' },
  { value: '2', text: '选项 2' },
  { value: '3', text: '选项 3' },
  { value: '4', text: '选项 4' },
  { value: '5', text: '选项 5' },
  { value: '6', text: '选项 6' },
  { value: '7', text: '选项 7' },
  { value: '8', text: '选项 8' }
]

function App() {
  const [selected, setSelected] = React.useState('5')

  return (
    <div style={{ width: '200px' }}>
      <List
        data={data}
        selected={selected}
        onSelect={setSelected}
        isScrollTo
        style={{ maxHeight: '200px', overflow: 'auto' }}
      />
    </div>
  )
}
```

### 完整示例：城市选择器

```jsx
import { List } from '@gm-touch/react'
import { observable } from 'mobx'

const cityData = [
  {
    label: '热门城市',
    children: [
      { value: 'beijing', text: '北京' },
      { value: 'shanghai', text: '上海' },
      { value: 'guangzhou', text: '广州' },
      { value: 'shenzhen', text: '深圳' }
    ]
  },
  {
    label: '广东省',
    children: [
      { value: 'guangzhou', text: '广州' },
      { value: 'shenzhen', text: '深圳' },
      { value: 'zhuhai', text: '珠海' },
      { value: 'foshan', text: '佛山' }
    ]
  },
  {
    label: '浙江省',
    children: [
      { value: 'hangzhou', text: '杭州' },
      { value: 'ningbo', text: '宁波' },
      { value: 'wenzhou', text: '温州' }
    ]
  }
]

const store = observable({
  selected: null,
  setSelected(selected) {
    this.selected = selected
    console.log('选中城市：', selected)
  }
})

function CityPicker() {
  return (
    <div>
      <h3>选择城市</h3>
      <div style={{ width: '300px', border: '1px solid #ddd' }}>
        <List
          data={cityData}
          isGroupList
          selected={store.selected}
          onSelect={selected => store.setSelected(selected)}
        />
      </div>
      <p>已选：{store.selected || '未选择'}</p>
    </div>
  )
}
```

### 完整示例：多选标签

```jsx
import { List } from '@gm-touch/react'
import { observable } from 'mobx'

const tagData = [
  { value: 'tech', text: '科技' },
  { value: 'finance', text: '金融' },
  { value: 'sports', text: '体育' },
  { value: 'entertainment', text: '娱乐' },
  { value: 'health', text: '健康' },
  { value: 'education', text: '教育' }
]

const store = observable({
  selected: [],
  setSelected(selected) {
    this.selected = selected
  }
})

function TagSelector() {
  return (
    <div>
      <h3>选择标签（多选）</h3>
      <div style={{ width: '200px', border: '1px solid #ddd' }}>
        <List
          multiple
          data={tagData}
          selected={store.selected}
          onSelect={selected => store.setSelected(selected)}
        />
      </div>
      <p>已选：{store.selected.join(', ') || '未选择'}</p>
    </div>
  )
}
```

## 注意事项

1. **数据格式**：
   - 单选和分组列表的数据格式不同，使用 `isGroupList` 区分
   - 每个数据项必须包含 `value` 和 `text` 字段
   - `disabled` 字段可选，用于禁用某个选项

2. **selected 属性**：
   - 单选时：`selected` 为单个值（如 `'1'`）
   - 多选时：`selected` 必须是数组（如 `['1', '2']`）
   - 多选时如果 `selected` 为 `null` 或 `undefined`，会自动转换为 `[]`

3. **onSelect 回调**：
   - 单选时：回调函数接收单个值
   - 多选时：回调函数接收数组
   - 多选时点击已选项会取消选中

4. **自动滚动**：
   - 设置 `isScrollTo` 后，组件会自动滚动到选中项
   - 需要给列表设置固定高度或 `maxHeight`
   - 使用 `scrollIntoViewIfNeeded` API，兼容性良好

5. **性能优化**：
   - 对于大量数据（>1000 项），建议使用虚拟滚动方案
   - 避免在 `renderItem` 中进行复杂计算

6. **状态管理**：
   - 组件不维护内部状态，需要通过 props 控制
   - 建议配合 MobX 或 useState 使用

7. **样式定制**：
   - 可通过 `className` 和 `style` 自定义样式
   - 选中项有 `active` 类名，禁用项有 `disabled` 类名

## 相关组件

- [Select](../select/README.md) - 下拉选择组件
- [MoreSelect](../more_select/README.md) - 更多选择组件
- [Radio](../radio/README.md) - 单选框组件
- [Checkbox](../checkbox/README.md) - 复选框组件
