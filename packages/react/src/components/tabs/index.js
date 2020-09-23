import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Flex from '../flex'

const Tabs = props => {
  const {
    tabs,
    active,
    defaultActive,
    keep,
    onChange,
    className,
    headBorder,
    ...rest
  } = props
  if (active !== undefined && defaultActive !== undefined) {
    console.warn(
      'prop `active` and prop `defaultActive` can not exist at the same time!'
    )
  }

  if (active !== undefined && !onChange) {
    console.warn('prop `active` `onChange` must exist at the same time!')
  }

  const [selected, setSelected] = useState(defaultActive || active)

  const handleClick = value => {
    setSelected(value)
    onChange && onChange(value)
  }

  const tabsChildrenKeep = () => (
    <>
      {_.map(tabs, tab => (
        <div
          key={tab.value}
          className={classNames('t-tabs-content-item', {
            hidden: selected !== tab.value
          })}
        >
          {tab.children}
        </div>
      ))}
    </>
  )

  const tabsChildren = () => {
    const item = _.find(tabs, tab => tab.value === selected)
    return <div className='t-tabs-content-item'>{item && item.children}</div>
  }

  return (
    <Flex column {...rest} className={classNames('t-tabs', className)}>
      <Flex
        alignEnd
        className={classNames('t-tabs-head', {
          't-border-left t-border-top t-border-right': headBorder
        })}
        justifyBetween
      >
        {_.map(tabs, tab => (
          <div
            key={tab.value}
            className={classNames(
              't-tabs-head-item t-flex-flex t-text-center',
              {
                active: selected === tab.value
              }
            )}
            onClick={() => handleClick(tab.value)}
          >
            <div className='t-tabs-text t-text-bold'>{tab.text}</div>
          </div>
        ))}
      </Flex>
      <Flex flex column className='t-tabs-content'>
        {keep ? tabsChildrenKeep() : tabsChildren()}
      </Flex>
    </Flex>
  )
}

Tabs.propTypes = {
  tabs: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.any,
    children: PropTypes.element
  }),
  active: PropTypes.any,
  defaultActive: PropTypes.any,
  keep: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  headBorder: PropTypes.bool
}

export default Tabs
