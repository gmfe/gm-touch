import React from 'react'
import { storiesOf } from '@storybook/react'
import IconDownUp from './'
import { observable } from 'mobx'
import Button from '../button'

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
