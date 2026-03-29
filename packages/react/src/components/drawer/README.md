# Drawer

抽屉组件，从屏幕边缘滑出的浮层面板，常用于侧边栏、菜单、详情展示等场景。

## 使用方式

Drawer 组件提供了两种使用方式：

1. **命令式调用**：使用静态方法 `Drawer.render()` 和 `Drawer.hide()`（推荐）
2. **声明式使用**：直接作为组件使用（需要配合 LayoutRoot）

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 抽屉内容 | `any` | - | 是 |
| onHide | 关闭抽屉的回调函数 | `function` | `() => {}` | 否 |
| style | 自定义内容区域样式 | `object` | - | 否 |
| className | 自定义抽屉容器的类名 | `string` | - | 否 |
| animation | 是否显示动画效果 | `boolean` | `true` | 否 |
| opacityMask | 是否使用透明遮罩（无背景遮罩） | `boolean` | `false` | 否 |

### 静态方法

#### Drawer.render(props)

渲染抽屉组件。

**参数**：
- `props`：组件属性对象

**示例**：
```js
import { Drawer } from '@gm-touch/react'

Drawer.render({
  onHide: Drawer.hide,
  children: <div>抽屉内容</div>
})
```

#### Drawer.hide()

隐藏抽屉组件。

**示例**：
```js
Drawer.hide()
```

## 示例

### 基础用法（命令式调用）

```jsx
import { Drawer } from '@gm-touch/react'

function App() {
  const showDrawer = () => {
    Drawer.render({
      onHide: Drawer.hide,
      style: {
        width: '300px'
      },
      children: (
        <div style={{ padding: '20px' }}>
          <h3>抽屉标题</h3>
          <p>这是抽屉的内容</p>
        </div>
      )
    })
  }

  return (
    <button onClick={showDrawer}>显示抽屉</button>
  )
}
```

### 自定义宽度和内容

```jsx
import { Drawer } from '@gm-touch/react'

function App() {
  const showDrawer = () => {
    Drawer.render({
      onHide: Drawer.hide,
      style: {
        width: '400px',
        background: '#f5f5f5'
      },
      children: (
        <div>
          <div style={{ padding: '20px', borderBottom: '1px solid #ddd' }}>
            <h2>设置</h2>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '15px' }}>
              <label>用户名</label>
              <input type="text" style={{ width: '100%', marginTop: '5px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>邮箱</label>
              <input type="email" style={{ width: '100%', marginTop: '5px' }} />
            </div>
            <button onClick={Drawer.hide}>保存</button>
            <button onClick={Drawer.hide}>取消</button>
          </div>
        </div>
      )
    })
  }

  return <button onClick={showDrawer}>打开设置</button>
}
```

### 带操作按钮的抽屉

```jsx
import { Drawer } from '@gm-touch/react'

function App() {
  const showDrawer = () => {
    Drawer.render({
      onHide: Drawer.hide,
      style: { width: '350px' },
      children: (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* 标题栏 */}
          <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
            <h3 style={{ margin: 0 }}>编辑信息</h3>
          </div>

          {/* 内容区 */}
          <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
            <p>这里是表单内容...</p>
            <p>可以放置各种表单控件</p>
          </div>

          {/* 底部操作栏 */}
          <div style={{ padding: '20px', borderTop: '1px solid #eee' }}>
            <button onClick={Drawer.hide}>取消</button>
            <button onClick={() => {
              console.log('保存操作')
              Drawer.hide()
            }}>保存</button>
          </div>
        </div>
      )
    })
  }

  return <button onClick={showDrawer}>编辑信息</button>
}
```

### 禁用动画

```jsx
import { Drawer } from '@gm-touch/react'

function App() {
  const showDrawer = () => {
    Drawer.render({
      onHide: Drawer.hide,
      animation: false,
      style: { width: '300px' },
      children: <div>无动画抽屉</div>
    })
  }

  return <button onClick={showDrawer}>显示抽屉（无动画）</button>
}
```

### 透明遮罩模式

```jsx
import { Drawer } from '@gm-touch/react'

function App() {
  const showDrawer = () => {
    Drawer.render({
      onHide: Drawer.hide,
      opacityMask: true,
      style: { width: '280px' },
      children: (
        <div style={{ padding: '20px' }}>
          <h3>透明遮罩</h3>
          <p>这种模式下，遮罩是透明的，可以点击外部区域关闭</p>
          <button onClick={Drawer.hide}>关闭</button>
        </div>
      )
    })
  }

  return <button onClick={showDrawer}>显示抽屉（透明遮罩）</button>
}
```

### 菜单抽屉

```jsx
import { Drawer } from '@gm-touch/react'

function App() {
  const showMenu = () => {
    Drawer.render({
      onHide: Drawer.hide,
      style: { width: '250px' },
      children: (
        <div>
          <div style={{ padding: '20px', background: '#333', color: '#fff' }}>
            <h3 style={{ margin: 0 }}>菜单</h3>
          </div>
          <div style={{ padding: '10px 0' }}>
            <MenuItem icon="🏠" text="首页" onClick={Drawer.hide} />
            <MenuItem icon="📁" text="分类" onClick={Drawer.hide} />
            <MenuItem icon="⭐" text="收藏" onClick={Drawer.hide} />
            <MenuItem icon="⚙️" text="设置" onClick={Drawer.hide} />
          </div>
        </div>
      )
    })
  }

  return <button onClick={showMenu}>菜单</button>
}

function MenuItem({ icon, text, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '15px 20px',
        cursor: 'pointer',
        borderBottom: '1px solid #f0f0f0'
      }}
    >
      <span style={{ marginRight: '10px' }}>{icon}</span>
      {text}
    </div>
  )
}
```

### 详情展示抽屉

```jsx
import { Drawer } from '@gm-touch/react'

function App() {
  const showDetails = () => {
    const data = {
      title: '产品详情',
      price: '￥299',
      description: '这是一个优质的产品，具有很多优点。',
      features: ['功能一', '功能二', '功能三']
    }

    Drawer.render({
      onHide: Drawer.hide,
      style: { width: '400px' },
      children: (
        <div style={{ padding: '20px' }}>
          <h2 style={{ marginTop: 0 }}>{data.title}</h2>
          <p style={{ fontSize: '24px', color: '#f60', fontWeight: 'bold' }}>
            {data.price}
          </p>
          <p>{data.description}</p>
          <h4>产品特点</h4>
          <ul>
            {data.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <button onClick={Drawer.hide}>关闭</button>
        </div>
      )
    })
  }

  return <button onClick={showDetails}>查看详情</button>
}
```

### 声明式使用（需要配合 LayoutRoot）

```jsx
import { Drawer, LayoutRoot } from '@gm-touch/react'
import { useState } from 'react'

function App() {
  const [visible, setVisible] = useState(false)

  return (
    <LayoutRoot>
      <button onClick={() => setVisible(true)}>显示抽屉</button>

      {visible && (
        <Drawer
          onHide={() => setVisible(false)}
          style={{ width: '300px' }}
        >
          <div style={{ padding: '20px' }}>
            <h3>声明式抽屉</h3>
            <p>这是声明式使用的抽屉组件</p>
            <button onClick={() => setVisible(false)}>关闭</button>
          </div>
        </Drawer>
      )}
    </LayoutRoot>
  )
}
```

### 完整示例：侧边栏应用

```jsx
import { Drawer, LayoutRoot } from '@gm-touch/react'

function App() {
  const showSidebar = () => {
    Drawer.render({
      onHide: Drawer.hide,
      style: { width: '280px' },
      children: (
        <SidebarContent onClose={Drawer.hide} />
      )
    })
  }

  return (
    <LayoutRoot>
      <div style={{ display: 'flex' }}>
        {/* 顶部导航 */}
        <div style={{ flex: 1, padding: '20px' }}>
          <button onClick={showSidebar}>☰ 菜单</button>
          <h1>我的应用</h1>
          <p>主要内容区域</p>
        </div>
      </div>
    </LayoutRoot>
  )
}

function SidebarContent({ onClose }) {
  const menuItems = [
    { id: 1, icon: '🏠', label: '首页' },
    { id: 2, icon: '📊', label: '数据统计' },
    { id: 3, icon: '👥', label: '用户管理' },
    { id: 4, icon: '⚙️', label: '系统设置' },
    { id: 5, icon: '📝', label: '日志记录' }
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 头部 */}
      <div style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff'
      }}>
        <h3 style={{ margin: 0 }}>应用菜单</h3>
        <p style={{ margin: '5px 0 0 0', opacity: 0.8 }}>欢迎回来</p>
      </div>

      {/* 菜单列表 */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {menuItems.map(item => (
          <div
            key={item.id}
            onClick={() => {
              console.log(`点击了：${item.label}`)
              onClose()
            }}
            style={{
              padding: '15px 20px',
              cursor: 'pointer',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span style={{ marginRight: '10px', fontSize: '18px' }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* 底部 */}
      <div style={{ padding: '20px', borderTop: '1px solid #eee' }}>
        <button
          onClick={onClose}
          style={{ width: '100%', padding: '10px' }}
        >
          关闭菜单
        </button>
      </div>
    </div>
  )
}
```

## 交互特性

### 关闭方式

抽屉支持以下关闭方式：

1. **点击遮罩层**：点击抽屉外部的遮罩区域
2. **按 ESC 键**：按下键盘的 ESC 键
3. **调用 onHide**：通过代码调用 `onHide` 回调或 `Drawer.hide()`

### 滚动事件

抽屉在滚动时会触发 `DRAWER_SCROLL` 事件，可以用于监听滚动状态：

```js
window.addEventListener('DRAWER_SCROLL', () => {
  console.log('抽屉正在滚动')
})
```

### 显示/隐藏事件

抽屉的显示和隐藏会触发 `MODAL_SHOW` 和 `MODAL_HIDE` 事件：

```js
window.addEventListener('MODAL_SHOW', () => {
  console.log('抽屉显示')
})

window.addEventListener('MODAL_HIDE', () => {
  console.log('抽屉隐藏')
})
```

## 样式定制

### 默认样式

- 抽屉从右侧滑入
- 带有半透明黑色遮罩
- 使用淡入从右动画效果
- 内容区域默认宽度为适应内容

### 自定义样式

可以通过 `style` 属性自定义内容区域的样式：

```jsx
Drawer.render({
  onHide: Drawer.hide,
  style: {
    width: '500px',
    maxWidth: '90%',
    height: '100%',
    background: '#fff',
    borderRadius: '0'
  },
  children: <div>内容</div>
})
```

可以通过 `className` 自定义抽屉容器的类名：

```jsx
Drawer.render({
  onHide: Drawer.hide,
  className: 'my-custom-drawer',
  children: <div>内容</div>
})
```

## 注意事项

1. **LayoutRoot 依赖**：
   - 使用命令式调用时，确保应用中有 `LayoutRoot` 组件
   - `LayoutRoot` 应该放在应用组件树的最外层

2. **性能优化**：
   - 抽屉内容复杂时，建议使用懒加载
   - 避免在抽屉中放置大量数据或复杂组件
   - 抽屉关闭后，组件会被卸载

3. **样式建议**：
   - 建议给抽屉设置明确的宽度
   - 如果内容可能超出，建议设置合适的 `overflow` 属性
   - 使用 flex 布局可以更好地控制内容排版

4. **事件处理**：
   - `onHide` 回调会在抽屉关闭时被调用
   - 确保 `onHide` 中调用了 `Drawer.hide()` 来卸载组件
   - 避免在 `onHide` 中执行耗时操作

5. **z-index 层级**：
   - 抽屉的 z-index 由 LayoutRoot 管理
   - 不需要手动设置 z-index

6. **移动端适配**：
   - 抽屉会自动适配移动端屏幕
   - 建议使用百分比或 `vw` 单位设置宽度
   - 可以使用 `maxWidth` 限制最大宽度

7. **动画效果**：
   - 默认启用动画效果
   - 如果不需要动画，设置 `animation={false}`
   - 动画使用 CSS 实现，性能良好

## 相关组件

- [LayoutRoot](../layout_root/README.md) - 布局根组件
- [Modal](../modal/README.md) - 模态框组件
- [Popover](../popover/README.md) - 弹出框组件
