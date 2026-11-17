import React from 'react'
import Keyboard from './keyboard'

export const Default = () => {
  const handleClick = () => {
    Keyboard.render({
      onHide: Keyboard.hide
    })
  }
  return <button onClick={handleClick}>click</button>
}

export const WithHints = () => (
  <Keyboard
    onKeyClick={() => {}}
    onConfirm={() => {}}
    onCancel={() => {}}
    onClear={() => {}}
    onBackSpace={() => {}}
    showShortcuts
    showFooterTip
  />
)

export const CustomFuncAreaWithHints = () => (
  <Keyboard
    onKeyClick={() => {}}
    onConfirm={() => {}}
    onCancel={() => {}}
    onClear={() => {}}
    onBackSpace={() => {}}
    showShortcuts
    showFooterTip
    customFuncArea={
      <div style={{ display: 'flex', width: '100%', gap: 8 }}>
        <button style={{ flex: 1, height: 120 }}>加入已称重数</button>
        <button style={{ flex: 1, height: 120 }}>替换已称重数</button>
      </div>
    }
  />
)

export default {
  title: 'Keyboard'
}
