import React, { useState } from 'react'
import Flex from '../flex'
import { Calendar } from '../calendar'
import moment from 'moment'
import SVGLeft from '../../../svg/btn-left.svg'
import SVGRight from '../../../svg/btn-right.svg'
import PropTypes from 'prop-types'

const DatePicker = ({ selected, ...rest }) => {
  const [curMoment, setCurMoment] = useState(() =>
    selected ? moment(selected) : moment()
  )

  const handleSetCurMoment = n => {
    setCurMoment(moment(curMoment).add(n, 'months'))
  }

  return (
    <Flex className='t-date-picker-overlay'>
      <SVGLeft
        className='t-date-picker-left-btn'
        onClick={() => handleSetCurMoment(-1)}
      />
      <Calendar
        {...rest}
        className='t-border-0'
        selected={selected}
        currentYearAndMonth={curMoment}
      />
      <SVGRight
        className='t-date-picker-right-btn'
        onClick={() => handleSetCurMoment(1)}
      />
    </Flex>
  )
}

DatePicker.propTypes = {
  selected: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  min: PropTypes.object,
  max: PropTypes.object,
  disabledDate: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
}

export default DatePicker
