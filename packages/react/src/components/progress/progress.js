import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Flex from '../flex'

const Progress = ({ percentage, className, ...rest }) => {
  return (
    <Flex alignCenter {...rest} className={classNames('t-progress', className)}>
      <Flex flex block className='t-progress-bar'>
        <div className='t-progress-bar-outer'>
          <div
            className={classNames('t-progress-bar-inner')}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </Flex>
      <div className='t-gap-5' />
    </Flex>
  )
}

Progress.propTypes = {
  percentage: PropTypes.string,
  className: PropTypes.string
}

export default Progress
