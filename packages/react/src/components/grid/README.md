# Grid

栅格布局组件，基于 24 栅格系统，提供了响应式布局解决方案。包含 Row（行）和 Col（列）两个子组件。

## 组件

### Row

栅格系统的行容器，基于 Flex 组件实现。

#### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| gutter | 栅格间隔，可设置像素值或响应式对象 | `number` \| `object` | `0` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

**gutter 响应式对象格式**：
```js
{ xs: 8, sm: 16, md: 24 }
```

### Col

栅格系统的列组件。

#### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| span | 栅格占位格数（0-24），为 0 时相当于 display: none | `number` | - | 否 |
| offset | 栅格左侧的间隔格数 | `number` | - | 否 |
| sm | 480px 响应式栅格，可为栅格数或包含 span/offset 的对象 | `number` \| `object` | - | 否 |
| md | 720px 响应式栅格，可为栅格数或包含 span/offset 的对象 | `number` \| `object` | - | 否 |
| lg | 1080px 响应式栅格，可为栅格数或包含 span/offset 的对象 | `number` \| `object` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

**响应式对象格式**：
```js
{ span: 12, offset: 2 }
```

## 示例

### 基础用法

```jsx
import { Row, Col } from '@gm-touch/react'

<Row>
  <Col span={24}>Col 24</Col>
</Row>

<Row>
  <Col span={12}>Col 12</Col>
  <Col span={12}>Col 12</Col>
</Row>

<Row>
  <Col span={8}>Col 8</Col>
  <Col span={8}>Col 8</Col>
  <Col span={8}>Col 8</Col>
</Row>

<Row>
  <Col span={6}>Col 6</Col>
  <Col span={6}>Col 6</Col>
  <Col span={6}>Col 6</Col>
  <Col span={6}>Col 6</Col>
</Row>
```

### 栅格间隔（gutter）

```jsx
import { Row, Col } from '@gm-touch/react'

<Row gutter={8}>
  <Col span={8}>Col 8</Col>
  <Col span={8}>Col 8</Col>
  <Col span={8}>Col 8</Col>
</Row>

<Row gutter={16}>
  <Col span={6}>Col 6</Col>
  <Col span={6}>Col 6</Col>
  <Col span={6}>Col 6</Col>
  <Col span={6}>Col 6</Col>
</Row>

// 响应式间隔
<Row gutter={{ xs: 8, sm: 16, md: 24 }}>
  <Col span={8}>Col 8</Col>
  <Col span={8}>Col 8</Col>
  <Col span={8}>Col 8</Col>
</Row>
```

### 栅格偏移（offset）

```jsx
import { Row, Col } from '@gm-touch/react'

<Row>
  <Col span={8}>Col 8</Col>
  <Col span={8} offset={8}>
    Col 8, Offset 8
  </Col>
</Row>

<Row>
  <Col span={6}>Col 6</Col>
  <Col span={6} offset={6}>
    Col 6, Offset 6
  </Col>
  <Col span={6} offset={6}>
    Col 6, Offset 6
  </Col>
</Row>
```

### 对齐方式

Row 组件继承了 Flex 组件的所有属性，可以使用 Flex 的对齐方式：

```jsx
import { Row, Col } from '@gm-touch/react'

// 主轴居中
<Row justifyCenter>
  <Col span={8}>Col 8</Col>
  <Col span={8}>Col 8</Col>
  <Col span={8}>Col 8</Col>
</Row>

// 交叉轴居中
<Row alignCenter style={{ height: '120px' }}>
  <Col span={8} style={{ height: '60px' }}>
    Col 8
  </Col>
  <Col span={8} style={{ height: '60px' }}>
    Col 8
  </Col>
  <Col span={8} style={{ height: '60px' }}>
    Col 8
  </Col>
</Row>

// 两端对齐
<Row justifyBetween>
  <Col span={8}>Col 8</Col>
  <Col span={8}>Col 8</Col>
  <Col span={8}>Col 8</Col>
</Row>
```

### 响应式布局

```jsx
import { Row, Col } from '@gm-touch/react'

// 使用数字形式
<Row>
  <Col span={24} sm={12} md={8} lg={6}>
    响应式列
  </Col>
  <Col span={24} sm={12} md={8} lg={6}>
    响应式列
  </Col>
  <Col span={24} sm={12} md={8} lg={6}>
    响应式列
  </Col>
  <Col span={24} sm={12} md={8} lg={6}>
    响应式列
  </Col>
</Row>

// 使用对象形式（支持 offset）
<Row>
  <Col
    sm={{ span: 20, offset: 2 }}
    md={{ span: 16, offset: 4 }}
    lg={{ span: 12, offset: 6 }}
  >
    响应式列
  </Col>
  <Col
    sm={{ span: 20, offset: 2 }}
    md={{ span: 16, offset: 4 }}
    lg={{ span: 12, offset: 6 }}
  >
    响应式列
  </Col>
</Row>
```

### 响应式换行示例

```jsx
import { Row, Col } from '@gm-touch/react'

// 在小屏幕上每行 1 列，中屏幕上每行 2 列，大屏幕上每行 3 列
<Row>
  <Col sm={{ span: 20, offset: 2 }} md={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 2 }}>
    列 1
  </Col>
  <Col sm={{ span: 20, offset: 2 }} md={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 2 }}>
    列 2
  </Col>
  <Col sm={{ span: 20, offset: 2 }} md={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 2 }}>
    列 3
  </Col>
  <Col sm={{ span: 20, offset: 2 }} md={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 2 }}>
    列 4
  </Col>
</Row>
```

### 完整示例：典型布局

```jsx
import { Row, Col } from '@gm-touch/react'

function TypicalLayout() {
  return (
    <div>
      {/* 头部：占满 24 栅格 */}
      <Row>
        <Col span={24} style={{ background: '#333', color: '#fff', padding: '20px' }}>
          头部
        </Col>
      </Row>

      {/* 主体内容 */}
      <Row gutter={16} style={{ marginTop: '16px' }}>
        {/* 侧边栏 */}
        <Col span={6} style={{ background: '#f5f5f5', padding: '20px' }}>
          <div>菜单项 1</div>
          <div>菜单项 2</div>
          <div>菜单项 3</div>
        </Col>

        {/* 主要内容 */}
        <Col span={18}>
          <Row gutter={16}>
            <Col span={12} style={{ background: '#e0e0e0', padding: '20px' }}>
              内容块 1
            </Col>
            <Col span={12} style={{ background: '#e0e0e0', padding: '20px' }}>
              内容块 2
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: '16px' }}>
            <Col span={24} style={{ background: '#e0e0e0', padding: '20px' }}>
              内容块 3
            </Col>
          </Row>
        </Col>
      </Row>

      {/* 底部 */}
      <Row style={{ marginTop: '16px' }}>
        <Col span={24} style={{ background: '#eee', padding: '20px' }}>
          底部
        </Col>
      </Row>
    </div>
  )
}
```

### 响应式页面布局

```jsx
import { Row, Col } from '@gm-touch/react'

function ResponsivePage() {
  return (
    <div>
      {/* 顶部导航 */}
      <Row>
        <Col span={24} style={{ background: '#333', color: '#fff', padding: '20px' }}>
          响应式页面
        </Col>
      </Row>

      {/* 响应式内容区 */}
      <Row gutter={16} style={{ marginTop: '16px' }}>
        {/* 侧边栏：大屏显示，小屏隐藏 */}
        <Col lg={{ span: 6, offset: 2 }} md={0} sm={0}>
          <div style={{ background: '#f5f5f5', padding: '20px' }}>
            侧边栏（仅大屏显示）
          </div>
        </Col>

        {/* 主内容：自适应 */}
        <Col lg={14} md={22} offset={md={{ span: 1, offset: 0 }} sm={{ span: 22, offset: 1 }}>
          <div style={{ background: '#e0e0e0', padding: '20px' }}>
            主内容区（自适应）
          </div>
        </Col>
      </Row>
    </div>
  )
}
```

## 栅格系统说明

### 栅格划分

系统采用 24 栅格系统，将一行分为 24 等份：
- `span={24}`：占满整行
- `span={12}`：占半行
- `span={8}`：占 1/3 行
- `span={6}`：占 1/4 行

### 响应式断点

- `xs`：< 480px（超小屏幕）
- `sm`：≥ 480px（小屏幕）
- `md`：≥ 720px（中屏幕）
- `lg`：≥ 1080px（大屏幕）

### 使用建议

1. **栅格总数**：同一行内所有 Col 的 span 之和最好等于 24，但不是强制的
2. **响应式设计**：
   - 移动优先：先设置基础 span，再添加 sm/md/lg
   - 桌面优先：先设置 lg，再逐步添加 md/sm/基础值
3. **偏移使用**：offset 会占据栅格空间，计算时需要计入

## 注意事项

1. **Row 的 flex 属性**：Row 组件基于 Flex 实现，支持所有 Flex 的属性（如 `justifyCenter`、`alignCenter` 等）
2. **gutter 计算**：gutter 会自动在 Row 上设置负 margin，在 Col 上设置 padding，确保内容区域的间隔正确
3. **响应式优先级**：响应式属性的优先级高于基础属性，从小到大依次覆盖
4. **span 为 0**：当 `span={0}` 时，相当于 `display: none`，元素不显示且不占据空间
5. **性能优化**：
   - 对于复杂布局，建议结合 Flex 组件使用
   - 避免在 Col 内嵌套多层 Row

## 相关组件

- [Flex](../flex/README.md) - 弹性布局组件
- [LayoutRoot](../layout_root/README.md) - 布局根组件
