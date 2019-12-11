import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Flex = ({
  flex,

  auto,
  none,
  width,
  height,

  row,
  column,

  wrap,
  nowrap,

  justifyStart,
  justifyEnd,
  justifyCenter,
  justifyBetween,
  justifyAround,

  alignStart,
  alignEnd,
  alignCenter,
  alignBaseline,
  alignStretch,

  alignContentStart,
  alignContentEnd,
  alignContentCenter,
  alignContentBetween,
  alignContentAround,
  alignContentStretch,

  className,
  style,
  children,

  ...rest
}) => {
  const cn = classNames(
    't-flex',
    {
      't-flex-flex': flex,
      't-flex-auto': auto,
      't-flex-none': none || width || height,

      't-flex-row': row,
      't-flex-column': column,

      't-flex-wrap': wrap,
      't-flex-nowrap': nowrap,

      't-flex-justify-start': justifyStart,
      't-flex-justify-end': justifyEnd,
      't-flex-justify-center': justifyCenter,
      't-flex-justify-between': justifyBetween,
      't-flex-justify-around': justifyAround,

      't-flex-align-start': alignStart,
      't-flex-align-end': alignEnd,
      't-flex-align-center': alignCenter,
      't-flex-align-baseline': alignBaseline,
      't-flex-align-stretch': alignStretch,

      't-flex-align-content-start': alignContentStart,
      't-flex-align-content-end': alignContentEnd,
      't-flex-align-content-center': alignContentCenter,
      't-flex-align-content-between': alignContentBetween,
      't-flex-align-content-around': alignContentAround,
      't-flex-align-content-stretch': alignContentStretch
    },
    className
  )

  let s = Object.assign({}, style)
  if (flex) {
    s.flex = typeof flex === 'boolean' ? 1 : flex
    s.WebKitFlex = typeof flex === 'boolean' ? 1 : flex
  }
  if (height) {
    s.height = height
  }
  if (width) {
    s.width = width
  }

  return (
    <div {...rest} className={cn} style={s}>
      {children}
    </div>
  )
}

Flex.propTypes = {
  flex: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  auto: PropTypes.bool,
  none: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  row: PropTypes.bool,
  column: PropTypes.bool,
  wrap: PropTypes.bool,
  nowrap: PropTypes.bool,
  justifyStart: PropTypes.bool,
  justifyEnd: PropTypes.bool,
  justifyCenter: PropTypes.bool,
  justifyBetween: PropTypes.bool,
  justifyAround: PropTypes.bool,
  alignStart: PropTypes.bool,
  alignEnd: PropTypes.bool,
  alignCenter: PropTypes.bool,
  alignBaseline: PropTypes.bool,
  alignStretch: PropTypes.bool,
  alignContentStart: PropTypes.bool,
  alignContentEnd: PropTypes.bool,
  alignContentCenter: PropTypes.bool,
  alignContentBetween: PropTypes.bool,
  alignContentAround: PropTypes.bool,
  alignContentStretch: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object
}

export default Flex
