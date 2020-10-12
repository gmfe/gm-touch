import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Loading from '../loading'
import _ from 'lodash'
import { isPromise } from '../../util'

const Button = ({
  onClick,
  type,
  size,
  disabled,
  block,
  htmlType,
  className,
  children,
  ...rest
}) => {
  const [loading, setLoading] = useState(false)

  const handleClick = e => {
    const result = onClick(e)
    if (!isPromise(result)) {
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
          [`t-btn-${size}`]: size,
          't-btn-block': block
        },
        className
      )}
      type={htmlType}
    >
      {loading && <Loading className='t-inline-block t-text' />}
      {children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary', 'accent', 'plain']),
  size: PropTypes.oneOf(['lg']),
  htmlType: PropTypes.oneOf(['submit', 'reset', 'button']),
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
}

Button.defaultProps = {
  onClick: _.noop
}

export default Button
