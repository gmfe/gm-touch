# InputNumber 数字输入框

数字输入框组件，支持精度控制和数值范围限制。

## 基本使用

```jsx
import { InputNumber } from '@gm-touch/components'

function App() {
  const [value, setValue] = React.useState(null)

  return (
    <InputNumber
      value={value}
      onChange={setValue}
    />
  )
}
```

## Props

### value

- **类型**: `number`
- **默认值**: `null`
- **必填**: 否

当前输入的数值。

```jsx
<InputNumber value={100} onChange={console.log} />
```

### onChange

- **类型**: `func`
- **必填**: 是

值变化时的回调函数，返回处理后的数值。

```jsx
<InputNumber
  value={value}
  onChange={(newValue) => {
    console.log('新值:', newValue)
    setValue(newValue)
  }}
/>
```

### min

- **类型**: `number`
- **默认值**: `undefined`
- **必填**: 否

最小值限制，当输入值小于最小值时，会自动修正为最小值。

```jsx
<InputNumber
  value={value}
  onChange={setValue}
  min={0}
/>
```

### max

- **类型**: `number`
- **默认值**: `undefined`
- **必填**: 否

最大值限制，当输入值大于最大值时，会自动修正为最大值。

```jsx
<InputNumber
  value={value}
  onChange={setValue}
  max={100}
/>
```

### precision

- **类型**: `number`
- **默认值**: `2`
- **必填**: 否

小数精度，控制保留几位小数。

```jsx
<InputNumber
  value={value}
  onChange={setValue}
  precision={3}
/>
```

### placeholder

- **类型**: `string`
- **必填**: 否

输入框占位文本。

```jsx
<InputNumber
  value={value}
  onChange={setValue}
  placeholder="请输入金额"
/>
```

### className

- **类型**: `string`
- **必填**: 否

自定义类名。

```jsx
<InputNumber
  value={value}
  onChange={setValue}
  className="my-input-number"
/>
```

### style

- **类型**: `object`
- **必填**: 否

自定义样式。

```jsx
<InputNumber
  value={value}
  onChange={setValue}
  style={{ width: '200px' }}
/>
```

## 实例方法

### apiDoFocus()

聚焦到输入框。

```jsx
const inputRef = React.createRef()

<InputNumber ref={inputRef} value={value} onChange={setValue} />

// 调用聚焦
inputRef.current.apiDoFocus()
```

## 特性说明

### 输入验证

- 只允许输入数字和小数点
- 自动过滤非法字符
- 支持负数输入

### 自动修正

- 当输入值超出 `min`/`max` 范围时，自动修正为边界值
- 当小数位数超过 `precision` 时，自动截断

### 值处理

- 空值返回 `null`，而不是空字符串
- 非数字输入会被过滤
- 支持受控组件模式

## 使用场景

### 金额输入

```jsx
<InputNumber
  value={amount}
  onChange={setAmount}
  precision={2}
  min={0}
  max={999999}
  placeholder="请输入金额"
/>
```

### 数量输入

```jsx
<InputNumber
  value={quantity}
  onChange={setQuantity}
  precision={0}
  min={1}
  max={99}
/>
```

### 百分比输入

```jsx
<InputNumber
  value={percentage}
  onChange={setPercentage}
  precision={2}
  min={0}
  max={100}
/>
```

## 完整示例

```jsx
function FormExample() {
  const [formData, setFormData] = React.useState({
    price: null,
    quantity: 1,
    discount: 0
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div>
      <InputNumber
        value={formData.price}
        onChange={(value) => handleChange('price', value)}
        min={0}
        precision={2}
        placeholder="商品价格"
      />

      <InputNumber
        value={formData.quantity}
        onChange={(value) => handleChange('quantity', value)}
        min={1}
        max={999}
        precision={0}
        placeholder="购买数量"
      />

      <InputNumber
        value={formData.discount}
        onChange={(value) => handleChange('discount', value)}
        min={0}
        max={100}
        precision={2}
        placeholder="折扣率(%)"
      />
    </div>
  )
}
```
