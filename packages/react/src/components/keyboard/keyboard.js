import React from 'react'
import Flex from '../flex'
import Modal from '../modal'
import LayoutRoot from '../layout_root'
import _ from 'lodash'
import { TYPE, KEYS } from './utils'
import Proptypes from 'prop-types'
import KeyItem from './key_item'
import { getLocale } from '@gm-touch/locales'
import Button from '../button'

const Keyboard = ({
  customFuncArea,
  onKeyClick,
  onConfirm,
  onCancel,
  onClear,
  onBackSpace
}) => {
  const handleKeyClick = keyInfo => {
    switch (keyInfo.type) {
      case TYPE.FUNC.BACK:
        onBackSpace()
        break
      case TYPE.FUNC.CLEAR:
        onClear()
        break
      case TYPE.FUNC.CANCEL:
        onCancel()
        break
      case TYPE.FUNC.ENTER:
        onConfirm()
        break
      default:
        onKeyClick(keyInfo)
        break
    }
  }

  return (
    <Flex column>
      <Flex wrap justifyBetween alignCenter className='t-keyboard'>
        {_.map(KEYS, k => (
          <KeyItem
            keyInfo={k}
            className='t-margin-top-20'
            onKeyClick={onKeyClick}
          />
        ))}
        <Flex className='t-keyboard-func-area'>
          {customFuncArea || (
            <Button
              block
              className='t-keyboard-enter'
              onClick={() =>
                handleKeyClick({
                  type: TYPE.FUNC.ENTER,
                  value: getLocale('确定')
                })
              }
            >
              {getLocale('确定')}
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

Keyboard.render = ({ title, onHide, ...rest }) => {
  LayoutRoot.setComponent(
    LayoutRoot.TYPE.KEYBOARD,
    <Modal
      title={title}
      onHide={() => {
        Keyboard.hide()
      }}
    >
      <Keyboard {...rest} />
    </Modal>
  )
}

Keyboard.hide = () => {
  LayoutRoot.removeComponent(LayoutRoot.TYPE.KEYBOARD, null)
}

Keyboard.TYPE = TYPE

Keyboard.propTypes = {
  customFuncArea: Proptypes.element,
  onKeyClick: Proptypes.func.isRequired,
  onBackSpace: Proptypes.func.isRequired,
  onCancel: Proptypes.func.isRequired,
  onClear: Proptypes.func.isRequired,
  onConfirm: Proptypes.func.isRequired
}

export default Keyboard
