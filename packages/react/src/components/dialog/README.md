# Dialog

对话框组件，提供 alert、confirm、prompt 三种常用对话框类型，支持 Promise 和异步操作。

## 基础用法

### Alert - 警告对话框

用于显示提示信息，用户点击确定后关闭。

```jsx
import Dialog from '@gm-touch/dialog'

Dialog.alert({
  children: '操作成功！'
}).then(() => {
  console.log('用户点击了确定')
})
```

### Confirm - 确认对话框

用于确认操作，用户可以点击确定或取消。

```jsx
Dialog.confirm({
  title: '确认删除',
  children: '删除后无法恢复，确定要删除吗？'
}).then(() => {
  console.log('用户点击了确定，执行删除操作')
}, () => {
  console.log('用户点击了取消')
})
```

### Prompt - 输入对话框

用于获取用户输入。

```jsx
Dialog.prompt({
  title: '请输入名称',
  promptPlaceholder: '请输入...',
  onOK: (value) => {
    console.log('用户输入的值：', value)
  }
}).then((value) => {
  console.log('用户确认，输入值：', value
}, () => {
  console.log('用户取消')
})
```

## Props

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| title | string | '提示' | 否 | 对话框标题 |
| children | any | - | 否 | 对话框内容 |
| type | string | - | 否 | 对话框类型：'alert' \| 'confirm' \| 'prompt'（通常通过静态方法调用，无需手动设置） |
| size | string | 'md' | 否 | 对话框尺寸：'lg' \| 'md' \| 'sm' |
| promptDefaultValue | string | - | 否 | prompt 类型输入框的默认值 |
| promptPlaceholder | string | - | 否 | prompt 类型输入框的占位符 |
| cancelBtn | string \| bool | '取消' | 否 | 取消按钮文本，false 则不显示 |
| OKBtn | string \| bool | '确定' | 否 | 确定按钮文本，false 则不显示 |
| disableMaskClose | bool | false | 否 | 禁止点击遮罩关闭 |
| onOK | func | _.noop | 否 | 确定按钮点击回调 |
| onCancel | func | _.noop | 否 | 取消按钮点击回调 |

## 静态方法

### Dialog.alert(options)

显示警告对话框，返回 Promise。

**参数：**
- `options` (object \| string) - 配置对象或内容字符串

**返回：** Promise - 用户点击确定时 resolve

```jsx
// 简写形式
Dialog.alert('操作成功')

// 完整配置
Dialog.alert({
  title: '提示',
  children: '操作成功',
  OKBtn: '知道了'
}).then(() => {
  console.log('用户已确认')
})
```

### Dialog.confirm(options)

显示确认对话框，返回 Promise。

**参数：**
- `options` (object \| string) - 配置对象或内容字符串

**返回：** Promise - 用户点击确定时 resolve，点击取消时 reject

```jsx
// 简写形式
Dialog.confirm('确定要删除吗？').then(() => {
  // 执行删除操作
})

// 完整配置
Dialog.confirm({
  title: '确认删除',
  children: '删除后无法恢复',
  size: 'lg',
  cancelBtn: '再想想',
  OKBtn: '确认删除'
}).then(() => {
  console.log('用户确认删除')
}, () => {
  console.log('用户取消删除')
})
```

### Dialog.prompt(options)

显示输入对话框，返回 Promise。

**参数：**
- `options` (object \| string) - 配置对象或内容字符串

**返回：** Promise - 用户点击确定时 resolve 并返回输入值，点击取消时 reject

```jsx
// 简写形式
Dialog.prompt('请输入您的名字').then((value) => {
  console.log('用户输入：', value)
})

// 完整配置
Dialog.prompt({
  title: '请输入名称',
  children: '名称只能包含字母和数字',
  promptDefaultValue: '默认值',
  promptPlaceholder: '请输入...',
  onOK: (value) => {
    // 验证输入
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      alert('格式不正确')
      return false // 返回 false 阻止关闭
    }
  }
}).then((value) => {
  console.log('用户输入：', value)
})
```

## 高级用法

### 异步操作（Loading 状态）

onOK 回调返回 Promise 时，按钮会显示 loading 状态，等待 Promise 完成。

```jsx
Dialog.confirm({
  title: '确认提交',
  children: '提交需要一些时间',
  onOK: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('提交完成')
        resolve()
      }, 3000)
    })
  }
}).then(() => {
  console.log('提交成功')
})
```

### 阻止关闭

在 onOK 回调中返回 `false` 可以阻止对话框关闭。

```jsx
Dialog.prompt({
  title: '请输入邮箱',
  onOK: (value) => {
    if (!value.includes('@')) {
      alert('请输入有效的邮箱地址')
      return false // 阻止关闭
    }
  }
})
```

### 自定义按钮文本

```jsx
Dialog.confirm({
  title: '保存修改',
  children: '是否保存对文档的修改？',
  cancelBtn: '不保存',
  OKBtn: '保存'
})
```

### 隐藏取消按钮

```jsx
Dialog.confirm({
  title: '重要提示',
  children: '请仔细阅读',
  cancelBtn: false // 不显示取消按钮
})
```

### 自定义尺寸

```jsx
Dialog.confirm({
  title: '大对话框',
  size: 'lg',
  children: (
    <div>
      <p>这里可以放置更多内容</p>
      <p>表格、表单等复杂内容</p>
    </div>
  )
})
```

### 禁止点击遮罩关闭

```jsx
Dialog.confirm({
  title: '重要操作',
  children: '必须做出选择',
  disableMaskClose: true
})
```

## 链式调用

在对话框关闭后打开另一个对话框：

```jsx
// 同步链式调用
Dialog.confirm({
  title: '第一步',
  children: '确认进行第一步？'
}).then(() => {
  return Dialog.confirm({
    title: '第二步',
    children: '确认进行第二步？'
  })
}).then(() => {
  console.log('两步都完成了')
})

// 异步链式调用（需要延迟）
Dialog.confirm({
  title: '第一步',
  children: '确认进行第一步？',
  onOK: () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 2000)
    }).then(() => {
      // 必须加 setTimeout，等待前一个对话框完全关闭
      setTimeout(() => {
        Dialog.confirm({
          title: '第二步',
          children: '确认进行第二步？'
        })
      }, 100)
    })
  }
})
```

## 注意事项

1. **Promise 处理**：所有对话框方法都返回 Promise，务必处理 resolve 和 reject
2. **异步 onOK**：onOK 返回 Promise 时，对话框会等待 Promise 完成后才关闭
3. **阻止关闭**：onOK 返回 false 可以阻止对话框关闭，适合表单验证
4. **prompt 输入值**：prompt 类型中，用户输入的值会通过 Promise 的 resolve 传递
5. **键盘支持**：prompt 类型支持按 Enter 键提交
6. **国际化**：按钮文本默认使用 `@gm-touch/locales` 的国际化配置

## 最佳实践

### 简单提示

```jsx
Dialog.alert('保存成功')
```

### 危险操作确认

```jsx
Dialog.confirm({
  title: '警告',
  children: '此操作不可逆，确定继续吗？',
  OKBtn: '确认删除'
}).then(() => {
  deleteItem()
})
```

### 表单验证

```jsx
Dialog.prompt({
  title: '请输入',
  promptPlaceholder: '必填项',
  onOK: (value) => {
    if (!value || !value.trim()) {
      Dialog.alert('内容不能为空')
      return false
    }
  }
})
```

### 异步操作

```jsx
const handleConfirm = () => {
  Dialog.confirm({
    title: '提交审核',
    children: '提交后将进入审核流程',
    onOK: async () => {
      await submitToServer()
      // 对话框会在 await 完成后自动关闭
    }
  })
}
