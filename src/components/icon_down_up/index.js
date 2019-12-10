import React from 'react'
import PropTypes from 'prop-types'
import SVGDown from '../../../svg/down.svg'
import classNames from 'classnames'

const IconDownUp = ({ active, className, ...rest }) => {
  return (
    <SVGDown
      {...rest}
      className={classNames(
        't-icon-down-up',
        {
          active
        },
        className
      )}
    />
  )
}

IconDownUp.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
}

export default IconDownUp
