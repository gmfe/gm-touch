import _ from 'lodash'

function getLeaf(list, result = []) {
  _.each(list, v => {
    if (v.children) {
      getLeaf(v.children, result)
    } else {
      result.push(v)
    }
  })
  return result
}

function getUnLeafValues(list, result = []) {
  _.each(list, v => {
    if (v.children) {
      result.push(v.value)
      getUnLeafValues(v.children, result)
    }
  })
  return result
}

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

function listToFlat(list, groupSelected) {
  const result = []

  // 我就不信你层级这么多，4层够用了。懒(bu)得(hui)写递归
  _.each(list, one => {
    result.push({
      isLeaf: !one.children,
      level: 0,
      data: one
    })

    if (!groupSelected.includes(one.value)) {
      return
    }

    _.each(one.children, two => {
      result.push({
        isLeaf: !two.children,
        level: 1,
        data: two
      })

      if (!groupSelected.includes(two.value)) {
        return
      }

      _.each(two.children, there => {
        result.push({
          isLeaf: !there.children,
          level: 2,
          data: there
        })

        if (!groupSelected.includes(there.value)) {
          return
        }

        _.each(there.children, four => {
          result.push({
            isLeaf: !four.children,
            level: 3,
            data: four
          })
        })
      })
    })
  })

  return result
}

export { getLeaf, getUnLeafValues, filterGroupList, listToFlat }
