import React from 'react'
import Flex from '../flex'
import _ from 'lodash'
import moment from 'moment'
import Day from './day'
import PropTypes from 'prop-types'

const Content = ({ selected, day, onSelect }) => {
  const array = new Array(42)
  const nowTime = moment()
  const nowMonth = moment(day).startOf('month')
  const monthFirstDay = moment(day)
    .startOf('month')
    .day(0)
    .add(-1, 'day')

  return (
    <Flex className='t-date-content' wrap>
      {_.map(array, (__, index) => {
        const value = moment(monthFirstDay.add(1, 'day'))
        const isSameMonth = value.isSame(nowMonth, 'month')
        const isNow = value.isSame(nowTime, 'day')
        const isActive = value.isSame(selected, 'day')
        return (
          <Day
            index={index}
            value={value}
            disabled={!isSameMonth}
            isNow={isNow}
            active={isActive}
            onSelect={onSelect}
          />
        )
      })}
    </Flex>
  )
}

Content.propTypes = {
  /** 日期值 */
  day: PropTypes.object.isRequired,
  /** 选择值 */
  selected: PropTypes.object.isRequired,
  /** 选择回调 */
  onSelect: PropTypes.func.isRequired
}

export default Content
