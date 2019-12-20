import { getLocale } from '../../locales'
import React, { useEffect, useRef, useState, CSSProperties } from 'react'
import { Flex } from '../flex'
import { pinYinFilter } from 'gm-util'
import { getUnLeafValues, filterGroupList, getValues } from './util'
import _ from 'lodash'
import classNames from 'classnames'
import Bottom from './bottom'
import List from './list'
import { Input } from '../input'

const filterWithQuery = (list, query, withFilter) => {
  let processList
  if (withFilter === true) {
    processList = filterGroupList(list, v => {
      return pinYinFilter([v], query, v => v.text).length > 0
    })
  } else if (withFilter) {
    processList = withFilter(list, query)
  } else {
    processList = list
  }

  return processList
}
export interface TreeListOption<T> {
  value: T
  name: string
  children?: TreeListOption<T>[] // todo 未必，后续确认是否必填
}

export interface TreeProps<T> {
  list: TreeListOption<T>[]
  selectedValues: T[]
  onSelectValues(value: T[]): void
  title?: string
  disabled?: boolean
  withFilter?: ((list: TreeListOption<T>[]) => TreeListOption<T>[]) | boolean // todo 确认是不是这个类型
  placeholder?: string
  className?: string
  style?: CSSProperties
}

/*Tree.defaultProps = {
  withFilter: true,
  placeholder: getLocale('搜索')
}*/

function Tree<T>({
  title,
  list,
  selectedValues,
  onSelectValues,
  disabled,
  placeholder = getLocale('搜索'),
  withFilter = true,
  className,
  ...rest
}: TreeProps<T>) {
  const [query, setQuery] = useState('')
  const [filterList, setFilterList] = useState(list)
  const [listHeight, setListHeight] = useState<number>()
  const refList = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setListHeight(refList.current?.offsetHeight)
  }, [])

  // 区分正常的 展开收起 和 搜索导致的展开收起
  const [queryGroupSelected, setQueryGroupSelected] = useState([])
  const [groupSelected, setGroupSelected] = useState([])

  const handleSelectAll = checked => {
    onSelectValues(checked ? getValues(list) : [])
  }

  const handleQueryFilter = query => {
    if (query === '') {
      setFilterList(list)
      setQueryGroupSelected([])
      return
    }

    const processList = filterWithQuery(list, query, withFilter)

    setFilterList(processList)

    const newGroupSelected = getUnLeafValues(processList)
    setQueryGroupSelected(newGroupSelected)
  }
  const debounceHandleQueryFilter = _.debounce(handleQueryFilter, 300)

  const handleQuery = e => {
    const query = e.target.value
    setQuery(query)
    debounceHandleQueryFilter(query)
  }

  const handleGroupSelect = groupSelected => {
    setGroupSelected(groupSelected)
  }

  const newGS = query ? queryGroupSelected : groupSelected

  return (
    <Flex {...rest} column className={classNames('t-tree', className)}>
      {title && (
        <div className='t-padding-one t-text-center t-border-bottom'>
          {title}
        </div>
      )}
      {withFilter && (
        <div className='t-tree-filter'>
          <Input
            type='text'
            block
            value={query}
            onChange={handleQuery}
            placeholder={placeholder}
          />
        </div>
      )}

      <div className='t-flex-flex' ref={refList}>
        {!!listHeight && (
          <List
            list={filterList}
            listHeight={listHeight}
            groupSelected={newGS}
            onGroupSelect={handleGroupSelect}
            selectedValues={selectedValues}
            onSelectValues={onSelectValues}
          />
        )}
      </div>

      <Bottom
        list={list}
        selectedValues={selectedValues}
        onChange={handleSelectAll}
      />
    </Flex>
  )
}

export default Tree
