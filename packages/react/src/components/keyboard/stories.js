import React from 'react'
import KeyBoard from './keyboard'

export const Default = () => {
  const handleClick = () => {
    KeyBoard.render({
      onHide: KeyBoard.hide
    })
  }
  return <button onClick={handleClick}>click</button>
}

export default {
  title: 'Keyboard'
}
