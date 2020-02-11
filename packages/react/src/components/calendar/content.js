import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Flex from '../flex'
import _ from 'lodash'
import Day from './day'

const Content = props => {
  const { currentYearAndMonth, begin, end, onSelect, hoverDay, onHoverDay } = props

  const group = React.useMemo(
    () => _.groupBy(_.range(42), v => parseInt(v / 7)),
    []
  )

  const getDisabled = m => {
    let { min, max, disabledDate } = props
    min = min ? moment(min).startOf('day') : null
    max = max ? moment(max).startOf('day') : null

    let disabled = false

    if (disabledDate) {
      disabled = disabledDate(m.toDate(), {
        begin: begin && begin.toDate(),
        end: end && end.toDate()
      })
    } else {
      if (min && m < min) {
        disabled = true
      }
      if (max && m > max) {
        disabled = true
      }
    }
    return disabled
  }

  const day = moment(currentYearAndMonth)
    .startOf('month')
    .day(0)
    .add(-1, 'day')

  return (
    <div>
      {_.map(group, (v, i) => (
        <Flex key={i}>
          {_.map(v, (value, index) => {
            const mm = moment(day.add(1, 'day'))
            return (
              <Day
                key={index}
                currentYearAndMonth={currentYearAndMonth}
                value={mm}
                begin={begin}
                end={end}
                disabled={getDisabled(mm)}
                onClick={onSelect}
                hoverDay={hoverDay}
                onHoverDay={onHoverDay}
              />
            )
          })}
        </Flex>
      ))}
    </div>
  )
}

Content.propTypes = {
  /** 开始日期 */
  begin: PropTypes.object,
  /** 结束日期 */
  end: PropTypes.object,
  /** 选中日期，参数 begin end */
  onSelect: PropTypes.func.isRequired,

  /** 当前月份moment对象 */
  currentYearAndMonth: PropTypes.object.isRequired,

  /** Date对象，表示可选的最小日期 */
  min: PropTypes.object,
  /** Date对象，表示可选的最大日期 */
  max: PropTypes.object,
  /** 自定义日期是否可选。传入参数为Date对象，返回true or false。 有此属性则min max无效。 */
  disabledDate: PropTypes.func
}

export default Content
