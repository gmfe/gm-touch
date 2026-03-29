# Loading

加载组件，用于展示加载中的状态，包含基础加载、区域加载和全屏加载三种形式。

## 组件说明

Loading 包含三个子组件：

- **Loading** - 基础加载组件，展示旋转的加载图标
- **LoadingChunk** - 区域加载组件，在指定区域内展示加载遮罩
- **LoadingFullScreen** - 全屏加载组件，覆盖整个页面的加载状态

## API

### Loading Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| text | 加载提示文本 | `string` | - | 否 |
| secondReading | 是否显示秒数计时 | `boolean` | - | 否 |
| size | 加载图标大小（px） | `number` | `50` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### LoadingChunk Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| loading | 是否显示加载状态 | `boolean` | - | 否 |
| text | 加载提示文本 | `string` | - | 否 |
| secondReading | 是否显示秒数计时 | `boolean` | - | 否 |
| size | 加载图标大小（px） | `number` | `50` | 否 |
| children | 子组件 | `ReactNode` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### LoadingFullScreen Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| text | 加载提示文本 | `string` | - | 否 |
| secondReading | 是否显示秒数计时 | `boolean` | - | 否 |
| size | 加载图标大小（px） | `number` | `50` | 否 |

### LoadingFullScreen 静态方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| render | 显示全屏加载 | `(props: LoadingFullScreenProps) => void` |
| hide | 隐藏全屏加载 | `() => void` |

## 示例

### 基础加载

```jsx
import { Loading } from '@gm-touch/react'

<Loading />
<Loading text='加载中...' />
<Loading text='处理中...' secondReading />
```

### 自定义大小

```jsx
import { Loading } from '@gm-touch/react'

<Loading size={30} />
<Loading size={80} text='加载中...' />
```

### 区域加载

```jsx
import { LoadingChunk } from '@gm-touch/react'

function MyComponent() {
  const [loading, setLoading] = React.useState(false)

  return (
    <LoadingChunk loading={loading} text='加载中...' size={60}>
      <div style={{ height: '200px', padding: '20px' }}>
        这里是内容区域
      </div>
    </LoadingChunk>
  )
}
```

### 全屏加载

```jsx
import { LoadingFullScreen } from '@gm-touch/react'

function MyComponent() {
  const showLoading = () => {
    LoadingFullScreen.render({
      text: '拼命加载中...',
      secondReading: true
    })

    // 模拟异步操作
    setTimeout(() => {
      LoadingFullScreen.hide()
    }, 3000)
  }

  return <button onClick={showLoading}>开始加载</button>
}
```

### 异步操作模式

```jsx
import { LoadingFullScreen } from '@gm-touch/react'

async function fetchData() {
  LoadingFullScreen.render({ text: '加载数据中...' })

  try {
    const response = await fetch('/api/data')
    const data = await response.json()
    return data
  } finally {
    LoadingFullScreen.hide()
  }
}
```

### 完整示例

```jsx
import { Loading, LoadingChunk, LoadingFullScreen } from '@gm-touch/react'
import { Button } from '@gm-touch/react'

function LoadingExample() {
  const [chunkLoading, setChunkLoading] = React.useState(false)

  const handleChunkLoad = () => {
    setChunkLoading(true)
    setTimeout(() => setChunkLoading(false), 2000)
  }

  const handleFullScreenLoad = () => {
    LoadingFullScreen.render({
      text: '处理中...',
      secondReading: true,
      size: 60
    })
    setTimeout(() => LoadingFullScreen.hide(), 3000)
  }

  return (
    <div>
      <h3>基础加载</h3>
      <Loading text='加载中...' secondReading />

      <h3>区域加载</h3>
      <LoadingChunk loading={chunkLoading} text='数据加载中...' size={60}>
        <div style={{ height: '150px', background: '#f5f5f5' }}>
          内容区域
        </div>
      </LoadingChunk>
      <Button onClick={handleChunkLoad}>刷新数据</Button>

      <h3>全屏加载</h3>
      <Button onClick={handleFullScreenLoad}>全屏加载</Button>
    </div>
  )
}
```

## 注意事项

1. **Loading 组件**：
   - 适合用于页面局部区域的加载状态展示
   - `secondReading` 属性会自动计时，显示加载持续的秒数

2. **LoadingChunk 组件**：
   - 用于包裹需要展示加载状态的内容区域
   - 当 `loading` 为 `true` 时，会显示遮罩层覆盖内容
   - 建议设置 `size` 属性以控制加载图标大小

3. **LoadingFullScreen 组件**：
   - 使用静态方法 `render()` 和 `hide()` 控制显示和隐藏
   - 全屏加载时会禁止页面滚动
   - 务必确保在适当的时候调用 `hide()` 方法，避免页面一直处于加载状态
   - 建议在 `try-finally` 中使用，确保即使出错也能隐藏加载状态

4. **性能建议**：
   - 避免频繁切换加载状态
   - 全屏加载适合用于页面级或长时间的操作
   - 区域加载适合用于卡片、列表等局部区域的刷新

## 相关组件

- [Progress](../progress/README.md) - 线性进度条组件
- [ProgressCircle](../progress_circle/README.md) - 圆形进度条组件
