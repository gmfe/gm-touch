import React from 'react'
import Button from './button'

export default {
  title: 'Button'
}

export const Default = () => {
  return (
    <>
      <Button>按钮</Button>
      <Button type='primary'>Primary</Button>
      <Button size='lg'>按钮 lg</Button>
      <Button disabled>Primary lg</Button>
      <Button type='primary' disabled>
        按钮 disabled
      </Button>
      <Button size='lg' disabled>
        按钮 disabled lg
      </Button>
      <Button block>block</Button>
    </>
  )
}

export const loading = () => {
  return (
    <>
      <Button
        onClick={() => {
          return new Promise(resolve => {
            setTimeout(() => {
              // resolve()
            }, 3000)
          })
        }}
      >
        Loading
      </Button>
      <Button
        size={'lg'}
        onClick={() => {
          return new Promise(resolve => {
            setTimeout(() => {
              // resolve()
            }, 3000)
          })
        }}
      >
        Loading
      </Button>
    </>
  )
}
