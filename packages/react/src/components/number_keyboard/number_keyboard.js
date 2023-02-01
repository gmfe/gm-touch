import classNames from 'classnames'
import _ from 'lodash'
import Proptypes from 'prop-types'
import React from 'react'
import Flex from '../flex'
import { NUMBER_KEYS, OPTIONS_KEYS, TYPE } from './enum.tsx'
import './style.less'

const NumberKeyboard = ({
  onKeyClick,
  onConfirm,
  onBack,
  onClear,
  onWeigh,
  decimal,
  weigh,
  weightDisable,
  inputDisable
}) => {
  const handleKeyClick = keyInfo => {
    switch (keyInfo.type) {
      case TYPE.FUNC.CLEAR:
        onClear()
        break
      case TYPE.FUNC.BACK:
        onBack()
        break
      case TYPE.FUNC.ENTER:
        onConfirm()
        break
      case TYPE.FUNC.WEIGH:
        onWeigh()
        break
      default:
        onKeyClick(keyInfo.value)
        break
    }
  }
  return (
    <>
      <Flex className='t-number-keyboard t-text-bold' justifyCenter>
        <Flex className='t-number-keyboard-number' wrap>
          {_.map(
            _.filter(
              NUMBER_KEYS,
              item =>
                (!item.decimal || item.decimal === decimal) &&
                (!item.weigh || item.weigh === weigh)
            ),
            v => {
              const disable =
                (inputDisable && [TYPE.NUMBER, TYPE.DOT].includes(v.type)) ||
                (weightDisable && [TYPE.FUNC.WEIGH].includes(v.type))
              return (
                <Flex
                  wrap
                  justifyCenter
                  alignCenter
                  className={classNames('t-number-keyboard-number-item', {
                    zero: v.value === '0',
                    weigh: v.type === TYPE.FUNC.WEIGH,
                    disable
                  })}
                  onClick={() => !disable && handleKeyClick(v)}
                >
                  {v.value}
                </Flex>
              )
            }
          )}
        </Flex>
        <Flex className='t-number-keyboard-action' column justifyBetween>
          {_.map(OPTIONS_KEYS, v => {
            const disable =
              inputDisable && [TYPE.FUNC.BACK, TYPE.FUNC.CLEAR].includes(v.type)
            return (
              <Flex
                justifyCenter
                alignCenter
                className={classNames('t-number-keyboard-action-item', {
                  enter: v.type === TYPE.FUNC.ENTER,
                  disable
                })}
                column
                onClick={() => !disable && handleKeyClick(v)}
              >
                {disable && v.type === TYPE.FUNC.BACK
                  ? v.disableValue
                  : v.value}
              </Flex>
            )
          })}
        </Flex>
      </Flex>
    </>
  )
}

NumberKeyboard.propTypes = {
  onKeyClick: Proptypes.func.isRequired,
  onBack: Proptypes.func.isRequired,
  onClear: Proptypes.func.isRequired,
  onConfirm: Proptypes.func.isRequired,
  onWeigh: Proptypes.func.isRequired,
  decimal: Proptypes.bool,
  weigh: Proptypes.bool,
  weightDisable: Proptypes.bool,
  inputDisable: Proptypes.bool
}

export default NumberKeyboard
