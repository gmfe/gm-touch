import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Loading from './index'

const LoadingChunk = ({ loading, size, text, secondReading, children }) => {
  return (
    <div
      className={classNames({
        't-loading-chunk': loading
      })}
    >
      {children || <div style={{ height: size + 'px' }} />}
      {loading && (
        <div className='t-loading-mask'>
          <Loading
            text={text}
            size={size}
            secondReading={secondReading}
            className='t-loading-position'
          />
        </div>
      )}
    </div>
  )
}

LoadingChunk.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
  secondReading: PropTypes.bool,
  size: PropTypes.number,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object
}

LoadingChunk.defaultProps = {
  size: 50
}

export default LoadingChunk
