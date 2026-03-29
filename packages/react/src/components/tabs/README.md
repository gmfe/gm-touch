# Tabs

选项卡切换组件，用于在不同的内容区域之间进行切换。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| tabs | 选项卡数据数组 | `Array<{text: ReactNode, value: any, children: ReactNode}>` | - | 是 |
| active | 当前激活的选项卡值（受控模式） | `any` | - | 否 |
| defaultActive | 默认激活的选项卡值（非受控模式） | `any` | - | 否 |
| onChange | 选项卡切换时的回调 | `(value: any) => void` | - | 否 |
| keep | 是否保持所有选项卡内容（不销毁隐藏的选项卡） | `boolean` | `false` | 否 |
| headBorder | 是否显示选项卡头部边框 | `boolean` | `false` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### 数据格式

```js
const tabs = [
  {
    text: '选项卡标题',
    value: 'tab1',
    children: <div>选项卡内容</div>
  },
  {
    text: '选项卡标题2',
    value: 'tab2',
    children: <div>选项卡内容2</div>
  }
]
```

## 示例

### 基础用法（受控模式）

```jsx
import { Tabs } from '@gm-touch/react'
import { useState } from 'react'

function App() {
  const [active, setActive] = useState(1)

  const tabs = [
    { text: '包装指导', value: 1, children: <div>tab1 内容</div> },
    { text: '关联商户', value: 2, children: <div>tab2 内容</div> }
  ]

  const handleChange = value => {
    setActive(value)
  }

  return <Tabs tabs={tabs} active={active} onChange={handleChange} />
}
```

### 非受控模式

```jsx
import { Tabs } from '@gm-touch/react'

function App() {
  const tabs = [
    { text: '首页', value: 'home', children: <div>首页内容</div> },
    { text: '关于', value: 'about', children: <div>关于内容</div> },
    { text: '联系', value: 'contact', children: <div>联系内容</div> }
  ]

  return <Tabs tabs={tabs} defaultActive='home' />
}
```

### 保持所有选项卡内容

```jsx
import { Tabs } from '@gm-touch/react'
import { useState } from 'react'

function App() {
  const [active, setActive] = useState(1)

  const tabs = [
    {
      text: '表单',
      value: 1,
      children: (
        <div>
          <input type='text' placeholder='输入内容保持状态' />
        </div>
      )
    },
    {
      text: '列表',
      value: 2,
      children: <div>列表内容</div>
    }
  ]

  return (
    <Tabs
      tabs={tabs}
      active={active}
      onChange={setActive}
      keep
    />
  )
}
```

### 带边框的选项卡

```jsx
import { Tabs } from '@gm-touch/react'
import { useState } from 'react'

function App() {
  const [active, setActive] = useState(1)

  const tabs = [
    { text: '选项一', value: 1, children: <div>内容一</div> },
    { text: '选项二', value: 2, children: <div>内容二</div> },
    { text: '选项三', value: 3, children: <div>内容三</div> }
  ]

  return (
    <Tabs
      tabs={tabs}
      active={active}
      onChange={setActive}
      headBorder
    />
  )
}
```

### 完整示例：表单标签页

```jsx
import { Tabs } from '@gm-touch/react'
import { useState } from 'react'

function FormTabs() {
  const [active, setActive] = useState(1)

  const tabs = [
    {
      text: '基本信息',
      value: 1,
      children: (
        <div style={{ padding: '16px' }}>
          <h3>基本信息</h3>
          <div>姓名：张三</div>
          <div>年龄：25</div>
        </div>
      )
    },
    {
      text: '联系方式',
      value: 2,
      children: (
        <div style={{ padding: '16px' }}>
          <h3>联系方式</h3>
          <div>电话：13800138000</div>
          <div>邮箱：example@email.com</div>
        </div>
      )
    },
    {
      text: '其他信息',
      value: 3,
      children: (
        <div style={{ padding: '16px' }}>
          <h3>其他信息</h3>
          <div>地址：深圳市南山区</div>
        </div>
      )
    }
  ]

  const handleChange = value => {
    console.log('切换到选项卡：', value)
    setActive(value)
  }

  return (
    <div>
      <Tabs
        tabs={tabs}
        active={active}
        onChange={handleChange}
        headBorder
      />
    </div>
  )
}
```

### 完整示例：动态选项卡

```jsx
import { Tabs } from '@gm-touch/react'
import { useState } from 'react'

function DynamicTabs() {
  const [active, setActive] = useState(1)
  const [tabs, setTabs] = useState([
    { text: 'Tab 1', value: 1, children: <div>Content 1</div> },
    { text: 'Tab 2', value: 2, children: <div>Content 2</div> }
  ])

  const addTab = () => {
    const newValue = tabs.length + 1
    setTabs([
      ...tabs,
      {
        text: `Tab ${newValue}`,
        value: newValue,
        children: <div>Content {newValue}</div>
      }
    ])
    setActive(newValue)
  }

  const removeTab = value => {
    const newTabs = tabs.filter(tab => tab.value !== value)
    setTabs(newTabs)
    if (active === value && newTabs.length > 0) {
      setActive(newTabs[0].value)
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <button onClick={addTab}>添加选项卡</button>
      </div>
      <Tabs tabs={tabs} active={active} onChange={setActive} />
    </div>
  )
}
```

## 注意事项

1. **受控与非受控模式**：
   - `active` 和 `onChange` 配合使用为受控模式
   - `defaultActive` 单独使用为非受控模式
   - 不能同时使用 `active` 和 `defaultActive`
   - 使用 `active` 时必须配合 `onChange`

2. **keep 属性**：
   - `keep={false}`（默认）：只渲染当前激活的选项卡内容，切换时会销毁隐藏的选项卡
   - `keep={true}`：保持所有选项卡内容，切换时只是隐藏/显示，不会销毁
   - 需要保持选项卡状态（如表单输入）时，建议使用 `keep`

3. **样式定制**：
   - 可通过 `className` 和 `style` 自定义样式
   - 激活的选项卡有 `active` 类名
   - 选项卡头部使用 Flex 布局，支持平均分配空间

4. **性能优化**：
   - 如果选项卡内容复杂，建议使用 `keep` 避免重复渲染
   - 如果选项卡内容简单，建议不使用 `keep` 减少 DOM 节点

5. **内容区域**：
   - 选项卡内容区域会自动填充剩余空间
   - 内容区域使用 Flex 布局，支持垂直排列

## 相关组件

- [Collapse](../collapse/README.md) - 折叠面板组件
- [List](../list/README.md) - 列表组件
