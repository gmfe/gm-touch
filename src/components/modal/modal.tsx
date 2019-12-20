import React, { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { LayoutRoot } from '../layout_root'
import classNames from 'classnames'

export interface ModalProps {
  onHide(): void
  title?: string
  disableMaskClose?: boolean
  opacityMask?: boolean
  size?: 'lg' | 'md' | 'sm'
  noContentPadding?: boolean
  children: ReactElement | ReactNode
}

const Modal = ({
  title,
  size = 'md',
  style,
  noContentPadding,
  opacityMask,
  disableMaskClose,
  onHide,
  className,
  children
}: ModalProps & HTMLAttributes<HTMLDivElement>) => {
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
            X
          </div>
          {title && <div className='t-modal-title'>{title}</div>}
          <div
            className={classNames('t-modal-content', {
              't-padding-none': noContentPadding
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

export default Modal
