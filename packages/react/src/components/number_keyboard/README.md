# NumberKeyboard 数字键盘

数字键盘组件，用于输入数字和进行相关操作。

## 何时使用

- 需要在移动端或触摸屏设备上输入数字时
- 需要提供数字输入、小数点、退格、清零等操作的界面
- 适用于秤重、收银、数据录入等场景

## 代码演示

### 基础用法

最简单的用法。

```jsx
import NumberKeyboard from '@gm-touch/components/number_keyboard'

<NumberKeyboard
  onKeyClick={(value) => console.log('点击数字:', value)}
  onBack={() => console.log('退格')}
  onClear={() => console.log('清零')}
  onConfirm={() => console.log('确定')}
  onWeigh={() => console.log('称重')}
/>
```

### 带小数点

设置 `decimal` 属性显示小数点按钮。

```jsx
<NumberKeyboard
  decimal
  onKeyClick={(value) => console.log('点击数字:', value)}
  onBack={() => console.log('退格')}
  onClear={() => console.log('清零')}
  onConfirm={() => console.log('确定')}
  onWeigh={() => console.log('称重')}
/>
```

### 带称重功能

同时设置 `decimal` 和 `weigh` 属性，显示小数点和称重按钮。

```jsx
<NumberKeyboard
  decimal
  weigh
  onKeyClick={(value) => console.log('点击数字:', value)}
  onBack={() => console.log('退格')}
  onClear={() => console.log('清零')}
  onConfirm={() => console.log('确定')}
  onWeigh={() => console.log('称重')}
/>
```

### 禁用输入

设置 `inputDisable` 属性禁用数字和小数点输入。

```jsx
<NumberKeyboard
  inputDisable
  onKeyClick={(value) => console.log('点击数字:', value)}
  onBack={() => console.log('退格')}
  onClear={() => console.log('清零')}
  onConfirm={() => console.log('确定')}
  onWeigh={() => console.log('称重')}
/>
```

### 禁用称重

设置 `weightDisable` 属性禁用称重按钮。

```jsx
<NumberKeyboard
  weigh
  weightDisable
  onKeyClick={(value) => console.log('点击数字:', value)}
  onBack={() => console.log('退格')}
  onClear={() => console.log('清零')}
  onConfirm={() => console.log('确定')}
  onWeigh={() => console.log('称重')}
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| onKeyClick | 点击数字键时的回调，参数为点击的数字值 | (value: string) => void | - | 是 |
| onBack | 点击退格键时的回调 | () => void | - | 是 |
| onClear | 点击清零键时的回调 | () => void | - | 是 |
| onConfirm | 点击确定键时的回调 | () => void | - | 是 |
| onWeigh | 点击称重键时的回调 | () => void | - | 是 |
| decimal | 是否显示小数点按钮 | boolean | `false` | 否 |
| weigh | 是否显示称重按钮 | boolean | `false` | 否 |
| weightDisable | 是否禁用称重按钮 | boolean | `false` | 否 |
| inputDisable | 是否禁用输入（数字和小数点） | boolean | `false` | 否 |

## 注意事项

- 所有回调函数都是必填的，组件本身不维护状态，需要父组件自行处理输入逻辑
- 退格键在禁用输入时会显示为灰色图标
- 数字键的布局为固定布局：7-8-9、4-5-6、1-2-3、.-0-称重
- 右侧操作键从上到下为：退格、清零、确定

## 更新日志
