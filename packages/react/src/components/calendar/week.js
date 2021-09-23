import React from 'react'
import { getLocale } from '@gm-touch/locales'
import _ from 'lodash'
import Flex from '../flex'

const weekDays = [
  getLocale('week__日'),
  getLocale('week__一'),
  getLocale('week__二'),
  getLocale('week__三'),
  getLocale('week__四'),
  getLocale('week__五'),
  getLocale('week__六')
]
const Week = () => {
  return (
    <Flex className='t-calendar-week t-margin-top-20'>
      {_.map(weekDays, (v, i) => (
        <Flex key={i} flex alignStart justifyEnd>
          <Flex justifyCenter className='t-calendar-week-content'>{v}</Flex>
          <Flex flex={1}/>
        </Flex>
      ))}
    </Flex>
  )
}

export default Week
