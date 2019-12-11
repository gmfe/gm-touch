import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import SVGSuccessCircle from '../../../svg/success-circle.svg'
import SVGCircle from '../../../svg/circle.svg'
import Flex from '../flex'

const Radio = ({
  checked,
  onChange,
  size,
  disabled,
  style,
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
          [`t-radio-${size}`]: size,
          disabled
        },
        className
      )}
      onClick={handleClick}
    >
      {checked ? (
        <SVGSuccessCircle className='t-text-primary' />
      ) : (
        <SVGCircle />
      )}
      {children}
    </Flex>
  )
}

Radio.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['lg']),
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any
}

Radio.defaultProps = {
  onChange: _.noop
}

export default Radio
