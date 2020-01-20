import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import moment from 'moment'
import Flex from '../flex'

const Day = props => {
  const { disabled, onClick, value, currentYearAndMonth, begin, end } = props
  const handleClick = () => {
    !disabled && onClick(value)
  }

  const nowStart = +moment().startOf('day')
  const valueStart = +value.startOf('day')
  const beginStart = begin ? +begin.startOf('day') : null
  const endStart = end ? +end.startOf('day') : null

  const isActive = () => {
    if (begin && end) {
      return beginStart <= valueStart && valueStart <= endStart
    } else if (begin) {
      return beginStart === valueStart
    } else if (end) {
      return endStart === valueStart
    }
  }

  const cn = classNames('t-calendar-day t-calendar-day-box', {
    // 无状态
    't-calendar-day-old': currentYearAndMonth.month() > value.month(),
    't-calendar-day-new': currentYearAndMonth.month() < value.month(),
    't-calendar-day-now': nowStart === valueStart,
    // 选中态
    active: isActive(),

    't-calendar-day-begin': beginStart === valueStart,
    't-calendar-day-end': endStart === valueStart,

    // 不可用
    't-calendar-day-disabled': disabled
  })

  return (
    <Flex flex alignStart justifyEnd className={cn} onClick={handleClick}>
      {value.date()}
    </Flex>
  )
}

Day.propTypes = {
  /** 日期值 */
  value: PropTypes.object.isRequired,
  /** 开始日期 */
  begin: PropTypes.object,
  /** 结束日期 */
  end: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  /** 当前月份moment对象 */
  currentYearAndMonth: PropTypes.object.isRequired
}

export default Day
