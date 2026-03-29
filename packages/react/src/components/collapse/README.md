# Collapse

折叠面板组件，用于内容的展开和收起，支持平滑的过渡动画。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| active | 是否展开（激活状态） | `boolean` | - | 是 |
| children | 折叠内容 | `ReactNode` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### 基础用法

```jsx
import { Collapse } from '@gm-touch/react'
import { useState } from 'react'

function App() {
  const [active, setActive] = useState(false)

  return (
    <div>
      <button onClick={() => setActive(!active)}>
        {active ? '收起' : '展开'}
      </button>
      <Collapse active={active}>
        <div>这是折叠内容</div>
      </Collapse>
    </div>
  )
}
```

### 配合 Button 使用

```jsx
import { Collapse, Button } from '@gm-touch/react'
import { useState } from 'react'

function App() {
  const [active, setActive] = useState(true)

  return (
    <div>
      <Button onClick={() => setActive(!active)}>
        切换状态
      </Button>
      <Collapse active={active}>
        <div style={{ padding: '16px', background: '#f5f5f5' }}>
          <h3>标题</h3>
          <p>这是一段可折叠的内容。</p>
          <p>点击按钮可以展开或收起这段内容。</p>
        </div>
      </Collapse>
    </div>
  )
}
```

### 带动画效果

```jsx
import { Collapse } from '@gm-touch/react'
import { useState } from 'react'

function AnimatedCollapse() {
  const [active, setActive] = useState(false)

  return (
    <div>
      <button onClick={() => setActive(!active)}>
        {active ? '收起' : '展开'}
      </button>
      <Collapse active={active}>
        <div style={{ padding: '16px' }}>
          <h3>动画效果</h3>
          <p>
            Collapse 组件提供了平滑的过渡动画，
            包括高度和透明度的渐变效果。
          </p>
          <p>过渡时间为 0.5 秒。</p>
        </div>
      </Collapse>
    </div>
  )
}
```

### 嵌套折叠

```jsx
import { Collapse } from '@gm-touch/react'
import { useState } from 'react'

function NestedCollapse() {
  const [outerActive, setOuterActive] = useState(false)
  const [innerActive, setInnerActive] = useState(false)

  return (
    <div>
      <button onClick={() => setOuterActive(!outerActive)}>
        {outerActive ? '收起外层' : '展开外层'}
      </button>
      <Collapse active={outerActive}>
        <div style={{ padding: '16px', background: '#f0f0f0', margin: '8px 0' }}>
          <h3>外层内容</h3>
          <button onClick={() => setInnerActive(!innerActive)}>
            {innerActive ? '收起内层' : '展开内层'}
          </button>
          <Collapse active={innerActive}>
            <div style={{ padding: '16px', background: '#e0e0e0' }}>
              <h4>内层内容</h4>
              <p>这是嵌套的折叠内容。</p>
            </div>
          </Collapse>
        </div>
      </Collapse>
    </div>
  )
}
```

### 手风琴效果

```jsx
import { Collapse } from '@gm-touch/react'
import { useState } from 'react'

function Accordion() {
  const items = [
    { id: 1, title: '项目一', content: '这是第一个项目的内容。' },
    { id: 2, title: '项目二', content: '这是第二个项目的内容。' },
    { id: 3, title: '项目三', content: '这是第三个项目的内容。' }
  ]

  const [activeId, setActiveId] = useState(null)

  return (
    <div>
      {items.map(item => (
        <div key={item.id} style={{ marginBottom: '8px' }}>
          <button onClick={() => setActiveId(activeId === item.id ? null : item.id)}>
            {item.title}
          </button>
          <Collapse active={activeId === item.id}>
            <div style={{ padding: '16px', background: '#f5f5f5' }}>
              {item.content}
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  )
}
```

### 完整示例：FAQ 折叠面板

```jsx
import { Collapse } from '@gm-touch/react'
import { useState } from 'react'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: '如何使用这个组件？',
      answer: 'Collapse 组件很简单，只需要控制 active 属性即可实现展开和收起。'
    },
    {
      question: '支持自定义动画吗？',
      answer: '组件内置了 0.5 秒的过渡动画，包括高度和透明度的变化。如需自定义，可以通过 style 属性覆盖。'
    },
    {
      question: '可以嵌套使用吗？',
      answer: '当然可以！您可以在 Collapse 内部再嵌套另一个 Collapse，实现多级折叠效果。'
    },
    {
      question: '如何实现手风琴效果？',
      answer: '通过状态控制，确保同一时间只有一个 Collapse 处于 active 状态即可。'
    }
  ]

  return (
    <div style={{ maxWidth: '600px' }}>
      <h2>常见问题</h2>
      {faqs.map((faq, index) => (
        <div key={index} style={{ marginBottom: '16px' }}>
          <div
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            style={{
              padding: '12px',
              background: '#f5f5f5',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            <strong>{faq.question}</strong>
          </div>
          <Collapse active={openIndex === index}>
            <div style={{ padding: '12px' }}>
              {faq.answer}
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  )
}
```

### 完整示例：表单详情展开

```jsx
import { Collapse, Button } from '@gm-touch/react'
import { useState } from 'react'

function FormDetails() {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div style={{ maxWidth: '600px' }}>
      <h2>订单信息</h2>
      <div style={{ marginBottom: '16px' }}>
        <p><strong>订单号：</strong>202301010001</p>
        <p><strong>客户：</strong>张三</p>
        <p><strong>金额：</strong>￥1,000.00</p>
      </div>

      <Button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? '隐藏详情' : '显示详情'}
      </Button>

      <Collapse active={showDetails}>
        <div style={{ marginTop: '16px', padding: '16px', background: '#f9f9f9' }}>
          <h3>详细信息</h3>
          <div>
            <p><strong>收货地址：</strong>深圳市南山区科技园</p>
            <p><strong>联系电话：</strong>13800138000</p>
            <p><strong>下单时间：</strong>2023-01-01 10:00:00</p>
            <p><strong>支付方式：</strong>在线支付</p>
            <p><strong>订单状态：</strong>已完成</p>
          </div>

          <h4 style={{ marginTop: '16px' }}>商品列表</h4>
          <ul>
            <li>商品A × 2</li>
            <li>商品B × 1</li>
            <li>商品C × 3</li>
          </ul>
        </div>
      </Collapse>
    </div>
  )
}
```

### 自定义样式

```jsx
import { Collapse } from '@gm-touch/react'
import { useState } from 'react'

function CustomStyledCollapse() {
  const [active, setActive] = useState(false)

  return (
    <div>
      <button onClick={() => setActive(!active)}>
        切换
      </button>
      <Collapse
        active={active}
        style={{
          transition: '0.3s ease all',
          backgroundColor: active ? '#e3f2fd' : 'transparent',
          borderRadius: '8px'
        }}
        className='custom-collapse'
      >
        <div style={{ padding: '20px' }}>
          <h3>自定义样式</h3>
          <p>这个 Collapse 组件使用了自定义的样式。</p>
          <p>你可以通过 style 和 className 属性来自定义外观。</p>
        </div>
      </Collapse>
    </div>
  )
}
```

## 注意事项

1. **active 属性**：
   - `active` 是必填属性，控制展开和收起状态
   - 为 `true` 时展开，为 `false` 时收起
   - 需要外部状态管理（如 useState、MobX）

2. **动画效果**：
   - 组件内置了平滑的过渡动画
   - 过渡时间为 0.5 秒
   - 包括高度、透明度和 overflow 属性的变化
   - 收起时 `overflow: hidden` 防止内容溢出

3. **性能优化**：
   - 组件本身非常轻量，性能开销小
   - 动画使用 CSS transition，性能良好
   - 对于大量内容，建议使用虚拟滚动等技术配合

4. **样式覆盖**：
   - 可通过 `className` 添加自定义类名
   - 可通过 `style` 对象直接设置样式
   - style 会与默认样式合并，相同属性会覆盖默认值

5. **嵌套使用**：
   - 支持多层嵌套
   - 每个 Collapse 独立控制状态
   - 注意嵌套时的样式间距

6. **内容限制**：
   - 没有内容高度限制
   - 支持任意 React 节点作为子元素
   - 收起时高度变为 0

7. **使用场景**：
   - 常用于手风琴菜单
   - FAQ 问答列表
   - 详情展开/收起
   - 逐步展示信息

## 相关组件

- [Tabs](../tabs/README.md) - 选项卡组件
- [List](../list/README.md) - 列表组件
