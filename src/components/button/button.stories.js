import React from 'react'
import Button from './button'

export default {
  title: 'Button'
}

export const Default = () => {
  return (
    <>
      <Button>按钮</Button>
      <Button type='primary'>按钮</Button>
      <Button size='lg'>按钮</Button>
      <Button disabled>按钮</Button>
      <Button type='primary' disabled>
        按钮
      </Button>
      <Button size='lg' disabled>
        按钮
      </Button>
    </>
  )
}

export const loading = () => {
  return (
    <Button
      onClick={() => {
        return new Promise(resolve => {
          setTimeout(() => {
            // resolve()
          }, 3000)
        })
      }}
    >Loading</Button>
  )
}
