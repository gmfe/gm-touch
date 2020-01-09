import _ from 'lodash'
import { textFilter } from '../../util'

// 过滤叶子
function filterGroupListLeaf(list, predicate) {
  return _.filter(list, function(d) {
    if (d.children) {
      d.children = filterGroupListLeaf(d.children, predicate)
    }

    if (d.children) {
      return !!d.children.length
    } else {
      return predicate(d)
    }
  })
}

function filterGroupList(list, predicate) {
  return filterGroupListLeaf(_.cloneDeep(list), predicate)
}

// 这里做一层 cache
const _cache = []
const filterWithQuery = (list, query, withFilter) => {
  let processList
  if (withFilter === true) {
    processList = filterGroupList(list, v => {
      const field = `${query}______${v.text}`
      if (_cache[field] === undefined) {
        _cache[field] = textFilter([v], query, v => v.text).length > 0
      }

      return _cache[field]
    })
  } else if (withFilter) {
    processList = withFilter(list, query)
  } else {
    processList = list
  }

  return processList
}

function listToFlat(
  list,
  pushCondition,
  childrenCondition,
  result = [],
  level = 0
) {
  _.each(list, item => {
    if (pushCondition(item)) {
      result.push({
        isLeaf: !item.children,
        level,
        data: item
      })
    }

    if (childrenCondition(item)) {
      listToFlat(
        item.children,
        pushCondition,
        childrenCondition,
        result,
        level + 1
      )
    }
  })

  return result
}

function listToFlatFilterWithGroup(list, groupSelected) {
  return listToFlat(
    list,
    () => true,
    item => {
      return groupSelected.includes(item.value)
    }
  )
}

function getLeaf(list) {
  const flat = listToFlat(
    list,
    item => !item.children,
    () => true
  )

  return _.map(flat, item => item.data)
}

function getUnLeafValues(list) {
  const flat = listToFlat(
    list,
    item => !!item.children,
    () => true
  )

  return _.map(flat, item => item.data.value)
}

function getValues(list) {
  const flat = listToFlat(
    list,
    () => true,
    () => true
  )

  return _.map(flat, item => item.data.value)
}

function getLeafValues(list) {
  const flat = listToFlat(
    list,
    item => !item.children,
    () => true
  )

  return _.map(flat, item => item.data.value)
}

function unSelectAll(list, selectedValues) {
  // 用find，高效
  const unSelected = _.find(list, item => {
    if (item.children) {
      return unSelectAll(item.children, selectedValues)
    } else {
      return !selectedValues.includes(item.value)
    }
  })

  return !!unSelected
}

export {
  getLeaf,
  getUnLeafValues,
  filterGroupList,
  filterWithQuery,
  listToFlat,
  listToFlatFilterWithGroup,
  getValues,
  getLeafValues,
  unSelectAll
}
