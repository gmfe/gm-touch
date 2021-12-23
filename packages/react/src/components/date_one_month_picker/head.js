import React from 'react'
import PropTypes from 'prop-types'
import Flex from '../flex'

const Header = ({ month, onChange }) => {
  return (
    <Flex alignCenter justifyCenter className='t-date-head'>
      <Flex
        className='t-margin-right-10 t-head-button-left'
        onClick={() => onChange(-1)}
      >
        <span />
      </Flex>
      <div className='t-head-text t-text-bold'>{month.format('YYYY-MM')}</div>
      <Flex
        className='t-margin-left-10 t-head-button-right'
        onClick={() => onChange(1)}
      >
        <span />
      </Flex>
    </Flex>
  )
}

Header.propTypes = {
  /** 当前年月 */
  month: PropTypes.object,
  onChange: PropTypes.func
}

export default Header
