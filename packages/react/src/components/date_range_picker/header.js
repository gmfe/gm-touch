import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Flex from '../flex'

const Header = props => {
  const { begin, end } = props

  let b = <span className='t-text-desc'>开始日期</span>
  let e = <span className='t-text-desc'>结束日期</span>

  if (begin) {
    b = moment(begin).format('YYYY-MM-DD')
  }

  if (end) {
    e = moment(end).format('YYYY-MM-DD')
  }

  return (
    <Flex
      alignCenter
      justifyBetween
      className='t-border-top'
      style={{
        padding: ' 10px 10px 10px 70px'
      }}
    >
      <div className='t-text-bold t-date-range-picker-bottom-text'>
        <span>{b}</span>
        &nbsp;~&nbsp;
        <span>{e}</span>
      </div>
    </Flex>
  )
}

Header.propTypes = {
  begin: PropTypes.object,
  end: PropTypes.object
}

export default Header
