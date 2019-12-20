import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import classNames from 'classnames'
import { IconDownUp } from '../icon_down_up'
import { ListDataCommonItem } from '../list/base'

export interface SelectionProps<T> {
  selected?: ListDataCommonItem<T>
  onSelect(value: T | Array<T>): void
  disabled?: boolean
  renderSelected?(
    value: ListDataCommonItem<T>
  ): ReactElement | ReactNode | JSX.Element
  placeholder?: string
}

/** 内部用 选择区域 */
function Selection<T>({
  selected,
  onSelect,
  disabled,
  renderSelected,
  placeholder,
  className,
  ...rest
}: SelectionProps<T> & HTMLAttributes<HTMLDivElement>) {
  const text =
    selected !== null && selected !== undefined
      ? renderSelected && renderSelected(selected)
      : ''

  return (
    <div
      {...rest}
      className={classNames(
        't-selection',
        {
          disabled
        },
        className
      )}
    >
      <div className='t-selection-selected'>{text || placeholder}</div>
      <IconDownUp
        active={(className || '').includes('t-popover-active')}
        className='t-selection-icon'
      />
    </div>
  )
}

Selection.defaultProps = {
  renderSelected: item => item.text
}

export default Selection
