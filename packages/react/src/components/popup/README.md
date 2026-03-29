# Popup

弹出层组件，用于在指定位置显示浮层内容，支持智能定位、动画效果和箭头指示。

## 组件说明

Popup 是一个基础定位组件，通常不直接使用，而是作为其他浮层组件（如 Popover、Dropdown 等）的基础。它提供了智能的视窗定位功能，会自动根据可用空间调整弹出位置。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 弹出层内容 | `any` | - | 是 |
| rect | 触发元素的位置信息 | `object` | - | 是 |
| center | 是否居中对齐 | `boolean` | `false` | 否 |
| top | 是否在上方显示 | `boolean` | `false` | 否 |
| right | 是否右对齐 | `boolean` | `false` | 否 |
| offset | 位置偏移量（px） | `number` | `0` | 否 |
| showArrow | 是否显示箭头 | `boolean` | `false` | 否 |
| arrowLeft | 箭头的 left 位置 | `string` | - | 否 |
| animName | 动画名称 | `boolean` \| `string` | - | 否 |
| predictingHeight | 预判高度（用于智能定位） | `number` | - | 否 |
| pureContainer | 是否使用纯容器样式（无背景、无阴影） | `boolean` | `false` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### 动画类型

animName 支持以下值：
- `false` - 无动画
- `true` - 根据位置自动选择动画（zoom-in-top 或 zoom-in-bottom）
- `'fade-in-right'` - 从右侧淡入
- `'fade-in-left'` - 从左侧淡入
- `'fade-in-top'` - 从顶部淡入
- `'fade-in-bottom'` - 从底部淡入
- `'zoom-in'` - 缩放淡入
- `'zoom-in-top'` - 从顶部缩放淡入
- `'zoom-in-bottom'` - 从底部缩放淡入

## 智能定位

Popup 会根据视窗可用空间自动调整显示位置：

1. **顶部优先**：当 `top=true` 时，优先在上方显示
2. **自动调整**：
   - 如果设置为上方但空间不足，会自动切换到下方
   - 如果设置为下方但空间不足，且上方空间充足，会自动切换到上方
3. **预判高度**：通过 `predictingHeight` 属性可以预先告诉组件内容高度，提高定位准确性

## 示例

### 基础用法

```jsx
import { Popup } from '@gm-touch/react'
import { useState, useRef } from 'react'

function App() {
  const [show, setShow] = useState(false)
  const buttonRef = useRef(null)

  const handleClick = () => {
    setShow(!show)
  }

  const getButtonRect = () => {
    return buttonRef.current.getBoundingClientRect()
  }

  return (
    <div>
      <button ref={buttonRef} onClick={handleClick}>
        点击显示
      </button>

      {show && (
        <Popup
          rect={getButtonRect()}
          onHide={() => setShow(false)}
        >
          <div style={{ padding: '10px' }}>
            这是弹出层内容
          </div>
        </Popup>
      )}
    </div>
  )
}
```

### 居中对齐

```jsx
import { Popup } from '@gm-touch/react'

<Popup
  rect={getTriggerRect()}
  center
  offset={10}
>
  <div style={{ padding: '15px' }}>
    居中对齐的弹出层
  </div>
</Popup>
```

### 右对齐

```jsx
import { Popup } from '@gm-touch/react'

<Popup
  rect={getTriggerRect()}
  right
  offset={5}
>
  <div style={{ padding: '15px' }}>
    右对齐的弹出层
  </div>
</Popup>
```

### 带箭头的弹出层

```jsx
import { Popup } from '@gm-touch/react'

<Popup
  rect={getTriggerRect()}
  showArrow
  animName={true}
>
  <div style={{ padding: '15px' }}>
    带箭头的弹出层
  </div>
</Popup>
```

### 自定义箭头位置

```jsx
import { Popup } from '@gm-touch/react'

<Popup
  rect={getTriggerRect()}
  showArrow
  arrowLeft="20px"
>
  <div style={{ padding: '15px' }}>
    箭头位置自定义
  </div>
</Popup>
```

### 顶部显示

```jsx
import { Popup } from '@gm-touch/react'

<Popup
  rect={getTriggerRect()}
  top
  showArrow
>
  <div style={{ padding: '15px' }}>
    在顶部显示的弹出层
  </div>
</Popup>
```

### 带动画效果

```jsx
import { Popup } from '@gm-touch/react'

// 自动选择动画
<Popup
  rect={getTriggerRect()}
  animName={true}
>
  <div>内容</div>
</Popup>

// 指定动画类型
<Popup
  rect={getTriggerRect()}
  animName="fade-in-right"
>
  <div>从右侧淡入</div>
</Popup>
```

### 使用预判高度

```jsx
import { Popup } from '@gm-touch/react'

<Popup
  rect={getTriggerRect()}
  predictingHeight={200}
>
  <div style={{ height: '200px' }}>
    预判高度的弹出层，定位更准确
  </div>
</Popup>
```

### 纯容器模式

```jsx
import { Popup } from '@gm-touch/react'

<Popup
  rect={getTriggerRect()}
  pureContainer
>
  <div style={{ background: '#fff', padding: '15px' }}>
    纯容器模式，无默认背景和阴影
  </div>
</Popup>
```

## PopupContentConfirm

PopupContentConfirm 是一个带确认按钮的弹出层内容组件，常用于编辑、删除等操作。

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 标题 | `string` | - | 否 |
| type | 操作类型 | `'save'` \| `'delete'` | `'save'` | 否 |
| children | 内容区域 | `any` | - | 是 |
| onCancel | 取消回调 | `function` | - | 是 |
| onSave | 保存回调（type 为 save 时） | `function` | - | 否 |
| onDelete | 删除回调（type 为 delete 时） | `function` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### 示例

#### 保存类型

```jsx
import { Popup, PopupContentConfirm } from '@gm-touch/react'
import { useState, useRef } from 'react'

function App() {
  const [show, setShow] = useState(false)
  const triggerRef = useRef(null)

  const handleShow = () => setShow(true)
  const handleHide = () => setShow(false)

  const handleSave = () => {
    console.log('保存操作')
    handleHide()
  }

  return (
    <div>
      <button ref={triggerRef} onClick={handleShow}>
        编辑
      </button>

      {show && (
        <Popup
          rect={triggerRef.current.getBoundingClientRect()}
          onHide={handleHide}
        >
          <PopupContentConfirm
            title="编辑信息"
            type="save"
            onCancel={handleHide}
            onSave={handleSave}
          >
            <div style={{ padding: '15px' }}>
              <input type="text" placeholder="请输入内容" />
            </div>
          </PopupContentConfirm>
        </Popup>
      )}
    </div>
  )
}
```

#### 删除类型

```jsx
import { Popup, PopupContentConfirm } from '@gm-touch/react'

function App() {
  const [show, setShow] = useState(false)
  const triggerRef = useRef(null)

  const handleDelete = () => {
    console.log('删除操作')
    setShow(false)
  }

  return (
    <div>
      <button ref={triggerRef} onClick={() => setShow(true)}>
        删除
      </button>

      {show && (
        <Popup
          rect={triggerRef.current.getBoundingClientRect()}
          onHide={() => setShow(false)}
        >
          <PopupContentConfirm
            title="确认删除"
            type="delete"
            onCancel={() => setShow(false)}
            onDelete={handleDelete}
          >
            <div style={{ padding: '15px' }}>
              确定要删除这条数据吗？此操作不可恢复。
            </div>
          </PopupContentConfirm>
        </Popup>
      )}
    </div>
  )
}
```

#### 自定义内容

```jsx
import { Popup, PopupContentConfirm } from '@gm-touch/react'

function App() {
  const [show, setShow] = useState(false)
  const triggerRef = useRef(null)

  return (
    <div>
      <button ref={triggerRef} onClick={() => setShow(true)}>
        设置
      </button>

      {show && (
        <Popup
          rect={triggerRef.current.getBoundingClientRect()}
          onHide={() => setShow(false)}
        >
          <PopupContentConfirm
            title="系统设置"
            onCancel={() => setShow(false)}
            onSave={() => {
              console.log('保存设置')
              setShow(false)
            }}
          >
            <div style={{ padding: '15px' }}>
              <div style={{ marginBottom: '10px' }}>
                <label>选项一</label>
                <input type="checkbox" />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>选项二</label>
                <input type="checkbox" />
              </div>
            </div>
          </PopupContentConfirm>
        </Popup>
      )}
    </div>
  )
}
```

## 完整示例

### 智能定位弹出层

```jsx
import { Popup } from '@gm-touch/react'
import { useState, useRef } from 'react'

function App() {
  const [show, setShow] = useState(false)
  const triggerRef = useRef(null)

  return (
    <div style={{ marginTop: '200px' }}>
      <button
        ref={triggerRef}
        onClick={() => setShow(!show)}
      >
        智能定位弹出层
      </button>

      {show && (
        <Popup
          rect={triggerRef.current.getBoundingClientRect()}
          showArrow
          animName={true}
          predictingHeight={150}
        >
          <div style={{ padding: '20px', minWidth: '200px' }}>
            <h4>智能定位</h4>
            <p>此弹出层会根据视窗空间自动调整位置</p>
            <button onClick={() => setShow(false)}>关闭</button>
          </div>
        </Popup>
      )}
    </div>
  )
}
```

### 表格操作菜单

```jsx
import { Popup } from '@gm-touch/react'

function TableRow({ data }) {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  const handleEdit = () => {
    console.log('编辑', data.id)
    setShowMenu(false)
  }

  const handleDelete = () => {
    console.log('删除', data.id)
    setShowMenu(false)
  }

  return (
    <tr>
      <td>{data.name}</td>
      <td>
        <button
          ref={menuRef}
          onClick={() => setShowMenu(!showMenu)}
        >
          操作
        </button>

        {showMenu && (
          <Popup
            rect={menuRef.current.getBoundingClientRect()}
            right
            showArrow
          >
            <div style={{ minWidth: '120px' }}>
              <div
                onClick={handleEdit}
                style={{
                  padding: '10px 15px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee'
                }}
              >
                编辑
              </div>
              <div
                onClick={handleDelete}
                style={{
                  padding: '10px 15px',
                  cursor: 'pointer',
                  color: 'red'
                }}
              >
                删除
              </div>
            </div>
          </Popup>
        )}
      </td>
    </tr>
  )
}
```

## 注意事项

1. **rect 属性**：
   - `rect` 是必需属性，使用 `getBoundingClientRect()` 获取
   - 需要在弹出层渲染时重新获取，确保位置准确
   - 窗口滚动或调整大小时需要更新

2. **智能定位**：
   - 组件会自动计算可用空间并调整位置
   - 使用 `predictingHeight` 可以提高定位准确性
   - 建议为可能高度变化的内容设置预判高度

3. **动画效果**：
   - 设置 `animName={true}` 会根据位置自动选择合适的动画
   - 动画只在初始化完成后才应用，避免定位偏差

4. **箭头显示**：
   - `showArrow=true` 会显示箭头指示器
   - 可以通过 `arrowLeft` 自定义箭头位置
   - 箭头方向会根据 `top` 属性自动调整

5. **性能优化**：
   - 避免频繁创建和销毁弹出层
   - 复杂内容建议使用条件渲染而非 v-show
   - 弹出层关闭后会完全卸载

6. **样式定制**：
   - 使用 `pureContainer` 移除默认样式
   - 通过 `className` 和 `style` 自定义外观
   - 注意 z-index 层级管理

7. **事件处理**：
   - 需要手动管理显示/隐藏状态
   - 建议在 `onHide` 回调中更新状态
   - 点击外部区域不会自动关闭，需要自行实现

## 相关组件

- [Popover](../popover/README.md) - 气泡卡片组件
- [Modal](../modal/README.md) - 模态框组件
- [Drawer](../drawer/README.md) - 抽屉组件
