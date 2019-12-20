import React, { Component, HTMLAttributes } from 'react'
import _ from 'lodash'
import Base, { BaseProps } from './base'
import { warn, devWarn } from '../../util'

export interface ListProps<T> extends BaseProps<T> {}

/** 列表组件 */
class List<T> extends Component<
  ListProps<T> & HTMLAttributes<HTMLDivElement>
> {
  static defaultProps = {
    multiple: false,
    onSelect: _.noop,
    renderItem: item => item.text,
    getItemProps: () => ({})
  }

  constructor(props) {
    super(props)
    devWarn(() => {
      if (props.multiple && !_.isArray(props.selected)) {
        // @ts-ignore
        warn('多选情况下 selected 请传数组')
      }
    })
  }

  handleSelected = selected => {
    const { multiple, onSelect } = this.props

    if (onSelect) {
      if (multiple) {
        onSelect(selected)
      } else {
        onSelect(selected[0])
      }
    }
  }

  render() {
    const { data, selected, multiple, isGroupList, ...rest } = this.props

    let oData
    if (isGroupList) {
      oData = data
    } else {
      oData = [
        {
          label: '',
          children: data
        }
      ]
    }

    let oSelected
    if (multiple) {
      // 如果 selected 为 null，需要转成 []
      oSelected = selected || []
    } else {
      oSelected = _.isNil(selected) ? [] : [selected]
    }

    return (
      <Base
        {...rest}
        data={oData}
        selected={oSelected}
        onSelect={this.handleSelected}
        multiple={multiple}
        isGroupList={isGroupList}
      />
    )
  }
}

export default List
