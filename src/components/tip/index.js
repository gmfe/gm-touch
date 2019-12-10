import React from 'react'
import PropTypes from 'prop-types'
import LayoutRoot from '../layout_root'
import classNames from 'classnames'

const TipStatics = {
  tip: function(options, type) {
    const id = +new Date() + '' + Math.random()

    if (typeof options === 'string') {
      options = {
        children: options
      }
    }
    options.type = type

    let timer = null
    if (options.time !== 0) {
      timer = setTimeout(() => {
        LayoutRoot._removeComponentTip(id)
      }, options.time || 3000)
    }

    const handleClose = () => {
      LayoutRoot._removeComponentTip(id)
      clearTimeout(timer)

      if (options.onClose) {
        options.onClose()
      }
    }

    LayoutRoot._setComponentTip(id, <Tip {...options} onClose={handleClose} />)

    return id
  },
  success: function(options) {
    return TipStatics.tip(options, 'success')
  },
  info: function(options) {
    return TipStatics.tip(options, 'info')
  },
  warning: function(options) {
    return TipStatics.tip(options, 'warning')
  },
  danger: function(options) {
    return TipStatics.tip(options, 'danger')
  },
  clear(id) {
    LayoutRoot._removeComponentTip(id)
  },
  clearAll() {
    LayoutRoot._removeComponentTipAll()
  }
}

const Tip = ({ type, onClose, children }) => {
  return (
    <div
      className={classNames('t-tip t-animated t-animated-fade-in-right-100', {
        [`t-tip-${type}`]: type
      })}
      onClick={onClose}
    >
      {children}
    </div>
  )
}

Tip.propTypes = {
  type: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.any
}

Object.assign(Tip, TipStatics)

export default Tip
