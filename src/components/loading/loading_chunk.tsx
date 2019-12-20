import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import Loading, { LoadingProps } from './loading'

export interface LoadingChunkProps extends LoadingProps {
  loading?: boolean
}

const LoadingChunk: FC<LoadingChunkProps & HTMLAttributes<HTMLDivElement>> = ({
  loading,
  size = 50,
  text,
  children
}) => {
  return (
    <div
      className={classNames({
        't-loading-chunk': loading
      })}
    >
      {children || <div style={{ height: size + 'px' }} />}
      {loading && (
        <div className='t-loading-mask'>
          <Loading text={text} size={size} className='t-loading-position' />
        </div>
      )}
    </div>
  )
}

export default LoadingChunk
