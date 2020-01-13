import { getLocale } from '@gm-touch/locales'
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Flex from '../flex'
import Radio from '../radio'
import { getLeafValues } from './util'

const Bottom = ({ list, selectedValues, onChange }) => {
  const leafValues = useMemo(() => {
    return getLeafValues(list)
  }, [list])

  const checkedAll =
    leafValues.length !== 0 && leafValues.length === selectedValues.length

  return (
    <Flex justifyBetween alignCenter className='t-border-top t-padding-lr-5'>
      <Radio checked={checkedAll} onChange={() => onChange(!checkedAll)}>
        {getLocale('全选')}
      </Radio>
      <div className='t-padding-lr-5 t-text-desc'>
        {selectedValues.length}/{leafValues.length}
      </div>
    </Flex>
  )
}

Bottom.propTypes = {
  list: PropTypes.array.isRequired,
  selectedValues: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Bottom
