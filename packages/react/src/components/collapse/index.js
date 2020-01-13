import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Collapse = ({ children, className, active, style, ...rest }) => {
  return (
    <div
      {...rest}
      className={classNames('b-collapse', className)}
      style={Object.assign(
        {
          transition: active ? '0.5s ease all' : 'inherit',
          height: active ? 'inherit' : '0',
          opacity: active ? 1 : 0,
          overflow: active ? 'inherit' : 'hidden'
        },
        style
      )}
    >
      {children}
    </div>
  )
}

Collapse.propTypes = {
  active: PropTypes.bool.isRequired,

  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object
}

export default Collapse
