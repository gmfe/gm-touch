# Flex

Flex 弹性布局组件，提供了一套完整的 Flexbox 布局属性，简化了 Flex 布局的使用。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| flex | 是否为 flex 子项，可设置 flex 值 | `number` \| `boolean` | - | 否 |
| auto | flex: auto，自动占据剩余空间 | `boolean` | - | 否 |
| none | flex: none，不伸缩 | `boolean` | - | 否 |
| width | 设置宽度 | `string` | - | 否 |
| height | 设置高度 | `string` | - | 否 |
| row | 主轴为水平方向（flex-direction: row） | `boolean` | - | 否 |
| column | 主轴为垂直方向（flex-direction: column） | `boolean` | - | 否 |
| wrap | 换行（flex-wrap: wrap） | `boolean` | - | 否 |
| nowrap | 不换行（flex-wrap: nowrap） | `boolean` | - | 否 |
| justifyStart | 主轴起点对齐（justify-content: flex-start） | `boolean` | - | 否 |
| justifyEnd | 主轴终点对齐（justify-content: flex-end） | `boolean` | - | 否 |
| justifyCenter | 主轴居中对齐（justify-content: center） | `boolean` | - | 否 |
| justifyBetween | 主轴两端对齐（justify-content: space-between） | `boolean` | - | 否 |
| justifyAround | 主轴环绕对齐（justify-content: space-around） | `boolean` | - | 否 |
| alignStart | 交叉轴起点对齐（align-items: flex-start） | `boolean` | - | 否 |
| alignEnd | 交叉轴终点对齐（align-items: flex-end） | `boolean` | - | 否 |
| alignCenter | 交叉轴居中对齐（align-items: center） | `boolean` | - | 否 |
| alignBaseline | 交叉轴基线对齐（align-items: baseline） | `boolean` | - | 否 |
| alignStretch | 交叉轴拉伸对齐（align-items: stretch） | `boolean` | - | 否 |
| alignContentStart | 多行交叉轴起点对齐（align-content: flex-start） | `boolean` | - | 否 |
| alignContentEnd | 多行交叉轴终点对齐（align-content: flex-end） | `boolean` | - | 否 |
| alignContentCenter | 多行交叉轴居中对齐（align-content: center） | `boolean` | - | 否 |
| alignContentBetween | 多行交叉轴两端对齐（align-content: space-between） | `boolean` | - | 否 |
| alignContentAround | 多行交叉轴环绕对齐（align-content: space-around） | `boolean` | - | 否 |
| alignContentStretch | 多行交叉轴拉伸对齐（align-content: stretch） | `boolean` | - | 否 |
| block | 显示为块级元素 | `boolean` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |
| children | 子元素 | `any` | - | 否 |

## 示例

### 基础用法

```jsx
import { Flex } from '@gm-touch/react'

<Flex row>
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
</Flex>
```

### 垂直布局

```jsx
import { Flex } from '@gm-touch/react'

<Flex column>
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
</Flex>
```

### 主轴对齐方式

```jsx
import { Flex } from '@gm-touch/react'

<Flex row justifyStart>
  <div>起点对齐</div>
  <div>项目 2</div>
  <div>项目 3</div>
</Flex>

<Flex row justifyCenter>
  <div>居中对齐</div>
  <div>项目 2</div>
  <div>项目 3</div>
</Flex>

<Flex row justifyBetween>
  <div>两端对齐</div>
  <div>项目 2</div>
  <div>项目 3</div>
</Flex>
```

### 交叉轴对齐方式

```jsx
import { Flex } from '@gm-touch/react'

<Flex column alignCenter style={{ height: '200px' }}>
  <div>居中对齐</div>
  <div>项目 2</div>
  <div>项目 3</div>
</Flex>

<Flex column alignStart style={{ height: '200px' }}>
  <div>起点对齐</div>
  <div>项目 2</div>
  <div>项目 3</div>
</Flex>
```

### Flex 子项比例

```jsx
import { Flex } from '@gm-touch/react'

<Flex row>
  <Flex flex={1}>flex: 1</Flex>
  <Flex flex={2}>flex: 2</Flex>
  <Flex flex={3}>flex: 3</Flex>
</Flex>

<Flex row>
  <Flex flex={1}>flex: 1</Flex>
  <Flex>固定宽度</Flex>
  <Flex flex={1}>flex: 1</Flex>
</Flex>
```

### 自动占据剩余空间

```jsx
import { Flex } from '@gm-touch/react'

<Flex row>
  <div>固定宽度</div>
  <Flex auto>自动占据剩余空间</Flex>
</Flex>
```

### 换行

```jsx
import { Flex } from '@gm-touch/react'

<Flex row wrap>
  <div style={{ width: '30%' }}>项目 1</div>
  <div style={{ width: '30%' }}>项目 2</div>
  <div style={{ width: '30%' }}>项目 3</div>
  <div style={{ width: '30%' }}>项目 4</div>
</Flex>
```

### 居中对齐（推荐用法）

```jsx
import { Flex } from '@gm-touch/react'

// 水平和垂直居中
<Flex row justifyCenter alignCenter style={{ height: '200px' }}>
  <div>居中内容</div>
</Flex>
```

### 设置固定宽高

```jsx
import { Flex } from '@gm-touch/react'

<Flex row>
  <Flex width="100px" height="100px" style={{ background: '#f0f0f0' }}>
    固定尺寸
  </Flex>
  <Flex flex={1} style={{ background: '#e0e0e0' }}>
    自适应
  </Flex>
</Flex>
```

### 完整示例：复杂布局

```jsx
import { Flex } from '@gm-touch/react'

function ComplexLayout() {
  return (
    <Flex column style={{ height: '100vh' }}>
      {/* 头部 */}
      <Flex style={{ height: '60px', background: '#333', color: '#fff' }}>
        头部
      </Flex>

      {/* 主体 */}
      <Flex flex={1} row>
        {/* 侧边栏 */}
        <Flex column style={{ width: '200px', background: '#f5f5f5' }}>
          <div style={{ padding: '20px' }}>菜单项 1</div>
          <div style={{ padding: '20px' }}>菜单项 2</div>
          <div style={{ padding: '20px' }}>菜单项 3</div>
        </Flex>

        {/* 内容区 */}
        <Flex flex={1} style={{ padding: '20px', background: '#fff' }}>
          <div>主要内容</div>
        </Flex>
      </Flex>

      {/* 底部 */}
      <Flex
        justifyCenter
        alignCenter
        style={{ height: '50px', background: '#eee' }}
      >
        底部信息
      </Flex>
    </Flex>
  )
}
```

## 注意事项

1. **属性互斥**：
   - `justifyStart`、`justifyEnd`、`justifyCenter`、`justifyBetween`、`justifyAround` 互斥，同时使用时最后一个生效
   - `alignStart`、`alignEnd`、`alignCenter`、`alignBaseline`、`alignStretch` 互斥，同时使用时最后一个生效
   - `row` 和 `column` 互斥，同时使用时最后一个生效

2. **Flex 值**：
   - `flex` 属性接受 `boolean` 或 `number` 类型
   - `flex={true}` 等同于 `flex={1}`
   - `flex` 和 `auto`、`none` 属性不能同时使用

3. **尺寸设置**：
   - `width` 和 `height` 会自动设置 `none` 样式，使元素不伸缩
   - 在子项上设置 `flex` 时，会自动覆盖默认的 flex 样式

4. **对齐方式选择**：
   - `justifyStart`：主轴起点对齐，适用于从左到右或从上到下的常规布局
   - `justifyCenter`：主轴居中，适用于居中布局
   - `justifyBetween`：主轴两端对齐，适用于导航栏等场景
   - `justifyAround`：主轴环绕对齐，每个项目两侧的间隔相等

5. **性能优化**：
   - 使用 Flex 组件比直接写 CSS className 更简洁，但性能略有差异
   - 对于大量列表，建议使用虚拟滚动方案

6. **浏览器兼容**：
   - 组件自动添加了 `-webkit-` 前缀，兼容性良好
   - 支持 IE10+ 和所有现代浏览器

## 相关组件

- [Grid](../grid/README.md) - 栅格布局组件
- [LayoutRoot](../layout_root/README.md) - 布局根组件
