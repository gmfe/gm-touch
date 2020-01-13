import React from 'react'
import { storiesOf } from '@storybook/react'
import Select from './'
import { observable } from 'mobx'

const list = [
  {
    value: 0,
    text: '南山'
  },
  {
    value: 1,
    text: '福田'
  },
  {
    value: 2,
    text: '宝安'
  },
  {
    value: 3,
    text: '宝安不可用',
    disabled: true
  },
  {
    value: 4,
    text: '罗湖'
  }
]

const store = observable({
  value: 0,
  setValue(value) {
    this.value = value
  }
})

storiesOf('Select', module)
  .add('default', () => (
    <Select
      data={list}
      value={store.value}
      onChange={value => store.setValue(value)}
    />
  ))
  .add('disabled', () => (
    <Select
      data={list}
      value={store.value}
      onChange={value => store.setValue(value)}
      disabled
    />
  ))
