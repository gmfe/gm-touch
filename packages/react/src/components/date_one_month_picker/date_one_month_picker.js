import React, { useState } from 'react'
import Content from './content'
import Week from './week'
import Header from './head'
import moment from 'moment'
import './style.less'

const DateOneMonthPicker = () => {
  const [time, setTime] = useState(moment())
  return (
    <div className='t-date-one-month'>
      <Header
        value={time}
        onChange={number => setTime(v => moment(v).add(number, 'month'))}
      />
      <Week />
      <Content value={time} />
    </div>
  )
}

export default DateOneMonthPicker
