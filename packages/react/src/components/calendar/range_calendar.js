import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import _ from 'lodash'
import Week from './week'
import Content from './content'
import Header from './header'

const RangeCalendar = props => {
  const {
    begin,
    end,
    onSelect,
    currentYearAndMonth,

    min,
    max,
    disabledDate,

    className,
    ...rest
  } = props

  const handleSelectDay = m => {
    // 如果都有，则当做选 begin
    if (begin && end) {
      onSelect(m.toDate(), null)
    } else if (begin) {
      // 如果相等，选中同一天
      if (+begin === +m) {
        onSelect(m.toDate(), m.toDate())
      }

      // 根据大小调整 begin end
      if (+begin < +m) {
        onSelect(begin, m.toDate())
      } else {
        onSelect(m.toDate(), begin)
      }
    } else if (end) {
      // 如果相等，选中同一天
      if (+end === +m) {
        onSelect(m.toDate(), m.toDate())
        // return
      }

      // 根据大小调整 begin end
      if (+end < +m) {
        onSelect(end, m.toDate())
      } else {
        onSelect(m.toDate(), end)
      }
    }
    // 如果都没有，则当做选 begin
    else {
      onSelect(m.toDate(), null)
    }
  }

  return (
    <div {...rest} className={classNames('t-calendar', className)}>
      <Header value={currentYearAndMonth} />
      <Week />
      <Content
        begin={begin && moment(begin)}
        end={end && moment(end)}
        onSelect={handleSelectDay}
        currentYearAndMonth={currentYearAndMonth}
        min={min}
        max={max}
        disabledDate={disabledDate}
      />
    </div>
  )
}

RangeCalendar.propTypes = {
  /** 开始日期，Date 对象 */
  begin: PropTypes.object,
  /** 结束日期, Date 对象 */
  end: PropTypes.object,
  /** 日期选中回调函数，参数 begin, end */
  onSelect: PropTypes.func,

  currentYearAndMonth: PropTypes.object.isRequired,

  /** Date对象，表示可选的最小日期 */
  min: PropTypes.object,
  /** Date对象，表示可选的最大日期 */
  max: PropTypes.object,
  /** 自定义日期是否可选。传入参数为Date对象，返回true or false。 有此属性则min max无效。 */
  disabledDate: PropTypes.func,

  className: PropTypes.string,
  style: PropTypes.object
}

RangeCalendar.defaultProps = {
  onSelect: _.noop
}

export default RangeCalendar
