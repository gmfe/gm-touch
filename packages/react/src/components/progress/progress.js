import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Flex from '../flex'

const Progress = ({
  percentage,
  height,
  className,
  progressColor,
  ...rest
}) => {
  return (
    <Flex alignCenter {...rest} className={classNames('t-progress', className)}>
      <Flex flex block className='t-progress-bar'>
        <div className='t-progress-bar-outer' style={{ height }}>
          <div
            className={classNames('t-progress-bar-inner')}
            style={{ width: `${percentage}%`, background: progressColor }}
          />
        </div>
      </Flex>
      <div className='t-gap-5' />
    </Flex>
  )
}

Progress.propTypes = {
  percentage: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.string,
  progressColor: PropTypes.string
}

export default Progress
