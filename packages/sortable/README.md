# @gm-touch/sortable

## 简介

@gm-touch/sortable 是 gm-touch 组件库的拖拽排序组件包，提供了一套基于 Sortable.js 的 React 拖拽排序解决方案。

该包提供了三种不同场景的拖拽排序组件：基础列表排序、虚拟化列表排序和分组排序。所有组件都针对触屏设备进行了优化，提供流畅的拖拽体验。

## 特性

- 📱 **触屏优化**：专为触屏设备设计，支持触摸拖拽
- 🚀 **虚拟化支持**：提供基于 react-window 的虚拟化排序，支持大量数据
- 🎯 **多种场景**：支持基础排序、虚拟化排序、分组排序
- 🔄 **灵活配置**：完全继承 Sortable.js 的所有配置项
- 💪 **高性能**：虚拟化组件支持渲染数万条数据依然流畅
- 🎨 **样式可控**：提供完整的样式定制能力

## 安装

```bash
# 使用 npm
npm install @gm-touch/sortable

# 使用 yarn
yarn add @gm-touch/sortable
```

### peerDependencies

本包依赖以下 peer packages，请确保项目中已安装：

```json
{
  "peerDependencies": {
    "@gm-touch/react": "^1.0.0",
    "lodash": "^4.17.14",
    "prop-types": "^15.7.2",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-window": "^1.8.5",
    "sortablejs": "^1.10.1"
  }
}
```

## 组件列表

### Sortable

基础拖拽排序列表，适用于一般数据量的列表排序场景。

**示例：**

```jsx
import { Sortable } from '@gm-touch/sortable'

function App() {
  const [items, setItems] = useState([
    { id: 1, name: '项目 1' },
    { id: 2, name: '项目 2' },
    { id: 3, name: '项目 3' }
  ])

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    const newItems = [...items]
    const [removed] = newItems.splice(oldIndex, 1)
    newItems.splice(newIndex, 0, removed)
    setItems(newItems)
  }

  return (
    <Sortable
      data={items}
      onSortEnd={handleSortEnd}
      renderItem={(item) => (
        <div key={item.id} className="sortable-item">
          {item.name}
        </div>
      )}
    />
  )
}
```

### SortableBase

基于 react-window 的虚拟化拖拽排序列表，适用于大数据量的列表排序场景（数万条数据）。

**示例：**

```jsx
import { SortableBase } from '@gm-touch/sortable'

function App() {
  const [items, setItems] = useState(
    Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `项目 ${i + 1}`
    }))
  )

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    const newItems = [...items]
    const [removed] = newItems.splice(oldIndex, 1)
    newItems.splice(newIndex, 0, removed)
    setItems(newItems)
  }

  return (
    <SortableBase
      data={items}
      height={500}
      itemHeight={50}
      onSortEnd={handleSortEnd}
      renderItem={(item) => (
        <div className="sortable-item">
          {item.name}
        </div>
      )}
    />
  )
}
```

### GroupSortable

分组拖拽排序组件，支持多个分组之间的拖拽排序。

**示例：**

```jsx
import { GroupSortable } from '@gm-touch/sortable'

function App() {
  const [groups, setGroups] = useState([
    {
      id: 'group1',
      name: '待办',
      items: [
        { id: 1, name: '任务 1' },
        { id: 2, name: '任务 2' }
      ]
    },
    {
      id: 'group2',
      name: '进行中',
      items: [
        { id: 3, name: '任务 3' },
        { id: 4, name: '任务 4' }
      ]
    }
  ])

  const handleSortEnd = ({ sourceGroup, destGroup, oldIndex, newIndex }) => {
    // 实现跨分组拖拽逻辑
    // ...
  }

  return (
    <div style={{ display: 'flex' }}>
      {groups.map(group => (
        <div key={group.id} className="group">
          <h3>{group.name}</h3>
          <GroupSortable
            groupId={group.id}
            data={group.items}
            onSortEnd={handleSortEnd}
            renderItem={(item) => (
              <div key={item.id} className="sortable-item">
                {item.name}
              </div>
            )}
          />
        </div>
      ))}
    </div>
  )
}
```

## API

所有组件都继承 Sortable.js 的配置项，常用配置如下：

### 通用 Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 列表数据 | array | [] | 是 |
| onSortEnd | 拖拽结束回调 | function | - | 是 |
| renderItem | 渲染列表项 | function | - | 是 |
| handle | 拖拽手柄的选择器 | string | - | 否 |
| disabled | 是否禁用拖拽 | boolean | false | 否 |

### SortableBase 额外 Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| height | 列表容器高度 | number | - | 是 |
| itemHeight | 列表项高度 | number | - | 是 |
| overscanCount | 渲染范围外的额外项数 | number | 3 | 否 |

### onSortEnd 回调参数

```javascript
function onSortEnd({ oldIndex, newIndex, sourceGroup, destGroup }) {
  // oldIndex: 拖拽项的原始索引
  // newIndex: 拖拽项的新索引
  // sourceGroup: 源分组 ID（仅 GroupSortable）
  // destGroup: 目标分组 ID（仅 GroupSortable）
}
```

## 使用建议

### 选择合适的组件

- **少量数据（< 100 条）**：使用 `Sortable`
- **大量数据（> 100 条）**：使用 `SortableBase`
- **需要分组**：使用 `GroupSortable`

### 性能优化

```jsx
import { memo } from 'react'

// 使用 memo 优化列表项渲染
const Item = memo(({ item }) => {
  return <div className="item">{item.name}</div>
})

<Sortable
  data={items}
  renderItem={(item) => <Item item={item} />}
/>
```

### 自定义拖拽手柄

```jsx
<Sortable
  data={items}
  handle=".drag-handle"  // 只有该选择器的元素可以触发拖拽
  renderItem={(item) => (
    <div className="item">
      <span className="drag-handle">⋮⋮</span>
      {item.name}
    </div>
  )}
/>
```

### 动画效果

```jsx
import { Sortable } from '@gm-touch/sortable'

<Sortable
  data={items}
  animation={150}  // 拖拽动画时长（毫秒）
  delayOnTouchOnly={true}  // 仅在触屏设备上延迟
  delay={200}  // 延迟时长（毫秒）
  renderItem={...}
/>
```

## 注意事项

- **唯一 key**：确保每个数据项都有唯一的 id，用于正确识别拖拽项
- **React key**：在 renderItem 中必须为每个元素设置唯一的 key
- **状态管理**：onSortEnd 回调中需要手动更新 data 状态以反映新的排序
- **触屏延迟**：建议在触屏设备上设置 delay 和 delayOnTouchOnly，避免误触
- **虚拟化限制**：SortableBase 不支持不等高的列表项，需要固定 itemHeight
- **跨分组**：GroupSortable 的跨分组拖拽需要手动处理数据移动逻辑

## 相关包

- **[@gm-touch/react](../react)** - 核心组件库
- **[@gm-touch/locales](../locales)** - 国际化语言包

## 相关文档

- [Sortable.js 官方文档](https://github.com/SortableJS/Sortable)
- [react-window 文档](https://github.com/bvaughn/react-window)

## License

ISC
