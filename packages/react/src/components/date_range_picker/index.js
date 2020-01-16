import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Two from './two'
import Bottom from './bottom'
import Header from './header'

const DateRangePicker = props => {
  const { begin, end, onOK, onCancel, min, max, disabledDate } = props

  // 日期选择
  const [_begin, setBegin] = useState(begin)
  const [_end, setEnd] = useState(end)

  const handleSelect = (begin, end) => {
    setBegin(begin)
    setEnd(end)
  }

  const handleOK = () => {
    onOK(_begin, _end)
  }

  const handleCancel = () => {
    setBegin(begin)
    setEnd(end)
    onCancel && onCancel()
  }

  return (
    <div className='t-date-range-picker-overlay'>
      <Header begin={_begin} end={_end} />
      <Two
        begin={_begin}
        end={_end}
        onSelect={handleSelect}
        min={min}
        max={max}
        disabledDate={disabledDate}
      />
      <Bottom onOK={handleOK} onCancel={handleCancel} />
    </div>
  )
}

DateRangePicker.propTypes = {
  begin: PropTypes.object,
  end: PropTypes.object,
  onOK: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  min: PropTypes.object,
  max: PropTypes.object,
  disabledDate: PropTypes.func
}

export default DateRangePicker
