import React from 'react'
import classNames from 'classnames'
import Flex from '../flex'
import PropTypes from 'prop-types'

const Day = ({ value, index, disabled, isNow, active, onSelect }) => {
  return (
    <Flex
      justifyCenter
      alignCenter
      className={classNames('t-date-item', {
        't-margin-right-40': (index + 1) % 7 === 0,
        't-data-item-disabled': disabled,
        't-data-item-nowTime ': isNow,
        't-date-item-chose': active
      })}
      onClick={() => onSelect(value)}
    >
      {value.date()}
    </Flex>
  )
}

Day.propTypes = {
  index: PropTypes.number,
  value: PropTypes.object.isRequired,
  isNow: PropTypes.bool,
  disabled: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default Day
