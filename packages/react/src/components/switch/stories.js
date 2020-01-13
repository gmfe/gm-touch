import React from 'react'
import Switch from './index'
import { observable } from 'mobx'

const store = observable({
  checked: false,
  setChecked() {
    this.checked = !this.checked
  }
})

export const Default = () => (
  <>
    <Switch
      checked={store.checked}
      onChange={() => {
        store.setChecked()
      }}
    />
    <Switch
      on='上架'
      off='下架'
      checked={store.checked}
      onChange={() => {
        store.setChecked()
      }}
    />
    <Switch
      size={'lg'}
      checked={!store.checked}
      onChange={() => {
        store.setChecked()
      }}
    />
    <Switch
      on='上架'
      off='下架'
      size={'lg'}
      checked={!store.checked}
      onChange={() => {
        store.setChecked()
      }}
    />
  </>
)

export default {
  title: 'Switch'
}
