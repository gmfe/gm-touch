import { getLocale } from '../../locales'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Flex from '../flex'
import { getUnLeafValues, filterWithQuery, getLeafValues } from './util'
import _ from 'lodash'
import classNames from 'classnames'
import Bottom from './bottom'
import List from './list'
import Input from '../input'

function getFilterList(list, query, withFilter) {
  if (query === '') {
    return list
  }

  return filterWithQuery(list, query, withFilter)
}

function getGroupSelected(filterList, query) {
  if (query === '') {
    return []
  }

  return getUnLeafValues(filterList)
}

// 高性能树组件

const Tree = ({
  title,
  list,
  selectedValues,
  onSelectValues,
  placeholder,
  withFilter,
  className,
  ...rest
}) => {
  const refList = useRef(null)
  const [listHeight, setListHeight] = useState(null)

  const [query, setQuery] = useState('')
  const [delayQuery, setDelayQuery] = useState('')
  // 区分正常的 展开收起 和 搜索导致的展开收起
  const [groupSelected, setGroupSelected] = useState([])
  // 保存一个函数的引用而已
  const refDebounce = useRef(
    _.debounce(value => {
      setDelayQuery(value)
    }, 300)
  )
  // memo list delayQuery 即可， withFilter 不会变
  const filterList = useMemo(() => {
    return getFilterList(list, delayQuery, withFilter)
  }, [list, delayQuery])

  const queryGroupSelected = useMemo(() => {
    return getGroupSelected(filterList, delayQuery)
  }, [filterList, delayQuery])

  useEffect(() => {
    setListHeight(refList.current.offsetHeight)
  }, [])

  const handleSelectAll = checked => {
    onSelectValues(checked ? getLeafValues(list) : [])
  }

  const handleQuery = e => {
    const query = e.target.value
    setQuery(query)

    // 延迟更新 delayQuery
    refDebounce.current(query)
  }

  const handleGroupSelect = groupSelected => {
    setGroupSelected(groupSelected)
  }

  const newGS = query ? queryGroupSelected : groupSelected

  return (
    <Flex {...rest} column className={classNames('t-tree', className)}>
      {title && (
        <div className='t-padding-5 t-text-center t-border-bottom t-bg-back'>{title}</div>
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

Tree.propTypes = {
  /** [{value, name, children: []}] */
  list: PropTypes.array.isRequired,
  selectedValues: PropTypes.array.isRequired,
  onSelectValues: PropTypes.func.isRequired,

  title: PropTypes.string,
  /** 过滤函数，默认自带，不需要就 false */
  withFilter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  placeholder: PropTypes.string,

  className: PropTypes.string,
  style: PropTypes.object
}

Tree.defaultProps = {
  withFilter: true,
  placeholder: getLocale('搜索')
}

export default Tree
