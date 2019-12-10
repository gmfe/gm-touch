import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Button = ({ type, className, children, ...rest }) => {
  return (
    <div
      {...rest}
      classNames={classNames(
        't-btn',
        {
          [`t-btn-${type}`]: true
        },
        className
      )}
    >
      {children}
    </div>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'default'])
}

Button.defaultProps = {
  type: 'default'
}

export default Button
