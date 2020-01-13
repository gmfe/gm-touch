import React from 'react'
import InputNumber from './'
import { observable } from 'mobx'

const store = observable({
  value: null,
  setValue(value) {
    this.value = value
  }
})

export const Default = () => (
  <InputNumber
    value={store.value}
    onChange={value => {
      console.log('onChange', value)
      store.setValue(value)
    }}
  />
)

export default {
  title: 'InputNumber'
}
