import React from 'react'
import IconDownUp from './icon_down_up'
import { observable } from 'mobx'
import { Button } from '../button'

const store = observable({
  active: false,
  toggle() {
    this.active = !this.active
  }
})

export const active = () => {
  return (
    <>
      <Button onClick={() => store.toggle()}>click</Button>
      <IconDownUp active={store.active} />
    </>
  )
}

export default {
  title: 'IconDownUp'
}
