import React from 'react'
import PropTyeps from 'prop-types'

const CircleProgress = ({ width, height }) => {
  return (
    <svg width={width} height={height} viewBox='0 0 400 400'>
      <circle
        cx='200'
        cy='200'
        r='150'
        fill='none'
        stroke='#333'
        strokeWidth={100}
      />
    </svg>
  )
}

CircleProgress.propTypes = {
  width: PropTyeps.number,
  height: PropTyeps.number
}

export default CircleProgress
