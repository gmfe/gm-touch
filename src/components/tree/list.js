import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Flex from '../flex'
import Radio from '../radio'
import SVGPlus from '../../../svg/plus.svg'
import SVGMinus from '../../../svg/minus.svg'
import { listToFlat } from './util'

const Item = ({
  isGroup,
  onGroup,
  isSelected,
  onSelect,
  flatData: { isLeaf, level, data }
}) => {
  return (
    <Flex
      alignCenter
      className='t-tree-list-item'
      style={{
        paddingLeft: `calc(${level}em + 10px)`
      }}
    >
      {!isLeaf ? (
        <div className='t-padding-10' onClick={() => onGroup(data.value)}>
          {isGroup ? <SVGMinus /> : <SVGPlus />}
        </div>
      ) : (
        <div style={{ width: '1em' }} />
      )}
      <Radio checked={isSelected} onChange={() => onSelect(data.value)} />
      <Flex
        flex
        column
        block
        onClick={isLeaf ? () => onSelect(data.value) : _.noop}
      >
        {data.text}
      </Flex>
    </Flex>
  )
}

Item.propTypes = {
  isGroup: PropTypes.bool.isRequired,
  onGroup: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  flatData: PropTypes.shape({
    isLeaf: PropTypes.bool.isRequired,
    level: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired
  })
}

const List = ({
  list,
  groupSelected,
  onGroupSelect,
  selectedValues,
  onSelectValues
}) => {
  const flatList = useMemo(() => {
    return listToFlat(list, groupSelected)
  }, [list, groupSelected])

  const handleGroup = value => {
    onGroupSelect(_.xor(groupSelected, [value]))
  }

  const handleSelect = value => {
    onSelectValues(_.xor(selectedValues, [value]))
  }

  return (
    <div>
      {_.map(flatList, v => {
        const isGroup = groupSelected.includes(v.data.value)
        const isSelected = selectedValues.includes(v.data.value)
        return (
          <Item
            key={v.data.value}
            isGroup={isGroup}
            onGroup={handleGroup}
            onSelect={handleSelect}
            isSelected={isSelected}
            flatData={v}
          />
        )
      })}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.array.isRequired,
  groupSelected: PropTypes.array.isRequired,
  onGroupSelect: PropTypes.func.isRequired,
  selectedValues: PropTypes.array.isRequired,
  onSelectValues: PropTypes.func.isRequired
}

export default List
