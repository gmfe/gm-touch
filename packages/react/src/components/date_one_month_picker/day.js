import React from 'react'
import classNames from 'classnames'
import Flex from '../flex'
import PropTypes from 'prop-types'

const Day = ({ value, index, disabled, isNow }) => {
  return (
    <Flex
      justifyCenter
      alignCenter
      className={classNames('t-date-item', {
        't-margin-right-40': (index + 1) % 7 === 0,
        't-data-item-disabled': disabled,
        't-data-item-nowTime ': isNow
      })}
    >
      {value}
    </Flex>
  )
}

Day.propTypes = {
  /** 日期值 */
  value: PropTypes.object.isRequired,
  index: PropTypes.number,
  isNow: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default Day
