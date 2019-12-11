import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Input = ({ size, block, className, ...rest }) => {
  return (
    <input
      type='text'
      {...rest}
      className={classNames(
        't-input',
        {
          [`t-input-${size}`]: size,
          [`t-input-block`]: block
        },
        className
      )}
    />
  )
}

Input.propTypes = {
  size: PropTypes.oneOf(['lg']),
  block: PropTypes.bool
}

export default Input
