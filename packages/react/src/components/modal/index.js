import React from 'react'
import PropTypes from 'prop-types'
import LayoutRoot from '../layout_root'
import classNames from 'classnames'
import SVGRemove from '../../../svg/remove.svg'

const Modal = ({
  title,
  size,
  style,
  noContentPadding,
  opacityMask,
  disableMaskClose,
  onHide,
  className,
  children,
  haveOverFlow
}) => {
  const handleMask = () => {
    if (!disableMaskClose) {
      onHide()
    }
  }

  const handleClose = () => {
    onHide()
  }

  return (
    <>
      <div className={classNames('t-modal', className)}>
        <div
          className={classNames('t-modal-mask', {
            't-modal-mask-opacity': opacityMask
          })}
          onClick={handleMask}
        />
        <div
          className={classNames('t-modal-dialog', 't-modal-' + size, {
            't-modal-dialog-has-title': title,
            't-border': opacityMask,
            't-box-shadow-bottom': opacityMask
          })}
          style={style}
        >
          <div className='t-modal-close' onClick={handleClose}>
            <SVGRemove />
          </div>
          {title && <div className='t-modal-title'>{title}</div>}
          <div
            className={classNames('t-modal-content', {
              't-padding-0': noContentPadding,
              't-modal-overflow': haveOverFlow
            })}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

Modal.render = props => {
  LayoutRoot.setComponent(LayoutRoot.TYPE.MODAL, <Modal {...props} />)
}

Modal.hide = () => {
  LayoutRoot.setComponent(LayoutRoot.TYPE.MODAL, null)
}

Modal.propTypes = {
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string,
  disableMaskClose: PropTypes.bool,
  opacityMask: PropTypes.bool,
  size: PropTypes.string, // lg md sm
  noContentPadding: PropTypes.bool,
  haveOverFlow: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
}

Modal.defaultProps = {
  size: 'md'
}

export default Modal
