import React from 'react'
import { storiesOf } from '@storybook/react'
import { observable } from 'mobx'
import Sortable  from './sortable'

const data1 = [
  {
    value: 1,
    text: '大白菜1'
  },
  {
    value: 2,
    text: '牛肉1'
  },
  {
    value: 3,
    text: '鸡肉1'
  },
  {
    value: '04',
    text: '鸭肉1'
  },
  {
    value: 5,
    text: '大闸蟹1'
  }
]
const data2 = [
  {
    value: 6,
    text: '大白菜2'
  },
  {
    value: 7,
    text: '牛肉2'
  },
  {
    value: 8,
    text: '鸡肉2'
  },
  {
    value: 9,
    text: '鸭肉2'
  },
  {
    value: 10,
    text: '大闸蟹2'
  }
]

const store = observable({
  data1: data1,
  data2: data2,
  disabled: false,
  setData1(data) {
    this.data1 = data
  },
  setData2(data) {
    this.data2 = data
  }
})

storiesOf('Sortable|Sortable', module).add('single', () => (
  <Sortable
    id='data1'
    data={store.data1}
    onChange={data => store.setData1(data)}
  />
)).add('group', () => (
  <div>
    <Sortable
      id='data1'
      options={{
        group: "shared"
      }}
      data={store.data1}
      // groupData={[...data1, ...data2]}
      onChange={data => store.setData1(data)}
    />
    =====================================
    <Sortable
      id='data2'
      data={store.data2}
      groupData={[...data1, ...data2]}
      onChange={data => store.setData2(data)}
      options={{
        group: "shared"
      }}
    />
  </div>
))


