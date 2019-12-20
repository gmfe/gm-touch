import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

export interface CollapseProps {
  active: boolean
}
const Collapse: FC<CollapseProps & HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  active,
  style,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={classNames('b-collapse', className)}
      style={Object.assign(
        {
          transition: active ? '0.5s ease all' : 'inherit',
          height: active ? 'inherit' : '0',
          opacity: active ? 1 : 0,
          overflow: active ? 'inherit' : 'hidden'
        },
        style
      )}
    >
      {children}
    </div>
  )
}

export default Collapse
