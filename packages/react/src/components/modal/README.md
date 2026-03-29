# Modal

模态框组件，用于在当前页面弹出一个对话框，支持多种尺寸和样式变体。

## 基础用法

使用 `Modal.render()` 静态方法显示模态框，`Modal.hide()` 隐藏模态框。

```jsx
import Modal from '@gm-touch/modal'

// 基础用法
Modal.render({
  title: '我是标题',
  children: '我是内容',
  onHide: Modal.hide
})
```

## 三种变体

### 1. Modal - 标准模态框

带遮罩的标准模态框，默认居中显示。

```jsx
import Modal from '@gm-touch/modal'

Modal.render({
  title: '标准模态框',
  children: '内容',
  onHide: Modal.hide
})
```

### 2. CleanModal - 简洁模态框

无边框、无阴影的简洁样式，适合特殊场景。

```jsx
import CleanModal from '@gm-touch/modal/clean_modal'

CleanModal.render({
  children: <div className='t-text-white'>简洁内容</div>,
  onHide: Modal.hide
})
```

### 3. RightSideModal - 右侧边栏模态框

从右侧滑出的边栏式模态框，适合菜单、表单等场景。

```jsx
import RightSideModal from '@gm-touch/modal/right_side_modal'

RightSideModal.render({
  title: '侧边栏',
  children: <div>边栏内容</div>,
  onHide: Modal.hide
})
```

## Props

### Modal

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| onHide | func | - | 是 | 关闭模态框的回调函数 |
| title | string | - | 否 | 模态框标题 |
| size | string | 'md' | 否 | 模态框尺寸：'lg' \| 'md' \| 'sm' |
| disableMaskClose | bool | false | 否 | 禁止点击遮罩关闭 |
| opacityMask | bool | false | 否 | 使用透明遮罩 |
| noContentPadding | bool | false | 否 | 内容区域无内边距 |
| haveOverFlow | bool | false | 否 | 内容区域可滚动 |
| className | string | - | 否 | 自定义类名 |
| style | object | - | 否 | 自定义样式 |

### CleanModal

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| onHide | func | - | 是 | 关闭模态框的回调函数 |
| title | string | - | 否 | 模态框标题 |
| size | string | - | 否 | 模态框尺寸：'lg' \| 'md' \| 'sm' |
| disableMaskClose | bool | false | 否 | 禁止点击遮罩关闭 |
| noContentPadding | bool | false | 否 | 内容区域无内边距 |

### RightSideModal

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| onHide | func | - | 是 | 关闭模态框的回调函数 |
| title | string | - | 否 | 模态框标题 |
| size | string | - | 否 | 模态框尺寸：'lg' \| 'md' \| 'sm' |
| disableMaskClose | bool | false | 否 | 禁止点击遮罩关闭 |
| noContentPadding | bool | false | 否 | 内容区域无内边距 |

## 静态方法

### Modal.render(props)

显示模态框。

```jsx
Modal.render({
  title: '标题',
  children: '内容',
  onHide: () => console.log('关闭')
})
```

### Modal.hide()

隐藏当前显示的模态框。

```jsx
Modal.hide()
```

### CleanModal.render(props)

显示简洁模态框。

### CleanModal.hide()

隐藏简洁模态框。

### RightSideModal.render(props)

显示右侧边栏模态框。

### RightSideModal.hide()

隐藏右侧边栏模态框。

## 使用场景

### 尺寸选择

```jsx
// 大尺寸 - 适合表格、表单
Modal.render({
  size: 'lg',
  title: '大尺寸',
  children: '内容',
  onHide: Modal.hide
})

// 中尺寸 - 默认，适合常规内容
Modal.render({
  size: 'md',
  title: '中尺寸',
  children: '内容',
  onHide: Modal.hide
})

// 小尺寸 - 适合简单提示
Modal.render({
  size: 'sm',
  title: '小尺寸',
  children: '内容',
  onHide: Modal.hide
})
```

### 无内边距内容

```jsx
Modal.render({
  noContentPadding: true,
  size: 'lg',
  title: '无内边距',
  children: <img src='image.jpg' style={{ width: '100%' }} />,
  onHide: Modal.hide
})
```

### 透明遮罩

```jsx
Modal.render({
  opacityMask: true,
  title: '透明遮罩',
  children: '内容',
  onHide: Modal.hide
})
```

### 禁止点击遮罩关闭

```jsx
Modal.render({
  disableMaskClose: true,
  title: '必须点击关闭按钮',
  children: '重要内容，防止误操作',
  onHide: Modal.hide
})
```

### 可滚动内容

```jsx
Modal.render({
  haveOverFlow: true,
  title: '长内容',
  children: (
    <div>
      {Array.from({ length: 100 }).map((_, i) => (
        <p key={i}>内容行 {i}</p>
      ))}
    </div>
  ),
  onHide: Modal.hide
})
```

## 注意事项

1. **必须提供 onHide 回调**：onHide 是必填属性，用于处理关闭逻辑
2. **内容可以是任意 React 节点**：children 支持字符串、JSX、组件等
3. **样式定制**：可以通过 className 和 style 属性自定义样式
4. **多个模态框**：每次调用 render 会覆盖之前的模态框
5. **关闭方式**：
   - 点击右上角关闭按钮
   - 点击遮罩层（可通过 disableMaskClose 禁用）
   - 调用 onHide 回调
