import React from 'react'
import Flex from '../flex'
import _ from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Tabs = ({ tabs, active, onChange }) => {
  const handleClick = value => {
    onChange && onChange(value)
  }

  return (
    <Flex className='t-tabs' justifyBetween>
      {_.map(tabs, tab => (
        <Flex
          flex
          justifyCenter
          alignCenter
          key={tab.value}
          className={classNames('t-tabs-item', {
            active: active === tab.value
          })}
          onClick={() => handleClick(tab.value)}
        >
          {tab.text}
        </Flex>
      ))}
    </Flex>
  )
}

Tabs.propTypes = {
  tabs: PropTypes.array,
  active: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func
}

export default Tabs
