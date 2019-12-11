import { getLocale } from '../../locales'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Flex from '../flex'
import { pinYinFilter } from 'gm-util'
import { getLeaf, getUnLeafValues, filterGroupList } from './util'
import _ from 'lodash'
import classNames from 'classnames'
import Bottom from './bottom'
import List from './list'
import Input from '../input'

const filterWithQuery = (list, query, withFilter) => {
  let processList
  if (withFilter === true) {
    processList = filterGroupList(list, v => {
      return pinYinFilter([v], query, v => v.name).length > 0
    })
  } else if (withFilter) {
    processList = withFilter(list, query)
  } else {
    processList = list
  }

  return processList
}

const Tree = ({
  title,
  list,
  selectedValues,
  onSelectValues,
  disabled,
  placeholder,
  withFilter,
  className,
  ...rest
}) => {
  const [query, setQuery] = useState('')
  const [filterList, setFilterList] = useState(list)

  // 区分正常的 展开收起 和 搜索导致的展开收起
  const [queryGroupSelected, setQueryGroupSelected] = useState([])
  const [groupSelected, setGroupSelected] = useState([])

  const handleSelectAll = checked => {
    onSelectValues(checked ? _.map(getLeaf(list), v => v.value) : [])
  }

  const handleQueryFilter = query => {
    if (query === '') {
      setFilterList(list)
      setQueryGroupSelected([])
      return
    }

    const processList = filterWithQuery(list, query, withFilter)

    setFilterList(processList)

    const newGroupSelected = []
    getUnLeafValues(processList, newGroupSelected)
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

  const leafList = getLeaf(list)

  const checkedAll =
    leafList.length !== 0 && leafList.length === selectedValues.length

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

      <Flex flex column className='t-overflow-y'>
        <List
          list={filterList}
          groupSelected={newGS}
          onGroupSelect={handleGroupSelect}
          selectedValues={selectedValues}
          onSelectValues={onSelectValues}
        />
      </Flex>

      <Bottom
        checkedAll={checkedAll}
        onChange={() => handleSelectAll(!checkedAll)}
        selectValuesLength={selectedValues.length}
        leafListLength={leafList.length}
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
  style: {
    width: '400px',
    height: '500px'
  },
  withFilter: true,
  placeholder: getLocale('搜索')
}

export default Tree
