import React, { useState } from 'react'
import Content from './content'
import Week from './week'
import Header from './head'
import moment from 'moment'
import PropTypes from 'prop-types'
import './style.less'

const DateOneMonthPicker = ({ selected = new Date(), onSelect }) => {
  const [time, setTime] = useState(moment(selected))
  return (
    <div className='t-date-one-month'>
      <Header
        month={time}
        onChange={number => setTime(v => moment(v).add(number, 'month'))}
      />
      <Week />
      <Content selected={selected} day={time} onSelect={onSelect} />
    </div>
  )
}

DateOneMonthPicker.propTypes = {
  /** 日期值 */
  selected: PropTypes.object.isRequired,
  /** 选择回调 */
  onSelect: PropTypes.func.isRequired
}

export default DateOneMonthPicker
