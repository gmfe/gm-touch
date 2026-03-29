# Input

输入框组件，用于接收用户输入的文本信息。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 输入框类型 | `'text'` \| `'password'` \| `'number'` | `'text'` | 否 |
| size | 输入框大小 | `'lg'` | - | 否 |
| block | 是否为块级输入框（宽度 100%） | `boolean` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

**其他属性**：支持所有原生 input 元素的属性（如 `placeholder`、`value`、`onChange`、`name`、`maxLength` 等）

## 示例

### 基础用法

```jsx
import { Input } from '@gm-touch/react'

<Input placeholder='请输入内容' />
```

### 受控输入框

```jsx
import { Input } from '@gm-touch/react'
import { useState } from 'react'

function ControlledInput() {
  const [value, setValue] = useState('')

  return (
    <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder='请输入用户名'
    />
  )
}
```

### 不同类型

```jsx
import { Input } from '@gm-touch/react'

<Input type='text' placeholder='文本输入' />
<Input type='password' placeholder='密码输入' />
<Input type='number' placeholder='数字输入' />
```

### 不同尺寸

```jsx
import { Input } from '@gm-touch/react'

<Input placeholder='默认尺寸' />
<Input size='lg' placeholder='大尺寸输入框' />
```

### 块级输入框

```jsx
import { Input } from '@gm-touch/react'

<Input block placeholder='宽度 100% 的输入框' />
```

### 带限制的输入框

```jsx
import { Input } from '@gm-touch/react'

<Input
  type='text'
  placeholder='最多输入 20 个字符'
  maxLength={20}
/>

<Input
  type='number'
  placeholder='请输入年龄'
  min={0}
  max={120}
/>
```

### 只读和禁用状态

```jsx
import { Input } from '@gm-touch/react'

<Input readOnly value='只读输入框' />
<Input disabled value='禁用输入框' placeholder='禁用状态' />
```

### 表单集成

```jsx
import { Input } from '@gm-touch/react'
import { useState } from 'react'

function FormExample() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <form>
      <Input
        type='text'
        placeholder='用户名'
        value={formData.username}
        onChange={e => handleChange('username', e.target.value)}
      />
      <Input
        type='password'
        placeholder='密码'
        value={formData.password}
        onChange={e => handleChange('password', e.target.value)}
      />
      <Input
        type='text'
        placeholder='邮箱'
        value={formData.email}
        onChange={e => handleChange('email', e.target.value)}
      />
    </form>
  )
}
```

### 获取输入框引用

```jsx
import { Input } from '@gm-touch/react'
import { useRef, useEffect } from 'react'

function InputRefExample() {
  const inputRef = useRef(null)

  useEffect(() => {
    // 自动聚焦
    inputRef.current?.focus()
  }, [])

  return <Input ref={inputRef} placeholder='自动聚焦的输入框' />
}
```

## 注意事项

1. **类型选择**：
   - `text`：普通文本输入（默认）
   - `password`：密码输入，内容会隐藏
   - `number`：数字输入，移动端会唤起数字键盘

2. **受控组件**：建议使用受控方式（通过 `value` 和 `onChange`）管理输入框的值，以便更好地控制表单状态

3. **样式自定义**：可通过 `className` 和 `style` 属性自定义样式，但要注意优先级

4. **块级使用**：设置 `block` 属性后，输入框宽度会占满父容器，适合在表单中使用

5. **原生属性**：所有原生 input 的属性都支持，如：
   - `placeholder`：占位文本
   - `maxLength`：最大长度
   - `min`/`max`：最小/最大值（number 类型）
   - `readOnly`：只读状态
   - `disabled`：禁用状态
   - `autoFocus`：自动聚焦
   - `name`：表单字段名

## 相关组件

- [Button](../button/README.md) - 按钮组件
- [Checkbox](../checkbox/README.md) - 复选框组件
