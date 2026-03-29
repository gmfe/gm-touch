# Popover

弹出层组件，用于在目标元素周围显示浮层内容，支持多种触发方式和位置配置。

## 基础用法

Popover 包裹触发元素，通过 `popup` 属性定义弹出内容。

```jsx
import Popover from '@gm-touch/popover'
import Button from '@gm-touch/button'

<Popover popup={<div>弹出内容</div>}>
  <Button>触发元素</Button>
</Popover>
```

## 四种触发方式

### 1. Focus - 聚焦触发（默认）

点击触发元素后显示，再次点击不会关闭。

```jsx
<Popover type='focus' popup={<div>内容</div>}>
  <Button>focus</Button>
</Popover>
```

### 2. Click - 点击触发

点击触发元素后显示，再次点击会关闭。

```jsx
<Popover type='click' popup={<div>内容</div>}>
  <Button>click</Button>
</Popover>
```

### 3. Hover - 悬停触发

鼠标悬停时显示，离开后延迟关闭（默认 500ms）。

```jsx
<Popover type='hover' showArrow popup={<div>内容</div>}>
  <Button>hover</Button>
</Popover>
```

### 4. RealFocus - 真实聚焦触发

元素获得焦点时显示，失去焦点时关闭。

```jsx
<Popover type='realFocus' showArrow popup={<div>内容</div>}>
  <Button>realFocus</Button>
</Popover>
```

## Props

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| type | string | 'focus' | 否 | 触发方式：'focus' \| 'click' \| 'hover' \| 'realFocus' |
| popup | element \| func | - | 是 | 弹出内容，支持 React 元素或返回元素的函数 |
| children | element | - | 是 | 触发元素（只能有一个子元素） |
| disabled | bool | false | 否 | 是否禁用（也支持通过子元素的 disabled 属性控制） |
| className | string | - | 否 | 弹出层的自定义类名 |
| style | object | - | 否 | 弹出层的自定义样式 |
| position | string | - | 否 | 位置：'right' \| 'top' |
| center | bool | false | 否 | 是否水平居中 |
| offset | number | - | 否 | 位置偏移量（像素） |
| showArrow | bool | false | 否 | 是否显示三角标 |
| arrowLeft | string | - | 否 | 三角标的 left 位置 |
| pureContainer | bool | false | 否 | 是否使用纯容器样式 |
| isInPopup | bool | false | 否 | 是否嵌套在另一个 Popover 中 |
| animName | string/bool | true | 否 | 动画效果：false \| true \| 'fade-in-right' \| 'fade-in-left' \| 'fade-in-top' \| 'fade-in-bottom' \| 'zoom-in' \| 'zoom-in-top' \| 'zoom-in-bottom' |
| predictingHeight | number | - | 否 | 预判高度，用于判断视窗是否能放下 |

## 位置配置

### 基础位置

```jsx
// 默认（左下方）
<Popover popup={<div>内容</div>}>
  <Button>默认</Button>
</Popover>

// 右侧
<Popover right popup={<div>内容</div>}>
  <Button>右侧</Button>
</Popover>

// 上方
<Popover top popup={<div>内容</div>}>
  <Button>上方</Button>
</Popover>

// 居中
<Popover center popup={<div>内容</div>}>
  <Button>居中</Button>
</Popover>
```

### 组合位置

```jsx
// 右上方
<Popover right top popup={<div>内容</div>}>
  <Button>右上方</Button>
</Popover>

// 上方居中
<Popover center top popup={<div>内容</div>}>
  <Button>上方居中</Button>
</Popover>
```

### 偏移位置

```jsx
// 向下偏移 20px
<Popover offset={20} popup={<div>内容</div>}>
  <Button>偏移 20</Button>
</Popover>

// 向上偏移 20px
<Popover offset={-20} popup={<div>内容</div>}>
  <Button>偏移 -20</Button>
</Popover>

// 右侧偏移 20px
<Popover right offset={20} popup={<div>内容</div>}>
  <Button>右侧偏移</Button>
</Popover>
```

## 高级用法

### 动态内容

popup 可以是函数，支持动态内容：

```jsx
const renderPopup = () => {
  const data = fetchData()
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}

<Popover popup={renderPopup}>
  <Button>动态内容</Button>
</Popover>
```

### 带三角标

```jsx
// 上方带三角标
<Popover top showArrow popup={<div>内容</div>}>
  <Button>上方箭头</Button>
</Popover>

// 右侧带三角标
<Popover right showArrow popup={<div>内容</div>}>
  <Button>右侧箭头</Button>
</Popover>

// 自定义三角标位置
<Popover showArrow arrowLeft='0px' popup={<div>内容</div>}>
  <Button>自定义箭头</Button>
</Popover>
```

### 禁用状态

```jsx
// 通过 disabled 属性
<Popover disabled popup={<div>内容</div>}>
  <Button>禁用</Button>
</Popover>

// 通过子元素的 disabled 属性
<Popover popup={<div>内容</div>}>
  <Button disabled>子元素禁用</Button>
</Popover>
```

### 动画效果

```jsx
// 默认动画
<Popover animName={true} popup={<div>内容</div>}>
  <Button>默认动画</Button>
</Popover>

// 无动画
<Popover animName={false} popup={<div>内容</div>}>
  <Button>无动画</Button>
</Popover>

// 淡入动画
<Popover animName='fade-in-right' popup={<div>内容</div>}>
  <Button>淡入右侧</Button>
</Popover>

// 缩放动画
<Popover animName='zoom-in' popup={<div>内容</div>}>
  <Button>缩放进入</Button>
</Popover>
```

### 嵌套 Popover

```jsx
<Popover isInPopup popup={<div>外层</div>}>
  <Button>
    <Popover popup={<div>内层</div>}>
      <Button>内层按钮</Button>
    </Popover>
  </Button>
</Popover>
```

### 自定义样式

```jsx
<Popover
  className='custom-popover'
  style={{ backgroundColor: '#f0f0f0' }}
  popup={<div>自定义样式</div>}
>
  <Button>自定义样式</Button>
</Popover>
```

## 实用示例

### 下拉菜单

```jsx
<Popover
  type='click'
  popup={
    <div>
      <div onClick={() => console.log('选项1')}>选项1</div>
      <div onClick={() => console.log('选项2')}>选项2</div>
      <div onClick={() => console.log('选项3')}>选项3</div>
    </div>
  }
>
  <Button>更多操作</Button>
</Popover>
```

### 提示信息

```jsx
<Popover
  type='hover'
  showArrow
  popup={
    <div style={{ padding: '8px' }}>
      这是一个提示信息
    </div>
  }
>
  <Button>悬停提示</Button>
</Popover>
```

### 表格操作

```jsx
<Popover
  type='click'
  right
  popup={
    <div>
      <div onClick={handleEdit}>编辑</div>
      <div onClick={handleDelete}>删除</div>
    </div>
  }
>
  <Button>操作</Button>
</Popover>
```

### 复杂表单

```jsx
<Popover
  type='click'
  center
  offset={10}
  popup={
    <Form onSubmit={handleSubmit}>
      <Input name='username' placeholder='用户名' />
      <Input name='email' placeholder='邮箱' />
      <Button type='submit'>提交</Button>
    </Form>
  }
>
  <Button>快速添加</Button>
</Popover>
```

## 注意事项

1. **单一子元素**：children 必须是单个 React 元素
2. **点击外部关闭**：focus、click、realFocus 类型点击外部会自动关闭
3. **滚动跟随**：弹出层会自动跟随页面滚动更新位置
4. **嵌套使用**：嵌套的 Popover 需要设置 `isInPopup={true}`
5. **性能优化**：popup 使用函数形式可以延迟渲染，提升性能
6. **Z-index**：弹出层通过 LayoutRoot 管理，会自动处理层级
7. **防抖处理**：滚动位置更新使用 debounce（200ms），避免频繁计算

## 与其他组件的区别

| 组件 | 适用场景 | 特点 |
|------|---------|------|
| Popover | 轻量级弹出内容 | 位置灵活，支持多种触发方式 |
| Modal | 重要操作、复杂内容 | 全屏遮罩，强制用户交互 |
| Dropdown | 下拉菜单 | 专门为菜单场景优化 |
| Tooltip | 简单提示 | 轻量级，纯展示 |

## 最佳实践

### 简单提示使用 Hover

```jsx
<Popover type='hover' showArrow popup={<div>提示内容</div>}>
  <span>？</span>
</Popover>
```

### 操作菜单使用 Click

```jsx
<Popover type='click' right popup={<Menu />}>
  <Button>更多</Button>
</Popover>
```

### 表单输入使用 Focus

```jsx
<Popover type='focus' popup={<Suggestions />}>
  <Input placeholder='输入搜索关键词' />
</Popover>
```

### 避免阻塞使用 RealFocus

```jsx
<Popover type='realFocus' popup={<HelpText />}>
  <Input />
</Popover>
```
