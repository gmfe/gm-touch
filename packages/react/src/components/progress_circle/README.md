# ProgressCircle

圆形进度条组件，用于以环形图的形式展示操作的当前进度。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| percentage | 进度百分比（0-100） | `number` | `0` | 否 |
| size | 圆形进度条大小（px） | `number` | `40` | 否 |
| lineWidth | 进度条线条宽度 | `number` | `60` | 否 |
| type | 进度条类型 | `'success'` \| `'danger'` \| `'accent'` | - | 否 |
| disabledText | 是否隐藏中间的百分比文本 | `boolean` | - | 否 |
| bgColor | 背景圆环颜色 | `string` | - | 否 |
| progressColor | 进度条颜色 | `string` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 特性说明

- **响应式设计**：支持自定义尺寸，适应不同场景
- **类型预设**：提供 success、danger、accent 三种预设类型
- **灵活定制**：支持自定义背景色和进度色
- **文本显示**：中心显示当前百分比，可选择隐藏

## 示例

### 基础用法

```jsx
import { ProgressCircle } from '@gm-touch/react'

<ProgressCircle percentage={30} />
<ProgressCircle percentage={50} />
<ProgressCircle percentage={80} />
<ProgressCircle percentage={100} />
```

### 自定义大小

```jsx
import { ProgressCircle } from '@gm-touch/react'

<ProgressCircle percentage={60} size={60} />
<ProgressCircle percentage={60} size={80} />
<ProgressCircle percentage={60} size={120} />
<ProgressCircle percentage={60} size={150} />
```

### 自定义线条宽度

```jsx
import { ProgressCircle } from '@gm-touch/react'

<ProgressCircle percentage={70} size={100} lineWidth={40} />
<ProgressCircle percentage={70} size={100} lineWidth={60} />
<ProgressCircle percentage={70} size={100} lineWidth={80} />
```

### 不同类型

```jsx
import { ProgressCircle } from '@gm-touch/react'

<ProgressCircle percentage={80} type='success' size={100} />
<ProgressCircle percentage={60} type='danger' size={100} />
<ProgressCircle percentage={40} type='accent' size={100} />
```

### 自定义颜色

```jsx
import { ProgressCircle } from '@gm-touch/react'

<ProgressCircle
  percentage={60}
  size={100}
  bgColor='#f0f0f0'
  progressColor='#1890ff'
/>
<ProgressCircle
  percentage={60}
  size={100}
  bgColor='#f0f0f0'
  progressColor='#52c41a'
/>
<ProgressCircle
  percentage={60}
  size={100}
  bgColor='#f0f0f0'
  progressColor='#faad14'
/>
```

### 隐藏百分比文本

```jsx
import { ProgressCircle } from '@gm-touch/react'

<ProgressCircle percentage={75} size={100} disabledText />
```

### 完整示例

```jsx
import { ProgressCircle } from '@gm-touch/react'
import { useState, useEffect } from 'react'

function ProgressCircleExample() {
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
      <h3>任务进度</h3>
      <ProgressCircle
        percentage={progress}
        size={150}
        lineWidth={70}
        type='success'
      />
      <p>完成度：{progress}%</p>
    </div>
  )
}
```

### 多个进度条对比

```jsx
import { ProgressCircle } from '@gm-touch/react'

function ComparisonExample() {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div>
        <h4>任务 A</h4>
        <ProgressCircle percentage={85} size={100} type='success' />
        <p>85%</p>
      </div>

      <div>
        <h4>任务 B</h4>
        <ProgressCircle percentage={60} size={100} type='accent' />
        <p>60%</p>
      </div>

      <div>
        <h4>任务 C</h4>
        <ProgressCircle percentage={35} size={100} type='danger' />
        <p>35%</p>
      </div>
    </div>
  )
}
```

### 动态进度

```jsx
import { ProgressCircle } from '@gm-touch/react'
import { useState } from 'react'

function DynamicProgressCircle() {
  const [progress, setProgress] = useState(0)

  const handleStart = () => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }

  return (
    <div>
      <ProgressCircle
        percentage={progress}
        size={200}
        lineWidth={80}
        bgColor='#e8e8e8'
        progressColor={progress === 100 ? '#52c41a' : '#1890ff'}
      />
      <button onClick={handleStart}>开始任务</button>
      <p>当前进度：{progress}%</p>
    </div>
  )
}
```

### 应用场景示例

```jsx
import { ProgressCircle } from '@gm-touch/react'

// 下载进度
function DownloadProgress() {
  const [progress, setProgress] = useState(0)

  const handleDownload = () => {
    setProgress(0)
    let current = 0
    const timer = setInterval(() => {
      current += 5
      setProgress(current)
      if (current >= 100) {
        clearInterval(timer)
      }
    }, 200)
  }

  return (
    <div>
      <h4>文件下载</h4>
      <ProgressCircle
        percentage={progress}
        size={120}
        lineWidth={60}
        type='accent'
      />
      <button onClick={handleDownload}>下载文件</button>
    </div>
  )
}

// 目标完成度
function TargetAchievement() {
  const goals = [
    { name: '销售额', current: 85, total: 100 },
    { name: '新客户', current: 60, total: 100 },
    { name: '满意度', current: 92, total: 100 }
  ]

  return (
    <div>
      <h3>目标完成情况</h3>
      {goals.map(goal => (
        <div key={goal.name} style={{ textAlign: 'center' }}>
          <h4>{goal.name}</h4>
          <ProgressCircle
            percentage={Math.round((goal.current / goal.total) * 100)}
            size={100}
            lineWidth={50}
            type={goal.current >= goal.total ? 'success' : 'accent'}
          />
          <p>{goal.current} / {goal.total}</p>
        </div>
      ))}
    </div>
  )
}

// 性能指标
function PerformanceMetrics() {
  const metrics = [
    { label: 'CPU', value: 45, color: '#1890ff' },
    { label: '内存', value: 68, color: '#52c41a' },
    { label: '磁盘', value: 82, color: '#faad14' }
  ]

  return (
    <div>
      <h3>系统性能</h3>
      {metrics.map(metric => (
        <div key={metric.label} style={{ textAlign: 'center' }}>
          <ProgressCircle
            percentage={metric.value}
            size={80}
            lineWidth={40}
            bgColor='#f0f0f0'
            progressColor={metric.color}
          />
          <p>{metric.label}: {metric.value}%</p>
        </div>
      ))}
    </div>
  )
}
```

### 小尺寸应用

```jsx
import { ProgressCircle } from '@gm-touch/react'

function SmallProgressCircles() {
  return (
    <div>
      <h4>状态指示器</h4>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <ProgressCircle percentage={100} size={40} type='success' disabledText />
        <span>完成</span>

        <ProgressCircle percentage={50} size={40} type='accent' disabledText />
        <span>进行中</span>

        <ProgressCircle percentage={20} size={40} type='danger' disabledText />
        <span>待处理</span>
      </div>
    </div>
  )
}
```

## 注意事项

1. **百分比范围**：`percentage` 值应在 0-100 之间
2. **尺寸选择**：
   - 小尺寸（40-60px）：适合作为状态指示器
   - 中等尺寸（80-120px）：适合卡片、列表项
   - 大尺寸（150-200px）：适合独立展示的进度面板
3. **线条宽度**：`lineWidth` 需要根据 `size` 调整，比例适中效果更好
4. **颜色选择**：
   - 优先使用预设的 `type` 属性
   - 自定义颜色时注意与背景色的对比度
   - 进度色应比背景色更醒目
5. **性能考虑**：
   - 避免在短时间内频繁更新进度（建议间隔 > 100ms）
   - 大量使用时注意性能
6. **文本显示**：
   - 默认显示百分比文本
   - 小尺寸时建议使用 `disabledText` 隐藏文本

## 相关组件

- [Loading](../loading/README.md) - 加载组件
- [Progress](../progress/README.md) - 线性进度条组件
