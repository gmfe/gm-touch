import React from 'react'
import Radio from './'
import { observable } from 'mobx'

const store = observable({
  value: [1, 4],
  data: [
    {
      value: 1,
      text: '广州'
    },
    {
      value: 2,
      text: '深圳',
      disabled: true
    },
    {
      value: 3,
      text: '成都'
    },
    {
      value: 4,
      text: '东莞',
      disabled: true
    }
  ],
  setValue(value) {
    console.log(value)
    this.value = value
  },
  checked: false,
  setChecked(checked) {
    this.checked = checked
  }
})

export const Default = () => (
  <>
    <Radio
      checked={store.checked}
      onChange={() => store.setChecked(!store.checked)}
    >
      啦啦啦
    </Radio>
    <Radio
      disabled
      checked={store.checked}
      onChange={() => store.setChecked(!store.checked)}
    >
      啦啦啦 disabled
    </Radio>
    <Radio
      size='lg'
      checked={store.checked}
      onChange={() => store.setChecked(!store.checked)}
    >
      啦啦啦 lg
    </Radio>
  </>
)

export default {
  title: 'Radio'
}
