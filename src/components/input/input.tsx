import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

export interface InputProps {
  type?: 'password' | 'text' | 'number'
  size?: 'lg'
  block?: boolean
  value?: string | string[] | number
}

const Input: FC<InputProps & HTMLAttributes<HTMLInputElement>> = ({
  size,
  block,
  className,
  ...rest
}) => {
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

Input.defaultProps = {
  type: 'text'
}

export default Input
