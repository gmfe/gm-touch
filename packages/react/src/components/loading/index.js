import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const SecondReading = () => {
  const [time, setTime] = React.useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time => time + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return `${time}s`
}

const Loading = ({ size, text, secondReading, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={classNames('t-loading', className)}
      style={{ height: `${size}px` }}
    >
      <svg className='t-loading-circular' viewBox='0 0 50 50'>
        <circle className='t-loading-path' cx='25' cy='25' r='20' fill='none' />
      </svg>
      <div className='t-loading-text'>
        {text}
        {secondReading && <SecondReading />}
      </div>
    </div>
  )
}

Loading.propTypes = {
  text: PropTypes.string,
  secondReading: PropTypes.bool,
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
}

Loading.defaultProps = {
  size: 50
}

export default Loading
