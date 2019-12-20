import React, { FC, HTMLAttributes } from 'react'
import SVGDown from '../../../svg/down.svg'
import classNames from 'classnames'

export interface IconDownUpProps {
  active?: boolean
}

const IconDownUp: FC<IconDownUpProps & HTMLAttributes<HTMLOrSVGElement>> = ({
  active,
  className,
  ...rest
}) => {
  return (
    <SVGDown
      {...rest}
      className={classNames(
        't-icon-down-up',
        {
          active
        },
        className
      )}
    />
  )
}

export default IconDownUp
