import React, { Component, FC, ReactNode, useEffect } from 'react'
import SortableBase from './base'
import _ from 'lodash'
import classNames from 'classnames'
import { Flex } from '../src'

export interface SortableProps {
  data: { value: any; text: string }[]
  onChange(value: any[]): void
  renderItem?: (value: any, index?: number) => ReactNode
  tag?: new () => Component
  options?: object
  groupData?: any[]
  id?: string
}

const Sortable: FC<SortableProps> = ({
  data,
  onChange,
  renderItem,
  tag,
  groupData,
  options = {},
  ...rest
}) => {
  useEffect(() => {
    if (options['group'] && !groupData) {
      console.error('group必须提供groupData')
    }
  }, [])

  const handleChange = order => {
    order = _.map(order, v => JSON.parse(v))
    let newData = []
    _.forEach(order, v => {
      const sortItem = _.find((groupData || data).slice(), y => y.value === v)
      if (sortItem) newData.push(sortItem)
    })
    onChange(newData)
  }

  const items = _.map(data, (v, index) => (
    <Flex
      key={v.value}
      data-id={JSON.stringify(v.value)}
      className={classNames({
        't-cursor-grab': !options['handle']
      })}
    >
      {renderItem(v, index)}
    </Flex>
  ))

  return (
    <SortableBase
      {...rest}
      tag={tag}
      options={{
        animation: 150,
        ...options
      }}
      onChange={handleChange}
    >
      {items}
    </SortableBase>
  )
}

Sortable.defaultProps = {
  renderItem: item => item.text as ReactNode
}

export default Sortable
