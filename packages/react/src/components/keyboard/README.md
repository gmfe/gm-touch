# Keyboard 虚拟键盘

虚拟数字键盘组件，适用于移动端数字输入场景。

## 基本使用

```jsx
import { Keyboard } from '@gm-touch/components'

function App() {
  const handleShowKeyboard = () => {
    Keyboard.render({
      onKeyClick: (keyInfo) => {
        console.log('点击按键:', keyInfo)
      },
      onBackSpace: () => {
        console.log('退格')
      },
      onClear: () => {
        console.log('清空')
      },
      onCancel: () => {
        console.log('取消')
        Keyboard.hide()
      },
      onConfirm: () => {
        console.log('确认')
        Keyboard.hide()
      },
      onHide: Keyboard.hide
    })
  }

  return <button onClick={handleShowKeyboard}>显示键盘</button>
}
```

## 静态方法

### Keyboard.render()

显示虚拟键盘。

**参数：**

- `title` (string): 键盘标题
- `onKeyClick` (func, 必填): 数字键点击回调
- `onBackSpace` (func, 必填): 退格键点击回调
- `onClear` (func, 必填): 清空键点击回调
- `onCancel` (func, 必填): 取消键点击回调
- `onConfirm` (func, 必填): 确认键点击回调
- `customFuncArea` (element, 可选): 自定义功能区域
- `onHide` (func): 隐藏时的回调

```jsx
Keyboard.render({
  title: '请输入金额',
  onKeyClick: (keyInfo) => {
    console.log('按键:', keyInfo.value)
  },
  onBackSpace: () => {
    // 处理退格逻辑
  },
  onClear: () => {
    // 处理清空逻辑
  },
  onCancel: () => {
    Keyboard.hide()
  },
  onConfirm: () => {
    // 处理确认逻辑
    Keyboard.hide()
  }
})
```

### Keyboard.hide()

隐藏虚拟键盘。

```jsx
Keyboard.hide()
```

## 按键类型

### Keyboard.TYPE

键盘按键类型常量：

- `TYPE.NUMBER`: 数字键 (0-9)
- `TYPE.DOT`: 小数点键
- `TYPE.FUNC.BACK`: 退格键
- `TYPE.FUNC.CLEAR`: 清空键
- `TYPE.FUNC.CANCEL`: 取消键
- `TYPE.FUNC.ENTER`: 确认键

```jsx
import { Keyboard } from '@gm-touch/components'

const { TYPE } = Keyboard

if (keyInfo.type === TYPE.NUMBER) {
  console.log('是数字键')
}
```

## Props

### onKeyClick

- **类型**: `func`
- **必填**: 是

数字键点击回调，接收 `keyInfo` 参数。

```jsx
Keyboard.render({
  onKeyClick: (keyInfo) => {
    // keyInfo = { type: 'number', value: '1' }
    console.log('点击了:', keyInfo.value)
  }
})
```

### onBackSpace

- **类型**: `func`
- **必填**: 是

退格键点击回调。

```jsx
Keyboard.render({
  onBackSpace: () => {
    // 删除最后一个字符
    setValue(value => value.slice(0, -1))
  }
})
```

### onClear

- **类型**: `func`
- **必填**: 是

清空键点击回调。

```jsx
Keyboard.render({
  onClear: () => {
    // 清空所有内容
    setValue('')
  }
})
```

### onCancel

- **类型**: `func`
- **必填**: 是

取消键点击回调，通常用于关闭键盘。

```jsx
Keyboard.render({
  onCancel: () => {
    Keyboard.hide()
  }
})
```

### onConfirm

- **类型**: `func`
- **必填**: 是

确认键点击回调，通常用于提交输入并关闭键盘。

```jsx
Keyboard.render({
  onConfirm: () => {
    // 提交表单
    onSubmit()
    Keyboard.hide()
  }
})
```

### customFuncArea

- **类型**: `element`
- **必填**: 否

自定义功能区域，替换默认的确认按钮。

```jsx
Keyboard.render({
  customFuncArea: (
    <div>
      <button onClick={handleSubmit}>提交</button>
      <button onClick={handleCancel}>取消</button>
    </div>
  )
})
```

## 使用场景

### 金额输入

```jsx
function AmountInput() {
  const [amount, setAmount] = React.useState('')

  const handleShowKeyboard = () => {
    Keyboard.render({
      title: '请输入金额',
      onKeyClick: (keyInfo) => {
        if (keyInfo.type === Keyboard.TYPE.NUMBER) {
          setAmount(prev => prev + keyInfo.value)
        } else if (keyInfo.type === Keyboard.TYPE.DOT) {
          if (!amount.includes('.')) {
            setAmount(prev => prev + '.')
          }
        }
      },
      onBackSpace: () => {
        setAmount(prev => prev.slice(0, -1))
      },
      onClear: () => {
        setAmount('')
      },
      onCancel: () => {
        Keyboard.hide()
      },
      onConfirm: () => {
        console.log('金额:', amount)
        Keyboard.hide()
      }
    })
  }

  return (
    <div>
      <input
        value={amount}
        readOnly
        onClick={handleShowKeyboard}
        placeholder="点击输入金额"
      />
    </div>
  )
}
```

### 密码输入

```jsx
function PasswordInput() {
  const [password, setPassword] = React.useState('')

  const handleShowKeyboard = () => {
    Keyboard.render({
      title: '请输入密码',
      onKeyClick: (keyInfo) => {
        if (keyInfo.type === Keyboard.TYPE.NUMBER) {
          setPassword(prev => prev + keyInfo.value)
        }
      },
      onBackSpace: () => {
        setPassword(prev => prev.slice(0, -1))
      },
      onClear: () => {
        setPassword('')
      },
      onCancel: () => {
        Keyboard.hide()
      },
      onConfirm: () => {
        // 验证密码
        verifyPassword(password)
        Keyboard.hide()
      }
    })
  }

  return (
    <div>
      <input
        type="password"
        value={password}
        readOnly
        onClick={handleShowKeyboard}
        placeholder="点击输入密码"
      />
    </div>
  )
}
```

### 自定义功能区域

```jsx
function CustomKeyboard() {
  const [value, setValue] = React.useState('')

  const handleShowKeyboard = () => {
    Keyboard.render({
      title: '自定义键盘',
      onKeyClick: (keyInfo) => {
        setValue(prev => prev + keyInfo.value)
      },
      onBackSpace: () => {
        setValue(prev => prev.slice(0, -1))
      },
      onClear: () => {
        setValue('')
      },
      onCancel: () => {
        Keyboard.hide()
      },
      onConfirm: () => {
        console.log('值:', value)
        Keyboard.hide()
      },
      customFuncArea: (
        <div className="custom-func-area">
          <button onClick={() => {
            console.log('选项1')
          }}>选项1</button>
          <button onClick={() => {
            console.log('选项2')
          }}>选项2</button>
        </div>
      )
    })
  }

  return <button onClick={handleShowKeyboard}>显示自定义键盘</button>
}
```

## 键盘布局

默认键盘布局如下：

```
[ 1 ] [ 2 ] [ 3 ] [ ← ]
[ 4 ] [ 5 ] [ 6 ] [ . ]
[ 7 ] [ 8 ] [ 9 ] [清空]
[取消] [ 0 ] [   确定   ]
```

- 数字键：0-9
- 小数点：.
- 功能键：←（退格）、清空、取消、确定

## 注意事项

1. **必须实现所有回调函数**：所有 `on*` 回调函数都是必填的，即使某些功能不需要使用
2. **手动关闭键盘**：使用 `Keyboard.hide()` 来关闭键盘
3. **键盘状态管理**：键盘内容需要在父组件中维护状态
4. **国际化支持**：键盘文字会根据当前语言环境自动显示

## 完整示例

```jsx
function CompleteExample() {
  const [inputValue, setInputValue] = React.useState('')
  const [isKeyboardVisible, setIsKeyboardVisible] = React.useState(false)

  const handleShowKeyboard = () => {
    setIsKeyboardVisible(true)
    Keyboard.render({
      title: '请输入数值',
      onKeyClick: (keyInfo) => {
        const { TYPE } = Keyboard

        if (keyInfo.type === TYPE.NUMBER) {
          setInputValue(prev => prev + keyInfo.value)
        } else if (keyInfo.type === TYPE.DOT) {
          // 只允许一个小数点
          if (!inputValue.includes('.')) {
            setInputValue(prev => prev + '.')
          }
        }
      },
      onBackSpace: () => {
        setInputValue(prev => prev.slice(0, -1))
      },
      onClear: () => {
        setInputValue('')
      },
      onCancel: () => {
        setIsKeyboardVisible(false)
        Keyboard.hide()
      },
      onConfirm: () => {
        console.log('提交值:', inputValue)
        setIsKeyboardVisible(false)
        Keyboard.hide()
      },
      onHide: () => {
        setIsKeyboardVisible(false)
      }
    })
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        readOnly
        onClick={handleShowKeyboard}
        placeholder="点击显示键盘"
      />
      {isKeyboardVisible && <p>键盘已显示</p>}
    </div>
  )
}
```
