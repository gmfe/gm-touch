import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import Popover from '../popover'
import Selection from '../selection'
import List from '../list'

const Select = ({
  data,
  value,
  onChange,
  children,
  disabled,
  className,
  isInPopup,
  ...rest
}) => {
  const refPopup = useRef(null)

  const handleChange = value => {
    refPopup.current.apiDoSetActive(false)

    onChange(value)
  }

  let selected
  let newData

  newData = data
  selected = _.find(newData, v => v.value === value)

  const popup = (
    <List
      data={newData}
      selected={value}
      onSelect={handleChange}
      className={'t-border-0 t-padding-tb-5'}
      style={{
        maxHeight: '250px'
      }}
    />
  )

  return (
    <Popover
      ref={refPopup}
      type='click'
      popup={popup}
      disabled={disabled}
      isInPopup={isInPopup}
    >
      <Selection
        {...rest}
        selected={selected}
        onSelect={onChange}
        disabled={disabled}
        className={classNames(`t-select t-bg t-inline-block`, className)}
      />
    </Popover>
  )
}

Select.displayName = 'Select'

Select.propTypes = {
  /** [{text, value, disabled}, {text, value}] */
  data: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  isInPopup: PropTypes.bool
}

export default Select
