import React, { CSSProperties, useMemo } from 'react'
import _ from 'lodash'
import { Flex } from '../flex'
import { Radio } from '../radio'
import SVGPlus from '../../../svg/plus.svg'
import SVGMinus from '../../../svg/minus.svg'
import { listToFlatFilterWithGroup, getValues, unSelectAll } from './util'
import { FixedSizeList } from 'react-window'
import VARIABLE from '../../variable'
import { TreeListOption } from './tree'

export interface ItemProps<T> {
  isGroup: boolean
  onGroup(e: T, isGroup: boolean): void
  isSelected: boolean
  onSelect(e: T, isGroup: boolean): void
  flatData?: {
    isLeaf: boolean
    level: number
    data: T
  }
  style: CSSProperties
}

function Item<T extends { text: string }>({
  isGroup,
  onGroup,
  isSelected,
  onSelect,
  flatData: { isLeaf, level, data },
  style
}: ItemProps<T>) {
  const handleGroup = e => {
    e.stopPropagation()
    onGroup(data, !isGroup)
  }

  const handleRadio = () => {
    onSelect(data, !isSelected)
  }

  const handleName = () => {
    if (isLeaf) {
      onSelect(data, !isSelected)
    } else {
      onGroup(data, !isGroup)
    }
  }

  return (
    <Flex
      alignCenter
      className='t-tree-list-item'
      style={{
        ...style,
        paddingLeft: `calc(${level}em + 10px)`
      }}
    >
      {!isLeaf ? (
        <div className='t-padding-10' onClick={handleGroup}>
          {isGroup ? <SVGMinus /> : <SVGPlus />}
        </div>
      ) : (
        <div style={{ width: '1em' }} />
      )}
      <Radio checked={isSelected} onChange={handleRadio} />
      <Flex flex column block onClick={handleName}>
        {data.text}
      </Flex>
    </Flex>
  )
}
export interface ListProps<T> {
  list: TreeListOption<T>[]
  groupSelected: T[] // todo 待定
  onGroupSelect(e: T[]): void
  selectedValues: T[]
  onSelectValues(e: T[]): void
  listHeight: number
}

function List<T>({
  list,
  groupSelected,
  onGroupSelect,
  selectedValues,
  onSelectValues,
  listHeight
}: ListProps<T>) {
  const flatList = useMemo(() => {
    return listToFlatFilterWithGroup(list, groupSelected)
  }, [list, groupSelected])

  const handleGroup = data => {
    onGroupSelect(_.xor(groupSelected, [data.value]))
  }

  const handleSelect = (data, isSelected) => {
    const values = getValues([data])

    if (isSelected) {
      onSelectValues(_.uniq(selectedValues.concat(values)))
    } else {
      onSelectValues(_.difference(selectedValues, values))
    }
  }

  const Row = ({ index, style }) => {
    const item = flatList[index]
    const isGroup = groupSelected.includes(item.data.value)
    const isSelected = !unSelectAll([item.data], selectedValues)

    return (
      <Item
        key={item.data.value}
        isGroup={isGroup}
        onGroup={handleGroup}
        onSelect={handleSelect}
        isSelected={isSelected}
        flatData={item}
        style={style}
      />
    )
  }

  return (
    <FixedSizeList
      height={listHeight}
      itemCount={flatList.length}
      itemSize={VARIABLE['--size-form-height']}
    >
      {Row}
    </FixedSizeList>
  )
}

export default List
