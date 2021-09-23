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
  inline,
  desc,
  ...rest
}) => {
  const handleClick = () => {
    !disabled && onChange(!checked)
  }
  return (
    <div
      {...rest}
      className={classNames(
        't-radio',
        {
          disabled,
          't-radio-inline': inline
        },
        className
      )}
      onClick={handleClick}
    >
      <Flex alignCenter>
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
      {desc && <div className='t-margin-top-10'>{desc}</div>}
    </div>
  )
}

Radio.propTypes = {
  inline: PropTypes.bool,
  value: PropTypes.number,
  checked: PropTypes.bool,
  /** 描述信息 */
  desc: PropTypes.any,
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
