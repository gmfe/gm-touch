import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { is } from 'gm-util'
import Loading from '../loading'
import _ from 'lodash'

const Button = ({
  onClick,
  type,
  size,
  disabled,
  className,
  children,
  ...rest
}) => {
  const [loading, setLoading] = useState(false)

  const handleClick = e => {
    const result = onClick(e)
    if (!is.promise(result)) {
      return
    }

    setLoading(true)
    Promise.resolve(result).finally(() => {
      setLoading(false)
    })
  }
  return (
    <button
      {...rest}
      onClick={handleClick}
      disabled={loading || disabled}
      className={classNames(
        't-btn',
        {
          [`t-btn-${type}`]: type,
          [`t-btn-${size}`]: size
        },
        className
      )}
    >
      {loading && <Loading className='t-inline-block t-text' />}
      {children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary']),
  size: PropTypes.oneOf(['lg']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
}

Button.defaultProps = {
  onClick: _.noop
}

export default Button
