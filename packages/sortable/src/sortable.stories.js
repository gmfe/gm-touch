import React from 'react'
import { storiesOf } from '@storybook/react'
import { observable } from 'mobx'
import Sortable  from './sortable'
import { Flex } from '@gm-touch/react'
import PropTypes from 'prop-types'

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
const data3 = [
  {
    value: 11,
    text: '大白菜3'
  },
  {
    value: 12,
    text: '牛肉3'
  },
  {
    value: 13,
    text: '鸡肉3'
  },
  {
    value: 14,
    text: '鸭肉3'
  },
  {
    value: 15,
    text: '大闸蟹3'
  }
]

const Wrap = React.forwardRef(({ className, ...rest }, ref) => (
  <Flex
    ref={ref}
    {...rest}
    wrap
    className={className}
  />
))

Wrap.propTypes = {
  className: PropTypes.string
}

const store = observable({
  data1: data1,
  data2: data2,
  data3: data3,
  disabled: false,
  setData1(data) {
    this.data1 = data
  },
  setData2(data) {
    this.data2 = data
  },
  setData3(data) {
    this.data3 = data
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
      groupData={[...data1, ...data2]}
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
)).add('group & grid', () => (
  <div>
    <Sortable
      key='data1'
      tag={Wrap}
      options={{
        group: "shared"
      }}
      data={store.data1}
      renderItem={item => <Flex justifyCenter alignCenter className='t-margin-10' style={{ width: '100px', height: '60px', border: '1px solid #ccc' }}>{item.text}</Flex>}
      groupData={[...data1, ...data2, ...data3]}
      onChange={data => store.setData1(data)}
    />
    =====================================
    <Sortable
      key='data2'
      tag={Wrap}
      data={store.data2}
      groupData={[...data1, ...data2, ...data3]}
      renderItem={item => <Flex justifyCenter alignCenter className='t-margin-10' style={{ width: '100px', height: '60px', border: '1px solid #ccc' }}>{item.text}</Flex>}
      onChange={data => store.setData2(data)}
      options={{
        group: "shared"
      }}
    />=====================================
    <Sortable
      key='data3'
      tag={Wrap}
      data={store.data3}
      groupData={[...data1, ...data2, ...data3]}
      renderItem={item => <Flex justifyCenter alignCenter className='t-margin-10' style={{ width: '100px', height: '60px', border: '1px solid #ccc' }}>{item.text}</Flex>}
      onChange={data => store.setData3(data)}
      options={{
        group: "shared"
      }}
    />
  </div>
))


