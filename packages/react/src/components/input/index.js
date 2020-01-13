import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Input = ({ size, block, className, ...rest }) => {
  return (
    <input
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
  type: PropTypes.oneOf(['password', 'text', 'number']),
  size: PropTypes.oneOf(['lg']),
  block: PropTypes.bool
}

Input.defaultProps = {
  type: 'text'
}

export default Input
