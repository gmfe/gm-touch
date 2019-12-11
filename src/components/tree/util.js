import _ from 'lodash'

// 过滤叶子
function filterGroupListLeaf(list, what) {
  return _.filter(list, function(d) {
    if (d.children) {
      d.children = filterGroupListLeaf(d.children, what)
    }

    if (d.children) {
      return !!d.children.length
    } else {
      return what(d)
    }
  })
}

function filterGroupList(list, what) {
  return filterGroupListLeaf(_.cloneDeep(list), what)
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

  return _.map(flat, item => item.data)
}

export {
  getLeaf,
  getUnLeafValues,
  filterGroupList,
  listToFlat,
  listToFlatFilterWithGroup
}
