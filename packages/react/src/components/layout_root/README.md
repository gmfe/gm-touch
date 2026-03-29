# LayoutRoot

布局根组件，用于管理全局层级的浮层组件（如 Drawer、Modal、Keyboard、Tips 等）。它是整个应用布局的根容器，确保各个浮层组件能正确显示和管理。

## 使用场景

- 需要使用 Drawer（抽屉）、Modal（模态框）、Keyboard（键盘）等浮层组件
- 需要全局管理多个浮层组件的显示层级
- 需要管理全局的 Tips（提示）和 Loading 状态

## API

### 静态属性

LayoutRoot 提供了以下静态属性和方法：

#### TYPE

组件类型常量。

```js
LayoutRoot.TYPE = {
  DRAWER: 'drawer',           // 抽屉
  _POPUP: '_popup',           // 弹出层
  MODAL: 'modal',             // 模态框
  KEYBOARD: 'keyboard',       // 键盘
  TIPS: 'tips',               // 提示
  FULL_LOADING: 'full_loading', // 全屏加载
  N_PROGRESS: 'n_progress'    // 顶部进度条
}
```

#### setComponent(type, component)

设置指定类型的组件。

**参数**：
- `type`：组件类型（使用 `LayerRoot.TYPE` 中的常量）
- `component`：要渲染的 React 元素

**示例**：
```js
import LayoutRoot from '@gm-touch/react'

LayoutRoot.setComponent(
  LayoutRoot.TYPE.MODAL,
  <Modal>内容</Modal>
)
```

#### removeComponent(type)

移除指定类型的组件。

**参数**：
- `type`：组件类型

**示例**：
```js
LayoutRoot.removeComponent(LayoutRoot.TYPE.MODAL)
```

#### _setComponentPopup(id, component)

设置弹出层组件（用于管理多个弹出层）。

**参数**：
- `id`：弹出层唯一标识
- `component`：React 元素

**示例**：
```js
LayoutRoot._setComponentPopup('popup-1', <Popover>内容</Popover>)
```

#### _removeComponentPopup(id)

移除指定 ID 的弹出层组件。

**参数**：
- `id`：弹出层唯一标识

**示例**：
```js
LayoutRoot._removeComponentPopup('popup-1')
```

#### _setComponentTip(id, component)

设置提示组件（用于管理多个提示）。

**参数**：
- `id`：提示唯一标识
- `component`：React 元素

**示例**：
```js
LayoutRoot._setComponentTip('tip-1', <Tip>提示内容</Tip>)
```

#### _removeComponentTip(id)

移除指定 ID 的提示组件。

**参数**：
- `id`：提示唯一标识

**示例**：
```js
LayoutRoot._removeComponentTip('tip-1')
```

#### _removeComponentTipAll()

移除所有提示组件。

**示例**：
```js
LayoutRoot._removeComponentTipAll()
```

## 使用方式

### 基础用法

在应用的最外层添加 `LayoutRoot` 组件：

```jsx
import LayoutRoot from '@gm-touch/react'

function App() {
  return (
    <LayoutRoot>
      {/* 你的应用内容 */}
      <div>应用内容</div>
    </LayoutRoot>
  )
}

export default App
```

### 与其他浮层组件配合使用

```jsx
import LayoutRoot, { Drawer, Modal, Keyboard } from '@gm-touch/react'

function App() {
  const showDrawer = () => {
    Drawer.render({
      onHide: Drawer.hide,
      children: <div>抽屉内容</div>
    })
  }

  const showModal = () => {
    Modal.render({
      onHide: Modal.hide,
      children: <div>模态框内容</div>
    })
  }

  return (
    <LayoutRoot>
      <div>
        <button onClick={showDrawer}>显示抽屉</button>
        <button onClick={showModal}>显示模态框</button>
      </div>
    </LayoutRoot>
  )
}
```

### 手动管理浮层组件

```jsx
import LayoutRoot, { Modal } from '@gm-touch/react'

function CustomModalManager() {
  const showModal = () => {
    const modal = (
      <Modal onHide={handleHide}>
        <div>自定义模态框</div>
      </Modal>
    )

    LayoutRoot.setComponent(LayoutRoot.TYPE.MODAL, modal)
  }

  const handleHide = () => {
    LayoutRoot.removeComponent(LayoutRoot.TYPE.MODAL)
  }

  return (
    <LayoutRoot>
      <button onClick={showModal}>显示模态框</button>
    </LayoutRoot>
  )
}
```

### 管理多个弹出层

```jsx
import LayoutRoot from '@gm-touch/react'

function PopupManager() {
  let popupId = 0

  const showPopup = () => {
    const id = `popup-${popupId++}`
    const popup = (
      <div style={{ position: 'fixed', top: '100px', left: '100px', background: '#fff', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <div>弹出层内容 {id}</div>
        <button onClick={() => LayoutRoot._removeComponentPopup(id)}>
          关闭
        </button>
      </div>
    )

    LayoutRoot._setComponentPopup(id, popup)
  }

  return (
    <LayoutRoot>
      <button onClick={showPopup}>添加弹出层</button>
    </LayoutRoot>
  )
}
```

### 管理多个提示

```jsx
import LayoutRoot from '@gm-touch/react'

function TipManager() {
  let tipId = 0

  const showTip = () => {
    const id = `tip-${tipId++}`
    const tip = (
      <div style={{
        position: 'fixed',
        top: `${20 + tipId * 20}px`,
        right: '20px',
        background: 'rgba(0,0,0,0.8)',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '4px'
      }}>
        提示消息 {id}
      </div>
    )

    LayoutRoot._setComponentTip(id, tip)

    // 3秒后自动关闭
    setTimeout(() => {
      LayoutRoot._removeComponentTip(id)
    }, 3000)
  }

  const clearAllTips = () => {
    LayoutRoot._removeComponentTipAll()
  }

  return (
    <LayoutRoot>
      <button onClick={showTip}>显示提示</button>
      <button onClick={clearAllTips}>清空所有提示</button>
    </LayoutRoot>
  )
}
```

## 层级顺序

LayoutRoot 按照以下顺序（从上到下）渲染各个层：

1. **弹出层（_popup）** - 最顶层，支持多个
2. **抽屉（drawer）** - 单例
3. **模态框（modal）** - 单例
4. **键盘（keyboard）** - 单例
5. **提示（tips）** - 支持多个
6. **全屏加载（full_loading）** - 单例
7. **进度条（n_progress）** - 最底层

## 注意事项

1. **必须放在应用根部**：
   - LayoutRoot 应该放在应用组件树的最外层
   - 只需要一个 LayoutRoot 实例
   - 不要嵌套多个 LayoutRoot

2. **组件初始化**：
   - 在调用浮层组件之前，必须确保 LayoutRoot 已经挂载
   - 如果在 LayoutRoot 挂载前调用相关方法，会在控制台输出警告

3. **单例组件**：
   - Drawer、Modal、Keyboard、FullLoading、NProgress 是单例组件
   - 调用 `setComponent` 会自动替换之前的实例
   - 调用 `removeComponent` 会移除当前实例

4. **多实例组件**：
   - Popup（弹出层）和 Tips（提示）支持多个实例
   - 需要通过 `id` 参数管理各个实例
   - 使用 `_removeComponentPopup` 和 `_removeComponentTip` 移除指定实例

5. **内存管理**：
   - 不再需要的浮层组件应该及时移除
   - 特别是 Popup 和 Tips，避免内存泄漏
   - 可以在组件卸载时清理相关的浮层

6. **性能优化**：
   - LayoutRoot 使用了状态管理，频繁更新可能影响性能
   - 避免在同一帧内多次调用 `setComponent`
   - 建议使用组件提供的静态方法（如 `Drawer.render`）而不是直接操作 LayoutRoot

7. **事件处理**：
   - 浮层组件会触发全局事件（如 `MODAL_SHOW`、`MODAL_HIDE`）
   - 可以监听这些事件来执行额外操作

## 完整示例

```jsx
import LayoutRoot, { Drawer, Modal, Keyboard } from '@gm-touch/react'

function App() {
  return (
    <LayoutRoot>
      <Header />
      <MainContent />
      <Footer />
    </LayoutRoot>
  )
}

function Header() {
  const showMenu = () => {
    Drawer.render({
      onHide: Drawer.hide,
      style: { width: '250px' },
      children: (
        <div>
          <h3>菜单</h3>
          <div>首页</div>
          <div>关于</div>
          <div>设置</div>
        </div>
      )
    })
  }

  return (
    <header>
      <button onClick={showMenu}>菜单</button>
    </header>
  )
}

function MainContent() {
  const showConfirm = () => {
    Modal.render({
      onHide: Modal.hide,
      children: (
        <div>
          <h3>确认操作</h3>
          <p>确定要执行此操作吗？</p>
          <button onClick={Modal.hide}>取消</button>
          <button onClick={() => {
            console.log('确认操作')
            Modal.hide()
          }}>确定</button>
        </div>
      )
    })
  }

  const showKeyboard = () => {
    Keyboard.render({
      onHide: Keyboard.hide,
      type: 'number',
      onInput: (value) => console.log('输入：', value)
    })
  }

  return (
    <main>
      <button onClick={showConfirm}>显示确认框</button>
      <button onClick={showKeyboard}>显示键盘</button>
    </main>
  )
}
```

## 相关组件

- [Drawer](../drawer/README.md) - 抽屉组件
- [Modal](../modal/README.md) - 模态框组件
- [Keyboard](../keyboard/README.md) - 键盘组件
- [Tip](../tip/README.md) - 提示组件
- [NProgress](../nprogress/README.md) - 进度条组件
