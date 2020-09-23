import React, { useState } from 'react'
import Tabs from './index'

export const Default = () => {
  const [active, setActive] = useState(1)
  const tabs = [
    { text: '包装指导', value: 1, children: <div>tab1 内容</div> },
    { text: '关联商户', value: 2, children: <div>tab2 内容</div> }
  ]

  const handleChange = value => {
    setActive(value)
  }

  return <Tabs tabs={tabs} onChange={handleChange} active={active} />
}

export default {
  title: 'Tabs'
}
