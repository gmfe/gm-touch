import { getLocale } from '../../locales'
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Modal from '../modal'
import _ from 'lodash'
import classNames from 'classnames'
import LayoutRoot from '../layout_root'
import Button from '../button'
import { isPromise } from '../../util'

let DialogStatics = {
  alert(options) {
    return DialogStatics.dialog(options, 'alert')
  },
  confirm(options) {
    return DialogStatics.dialog(options, 'confirm')
  },
  prompt(options) {
    return DialogStatics.dialog(options, 'prompt')
  },
  dialog(options, type) {
    if (typeof options === 'string') {
      options = {
        children: options
      }
    }
    options.type = type

    return new Promise((resolve, reject) => {
      const _OK = options.onOK
      options.onOK = value => {
        const result = _OK && _OK(value)

        if (result === false) {
          return
        }

        if (!isPromise(result)) {
          resolve(value)
          LayoutRoot.removeComponent(LayoutRoot.TYPE.MODAL)
          return
        }

        return Promise.resolve(result)
          .then(
            () => {
              resolve(value)
            },
            () => {
              reject()
            }
          )
          .finally(() => {
            LayoutRoot.removeComponent(LayoutRoot.TYPE.MODAL)
          })
      }

      options.onCancel = () => {
        LayoutRoot.removeComponent(LayoutRoot.TYPE.MODAL)
        reject()
      }

      LayoutRoot.setComponent(LayoutRoot.TYPE.MODAL, <Dialog {...options} />)
    })
  }
}

const Dialog = ({
  size,
  title,
  children,
  type,
  promptDefaultValue,
  promptPlaceholder,
  onOK,
  onCancel,
  cancelBtn,
  OKBtn,
  disableMaskClose
}) => {
  const refInput = useRef(null)

  const handleCancel = () => {
    onCancel()
  }

  const handleOK = () => {
    const result = onOK(type === 'prompt' ? refInput.current.value : undefined)

    return Promise.resolve(result)
  }

  const handleEnter = e => {
    if (e.keyCode === 13) {
      handleOK()
    }
  }

  const modalProps = {
    onHide: handleCancel,
    disableMaskClose,
    size
  }

  return (
    <Modal
      {...modalProps}
      className={classNames('gm-dialog', {
        ['gm-dialog-' + type]: type
      })}
      size={modalProps.size}
      title={title}
    >
      <div>
        {children}
        {type === 'prompt' && (
          <input
            autoFocus
            defaultValue={promptDefaultValue}
            placeholder={promptPlaceholder}
            ref={refInput}
            type='text'
            style={{ display: 'block', width: '100%' }}
            onKeyDown={handleEnter}
          />
        )}
      </div>
      <div className='t-gap-10' />
      <div className='t-text-right'>
        {type !== 'alert' && cancelBtn && (
          <Button onClick={handleCancel}>{cancelBtn}</Button>
        )}
        <span className='t-gap-30' />
        {OKBtn && (
          <Button type='primary' onClick={handleOK}>
            {OKBtn}
          </Button>
        )}
      </div>
    </Modal>
  )
}

Object.assign(Dialog, DialogStatics)

Dialog.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  onCancel: PropTypes.func,
  onOK: PropTypes.func,
  size: PropTypes.string,
  promptDefaultValue: PropTypes.string,
  promptPlaceholder: PropTypes.string,
  cancelBtn: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  OKBtn: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disableMaskClose: PropTypes.bool,
  children: PropTypes.any
}
Dialog.defaultProps = {
  title: getLocale('提示'),
  onCancel: _.noop,
  onOK: _.noop,
  size: 'sm',
  cancelBtn: getLocale('取消'),
  OKBtn: getLocale('确定'),
  disableMaskClose: false
}

export default Dialog
