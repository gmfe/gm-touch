import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import SVGSuccessRadio from '../../../svg/radio.svg'
import SVGRadio from '../../../svg/circle.svg'
import Flex from '../flex'

const Radio = ({
  checked,
  onChange,
  disabled,
  className,
  children,
  ...rest
}) => {
  const handleClick = () => {
    !disabled && onChange(!checked)
  }
  return (
    <Flex
      {...rest}
      alignCenter
      className={classNames(
        't-radio',
        {
          disabled
        },
        className
      )}
      onClick={handleClick}
    >
      {checked ? (
        <i className='t-radio-icon'>
          <SVGSuccessRadio className='t-text-primary' />
        </i>
      ) : (
        <i className='t-radio-icon'>
          <SVGRadio />
        </i>
      )}
      {children}
    </Flex>
  )
}

Radio.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any
}

Radio.defaultProps = {
  onChange: _.noop
}

export default Radio
