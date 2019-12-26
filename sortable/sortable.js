import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import SortableBase from './base'
import _ from 'lodash'
import classNames from 'classnames'
import { Flex } from '../src/index'

const Sortable = ({
                    data,
                    onChange,
                    renderItem,
                    tag,
                    groupData,
                    options = {},
                    ...rest
                  }) => {
  useEffect(() => {
    if (options.group && !groupData) {
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
        't-cursor-grab': !options.handle
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

Sortable.propTypes = {
  /** [{value, text, ...}, {value, text, ...}] */
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  renderItem: PropTypes.func,
  /** 支持 ref */
  tag: PropTypes.node,
  options: PropTypes.object,
  /** 如果是group，则必传 */
  groupData: PropTypes.array,
}

Sortable.defaultProps = {
  renderItem: item => item.text
}

export default Sortable
