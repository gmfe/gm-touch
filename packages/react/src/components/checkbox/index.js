import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import SVGSuccessCircle from '../../../svg/success-circle.svg'
import SVGCircle from '../../../svg/circle.svg'
import SVGSuccessSquare from '../../../svg/success-square.svg'
import SVGSquare from '../../../svg/square.svg'
import Flex from '../flex'

const icon = (type, bgWhite) => {
  switch (type) {
    case 'circle':
      return {
        checked: (
          <i
            className={classNames('t-checkbox-icon', {
              't-checkbox-icon-bg-white': bgWhite
            })}
          >
            <SVGSuccessCircle
              className={classNames('t-text-primary t-checkbox-icon-circle')}
            />
          </i>
        ),
        unchecked: (
          <i
            className={classNames('t-checkbox-icon', {
              't-checkbox-icon-bg-white': bgWhite
            })}
          >
            <SVGCircle className={classNames('t-checkbox-icon-circle')} />
          </i>
        )
      }
    case 'square':
      return {
        checked: (
          <i className='t-checkbox-icon'>
            <SVGSuccessSquare className='t-text-primary t-checkbox-icon-square' />
          </i>
        ),
        unchecked: (
          <i className='t-checkbox-icon'>
            <SVGSquare className='t-checkbox-icon-square' />
          </i>
        )
      }
  }
}

const Checkbox = ({
  checked,
  onChange,
  disabled,
  className,
  children,
  type,
  bgWhite,
  ...rest
}) => {
  const handleClick = () => {
    !disabled && onChange(!checked)
  }

  const Icon = React.useMemo(() => icon(type, bgWhite), [type, bgWhite])

  return (
    <Flex
      {...rest}
      alignCenter
      className={classNames(
        't-checkbox',
        {
          disabled
        },
        className
      )}
      onClick={handleClick}
    >
      {checked ? Icon.checked : Icon.unchecked}
      {children}
    </Flex>
  )
}

Checkbox.propTypes = {
  type: PropTypes.oneOf(['circle', 'square']),
  bgWhite: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any
}

Checkbox.defaultProps = {
  onChange: _.noop,
  type: 'circle'
}

export default Checkbox
