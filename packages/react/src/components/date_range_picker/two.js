import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Flex from '../flex'
import SVGLeft from '../../../svg/btn-left.svg'
import SVGRight from '../../../svg/btn-right.svg'
import RangeCalendar from '../calendar/range_calendar'

const Two = props => {
  const { begin, end, onSelect, min, max, disabledDate } = props

  const [curMoment, setCurMoment] = useState(() =>
    begin ? moment(begin) : moment()
  )

  const handleSetCurMoment = n => {
    setCurMoment(moment(curMoment).add(n, 'months'))
  }

  return (
    <Flex justifyBetween className='t-padding-lr-20'>
      <Flex flex={1} style={{ position: 'relative' }}>
        <SVGLeft
          className='t-date-range-picker-left-btn'
          onClick={() => handleSetCurMoment(-1)}
        />
        <RangeCalendar
          className='t-border-0 t-date-range-picker-overlay-calendar'
          begin={begin}
          end={end}
          currentYearAndMonth={curMoment}
          onSelect={onSelect}
          min={min}
          max={max}
          disabledDate={disabledDate}
        />
      </Flex>
      <div className='t-gap-30' />
      <Flex flex={1} style={{ position: 'relative' }}>
        <SVGRight
          className='t-date-range-picker-right-btn'
          onClick={() => handleSetCurMoment(1)}
        />
        <RangeCalendar
          className='t-border-0 t-date-range-picker-overlay-calendar'
          begin={begin}
          end={end}
          currentYearAndMonth={moment(curMoment).add(1, 'months')}
          onSelect={onSelect}
          min={min}
          max={max}
          disabledDate={disabledDate}
        />
      </Flex>
    </Flex>
  )
}

Two.propTypes = {
  begin: PropTypes.object,
  end: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  min: PropTypes.object,
  max: PropTypes.object,
  disabledDate: PropTypes.func
}

export default Two
