import React from 'react'
import Flex from '../flex'
import Button from '../button'
import { getLocale } from '@gm-touch/locales'

const Bottom = ({ onOK, onCancel }) => {
  return (
    <Flex justifyEnd alignCenter className='t-padding-20 t-border-top'>
      <Button style={{ width: '200px' }} onClick={onCancel}>
        {getLocale('取消')}
      </Button>
      <div className='t-gap-20' />
      <Button style={{ width: '200px' }} type='primary' onClick={onOK}>
        {getLocale('确定')}
      </Button>
    </Flex>
  )
}

export default Bottom
