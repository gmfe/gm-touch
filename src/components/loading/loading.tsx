import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

export interface LoadingProps {
  text?: string
  size?: number
}

const Loading: FC<LoadingProps & HTMLAttributes<HTMLDivElement>> = ({
  size = 50,
  text,
  className,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={classNames('t-loading', className)}
      style={{ height: `${size}px` }}
    >
      <svg className='t-loading-circular' viewBox='0 0 50 50'>
        <circle className='t-loading-path' cx='25' cy='25' r='20' fill='none' />
      </svg>
      {text && <div className='t-loading-text'>{text}</div>}
    </div>
  )
}

export default Loading
