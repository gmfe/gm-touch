# NProgress

全局进度条组件，用于显示页面加载、异步操作等进度的顶部进度条。

## 组件说明

NProgress 是一个简洁的顶部进度条组件，适合用于显示页面加载、数据请求等异步操作的进度。它支持引用计数，可以同时处理多个并发请求。

## 使用方式

NProgress 组件提供静态方法调用，无需手动渲染组件。

## API

### 静态方法

#### NProgress.start()

开始显示进度条。

**说明**：
- 使用引用计数机制
- 多次调用 `start()` 会增加计数
- 只有第一次调用时会显示进度条

#### NProgress.done()

结束进度条。

**说明**：
- 减少引用计数
- 当计数归零时，进度条会进入完成状态
- 完成状态持续 250ms 后自动隐藏

## 示例

### 基础用法

```jsx
import { NProgress } from '@gm-touch/react'

function App() {
  const startProgress = () => {
    NProgress.start()
  }

  const stopProgress = () => {
    NProgress.done()
  }

  return (
    <div>
      <button onClick={startProgress}>
        开始进度
      </button>
      <button onClick={stopProgress}>
        结束进度
      </button>
    </div>
  )
}
```

### 模拟异步操作

```jsx
import { NProgress } from '@gm-touch/react'

function App() {
  const fetchData = async () => {
    NProgress.start()

    try {
      // 模拟网络请求
      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log('数据加载完成')
    } catch (error) {
      console.error('加载失败', error)
    } finally {
      NProgress.done()
    }
  }

  return (
    <button onClick={fetchData}>
      加载数据
    </button>
  )
}
```

### 页面切换加载

```jsx
import { NProgress } from '@gm-touch/react'
import { useEffect } from 'react'

function PageLoader({ children, loading }) {
  useEffect(() => {
    if (loading) {
      NProgress.start()
    } else {
      NProgress.done()
    }

    // 组件卸载时确保进度条结束
    return () => {
      NProgress.done()
    }
  }, [loading])

  return children
}

// 使用示例
function App() {
  const [pageLoading, setPageLoading] = useState(false)

  const changePage = async () => {
    setPageLoading(true)
    await loadPageData()
    setPageLoading(false)
  }

  return (
    <PageLoader loading={pageLoading}>
      <button onClick={changePage}>切换页面</button>
    </PageLoader>
  )
}
```

### 路由切换

```jsx
import { NProgress } from '@gm-touch/react'
import { useEffect } from 'react'

function RouterProgress() {
  useEffect(() => {
    const handleRouteChangeStart = () => {
      NProgress.start()
    }

    const handleRouteChangeComplete = () => {
      NProgress.done()
    }

    // 监听路由变化（根据实际路由库调整）
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeComplete)
    }
  }, [])

  return null
}

// 在应用中使用
function App() {
  return (
    <>
      <RouterProgress />
      <Router>{/* 路由配置 */}</Router>
    </>
  )
}
```

### 网络请求拦截器

```jsx
import { NProgress } from '@gm-touch/react'

// Axios 拦截器
function setupAxiosInterceptors(axios) {
  let requestCount = 0

  axios.interceptors.request.use(config => {
    requestCount++
    if (requestCount === 1) {
      NProgress.start()
    }
    return config
  })

  axios.interceptors.response.use(
    response => {
      requestCount--
      if (requestCount === 0) {
        NProgress.done()
      }
      return response
    },
    error => {
      requestCount--
      if (requestCount === 0) {
        NProgress.done()
      }
      return Promise.reject(error)
    }
  )
}

// 使用
import axios from 'axios'
setupAxiosInterceptors(axios)

// 在组件中
function DataComponent() {
  const loadData = async () => {
    // 进度条会自动显示
    const response = await axios.get('/api/data')
    // 进度条会自动隐藏
    return response.data
  }

  return <button onClick={loadData}>加载数据</button>
}
```

### 多个并发请求

```jsx
import { NProgress } from '@gm-touch/react'

function App() {
  const loadMultipleData = async () => {
    NProgress.start()
    NProgress.start() // 计数变为 2
    NProgress.start() // 计数变为 3

    try {
      // 并发请求
      const [data1, data2, data3] = await Promise.all([
        fetch('/api/data1'),
        fetch('/api/data2'),
        fetch('/api/data3')
      ])

      NProgress.done() // 计数变为 2
      NProgress.done() // 计数变为 1
      NProgress.done() // 计数变为 0，进度条隐藏
    } catch (error) {
      // 确保所有请求都调用 done
      NProgress.done()
      NProgress.done()
      NProgress.done()
    }
  }

  return (
    <button onClick={loadMultipleData}>
      并发加载
    </button>
  )
}
```

### 文件上传进度

```jsx
import { NProgress } from '@gm-touch/react'

function FileUploader() {
  const uploadFile = async (file) => {
    NProgress.start()

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        console.log('上传成功')
      } else {
        throw new Error('上传失败')
      }
    } catch (error) {
      console.error('上传错误', error)
    } finally {
      NProgress.done()
    }
  }

  return (
    <input
      type="file"
      onChange={(e) => uploadFile(e.target.files[0])}
    />
  )
}
```

### 表单提交

```jsx
import { NProgress } from '@gm-touch/react'

function FormComponent() {
  const handleSubmit = async (formData) => {
    NProgress.start()

    try {
      // 提交表单
      await submitForm(formData)

      console.log('提交成功')
    } catch (error) {
      console.error('提交失败', error)
    } finally {
      NProgress.done()
    }
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      handleSubmit(formData)
    }}>
      <button type="submit">提交</button>
    </form>
  )
}
```

### 数据导出

```jsx
import { NProgress } from '@gm-touch/react'

function DataExporter() {
  const exportData = async () => {
    NProgress.start()

    try {
      // 请求导出
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ format: 'xlsx' })
      })

      if (response.ok) {
        // 下载文件
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'data.xlsx'
        a.click()

        console.log('导出成功')
      }
    } catch (error) {
      console.error('导出失败', error)
    } finally {
      NProgress.done()
    }
  }

  return (
    <button onClick={exportData}>
      导出数据
    </button>
  )
}
```

### 长时间操作

```jsx
import { NProgress } from '@gm-touch/react'

function LongRunningTask() {
  const executeTask = async () => {
    NProgress.start()

    try {
      // 执行多个步骤
      await step1()
      await step2()
      await step3()

      console.log('任务完成')
    } catch (error) {
      console.error('任务失败', error)
    } finally {
      NProgress.done()
    }
  }

  const step1 = async () => {
    // 第一步
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  const step2 = async () => {
    // 第二步
    await new Promise(resolve => setTimeout(resolve, 1500))
  }

  const step3 = async () => {
    // 第三步
    await new Promise(resolve => setTimeout(resolve, 800))
  }

  return (
    <button onClick={executeTask}>
      执行任务
    </button>
  )
}
```

### 自定义 Hook 封装

```jsx
import { NProgress } from '@gm-touch/react'
import { useEffect } from 'react'

function useProgress(condition) {
  useEffect(() => {
    if (condition) {
      NProgress.start()
      return () => {
        NProgress.done()
      }
    }
  }, [condition])
}

// 使用示例
function DataLoader() {
  const [loading, setLoading] = useState(false)

  useProgress(loading)

  const loadData = async () => {
    setLoading(true)
    try {
      await fetchData()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={loadData}>
      加载数据
    </button>
  )
}
```

### React Router 集成

```jsx
import { NProgress } from '@gm-touch/react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function RouteChangeListener() {
  const location = useLocation()

  useEffect(() => {
    NProgress.start()

    // 模拟页面加载
    const timer = setTimeout(() => {
      NProgress.done()
    }, 500)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return null
}

// 在应用中使用
function App() {
  return (
    <>
      <RouteChangeListener />
      <Routes>{/* 路由配置 */}</Routes>
    </>
  )
}
```

## 完整示例

### 数据看板加载

```jsx
import { NProgress } from '@gm-touch/react'
import { useState } from 'react'

function Dashboard() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  const loadDashboard = async () => {
    setLoading(true)
    NProgress.start()

    try {
      // 加载多个数据源
      const [stats, charts, tables] = await Promise.all([
        fetchStats(),
        fetchCharts(),
        fetchTables()
      ])

      setData({
        stats,
        charts,
        tables
      })
    } catch (error) {
      console.error('加载失败', error)
    } finally {
      setLoading(false)
      NProgress.done()
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  if (loading) {
    return <div>加载中...</div>
  }

  return (
    <div>
      <h1>数据看板</h1>
      {/* 显示数据 */}
    </div>
  )
}
```

### 图片懒加载

```jsx
import { NProgress } from '@gm-touch/react'
import { useState, useEffect } from 'react'

function ImageGallery({ images }) {
  const [loading, setLoading] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0)

  useEffect(() => {
    if (loading) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [loading])

  const handleImageLoad = () => {
    setLoadedCount(prev => prev + 1)
    if (loadedCount + 1 >= images.length) {
      setLoading(false)
    }
  }

  const loadImages = () => {
    setLoading(true)
    setLoadedCount(0)
  }

  return (
    <div>
      <button onClick={loadImages}>
        加载图片
      </button>

      <div>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={image.alt}
            onLoad={handleImageLoad}
            style={{ display: loading ? 'none' : 'block' }}
          />
        ))}
      </div>
    </div>
  )
}
```

## 特性说明

### 引用计数机制

- 多次调用 `start()` 会增加内部计数
- 只有第一次调用时显示进度条
- 每次调用 `done()` 会减少计数
- 计数归零时进度条才会消失

### 自动管理

- 进度条会自动添加到页面顶部
- 完成时会自动添加完成状态样式
- 完成状态持续 250ms 后自动移除

### LayoutRoot 依赖

- NProgress 组件依赖 LayoutRoot 组件
- 确保应用中有 LayoutRoot 包裹

## 样式定制

### 默认样式

- 固定在页面顶部
- 高度约为 3px
- 蓝色进度条
- 加载状态：持续动画
- 完成状态：快速滑出

### CSS 类名

组件使用以下 CSS 类名：
- `.t-nprogress` - 进度条容器
- `.t-nprogress-loading` - 加载状态
- `.t-nprogress-completed` - 完成状态

可以通过覆盖这些类来自定义样式。

## 注意事项

1. **LayoutRoot 依赖**：
   - 确保应用中有 `LayoutRoot` 组件
   - `LayoutRoot` 应该放在应用组件树的最外层

2. **配对使用**：
   - 每次 `start()` 调用都应该对应一个 `done()` 调用
   - 建议使用 try-finally 确保配对
   - 避免遗漏 `done()` 导致进度条不消失

3. **引用计数**：
   - 多次 `start()` 需要对应次数的 `done()`
   - 适用于处理多个并发请求
   - 确保每个请求都正确调用 `done()`

4. **异步操作**：
   - 在异步操作开始时调用 `start()`
   - 在异步操作结束时调用 `done()`
   - 使用 try-finally 确保异常时也能结束

5. **路由切换**：
   - 适合用于页面切换加载
   - 建议在路由变化事件中使用
   - 配合路由库的生命周期

6. **性能考虑**：
   - 进度条本身性能开销很小
   - 适合用于频繁的异步操作
   - 不会阻塞主线程

7. **使用场景**：
   - 页面加载和路由切换
   - 数据请求和表单提交
   - 文件上传和导出
   - 任何需要加载状态的操作

8. **最佳实践**：
   - 封装成自定义 Hook 或拦截器
   - 统一管理异步操作的加载状态
   - 在组件卸载时确保调用 `done()`

## 相关组件

- [LayoutRoot](../layout_root/README.md) - 布局根组件
- [Loading](../loading/README.md) - 加载中组件
- [Progress](../progress/README.md) - 进度条组件
