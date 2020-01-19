import React from 'react'
import Checkbox from './'
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
    <Checkbox
      checked={store.checked}
      onChange={() => store.setChecked(!store.checked)}
    >
      圆形
    </Checkbox>
    <Checkbox
      type='square'
      checked={store.checked}
      onChange={() => store.setChecked(!store.checked)}
    >
      正方形
    </Checkbox>
    <Checkbox
      disabled
      checked={store.checked}
      onChange={() => store.setChecked(!store.checked)}
    >
      disabled
    </Checkbox>
    <Checkbox
      disabled
      type='square'
      checked={store.checked}
      onChange={() => store.setChecked(!store.checked)}
    >
      disabled
    </Checkbox>
  </>
)

export default {
  title: 'Checkbox'
}
