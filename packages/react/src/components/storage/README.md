# Storage

本地存储组件，基于 localStorage 封装，提供了便捷的数据存储和读取方法，支持自动序列化和反序列化。

## API

### 组件 Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| name | 存储的键名 | `string` | - | 是 |
| value | 要存储的值 | `string \| object \| array` | - | 否 |

### 静态方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `Storage.set(key, value)` | 存储数据 | `key: string, value: any` | - |
| `Storage.get(key)` | 获取数据 | `key: string` | `any \| null` |
| `Storage.remove(key)` | 删除数据 | `key: string` | - |
| `Storage.clear()` | 清空所有数据（慎用） | - | - |
| `Storage.getAll()` | 获取所有存储的数据 | - | `object \| null` |

## 示例

### 组件方式使用（自动存储）

```jsx
import { Storage } from '@gm-touch/react'
import { useState } from 'react'

function App() {
  const [inputValue, setInputValue] = useState('')

  return (
    <div>
      <h3>实时存储输入内容</h3>
      <input
        type='text'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder='输入内容会自动保存'
      />
      <Storage name='user-input' value={inputValue} />
      <p>当前值：{inputValue}</p>
      <p>刷新页面后，输入的内容会自动恢复</p>
    </div>
  )
}
```

### 配合 MobX 使用

```jsx
import { Storage } from '@gm-touch/react'
import { observable } from 'mobx'

const store = observable({
  data: '',
  setData(data) {
    this.data = data
  }
})

function App() {
  return (
    <div>
      <input
        type='text'
        value={store.data}
        onChange={event => store.setData(event.target.value)}
      />
      <Storage name='mobx-storage' value={store.data} />
    </div>
  )
}
```

### 静态方法：存储字符串

```jsx
import { Storage } from '@gm-touch/react'

function StringExample() {
  // 存储字符串
  Storage.set('username', 'admin')

  // 获取字符串
  const username = Storage.get('username')
  console.log(username) // 'admin'

  // 删除数据
  Storage.remove('username')

  return <div>查看控制台输出</div>
}
```

### 静态方法：存储对象

```jsx
import { Storage } from '@gm-touch/react'

function ObjectExample() {
  // 存储对象
  const userInfo = {
    name: '张三',
    age: 25,
    email: 'zhangsan@example.com'
  }

  Storage.set('user-info', userInfo)

  // 获取对象
  const savedInfo = Storage.get('user-info')
  console.log(savedInfo) // { name: '张三', age: 25, email: 'zhangsan@example.com' }

  return <div>查看控制台输出</div>
}
```

### 静态方法：存储数组

```jsx
import { Storage } from '@gm-touch/react'

function ArrayExample() {
  // 存储数组
  const shoppingList = [
    { id: 1, name: '苹果', price: 5.5 },
    { id: 2, name: '香蕉', price: 3.0 },
    { id: 3, name: '橙子', price: 4.5 }
  ]

  Storage.set('shopping-list', shoppingList)

  // 获取数组
  const savedList = Storage.get('shopping-list')
  console.log(savedList) // [{ id: 1, name: '苹果', price: 5.5 }, ...]

  return <div>查看控制台输出</div>
}
```

### 静态方法：获取所有存储

```jsx
import { Storage } from '@gm-touch/react'

function GetAllExample() {
  // 先存储一些数据
  Storage.set('key1', 'value1')
  Storage.set('key2', { name: 'test' })
  Storage.set('key3', [1, 2, 3])

  // 获取所有存储的数据
  const allData = Storage.getAll()
  console.log(allData)
  // {
  //   key1: 'value1',
  //   key2: { name: 'test' },
  //   key3: [1, 2, 3]
  // }

  return <div>查看控制台输出</div>
}
```

### 完整示例：表单数据持久化

```jsx
import { Storage } from '@gm-touch/react'
import { useState, useEffect } from 'react'

function FormPersistence() {
  const [formData, setFormData] = useState(() => {
    // 初始化时从 localStorage 读取数据
    return Storage.get('form-data') || {
      username: '',
      email: '',
      phone: ''
    }
  })

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
  }

  return (
    <div style={{ maxWidth: '400px' }}>
      <h2>注册表单</h2>
      <div style={{ marginBottom: '16px' }}>
        <label>用户名：</label>
        <input
          type='text'
          value={formData.username}
          onChange={e => handleChange('username', e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label>邮箱：</label>
        <input
          type='email'
          value={formData.email}
          onChange={e => handleChange('email', e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label>电话：</label>
        <input
          type='tel'
          value={formData.phone}
          onChange={e => handleChange('phone', e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      {/* 自动保存表单数据 */}
      <Storage name='form-data' value={formData} />
      <p style={{ fontSize: '12px', color: '#999' }}>
        表单数据会自动保存，刷新页面后不会丢失
      </p>
    </div>
  )
}
```

### 完整示例：用户偏好设置

```jsx
import { Storage } from '@gm-touch/react'
import { useState } from 'react'

function UserPreferences() {
  const [preferences, setPreferences] = useState(() => {
    // 读取用户偏好设置
    return Storage.get('user-preferences') || {
      theme: 'light',
      language: 'zh-CN',
      fontSize: 'medium',
      notifications: true
    }
  })

  const updatePreference = (key, value) => {
    const newPreferences = { ...preferences, [key]: value }
    setPreferences(newPreferences)
  }

  return (
    <div style={{ maxWidth: '400px', padding: '20px' }}>
      <h2>用户偏好设置</h2>

      <div style={{ marginBottom: '16px' }}>
        <label>主题：</label>
        <select
          value={preferences.theme}
          onChange={e => updatePreference('theme', e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        >
          <option value='light'>浅色</option>
          <option value='dark'>深色</option>
        </select>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>语言：</label>
        <select
          value={preferences.language}
          onChange={e => updatePreference('language', e.target.value)}
          style={{ width: '100%', padding: '8px' }}
        >
          <option value='zh-CN'>简体中文</option>
          <option value='en-US'>English</option>
        </select>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>
          <input
            type='checkbox'
            checked={preferences.notifications}
            onChange={e => updatePreference('notifications', e.target.checked)}
          />
          启用通知
        </label>
      </div>

      {/* 自动保存偏好设置 */}
      <Storage name='user-preferences' value={preferences} />

      <div style={{ marginTop: '16px', padding: '16px', background: '#f5f5f5' }}>
        <h4>当前设置：</h4>
        <pre>{JSON.stringify(preferences, null, 2)}</pre>
      </div>
    </div>
  )
}
```

### 完整示例：购物车管理

```jsx
import { Storage } from '@gm-touch/react'
import { useState } from 'react'

function ShoppingCart() {
  const [cartItems, setCartItems] = useState(() => {
    return Storage.get('cart-items') || []
  })

  const products = [
    { id: 1, name: '苹果', price: 5.5 },
    { id: 2, name: '香蕉', price: 3.0 },
    { id: 3, name: '橙子', price: 4.5 },
    { id: 4, name: '葡萄', price: 12.0 }
  ]

  const addToCart = product => {
    const existingItem = cartItems.find(item => item.id === product.id)
    let newCartItems

    if (existingItem) {
      newCartItems = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      newCartItems = [...cartItems, { ...product, quantity: 1 }]
    }

    setCartItems(newCartItems)
  }

  const removeFromCart = productId => {
    const newCartItems = cartItems.filter(item => item.id !== productId)
    setCartItems(newCartItems)
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    const newCartItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    )
    setCartItems(newCartItems)
  }

  const clearCart = () => {
    setCartItems([])
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div style={{ maxWidth: '600px', padding: '20px' }}>
      <h2>购物车</h2>

      {/* 商品列表 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>商品列表</h3>
        {products.map(product => (
          <div
            key={product.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px',
              background: '#f5f5f5',
              marginBottom: '8px'
            }}
          >
            <span>{product.name}</span>
            <span>￥{product.price}</span>
            <button onClick={() => addToCart(product)}>添加到购物车</button>
          </div>
        ))}
      </div>

      {/* 购物车 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>购物车内容</h3>
        {cartItems.length === 0 ? (
          <p>购物车为空</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  background: '#e9ecef',
                  marginBottom: '8px'
                }}
              >
                <span>{item.name}</span>
                <div>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span style={{ margin: '0 8px' }}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span>￥{(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)}>删除</button>
              </div>
            ))}
            <div style={{ marginTop: '16px', textAlign: 'right' }}>
              <strong>总计：￥{total.toFixed(2)}</strong>
            </div>
          </>
        )}
      </div>

      <button onClick={clearCart} style={{ marginBottom: '16px' }}>
        清空购物车
      </button>

      {/* 自动保存购物车 */}
      <Storage name='cart-items' value={cartItems} />

      <p style={{ fontSize: '12px', color: '#999' }}>
        购物车数据会自动保存，刷新页面后不会丢失
      </p>
    </div>
  )
}
```

## 注意事项

1. **键名前缀**：
   - 所有存储的键名会自动添加 `_gm-touch_` 前缀
   - 例如：`Storage.set('key', 'value')` 实际存储为 `_gm-touch_key`
   - 这样可以避免与其他 localStorage 数据冲突

2. **数据序列化**：
   - 存储时会自动使用 `JSON.stringify()` 序列化
   - 读取时会自动使用 `JSON.parse()` 反序列化
   - 支持存储字符串、对象、数组等任何 JSON 可序列化的数据

3. **组件方式使用**：
   - 组件会在 `value` 变化时自动保存数据
   - 组件本身不渲染任何内容（返回 `null`）
   - 适合用于实时同步状态到 localStorage

4. **静态方法使用**：
   - 可以在任何地方直接使用静态方法
   - 不需要组件包裹
   - 更灵活，适合按需存储和读取

5. **get 方法**：
   - 如果键不存在，返回 `null`
   - 不会抛出异常
   - 建议在使用前进行空值检查

6. **clear 方法**：
   - 会清除本域名下所有 localStorage 数据
   - 包括非 `_gm-touch_` 前缀的数据
   - 请谨慎使用，建议只使用 `remove` 删除单个键

7. **getAll 方法**：
   - 只返回带 `_gm-touch_` 前缀的数据
   - 返回对象中不包含前缀
   - 如果没有数据，返回 `null`

8. **存储容量**：
   - localStorage 通常有 5-10MB 的容量限制
   - 存储大量数据前请检查容量
   - 建议只存储必要的配置和状态数据

9. **隐私模式**：
   - 在浏览器的隐私/无痕模式下，localStorage 可能不可用
   - 建议在使用前检查 localStorage 是否可用

10. **安全性**：
    - 不要存储敏感信息（如密码、token）
    - localStorage 数据可以被用户查看和修改
    - 重要数据应该在服务器端进行验证

## 相关组件

- 无相关组件，Storage 为独立的存储工具组件
