import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { getLocale } from '@gm-touch/locales'
import Tree from '../tree'
import { filterGroupList } from '../tree/util'
import Flex from '../flex'
import SVGLeft from '../../../svg/left.svg'
import SVGRight from '../../../svg/right.svg'
import classNames from 'classnames'
import _ from 'lodash'

function getLeftAndRightList(list, selectValues) {
  const rightList = []
  const leftList = filterGroupList(list, leaf => {
    const isRight = selectValues.includes(leaf.value)
    if (isRight) {
      rightList.push(leaf)
    }
    return !isRight
  })

  return [leftList, rightList]
}

const Transfer = ({
  list,
  selectedValues,
  onSelectValues,

  leftTitle,
  leftWithFilter,
  leftPlaceHolder,

  rightTitle,
  rightWithFilter,
  rightPlaceHolder,

  className,
  ...rest
}) => {
  const [{ lefts, rights }, setLeftRights] = useState({
    lefts: [],
    rights: []
  })

  const [leftList, rightList] = useMemo(() => {
    return getLeftAndRightList(list, selectedValues)
  }, [list, selectedValues])

  const handleLeft = values => {
    setLeftRights({
      lefts: values,
      rights
    })
  }

  const handleRight = values => {
    setLeftRights({
      lefts,
      rights: values
    })
  }

  const handleClick = isLeft => {
    setLeftRights({ lefts: [], rights: [] })
    onSelectValues(_.xor(selectedValues, isLeft ? rights : lefts))
  }

  const handleToLeft = () => {
    handleClick(true)
  }

  const handleToRight = () => {
    handleClick(false)
  }

  return (
    <Flex className={classNames('t-transfer', className)} {...rest}>
      <Tree
        list={leftList}
        selectedValues={lefts}
        onSelectValues={handleLeft}
        title={leftTitle}
        withFilter={leftWithFilter}
        placeholder={leftPlaceHolder}
      />
      <Flex column justifyCenter className='t-padding-10'>
        <SVGRight
          onClick={handleToRight}
          className={classNames('t-padding-10 t-border t-cursor', { 't-bg-primary t-text-white': lefts.length > 0 })}
        />
        <div className='t-padding-10' />
        <SVGLeft
          onClick={handleToLeft}
          className={classNames('t-padding-10 t-border t-cursor', { 't-bg-primary t-text-white': rights.length > 0 })}
        />
      </Flex>
      <Tree
        list={rightList}
        selectedValues={rights}
        onSelectValues={handleRight}
        title={rightTitle}
        withFilter={rightWithFilter}
        placeholder={rightPlaceHolder}
      />
    </Flex>
  )
}

Transfer.propTypes = {
  list: PropTypes.array.isRequired,
  selectedValues: PropTypes.array.isRequired,
  onSelectValues: PropTypes.func.isRequired,

  leftTitle: PropTypes.string,
  leftWithFilter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  leftPlaceHolder: PropTypes.string,

  rightTitle: PropTypes.string,
  rightWithFilter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  rightPlaceHolder: PropTypes.string,

  className: PropTypes.string,
  style: PropTypes.object
}

Transfer.defaultProps = {
  leftTitle: getLocale('待选择'),
  leftWithFilter: true,
  leftPlaceHolder: getLocale('搜索'),

  rightTitle: getLocale('已选择'),
  rightWithFilter: true,
  rightPlaceHolder: getLocale('搜索')
}

export default Transfer
