import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Two from './two'
import Header from './header'

const DateRangePicker = props => {
  const { begin, end, onChange, min, max, disabledDate } = props

  // 日期选择
  const [_begin, setBegin] = useState(begin)
  const [_end, setEnd] = useState(end)

  const handleSelect = (begin, end) => {
    setBegin(begin)
    setEnd(end)
    // end有可能为null
    onChange(begin, end)
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
    </div>
  )
}

DateRangePicker.propTypes = {
  /** 开始日期, Date 对象 */
  begin: PropTypes.object,
  /** 结束日期, Date 对象 */
  end: PropTypes.object,
  /** 参数 begin, end */
  onChange: PropTypes.func,
  /** Date 对象，表示可选的最小日期 */
  min: PropTypes.object,
  /** Date 对象，表示可选的最大日期 */
  max: PropTypes.object,
  /** 自定义日期是否可选。传入参数为Date对象，返回true or false。 有此属性则min max无效。 */
  disabledDate: PropTypes.func
}

export default DateRangePicker
