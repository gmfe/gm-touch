import React from 'react'
import Flex from '../flex'
import _ from 'lodash'
import moment from 'moment'
import Day from './day'
import PropTypes from 'prop-types'

const Content = ({ value }) => {
  const array = new Array(42)
  const now = moment()
  const monthFirstDay = moment(value)
    .startOf('month')
    .day(0)
    .add(-1, 'day')
  const nowMonth = moment(value).startOf('month')
  return (
    <Flex className='t-date-content' wrap>
      {_.map(array, (__, index) => {
        const day = moment(monthFirstDay.add(1, 'day'))
        const isSameMonth = moment(day).isSame(nowMonth, 'month')
        const isNow = moment(day).isSame(now, 'day')
        return (
          <Day
            index={index}
            value={day.date()}
            disabled={!isSameMonth}
            isNow={isNow}
          />
        )
      })}
    </Flex>
  )
}

Content.propTypes = {
  /** 日期值 */
  value: PropTypes.object.isRequired
}

export default Content
