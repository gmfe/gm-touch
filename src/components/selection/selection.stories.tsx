import React from 'react'
import Selection from './selection'

export const Default = () => (
  <div style={{ width: '300px' }}>
    <div>常规</div>
    <Selection
      onSelect={selected => console.log(selected)}
      placeholder='请选择'
    />
    <div>disabled</div>
    <Selection
      disabled
      onSelect={selected => console.log(selected)}
      placeholder='请选择'
    />
    <div>自定义选中项</div>
    <Selection
      selected={{ value: 0, text: '选中项' }}
      onSelect={selected => console.log(selected)}
      renderSelected={item => item.text + 'lalala'}
    />
  </div>
)

export default {
  title: 'Selection'
}
