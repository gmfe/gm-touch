# Tree

高性能树形选择组件，支持多级分类选择、搜索过滤、全选等功能，适用于商品分类、组织架构等场景。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| list | 树形数据数组 | `Array<TreeNode>` | - | 是 |
| selectedValues | 选中的值数组 | `Array<any>` | - | 是 |
| onSelectValues | 选中值变化时的回调 | `(values: Array<any>) => void` | - | 是 |
| title | 标题 | `string` | - | 否 |
| withFilter | 是否显示搜索框，可以是自定义过滤函数 | `boolean \| function` | `true` | 否 |
| placeholder | 搜索框占位文本 | `string` | `'搜索'` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### TreeNode 数据格式

```js
const treeNode = {
  value: 1,                    // 节点值（必填）
  text: '蔬菜',                // 节点文本（必填）
  children: [                  // 子节点数组（可选）
    {
      value: 11,
      text: '叶菜',
      children: [
        { value: 111, text: '皇帝菜' },
        { value: 112, text: '金不换' }
      ]
    }
  ]
}
```

## 示例

### 基础用法

```jsx
import { Tree } from '@gm-touch/react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

const store = observable({
  data: [
    {
      value: 1,
      text: '蔬菜',
      children: [
        {
          value: 11,
          text: '叶菜',
          children: [
            { value: 111, text: '皇帝菜' },
            { value: 112, text: '金不换' }
          ]
        },
        {
          value: 12,
          text: '甘蓝',
          children: [
            { value: 121, text: '甘蓝1' },
            { value: 122, text: '甘蓝2' }
          ]
        }
      ]
    },
    {
      value: 2,
      text: '冻品',
      children: [
        {
          value: 21,
          text: '冻猪肉',
          children: [
            { value: 211, text: '五花肉' },
            { value: 212, text: '猪脚' }
          ]
        }
      ]
    }
  ],
  selectedValues: [],
  setSelectedValues(values) {
    this.selectedValues = values
  }
})

const TreeExample = observer(() => {
  return (
    <div style={{ height: '500px' }}>
      <Tree
        list={store.data}
        selectedValues={store.selectedValues}
        onSelectValues={values => store.setSelectedValues(values)}
      />
    </div>
  )
})
```

### 单层列表（无分组）

```jsx
import { Tree } from '@gm-touch/react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

const store = observable({
  data: [
    { value: 1, text: '蔬菜' },
    { value: 2, text: '冻品' },
    { value: 3, text: '水果' },
    { value: 4, text: '干货' }
  ],
  selectedValues: [],
  setSelectedValues(values) {
    this.selectedValues = values
  }
})

const SingleLevelTree = observer(() => {
  return (
    <div style={{ height: '400px' }}>
      <Tree
        list={store.data}
        selectedValues={store.selectedValues}
        onSelectValues={values => store.setSelectedValues(values)}
      />
    </div>
  )
})
```

### 带标题的树形选择

```jsx
import { Tree } from '@gm-touch/react'

function TreeWithTitle() {
  const data = [
    {
      value: 1,
      text: '广东省',
      children: [
        { value: 11, text: '深圳' },
        { value: 12, text: '广州' }
      ]
    },
    {
      value: 2,
      text: '北京市',
      children: [
        { value: 21, text: '朝阳' },
        { value: 22, text: '海淀' }
      ]
    }
  ]

  const [selectedValues, setSelectedValues] = React.useState([])

  return (
    <div style={{ height: '500px' }}>
      <Tree
        title='选择城市'
        list={data}
        selectedValues={selectedValues}
        onSelectValues={setSelectedValues}
      />
    </div>
  )
}
```

### 禁用搜索

```jsx
import { Tree } from '@gm-touch/react'

function TreeWithoutFilter() {
  const data = [
    {
      value: 1,
      text: '分类一',
      children: [
        { value: 11, text: '子项1' },
        { value: 12, text: '子项2' }
      ]
    }
  ]

  const [selectedValues, setSelectedValues] = React.useState([])

  return (
    <div style={{ height: '400px' }}>
      <Tree
        list={data}
        selectedValues={selectedValues}
        onSelectValues={setSelectedValues}
        withFilter={false}
      />
    </div>
  )
}
```

### 自定义搜索占位文本

```jsx
import { Tree } from '@gm-touch/react'

function TreeWithCustomPlaceholder() {
  const data = [
    {
      value: 1,
      text: '商品分类',
      children: [
        { value: 11, text: '食品' },
        { value: 12, text: '饮料' }
      ]
    }
  ]

  const [selectedValues, setSelectedValues] = React.useState([])

  return (
    <div style={{ height: '400px' }}>
      <Tree
        list={data}
        selectedValues={selectedValues}
        onSelectValues={setSelectedValues}
        placeholder='搜索商品分类'
      />
    </div>
  )
}
```

### 完整示例：商品分类选择

```jsx
import { Tree } from '@gm-touch/react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

const store = observable({
  categoryData: [
    {
      value: 'vegetables',
      text: '蔬菜',
      children: [
        {
          value: 'leafy',
          text: '叶菜',
          children: [
            { value: 'lettuce', text: '生菜' },
            { value: 'spinach', text: '菠菜' },
            { value: 'cabbage', text: '白菜' }
          ]
        },
        {
          value: 'cruciferous',
          text: '甘蓝',
          children: [
            { value: 'broccoli', text: '西兰花' },
            { value: 'cauliflower', text: '花菜' }
          ]
        }
      ]
    },
    {
      value: 'meat',
      text: '肉类',
      children: [
        {
          value: 'pork',
          text: '猪肉',
          children: [
            { value: 'pork_belly', text: '五花肉' },
            { value: 'pork_loin', text: '里脊' }
          ]
        },
        {
          value: 'beef',
          text: '牛肉',
          children: [
            { value: 'brisket', text: '牛腩' },
            { value: 'tenderloin', text: '牛柳' }
          ]
        }
      ]
    }
  ],
  selectedCategories: [],
  setSelectedCategories(values) {
    this.selectedCategories = values
    console.log('选中的分类：', values)
  }
})

const CategorySelector = observer(() => {
  return (
    <div>
      <h3>选择商品分类</h3>
      <div style={{ height: '500px', border: '1px solid #ddd' }}>
        <Tree
          title='商品分类'
          list={store.categoryData}
          selectedValues={store.selectedCategories}
          onSelectValues={values => store.setSelectedCategories(values)}
          placeholder='搜索分类名称'
        />
      </div>
      <div style={{ marginTop: '16px' }}>
        <p>已选分类数量：{store.selectedCategories.length}</p>
      </div>
    </div>
  )
})
```

### 完整示例：组织架构选择

```jsx
import { Tree } from '@gm-touch/react'
import { useState } from 'react'

function OrganizationSelector() {
  const orgData = [
    {
      value: 'tech',
      text: '技术部',
      children: [
        {
          value: 'frontend',
          text: '前端组',
          children: [
            { value: 'fe1', text: '张三' },
            { value: 'fe2', text: '李四' }
          ]
        },
        {
          value: 'backend',
          text: '后端组',
          children: [
            { value: 'be1', text: '王五' },
            { value: 'be2', text: '赵六' }
          ]
        }
      ]
    },
    {
      value: 'product',
      text: '产品部',
      children: [
        {
          value: 'product_group',
          text: '产品组',
          children: [
            { value: 'pm1', text: '小明' },
            { value: 'pm2', text: '小红' }
          ]
        }
      ]
    }
  ]

  const [selectedMembers, setSelectedMembers] = useState([])

  const handleSelect = values => {
    console.log('选中的成员：', values)
    setSelectedMembers(values)
  }

  return (
    <div>
      <h3>选择团队成员</h3>
      <div style={{ height: '500px', border: '1px solid #ddd' }}>
        <Tree
          title='组织架构'
          list={orgData}
          selectedValues={selectedMembers}
          onSelectValues={handleSelect}
          placeholder='搜索成员姓名'
        />
      </div>
      <div style={{ marginTop: '16px' }}>
        <p>已选成员：{selectedMembers.length} 人</p>
      </div>
    </div>
  )
}
```

## 注意事项

1. **数据结构**：
   - 树形数据必须包含 `value` 和 `text` 字段
   - `children` 字段可选，用于构建多级树形结构
   - 支持无限层级嵌套

2. **状态管理**：
   - 组件不维护内部状态，需要通过 props 控制选中值
   - `selectedValues` 必须是数组
   - 建议配合 MobX 或 useState 使用

3. **搜索功能**：
   - 默认启用搜索功能（`withFilter={true}`）
   - 搜索采用防抖处理，300ms 延迟
   - 搜索时会自动展开匹配的节点及其父节点
   - 可通过 `withFilter={false}` 禁用搜索

4. **选中行为**：
   - 只有叶子节点（没有 children 的节点）才能被选中
   - 点击分组节点会展开/收起子节点
   - 底部提供全选/取消全选按钮

5. **性能优化**：
   - 组件使用 useMemo 优化渲染性能
   - 适合处理大量数据（1000+ 节点）
   - 搜索过滤采用防抖处理，减少频繁渲染

6. **高度设置**：
   - 必须给组件设置固定高度
   - 内部会自动计算列表高度
   - 列表区域可滚动

7. **样式定制**：
   - 可通过 `className` 和 `style` 自定义样式
   - 使用 Flex 布局，支持灵活定制
   - 搜索框使用 Input 组件，继承其样式

8. **国际化**：
   - 搜索框占位文本支持国际化
   - 默认使用 locales 中的 '搜索' 文本

## 相关组件

- [List](../list/README.md) - 列表组件
- [MoreSelect](../more_select/README.md) - 更多选择组件
- [Select](../select/README.md) - 下拉选择组件
