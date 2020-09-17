import React, { FC } from 'react'

interface CircleProgressProps {
  width: number
  height: number
}

const CircleProgress: FC<CircleProgressProps> = ({ width, height }) => {
  return (
    <svg width={width} height={height} viewBox='0 0 400 400'>
      <circle cx='200' cy='200' r='200' fill='#fdd' stroke='none' />
    </svg>
  )
}

export default CircleProgress
export type { CircleProgressProps }
