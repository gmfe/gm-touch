import React, { useState } from 'react'
import Tabs from './index'

export const Default = () => {
  const [active, setActive] = useState(1)
  const tabs = [
    { text: 'tab1', value: 1 },
    { text: 'tab2', value: 2 }
  ]

  const handleChange = value => {
    setActive(value)
  }

  return <Tabs tabs={tabs} onChange={handleChange} active={active} />
}

export default {
  title: 'Tabs'
}
