import React from 'react'
import Collapse from './index'
import { observable } from 'mobx'
import Button from '../button'

const store = observable({
  active: true,
  setActive() {
    this.active = !this.active
  }
})

export const active = () => (
  <div>
    <Button onClick={() => store.setActive()}>toggle</Button>
    <Collapse active={store.active}>啦啦啦啦</Collapse>
  </div>
)

export default {
  title: 'Collapse'
}
