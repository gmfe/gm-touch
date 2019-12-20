import React, {
  Component,
  createRef,
  HTMLAttributes,
  ReactElement,
  ReactNode
} from 'react'
import _ from 'lodash'
import classNames from 'classnames'

export interface ListDataCommonItem<T> {
  value: T
  text: string
  disabled?: boolean
}
export interface ListDataLabelItem<T> {
  label: string
  children: ListDataCommonItem<T>[]
}

export type ListDataOption<T> = ListDataCommonItem<T> | ListDataLabelItem<T>

export interface BaseProps<T> {
  data: ListDataOption<T>[]
  selected: T[] | T // todo 类型待定
  onSelect?(list: T[]): void
  multiple?: boolean
  isGroupList?: boolean
  /* 自定义 */
  renderItem?(
    item: ListDataOption<T>,
    index: number
  ): ReactElement | ReactNode | JSX.Element
  /* 滚动 */
  isScrollTo?: boolean
  /** 少用。给与更多 Item 的响应 todo 不知道有啥用的，这个组件没看到用这个 */
  getItemProps?(e?: any): void
}

class Base<T> extends Component<BaseProps<T> & HTMLAttributes<HTMLDivElement>> {
  // 有直接调用 Base 的地方，估需要 defaultProps
  static defaultProps = {
    multiple: false,
    onSelect: _.noop,
    renderItem: item => item.text,
    getItemProps: () => ({})
  }

  refList = createRef<HTMLDivElement>()

  _isUnMounted = false

  doScrollToSelected = selector => {
    // 找第一个即可
    if (!this._isUnMounted) {
      const $active = this.refList.current?.querySelector(selector)
      if ($active) {
        $active.scrollIntoViewIfNeeded()
      }
    }
  }

  componentWillUnmount() {
    this._isUnMounted = true
  }

  componentDidMount() {
    if (this.props.isScrollTo) {
      this.doScrollToSelected('.active')
    }
  }

  handleSelect = item => {
    if (item.disabled) {
      return
    }

    const { multiple, selected, onSelect } = this.props
    if (onSelect) {
      if (multiple) {
        onSelect(_.xor(selected, [item.value]))
      } else {
        onSelect([item.value])
      }
    }
  }

  render() {
    const {
      data,
      isGroupList,
      selected,
      multiple,
      onSelect,
      isScrollTo, // eslint-disable-line
      renderItem,
      className,
      ...rest
    } = this.props

    return (
      <div
        {...rest}
        ref={this.refList}
        className={classNames(
          't-list',
          {
            't-list-group': isGroupList
          },
          className
        )}
      >
        {_.map(data, (group, gIndex) => (
          <div key={gIndex + group.label} className='t-list-group-item'>
            <div className='t-list-label'>{group.label}</div>
            {_.map(group.children, (v, index) => {
              return (
                <div
                  key={`${index}_${v.value}`}
                  className={classNames('t-list-item', {
                    // @ts-ignore
                    active: selected.includes(v.value),
                    disabled: v.disabled
                  })}
                  onClick={this.handleSelect.bind(this, v)}
                >
                  {renderItem && renderItem(v, index)}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  }
}

export default Base
