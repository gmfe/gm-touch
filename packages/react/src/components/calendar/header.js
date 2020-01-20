import React from 'react'
import PropTypes from 'prop-types'
import Flex from '../flex'

const Header = ({ value }) => {
  return (
    <Flex alignCenter justifyCenter className='t-calendar-header'>
      {value.format('YYYY年MM月')}
    </Flex>
  )
}

Header.propTypes = {
  /** 当前年月 */
  value: PropTypes.object
}

export default Header
