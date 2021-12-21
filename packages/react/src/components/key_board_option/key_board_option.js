import React from 'react'
import { NUMBER_KEYS, OPTIONS_KEYS, TYPE } from './enum'
import Flex from '../flex'
import './style.less'
import classNames from 'classnames'
import Proptypes from 'prop-types'

import _ from 'lodash'

const KeyBoardOption = ({
  onKeyClick,
  onConfirm,
  onCancel,
  onClear,
  onWidth,
  isNoWidth = false
}) => {
  const handleKeyClick = keyInfo => {
    switch (keyInfo.type) {
      case TYPE.FUNC.CLEAR:
        onClear()
        break
      case TYPE.FUNC.CANCEL:
        onCancel()
        break
      case TYPE.FUNC.ENTER:
        onConfirm()
        break
      case TYPE.FUNC.WiDTH:
        onWidth()
        break
      default:
        onKeyClick(keyInfo)
        break
    }
  }
  return (
    <>
      <Flex className='t-new-keyBoard t-text-bold'>
        <Flex
          wrap
          justifyBetween
          alignContentBetween
          className='t-new-keyBoard-right'
        >
          {_.map(
            _.filter(NUMBER_KEYS, item => item.isNoWidth !== isNoWidth),
            v => (
              <Flex
                wrap
                justifyCenter
                alignCenter
                className={classNames('t-keyBoard-item', {
                  't-keyBoard-zero ': v.value === '0' && isNoWidth,
                  't-keyBoard-text': v.type !== TYPE.NUMBER
                })}
                onClick={handleKeyClick}
              >
                {v.value}
              </Flex>
            )
          )}
        </Flex>
        <Flex column justifyBetween className='t-margin-left-20'>
          {_.map(OPTIONS_KEYS, v => (
            <Flex
              justifyCenter
              alignCenter
              className={classNames('t-keyBoard-item', {
                't-keyBoard-enter t-text-white': v.type === TYPE.FUNC.ENTER,
                't-keyBoard-text': v.type === TYPE.FUNC.CLEAR
              })}
              onClick={handleKeyClick}
            >
              {v.value}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </>
  )
}

KeyBoardOption.propTypes = {
  onKeyClick: Proptypes.func.isRequired,
  onCancel: Proptypes.func.isRequired,
  onClear: Proptypes.func.isRequired,
  onConfirm: Proptypes.func.isRequired,
  onWidth: Proptypes.func.isRequired,
  isNoWidth: Proptypes.bool
}

export default KeyBoardOption
