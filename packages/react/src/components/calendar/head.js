import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Flex from '../flex'
import moment from 'moment'
import classNames from 'classnames'
import { getLocale } from '@gm-touch/locales'
import _ from 'lodash'

const months = [
  getLocale('01月'),
  getLocale('02月'),
  getLocale('03月'),
  getLocale('04月'),
  getLocale('05月'),
  getLocale('06月'),
  getLocale('07月'),
  getLocale('08月'),
  getLocale('09月'),
  getLocale('10月'),
  getLocale('11月'),
  getLocale('12月')
]

const Head = props => {
  const { value, onChange } = props
  // 以十年为一个年份选择周期, year 为所在周期最后一个可选年份
  const year = moment().year()

  // 月份选择 -- 'month' / 年份选择 -- 'year'
  const [selectType, setSelectType] = useState(null)
  // 用于记录当前展示最后一个可选年份与 year 的偏移值, 默认为0
  const [yearEndOffset, setYearEndOffset] = useState(0)

  const handleChange = (diff, type) => {
    onChange(moment(value).add(diff, type))

    // 年月选择需关闭展示
    if (selectType) {
      setSelectType(null)
    }
  }

  const handleSelectTypeChange = type => {
    if (type === 'year') {
      // 判断当前展示的年份在哪一段范围内
      const diff = value.year() - year
      let index = Math.abs(diff) / 10
      let range = null

      if (diff > 0) {
        // 往后
        index = Math.ceil(index)
        range = 10
      } else {
        // 往前
        index = Math.floor(index)
        range = -10
      }
      const e = index * range
      setYearEndOffset(e)
    }
    setSelectType(type)
  }

  const handleYearChange = (index, diff) => {
    // 非年月选择 正常处理
    if (!selectType) {
      handleChange(diff, 'year')
      return
    }

    // 月份选择时改变年份，不关闭展示面板
    if (selectType === 'month') {
      onChange(moment(value).add(diff, 'year'))
      return
    }

    // 年份点击切换 以及 展示的年份第一个和最后一个点击交互为--展示前 or 后一轮的年份展示, 不直接改变日期
    if (index === 0 || index === 11) {
      const range = index === 0 ? -10 : 10
      const e = yearEndOffset + range
      setYearEndOffset(e)
      return
    }

    handleChange(diff, 'year')
  }

  const renderYearSelection = () => {
    // 拿到展示选择的年份范围
    let b = yearEndOffset - 10
    const years = []
    while (b <= yearEndOffset + 1) {
      years.push(year + b)
      b++
    }

    return (
      <Flex justifyBetween alignContentBetween  wrap className='t-calendar-years-or-months'>
        {_.map(years, (year, index) => (
          <Flex
            alignCenter
            justifyCenter
            key={index}
            className={classNames('t-calendar-year-or-month', {
              active: year === value.year() && index !== 0 && index !== 11,
              't-calendar-year-or-month-change': index === 0 || index === 11
            })}
            onClick={() => handleYearChange(index, year - value.year())}
          >
            {year}
          </Flex>
        ))}
      </Flex>
    )
  }

  const renderMonthSelection = () => {
    return (
      <Flex justifyBetween  alignContentBetween wrap className='t-calendar-years-or-months'>
        {_.map(_.range(12), i => (
          <Flex
            key={i}
            alignCenter
            justifyCenter
            className={classNames('t-calendar-year-or-month', {
              active: i === value.month()
            })}
            onClick={() => handleChange(i - value.month(), 'month')}
          >
            {months[i]}
          </Flex>
        ))}
      </Flex>
    )
  }

  const renderYear = () => {
    return (
      <span
        className={classNames('t-calendar-head-text', {
          active: selectType === 'year'
        })}
        onClick={() => handleSelectTypeChange('year')}
      >
        {value.year()}
        {getLocale('年')}
      </span>
    )
  }

  const renderMonth = () => {
    // 年月选择不需要展示月份
    return (
      <span
        className={classNames('t-calendar-head-text', {
          active: selectType === 'month'
        })}
        onClick={() => handleSelectTypeChange('month')}
      >
        {months[value.month()]}
      </span>
    )
  }

  return (
    <>
      <Flex alignCenter className='t-calendar-head clearfix'>
        <Flex flex justifyEnd>
          {renderYear()}
          <div className="t-gap-10"/>
          {renderMonth()}
        </Flex>
      </Flex>
      {selectType === 'month' && renderMonthSelection()}
      {selectType === 'year' && renderYearSelection()}
    </>
  )
}

Head.propTypes = {
  /** 当前日期 */
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired
}

export default Head
