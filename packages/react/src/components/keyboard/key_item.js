import React from 'react'
import Flex from '../flex'
import { TYPE } from './utils'
import classNames from 'classnames'
import Button from '../button'
import Proptypes from 'prop-types'

const KeyItem = ({ keyInfo, onKeyClick, className }) => (
  <Button
    key={keyInfo.value}
    className={classNames('t-keyboard-key', className)}
    alignCenter
    justifyCenter
    onClick={() => onKeyClick(keyInfo)}
  >
    <Flex
      justifyCenter
      alignCenter
      className={classNames({
        't-keyboard-num':
          keyInfo.type === TYPE.NUMBER || keyInfo.type === TYPE.DOT
      })}
    >
      {keyInfo.value}
    </Flex>
  </Button>
)

KeyItem.propTypes = {
  keyInfo: Proptypes.object.isRequired,
  className: Proptypes.string,
  onKeyClick: Proptypes.func
}

export default KeyItem
