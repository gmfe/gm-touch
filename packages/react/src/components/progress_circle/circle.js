import React from 'react'
import PropTyeps from 'prop-types'
import Flex from '../flex'
import classNames from 'classnames'

const radius = 110 // 半径r
const diameter = Math.round(Math.PI * radius * 2) // 周长(路径长度)
const getOffset = (val = 0) =>
  Math.round(((100 - Math.min(val, 100)) / 100) * diameter)

const ProgressCircle = ({
  type,
  percentage,
  size = 40,
  lineWidth = 60,
  disabledText,
  className,
  ...rest
}) => {
  const { centerColor, animate, animationDuration, roundedStroke } = {
    centerColor: 'transparent',
    animate: false,
    animationDuration: '1s',
    roundedStroke: false
  }

  const strokeDashoffset = getOffset(percentage)
  const transition = animate
    ? `stroke-dashoffset ${animationDuration} ease-out`
    : undefined
  const strokeLinecap = roundedStroke ? 'round' : 'butt'

  return (
    <Flex
      alignCenter
      {...rest}
      className={classNames(
        't-progress-circle',
        {
          [`t-progress-circle-${type}`]: !!type
        },
        className
      )}
    >
      <svg width={size} height={size} viewBox='0 0 300 300'>
        <circle
          cx='150'
          cy='150'
          r={radius}
          strokeWidth={lineWidth}
          fill={centerColor}
        />
        <circle
          className='t-progress-circle-color'
          transform='rotate(-90 150 150)'
          cx='150'
          cy='150'
          r={radius}
          strokeDasharray={diameter}
          strokeWidth={lineWidth}
          strokeDashoffset={diameter}
          strokeLinecap={strokeLinecap}
          fill='none'
          style={{ strokeDashoffset, transition }}
        />
        {!disabledText && (
          <text
            fill='currentColor'
            fontSize='70'
            x='150'
            y='150'
            textAnchor='middle'
            dominantBaseline='central'
          >
            {percentage + '%'}
          </text>
        )}
      </svg>
    </Flex>
  )
}

ProgressCircle.propTypes = {
  size: PropTyeps.number,
  percentage: PropTyeps.number,
  lineWidth: PropTyeps.number,
  disabledText: PropTyeps.bool,
  type: PropTyeps.oneOf(['success', 'danger']),
  className: PropTyeps.string
}

ProgressCircle.defaultProps = {
  size: 40,
  lineWidth: 60,
  progress: 0
}

export default ProgressCircle
