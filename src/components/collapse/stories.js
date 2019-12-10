import React from 'react'
import Collapse from './index'
import { observable } from 'mobx'

const store = observable({
  active: true,
  setActive() {
    this.active = !this.active
  }
})

export const active = () => (
  <div>
    <button onClick={() => store.setActive()}>toggle</button>
    <Collapse active={store.active}>啦啦啦啦</Collapse>
  </div>
)

export default {
  title: 'Collapse'
}
