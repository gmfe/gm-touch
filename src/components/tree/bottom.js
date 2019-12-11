import { getLocale } from '../../locales'
import React from 'react'
import PropTypes from 'prop-types'
import Flex from '../flex'
import Radio from '../radio'

const Bottom = ({
  checkedAll,
  onChange,
  selectValuesLength,
  leafListLength
}) => {
  return (
    <Flex justifyBetween alignCenter className='t-border-top t-padding-one'>
      <Radio checked={checkedAll} onChange={onChange}>
        {getLocale('全选')}
      </Radio>
      <div className='t-padding-lr-one t-text-desc'>
        {selectValuesLength}/{leafListLength}
      </div>
    </Flex>
  )
}

Bottom.propTypes = {
  checkedAll: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  selectValuesLength: PropTypes.number.isRequired,
  leafListLength: PropTypes.number.isRequired
}

export default Bottom
