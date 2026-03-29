# IconDownUp

上下箭头图标组件，用于指示展开/收起状态。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| active | 是否激活状态（向上箭头） | `boolean` | `false` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### 特性说明

- **状态切换**：通过 `active` 属性控制箭头方向，false 显示向下，true 显示向上
- **自动旋转**：图标会在激活状态下自动旋转 180 度
- **样式继承**：继承 SVG 的所有原生属性

## 示例

### 基础用法

```jsx
import { IconDownUp } from '@gm-touch/react'

<IconDownUp />
<IconDownUp active />
```

### 状态切换

```jsx
import { IconDownUp } from '@gm-touch/react'
import { useState } from 'react'

function ToggleExample() {
  const [active, setActive] = useState(false)

  return (
    <div>
      <button onClick={() => setActive(!active)}>
        切换状态
      </button>
      <IconDownUp active={active} />
    </div>
  )
}
```

### 自定义样式

```jsx
import { IconDownUp } from '@gm-touch/react'

<IconDownUp
  active
  className='custom-icon'
  style={{ color: '#ff0000', fontSize: '20px' }}
/>
```

### 完整示例

```jsx
import { IconDownUp } from '@gm-touch/react'
import { useState } from 'react'

function AccordionExample() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <div onClick={() => setExpanded(!expanded)}>
        <span>点击展开/收起</span>
        <IconDownUp active={expanded} />
      </div>
      {expanded && <div>内容区域</div>}
    </div>
  )
}
```

## 注意事项

1. **交互控制**：组件本身不包含点击事件，需要父组件控制 `active` 状态
2. **样式定制**：通过 `className` 和 `style` 属性可以自定义样式
3. **尺寸控制**：图标大小可通过 `style.fontSize` 或 CSS `font-size` 控制
4. **颜色控制**：图标颜色可通过 `style.color` 或 CSS `color` 控制
5. **使用场景**：
   - 下拉选择器
   - 折叠面板
   - 弹出层触发器
   - 任何需要指示展开/收起状态的场景

## 相关组件

- [Selection](../selection/README.md) - 选择区域组件
- [Select](../select/README.md) - 下拉选择器组件
- [Collapse](../collapse/README.md) - 折叠面板组件
