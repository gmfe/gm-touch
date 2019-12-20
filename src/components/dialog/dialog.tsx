import { getLocale } from '../../locales'
import React, { ReactElement, useRef } from 'react'
import { Modal } from '../modal'
import _ from 'lodash'
import classNames from 'classnames'
import { LayoutRoot } from '../layout_root'
import { Button } from '../button'
import { is } from 'gm-util'

export interface DialogProps {
  title?: string
  type?: string
  onOK?(): Promise<void>
  onCancel?(): void
  size?: 'lg' | 'md' | 'sm'
  promptDefaultValue?: string
  promptPlaceholder?: string
  cancelBtn?: string | boolean
  OKBtn?: string | boolean
  disableMaskClose?: boolean
  children?: ReactElement
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
}: DialogProps) => {
  const refInput = useRef(null)

  const handleCancel = () => {
    onCancel()
  }

  const handleOK = () => {
    // @ts-ignore
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
      title={title}
      size={modalProps.size}
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
      <div className='t-gap-two' />
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

Dialog.alert = function(options) {
  return Dialog.dialog(options, 'alert')
}

Dialog.confirm = function(options) {
  return Dialog.dialog(options, 'confirm')
}

Dialog.prompt = function(options) {
  return Dialog.dialog(options, 'prompt')
}

Dialog.dialog = function(options, type) {
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

      if (!is.promise(result)) {
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
