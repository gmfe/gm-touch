import { getLocale } from '../../locales'
import React, { useMemo } from 'react'
import { Flex } from '../flex'
import { Radio } from '../radio'
import { getLeafValues } from './util'
import { TreeListOption } from './tree'

export interface BottomProps<T> {
  list: TreeListOption<T>[] // todo 格式待定
  selectedValues: T[]
  onChange(e: boolean): void
}

function Bottom<T>({ list, selectedValues, onChange }: BottomProps<T>) {
  const leafValues = useMemo(() => {
    return getLeafValues(list)
  }, [list])

  const checkedAll =
    leafValues.length !== 0 && leafValues.length === selectedValues.length

  return (
    <Flex justifyBetween alignCenter className='t-border-top t-padding-lr-one'>
      <Radio checked={checkedAll} onChange={() => onChange(!checkedAll)}>
        {getLocale('全选')}
      </Radio>
      <div className='t-padding-lr-one t-text-desc'>
        {selectedValues.length}/{leafValues.length}
      </div>
    </Flex>
  )
}

export default Bottom
