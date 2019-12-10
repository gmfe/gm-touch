import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'

const Switch = props => {
  const [checked, setChecked] = useState(props.checked)
  const [labelWidth, setLabelWidth] = useState(null)

  const refOn = useRef(null)
  const refOff = useRef(null)

  const { on, off, disabled, size, onChange } = props
  const height = size === 'lg' ? 49 : 36

  useEffect(() => {
    // 初始化后开始计算on和off的宽度，取较大值作为switch开关的宽度
    const offWidth = refOff.current.offsetWidth
    const onWidth = refOn.current.offsetWidth

    const labelWidth =
      Math.max(Math.max(offWidth, onWidth), height * 1.5) + height / 4

    setLabelWidth(labelWidth)
  }, [])

  useEffect(() => {
    setChecked(props.checked)
  }, [props.checked])

  const handleChange = e => {
    if (disabled) {
      return
    }

    onChange(e.target.checked)
  }

  return (
    <>
      <input
        data-text={checked ? on : off}
        ref={refOff}
        className={classNames('t-switch', {
          't-switch-lg': size === 'lg',
          disabled: disabled
        })}
        style={{ width: labelWidth }}
        data-attr={labelWidth}
        disabled={disabled}
        type='checkbox'
        checked={checked}
        onChange={handleChange}
      />
      {!labelWidth && (
        <input
          data-text={checked ? off : on}
          ref={refOn}
          className={classNames('t-switch', {
            't-switch-lg': size === 'lg'
          })}
          type='checkbox'
          style={{ position: 'fixed', visibility: 'hidden' }}
        />
      )}
    </>
  )
}

Switch.displayName = 'Switch'

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  on: PropTypes.any,
  off: PropTypes.any,
  size: PropTypes.oneOf(['lg']),
  disabled: PropTypes.bool
}
Switch.defaultProps = {
  on: '',
  off: '',
  onChange: _.noop
}

export default Switch
