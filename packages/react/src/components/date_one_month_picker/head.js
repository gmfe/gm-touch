import React from 'react'
import PropTypes from 'prop-types'
import Flex from '../flex'

const Header = ({ value, onChange }) => {
  return (
    <Flex alignCenter justifyCenter className='t-date-head'>
      <div className='t-margin-right-10' onClick={() => onChange(-1)}>
        左
      </div>
      <div>{value.format('YYYY-MM')}</div>
      <div className='t-margin-left-10' onClick={() => onChange(1)}>
        右
      </div>
    </Flex>
  )
}

Header.propTypes = {
  /** 当前年月 */
  value: PropTypes.object,
  onChange: PropTypes.func
}

export default Header
