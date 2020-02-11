import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Flex from '../flex'

const Header = props => {
  const { begin, end } = props

  let b = '开始日期'
  let e = '结束日期'

  if (begin) {
    b = moment(begin).format('YYYY-MM-DD')
  }

  if (end) {
    e = moment(end).format('YYYY-MM-DD')
  }

  return (
    <Flex alignCenter justifyBetween className='t-padding-lr-30 t-padding-top-30 t-padding-bottom-20 t-text-bold'>
      <Flex flex={1} justifyCenter alignCenter className='t-date-range-picker-header-box'>
        {b}
      </Flex>
      <Flex alignCenter justifyCenter style={{ width: '40px' }}>
        ~
      </Flex>
      <Flex flex={1} justifyCenter alignCenter className='t-date-range-picker-header-box'>
        {e}
      </Flex>
    </Flex>
  )
}

Header.propTypes = {
  begin: PropTypes.object,
  end: PropTypes.object
}

export default Header
