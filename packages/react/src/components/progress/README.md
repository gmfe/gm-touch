# Progress

线性进度条组件，用于展示操作的当前进度。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| percentage | 进度百分比（0-100） | `number` | - | 是 |
| height | 进度条高度 | `string` | - | 否 |
| progressColor | 进度条颜色 | `string` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 特性说明

- **响应式宽度**：进度条宽度会自动适应父容器宽度
- **自定义样式**：支持自定义高度和颜色
- **平滑过渡**：进度变化时具有平滑的过渡效果

## 示例

### 基础用法

```jsx
import { Progress } from '@gm-touch/react'

<Progress percentage={30} />
<Progress percentage={50} />
<Progress percentage={80} />
```

### 自定义高度

```jsx
import { Progress } from '@gm-touch/react'

<Progress percentage={60} height='10px' />
<Progress percentage={60} height='20px' />
<Progress percentage={60} height='30px' />
```

### 自定义颜色

```jsx
import { Progress } from '@gm-touch/react'

<Progress percentage={40} progressColor='#1890ff' />
<Progress percentage={60} progressColor='#52c41a' />
<Progress percentage={80} progressColor='#faad14' />
<Progress percentage={100} progressColor='#f5222d' />
```

### 完整示例

```jsx
import { Progress } from '@gm-touch/react'
import { useState, useEffect } from 'react'

function ProgressExample() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 10
      })
    }, 500)

    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <h3>文件上传进度</h3>
      <Progress percentage={progress} height='20px' progressColor='#1890ff' />
      <p>{progress}%</p>
    </div>
  )
}
```

### 多种状态

```jsx
import { Progress } from '@gm-touch/react'

function StatusExample() {
  return (
    <div>
      <h4>正常状态</h4>
      <Progress percentage={30} progressColor='#1890ff' />

      <h4>成功状态</h4>
      <Progress percentage={100} progressColor='#52c41a' />

      <h4>警告状态</h4>
      <Progress percentage={70} progressColor='#faad14' />

      <h4>错误状态</h4>
      <Progress percentage={50} progressColor='#f5222d' />
    </div>
  )
}
```

### 动态进度

```jsx
import { Progress } from '@gm-touch/react'
import { useState } from 'react'

function DynamicProgress() {
  const [progress, setProgress] = useState(0)

  const handleUpload = () => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  return (
    <div>
      <Progress
        percentage={progress}
        height='25px'
        progressColor={progress === 100 ? '#52c41a' : '#1890ff'}
      />
      <button onClick={handleUpload}>开始上传</button>
      <p>当前进度：{progress}%</p>
    </div>
  )
}
```

### 应用场景示例

```jsx
import { Progress } from '@gm-touch/react'

// 文件下载
function FileDownload() {
  const [downloadProgress, setDownloadProgress] = useState(0)

  const handleDownload = () => {
    // 模拟下载
    let progress = 0
    const timer = setInterval(() => {
      progress += 10
      setDownloadProgress(progress)
      if (progress >= 100) {
        clearInterval(timer)
      }
    }, 300)
  }

  return (
    <div>
      <h4>文件下载</h4>
      <Progress percentage={downloadProgress} height='15px' />
      <button onClick={handleDownload}>下载文件</button>
    </div>
  )
}

// 表单提交
function FormSubmit() {
  const [submitProgress, setSubmitProgress] = useState(0)

  const handleSubmit = () => {
    setSubmitProgress(0)
    const steps = [20, 40, 60, 80, 100]
    steps.forEach((step, index) => {
      setTimeout(() => setSubmitProgress(step), index * 500)
    })
  }

  return (
    <div>
      <h4>表单提交</h4>
      <Progress
        percentage={submitProgress}
        height='20px'
        progressColor={submitProgress === 100 ? '#52c41a' : '#1890ff'}
      />
      <button onClick={handleSubmit}>提交表单</button>
    </div>
  )
}
```

## 注意事项

1. **百分比范围**：`percentage` 值应在 0-100 之间，超出范围可能影响显示效果
2. **高度设置**：建议使用 px 单位设置高度，如 `'20px'`
3. **颜色选择**：
   - 建议根据状态选择合适的颜色
   - 正常状态：蓝色 `#1890ff`
   - 成功状态：绿色 `#52c41a`
   - 警告状态：橙色 `#faad14`
   - 错误状态：红色 `#f5222d`
4. **性能优化**：
   - 避免频繁更新进度值（建议间隔 > 100ms）
   - 大量进度条同时使用时注意性能
5. **响应式**：进度条宽度为 100%，会自动适应父容器宽度

## 相关组件

- [Loading](../loading/README.md) - 加载组件
- [ProgressCircle](../progress_circle/README.md) - 圆形进度条组件
