# Checkbox

复选框组件，用于在一组选项中进行多选。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 复选框类型 | `'circle'` \| `'square'` | `'circle'` | 否 |
| bgWhite | 是否为白色背景（仅圆形有效） | `boolean` | - | 否 |
| checked | 是否选中 | `boolean` | - | 否 |
| onChange | 状态变化回调，参数为新的选中状态 | `function` | `() => {}` | 否 |
| disabled | 是否禁用 | `boolean` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |
| children | 子元素，通常为文本说明 | `any` | - | 否 |

## 示例

### 基础用法

```jsx
import { Checkbox } from '@gm-touch/react'
import { useState } from 'react'

function BasicExample() {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      checked={checked}
      onChange={setChecked}
    >
      同意协议
    </Checkbox>
  )
}
```

### 不同类型

```jsx
import { Checkbox } from '@gm-touch/react'
import { useState } from 'react'

function TypeExample() {
  const [circleChecked, setCircleChecked] = useState(false)
  const [squareChecked, setSquareChecked] = useState(false)

  return (
    <>
      <Checkbox
        type='circle'
        checked={circleChecked}
        onChange={setCircleChecked}
      >
        圆形复选框
      </Checkbox>
      <Checkbox
        type='square'
        checked={squareChecked}
        onChange={setSquareChecked}
      >
        方形复选框
      </Checkbox>
    </>
  )
}
```

### 带白色背景的圆形复选框

```jsx
import { Checkbox } from '@gm-touch/react'
import { useState } from 'react'

function BgWhiteExample() {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      type='circle'
      bgWhite
      checked={checked}
      onChange={setChecked}
    >
      白色背景圆形复选框
    </Checkbox>
  )
}
```

### 禁用状态

```jsx
import { Checkbox } from '@gm-touch/react'

<Checkbox disabled checked={false}>
  未选中的禁用项
</Checkbox>
<Checkbox disabled checked={true}>
  已选中的禁用项
</Checkbox>
```

### 复选框组

```jsx
import { Checkbox } from '@gm-touch/react'
import { useState } from 'react'

function CheckboxGroup() {
  const [selectedItems, setSelectedItems] = useState([1, 4])

  const items = [
    { value: 1, label: '广州' },
    { value: 2, label: '深圳', disabled: true },
    { value: 3, label: '成都' },
    { value: 4, label: '东莞', disabled: true }
  ]

  const handleChange = (value, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, value])
    } else {
      setSelectedItems(selectedItems.filter(item => item !== value))
    }
  }

  return (
    <div>
      {items.map(item => (
        <Checkbox
          key={item.value}
          type='square'
          checked={selectedItems.includes(item.value)}
          disabled={item.disabled}
          onChange={checked => handleChange(item.value, checked)}
        >
          {item.label}
        </Checkbox>
      ))}
      <p>已选择: {selectedItems.join(', ')}</p>
    </div>
  )
}
```

### 全选功能

```jsx
import { Checkbox } from '@gm-touch/react'
import { useState } from 'react'

function SelectAllExample() {
  const [items, setItems] = useState([
    { id: 1, name: '选项 1', checked: false },
    { id: 2, name: '选项 2', checked: false },
    { id: 3, name: '选项 3', checked: false }
  ])

  const allChecked = items.every(item => item.checked)
  const someChecked = items.some(item => item.checked)

  const handleSelectAll = checked => {
    setItems(items.map(item => ({ ...item, checked })))
  }

  const handleItemChange = (id, checked) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked } : item
    ))
  }

  return (
    <div>
      <Checkbox
        type='square'
        checked={allChecked}
        onChange={handleSelectAll}
      >
        {allChecked ? '取消全选' : '全选'}
      </Checkbox>
      {items.map(item => (
        <Checkbox
          key={item.id}
          type='square'
          checked={item.checked}
          onChange={checked => handleItemChange(item.id, checked)}
        >
          {item.name}
        </Checkbox>
      ))}
      <p>已选择 {items.filter(i => i.checked).length} 项</p>
    </div>
  )
}
```

### 协议同意场景

```jsx
import { Checkbox } from '@gm-touch/react'
import { Button } from '@gm-touch/react'
import { useState } from 'react'

function AgreementExample() {
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = () => {
    if (!agreed) {
      alert('请先同意用户协议')
      return
    }
    alert('提交成功')
  }

  return (
    <div>
      <Checkbox
        type='square'
        checked={agreed}
        onChange={setAgreed}
      >
        我已阅读并同意《用户协议》和《隐私政策》
      </Checkbox>
      <Button
        type='primary'
        disabled={!agreed}
        onClick={handleSubmit}
      >
        提交
      </Button>
    </div>
  )
}
```

### 条件选中

```jsx
import { Checkbox } from '@gm-touch/react'
import { useState } from 'react'

function ConditionalExample() {
  const [options, setOptions] = useState({
    basic: false,
    premium: false,
    vip: false
  })

  // 当选择 VIP 时，自动取消其他选项
  const handleChange = (key, checked) => {
    if (key === 'vip' && checked) {
      setOptions({ basic: false, premium: false, vip: true })
    } else if (key !== 'vip' && checked && options.vip) {
      setOptions({ ...options, [key]: true, vip: false })
    } else {
      setOptions({ ...options, [key]: checked })
    }
  }

  return (
    <div>
      <Checkbox
        type='square'
        checked={options.basic}
        onChange={checked => handleChange('basic', checked)}
      >
        基础版
      </Checkbox>
      <Checkbox
        type='square'
        checked={options.premium}
        onChange={checked => handleChange('premium', checked)}
      >
        高级版
      </Checkbox>
      <Checkbox
        type='square'
        checked={options.vip}
        onChange={checked => handleChange('vip', checked)}
      >
        VIP 版（互斥）
      </Checkbox>
    </div>
  )
}
```

## 注意事项

1. **受控组件**：`checked` 属性必须通过状态管理，配合 `onChange` 回调更新状态，实现受控组件

2. **类型选择**：
   - `circle`（圆形）：适合移动端，点击区域更大
   - `square`（方形）：传统复选框样式，更常见

3. **白色背景**：`bgWhite` 属性仅对 `type='circle'` 有效，可以为圆形复选框添加白色背景，提升对比度

4. **禁用状态**：禁用状态下点击不会触发 `onChange` 回调，适合表示不可修改的选项

5. **复选框组**：实现复选框组时，建议使用数组管理选中状态，便于批量操作

6. **互斥逻辑**：如需实现单选或多选互斥效果，需在 `onChange` 中自行处理逻辑

7. **样式自定义**：可通过 `className` 和 `style` 属性自定义样式，但要注意保持图标可见性

## 相关组件

- [Button](../button/README.md) - 按钮组件
- [Input](../input/README.md) - 输入框组件
