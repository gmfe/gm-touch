# Button

按钮组件，用于触发操作或提交表单。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 按钮类型 | `'primary'` \| `'accent'` \| `'plain'` | - | 否 |
| size | 按钮大小 | `'lg'` | - | 否 |
| htmlType | 原生按钮 type 属性 | `'submit'` \| `'reset'` \| `'button'` | - | 否 |
| block | 是否为块级按钮（宽度 100%） | `boolean` | - | 否 |
| disabled | 是否禁用 | `boolean` | - | 否 |
| onClick | 点击事件处理函数 | `function` | `() => {}` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### 特性说明

- **自动 Loading 状态**：当 `onClick` 事件处理函数返回 Promise 时，按钮会自动进入 Loading 状态，并在 Promise 完成后恢复
- **Loading 禁用**：Loading 状态下按钮会自动禁用，防止重复点击

## 示例

### 基础用法

```jsx
import { Button } from '@gm-touch/react'

<Button>默认按钮</Button>
<Button type='primary'>主要按钮</Button>
<Button type='accent'>强调按钮</Button>
<Button type='plain'>朴素按钮</Button>
```

### 不同尺寸

```jsx
import { Button } from '@gm-touch/react'

<Button>默认尺寸</Button>
<Button size='lg'>大尺寸按钮</Button>
```

### 禁用状态

```jsx
import { Button } from '@gm-touch/react'

<Button disabled>禁用按钮</Button>
<Button type='primary' disabled>禁用主要按钮</Button>
<Button size='lg' disabled>禁用大按钮</Button>
```

### 块级按钮

```jsx
import { Button } from '@gm-touch/react'

<Button block>块级按钮（宽度 100%）</Button>
```

### 表单提交

```jsx
import { Button } from '@gm-touch/react'

<form>
  <Button htmlType='submit'>提交</Button>
  <Button htmlType='reset'>重置</Button>
</form>
```

### 异步操作（自动 Loading）

```jsx
import { Button } from '@gm-touch/react'

function MyComponent() {
  const handleClick = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('操作完成')
        resolve()
      }, 2000)
    })
  }

  return <Button onClick={handleClick}>异步操作</Button>
}
```

### 完整示例

```jsx
import { Button } from '@gm-touch/react'

function FormExample() {
  const handleSubmit = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('提交成功')
        resolve()
      }, 1500)
    })
  }

  return (
    <div>
      <Button type='primary' size='lg' block onClick={handleSubmit}>
        提交表单
      </Button>
    </div>
  )
}
```

## 注意事项

1. **异步处理**：如果 `onClick` 返回 Promise，按钮会自动显示 Loading 状态，无需手动管理 Loading 状态
2. **禁用优先级**：Loading 状态下按钮会自动禁用，此时 `disabled` 属性也会生效
3. **样式覆盖**：可通过 `className` 和 `style` 属性自定义样式，但要注意优先级
4. **表单使用**：在表单中使用时，建议通过 `htmlType` 属性明确指定按钮类型
5. **类型选择**：
   - `primary`：主要操作，如提交、确认
   - `accent`：强调操作，如重要提示
   - `plain`：次要操作，如取消、返回

## 相关组件

- [Input](../input/README.md) - 输入框组件
- [Checkbox](../checkbox/README.md) - 复选框组件
