import React, { HTMLAttributes, useRef, ReactElement } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { Popover } from '../popover'
import { Selection } from '../selection'
import { List } from '../list'
import { ListDataCommonItem } from '../list/base'

export interface SelectProps<T> {
  data: ListDataCommonItem<T>[]
  value: T[] | T
  onChange(value: T): void
  disabled?: boolean
  isInPopup?: boolean
}

function Select<T>(
  props: SelectProps<T> & HTMLAttributes<HTMLDivElement>
): ReactElement {
  const {
    data,
    value,
    onChange,
    children,
    disabled,
    className,
    isInPopup,
    ...rest
  } = props
  const refPopup = useRef()

  const handleChange = value => {
    // @ts-ignore
    refPopup.current.apiDoSetActive(false)

    onChange(value)
  }

  let selected
  let newData

  newData = data
  selected = _.find(newData, v => v.value === value)

  const popup = (
    <List
      data={newData}
      selected={value as any} // todo 不知道怎么解决，先any
      onSelect={handleChange}
      className='t-border-none'
      style={{
        maxHeight: '250px'
      }}
    />
  )

  return (
    <Popover
      ref={refPopup}
      type='focus'
      popup={popup}
      disabled={disabled}
      isInPopup={isInPopup}
    >
      <Selection
        {...rest}
        selected={selected}
        onSelect={onChange}
        disabled={disabled}
        className={classNames(`t-select t-inline-block`, className)}
      />
    </Popover>
  )
}

Select.displayName = 'Select'

export default Select
