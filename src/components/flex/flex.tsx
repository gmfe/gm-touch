import React, { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'

export interface FlexProps {
  flex?: number | boolean
  auto?: boolean
  none?: boolean
  width?: string
  height?: string
  row?: boolean
  column?: boolean
  wrap?: boolean
  nowrap?: boolean
  justifyStart?: boolean
  justifyEnd?: boolean
  justifyCenter?: boolean
  justifyBetween?: boolean
  justifyAround?: boolean
  alignStart?: boolean
  alignEnd?: boolean
  alignCenter?: boolean
  alignBaseline?: boolean
  alignStretch?: boolean
  alignContentStart?: boolean
  alignContentEnd?: boolean
  alignContentCenter?: boolean
  alignContentBetween?: boolean
  alignContentAround?: boolean
  alignContentStretch?: boolean
  block?: boolean
}

const Flex = forwardRef<
  HTMLDivElement,
  FlexProps & HTMLAttributes<HTMLDivElement>
>(
  (
    {
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

      block,

      className,
      style,
      children,

      ...rest
    },
    ref
  ) => {
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
        't-flex-align-content-stretch': alignContentStretch,

        't-block': block
      },
      className
    )

    let s = Object.assign({}, style)
    if (flex) {
      s.flex = typeof flex === 'boolean' ? 1 : flex
      s.WebkitFlex = typeof flex === 'boolean' ? 1 : flex
    }
    if (height) {
      s.height = height
    }
    if (width) {
      s.width = width
    }

    return (
      <div {...rest} className={cn} style={s} ref={ref}>
        {children}
      </div>
    )
  }
)

export default Flex
