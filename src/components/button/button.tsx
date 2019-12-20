import React, { FC, HTMLAttributes, useState, MouseEvent } from 'react'
import classNames from 'classnames'
import { is } from 'gm-util'
import { Loading } from '../loading'

export interface ButtonProps {
  type?: 'primary'
  size?: 'lg'
  htmlType?: 'submit' | 'reset' | 'button'
  block?: boolean
  disabled?: boolean
  onClick?(event: MouseEvent<HTMLButtonElement>): void
}

const Button: FC<ButtonProps & HTMLAttributes<HTMLButtonElement>> = ({
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

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const result = onClick && onClick(e)
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

export default Button
