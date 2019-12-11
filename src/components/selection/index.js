import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import IconDownUp from '../icon_down_up'

/** 内部用 选择区域 */
const Selection = ({
  selected,
  onSelect,
  disabled,
  renderSelected,
  placeholder,
  className,
  ...rest
}) => {
  const text =
    selected !== null && selected !== undefined ? renderSelected(selected) : ''

  return (
    <div
      {...rest}
      className={classNames(
        't-selection',
        {
          disabled
        },
        className
      )}
    >
      <div className='t-selection-selected'>{text || placeholder}</div>
      <IconDownUp active={(className || '').includes('t-popover-active')} className='t-selection-icon' />
    </div>
  )
}

Selection.propTypes = {
  /** 单选情况 无 or {value, text} */
  selected: PropTypes.any,
  onSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  renderSelected: PropTypes.func,
  placeholder: PropTypes.string,

  className: PropTypes.string,
  style: PropTypes.object
}

Selection.defaultProps = {
  renderSelected: item => item.text
}

export default Selection
