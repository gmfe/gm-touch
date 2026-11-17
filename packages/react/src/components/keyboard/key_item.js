import React from 'react'
import Flex from '../flex'
import { TYPE } from './utils'
import classNames from 'classnames'
import Button from '../button'
import Proptypes from 'prop-types'

const KeyItem = ({ keyInfo, onKeyClick, className, showShortcuts }) => (
  <Button
    key={keyInfo.value}
    className={classNames('t-keyboard-key', className)}
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
    {showShortcuts && keyInfo.shortcut && (
      <div className="t-keyboard-shortcut">{keyInfo.shortcut}</div>
    )}
  </Button>
)

KeyItem.propTypes = {
  keyInfo: Proptypes.object.isRequired,
  className: Proptypes.string,
  onKeyClick: Proptypes.func,
  showShortcuts: Proptypes.bool
}

export default KeyItem
