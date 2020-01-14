import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Flex from '../flex'
import Two from './two'
import Header from './header'

/**
 * 日期段选择
 * 形态上不支持全键盘，所以不做相关逻辑
 * */
const Overlay = props => {
  const {
    begin,
    end,
    onOK,
    min,
    max,
    disabledDate,
    beginTimeSelect,
    endTimeSelect,
    renderTime,
    timeSpan
  } = props

  // 日期选择
  const [_begin, setBegin] = useState(begin)
  const [_end, setEnd] = useState(end)

  const handleSelect = (begin, end) => {
    let b = begin
    let e = end

    setBegin(b)
    setEnd(e)
  }

  const handleSelectDateAndTime = () => {
    onOK(_begin, _end)
  }

  return (
    <div className='t-date-range-picker-overlay t-border-0'>
      <Flex>
        <Two
          begin={_begin}
          end={_end}
          onSelect={handleSelect}
          min={min}
          max={max}
          disabledDate={disabledDate}
        />
      </Flex>
      <Header
        begin={_begin}
        end={_end}
        beginTimeSelect={beginTimeSelect}
        endTimeSelect={endTimeSelect}
        onSelect={handleSelect}
        renderTime={renderTime}
        timeSpan={timeSpan}
        onSelectDateAndTime={handleSelectDateAndTime}
      />
    </div>
  )
}

Overlay.propTypes = {
  begin: PropTypes.object,
  end: PropTypes.object,
  onOK: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  min: PropTypes.object,
  max: PropTypes.object,
  disabledDate: PropTypes.func
}

export default Overlay
