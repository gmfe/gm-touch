# Tip

轻量级提示组件，用于显示全局消息通知，支持多种类型和自动关闭。

## 组件说明

Tip 是一个全局提示组件，用于显示操作反馈、状态通知等信息。它会在屏幕顶部显示，支持自动关闭和手动关闭。

## 使用方式

Tip 组件提供静态方法调用，无需手动渲染组件。

## API

### 静态方法

#### Tip.tip(options, type)

显示提示信息。

**参数**：
- `options`：配置对象或字符串
  - `children`：提示内容（字符串或 React 元素）
  - `time`：显示时长（毫秒），`0` 表示不自动关闭，默认 `3000`
  - `onClose`：关闭时的回调函数
- `type`：提示类型（`'info'` | `'success'` | `'warning'` | `'danger'`）

**返回值**：返回提示的唯一 ID，可用于手动关闭

#### Tip.success(options)

显示成功提示。

**参数**：
- `options`：配置对象或字符串

#### Tip.info(options)

显示信息提示。

**参数**：
- `options`：配置对象或字符串

#### Tip.warning(options)

显示警告提示。

**参数**：
- `options`：配置对象或字符串

#### Tip.danger(options)

显示错误提示。

**参数**：
- `options`：配置对象或字符串

#### Tip.clear(id)

手动关闭指定的提示。

**参数**：
- `id`：提示的 ID（由静态方法返回）

#### Tip.clearAll()

关闭所有提示。

## 示例

### 基础用法

```jsx
import { Tip } from '@gm-touch/react'

function App() {
  return (
    <div>
      <button onClick={() => Tip.tip('默认提示')}>
        默认提示
      </button>
      <button onClick={() => Tip.tip('这是提示内容', 'info')}>
        指定类型
      </button>
    </div>
  )
}
```

### 成功提示

```jsx
import { Tip } from '@gm-touch/react'

function App() {
  const handleSuccess = () => {
    Tip.success('操作成功！')
  }

  return (
    <button onClick={handleSuccess}>
      显示成功提示
    </button>
  )
}
```

### 信息提示

```jsx
import { Tip } from '@gm-touch/react'

function App() {
  return (
    <button onClick={() => Tip.info('这是一条信息')}>
      显示信息提示
    </button>
  )
}
```

### 警告提示

```jsx
import { Tip } from '@gm-touch/react'

function App() {
  return (
    <button onClick={() => Tip.warning('请注意检查输入')}>
      显示警告提示
    </button>
  )
}
```

### 错误提示

```jsx
import { Tip } from '@gm-touch/react'

function App() {
  const handleError = () => {
    Tip.danger('操作失败，请重试')
  }

  return (
    <button onClick={handleError}>
      显示错误提示
    </button>
  )
}
```

### 自定义显示时长

```jsx
import { Tip } from '@gm-touch/react'

function App() {
  return (
    <div>
      {/* 显示 5 秒 */}
      <button onClick={() => Tip.success({
        children: '5秒后关闭',
        time: 5000
      })}>
        5秒后关闭
      </button>

      {/* 显示 1 秒 */}
      <button onClick={() => Tip.info({
        children: '1秒后关闭',
        time: 1000
      })}>
        1秒后关闭
      </button>
    </div>
  )
}
```

### 不自动关闭

```jsx
import { Tip } from '@gm-touch/react'

function App() {
  const showPersistentTip = () => {
    Tip.success({
      children: '需要手动关闭的提示',
      time: 0 // 不自动关闭
    })
  }

  return (
    <button onClick={showPersistentTip}>
      显示持久提示
    </button>
  )
}
```

### 带回调函数

```jsx
import { Tip } from '@gm-touch/react'

function App() {
  const handleTipClose = () => {
    console.log('提示已关闭')
    // 执行其他操作
  }

  return (
    <button onClick={() => Tip.success({
      children: '提示信息',
      onClose: handleTipClose
    })}>
      带回调的提示
    </button>
  )
}
```

### 手动关闭指定提示

```jsx
import { Tip } from '@gm-touch/react'

function App() {
  let tipId = null

  const showTip = () => {
    tipId = Tip.info({
      children: '可以手动关闭的提示',
      time: 0
    })
  }

  const closeTip = () => {
    if (tipId) {
      Tip.clear(tipId)
    }
  }

  return (
    <div>
      <button onClick={showTip}>显示提示</button>
      <button onClick={closeTip}>关闭提示</button>
    </div>
  )
}
```

### 关闭所有提示

```jsx
import { Tip } from '@gm-touch/react'

function App() {
  const showMultipleTips = () => {
    Tip.success('提示 1')
    Tip.info('提示 2')
    Tip.warning('提示 3')
  }

  return (
    <div>
      <button onClick={showMultipleTips}>
        显示多个提示
      </button>
      <button onClick={() => Tip.clearAll()}>
        关闭所有提示
      </button>
    </div>
  )
}
```

### 自定义内容

```jsx
import { Tip } from '@gm-touch/react'

function App() {
  const showCustomTip = () => {
    Tip.success({
      children: (
        <div>
          <div style={{ fontWeight: 'bold' }}>
            自定义内容
          </div>
          <div style={{ fontSize: '12px' }}>
            支持 React 元素
          </div>
        </div>
      )
    })
  }

  return (
    <button onClick={showCustomTip}>
      自定义内容提示
    </button>
  )
}
```

### 表单操作反馈

```jsx
import { Tip } from '@gm-touch/react'

function FormComponent() {
  const handleSubmit = async () => {
    try {
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 1000))

      Tip.success('表单提交成功！')
    } catch (error) {
      Tip.danger('提交失败，请检查网络连接')
    }
  }

  const handleReset = () => {
    Tip.info('表单已重置')
  }

  return (
    <form>
      <button type="button" onClick={handleSubmit}>
        提交
      </button>
      <button type="button" onClick={handleReset}>
        重置
      </button>
    </form>
  )
}
```

### 数据操作反馈

```jsx
import { Tip } from '@gm-touch/react'

function DataTable() {
  const handleDelete = async (id) => {
    try {
      // 执行删除操作
      await deleteItem(id)

      Tip.success({
        children: `ID ${id} 已删除`,
        time: 2000
      })
    } catch (error) {
      Tip.danger('删除失败：' + error.message)
    }
  }

  const handleUpdate = async (id, data) => {
    try {
      await updateItem(id, data)
      Tip.success('更新成功')
    } catch (error) {
      Tip.warning('更新失败，请重试')
    }
  }

  return (
    <table>
      {/* 表格内容 */}
    </table>
  )
}
```

### 文件上传反馈

```jsx
import { Tip } from '@gm-touch/react'

function FileUploader() {
  const handleUpload = async (file) => {
    // 显示上传中提示
    const loadingTipId = Tip.info({
      children: '正在上传...',
      time: 0
    })

    try {
      await uploadFile(file)

      // 关闭上传中提示
      Tip.clear(loadingTipId)

      // 显示成功提示
      Tip.success('文件上传成功！')
    } catch (error) {
      Tip.clear(loadingTipId)
      Tip.danger('上传失败：' + error.message)
    }
  }

  return (
    <input
      type="file"
      onChange={(e) => handleUpload(e.target.files[0])}
    />
  )
}
```

### 网络请求反馈

```jsx
import { Tip } from '@gm-touch/react'

function DataLoader() {
  const loadData = async () => {
    try {
      const response = await fetch('/api/data')

      if (!response.ok) {
        throw new Error('网络响应异常')
      }

      const data = await response.json()

      Tip.success(`成功加载 ${data.length} 条数据`)
    } catch (error) {
      Tip.danger('加载失败：' + error.message)
    }
  }

  return (
    <button onClick={loadData}>
      加载数据
    </button>
  )
}
```

### 批量操作反馈

```jsx
import { Tip } from '@gm-touch/react'

function BatchOperations() {
  const handleBatchDelete = async (ids) => {
    try {
      let successCount = 0
      let failCount = 0

      for (const id of ids) {
        try {
          await deleteItem(id)
          successCount++
        } catch (error) {
          failCount++
        }
      }

      if (failCount === 0) {
        Tip.success(`成功删除 ${successCount} 项`)
      } else {
        Tip.warning({
          children: `完成：成功 ${successCount} 项，失败 ${failCount} 项`,
          time: 5000
        })
      }
    } catch (error) {
      Tip.danger('批量操作失败')
    }
  }

  return (
    <button onClick={() => handleBatchDelete([1, 2, 3])}>
      批量删除
    </button>
  )
}
```

## 完整示例

### 用户注册流程

```jsx
import { Tip } from '@gm-touch/react'

function RegisterForm() {
  const handleSubmit = async (formData) => {
    // 验证表单
    if (!formData.username) {
      Tip.warning('请输入用户名')
      return
    }

    if (!formData.email) {
      Tip.warning('请输入邮箱')
      return
    }

    if (!isValidEmail(formData.email)) {
      Tip.danger('邮箱格式不正确')
      return
    }

    try {
      // 发送注册请求
      const result = await registerAPI(formData)

      if (result.success) {
        Tip.success({
          children: '注册成功！正在跳转...',
          time: 2000,
          onClose: () => {
            // 跳转到登录页
            window.location.href = '/login'
          }
        })
      } else {
        Tip.danger(result.message || '注册失败')
      }
    } catch (error) {
      Tip.danger('网络错误，请稍后重试')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单字段 */}
    </form>
  )
}
```

### 购物车操作

```jsx
import { Tip } from '@gm-touch/react'

function ShoppingCart() {
  const [items, setItems] = useState([])

  const addToCart = (product) => {
    setItems([...items, product])
    Tip.success(`已添加 ${product.name} 到购物车`)
  }

  const removeFromCart = (productId) => {
    setItems(items.filter(item => item.id !== productId))
    Tip.info('商品已从购物车移除')
  }

  const checkout = async () => {
    try {
      await createOrder(items)
      Tip.success({
        children: '订单创建成功！',
        time: 0,
        onClose: () => {
          // 跳转到支付页面
          window.location.href = '/payment'
        }
      })
    } catch (error) {
      Tip.danger('创建订单失败')
    }
  }

  return (
    <div>
      <button onClick={() => addToCart({ id: 1, name: '商品A' })}>
        添加商品
      </button>
      <button onClick={checkout}>
        结算
      </button>
    </div>
  )
}
```

## 特性说明

### 自动堆叠

- 多个 Tip 会自动在屏幕顶部堆叠显示
- 新的提示会从右侧滑入
- 关闭时会自动调整其他提示的位置

### 点击关闭

- 提示可以通过点击关闭
- 手动关闭时会触发 `onClose` 回调

### LayoutRoot 依赖

- Tip 组件依赖 LayoutRoot 组件
- 确保应用中有 LayoutRoot 包裹

## 样式定制

### 默认样式

- 固定在屏幕顶部
- 从右侧淡入动画
- 带有对应的图标和颜色
- 最大宽度限制，超出自动换行

### 主题色

不同类型的提示有不同的颜色：
- `info` - 蓝色
- `success` - 绿色
- `warning` - 橙色
- `danger` - 红色

## 注意事项

1. **LayoutRoot 依赖**：
   - 确保应用中有 `LayoutRoot` 组件
   - `LayoutRoot` 应该放在应用组件树的最外层

2. **显示时长**：
   - 默认显示 3 秒
   - 设置 `time: 0` 可以不自动关闭
   - 建议根据内容重要性设置合适的时长

3. **内容建议**：
   - 保持提示信息简短明了
   - 避免在提示中放置复杂内容
   - 优先使用简洁的文字描述

4. **使用场景**：
   - 适合全局通知和操作反馈
   - 不适合复杂的交互场景
   - 复杂场景建议使用 Modal 或 Drawer

5. **性能考虑**：
   - 避免频繁触发大量提示
   - 及时清理不需要的提示
   - 使用 `clearAll()` 在页面切换时清理提示

6. **类型选择**：
   - `success`：操作成功、完成状态
   - `info`：一般信息、状态更新
   - `warning`：需要注意、可能的问题
   - `danger`：错误、失败、危险操作

7. **回调函数**：
   - `onClose` 在提示关闭时触发
   - 可用于执行后续操作
   - 避免在回调中执行耗时操作

## 相关组件

- [Modal](../modal/README.md) - 模态框组件
- [Drawer](../drawer/README.md) - 抽屉组件
- [LayoutRoot](../layout_root/README.md) - 布局根组件
