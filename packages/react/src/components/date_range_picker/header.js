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
    <Flex alignCenter justifyBetween className='t-padding-20 t-text-bold'>
      <Flex flex={1} justifyCenter className='t-date-range-picker-header-box'>
        {b}
      </Flex>
      <div className='t-gap-30 t-text-center'>~</div>
      <Flex flex={1} justifyCenter className='t-date-range-picker-header-box'>
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
