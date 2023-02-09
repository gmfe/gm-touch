import { getLocale } from '@gm-touch/locales'
import React from 'react'
import SVGDeleteBLack from '../../../svg/dele-balck.svg'
import SVGDeleteGray from '../../../svg/dele-gray.svg'

const TYPE = {
  DOT: 'dot',
  NUMBER: 'number',
  FUNC: {
    BACK: 'back',
    CLEAR: 'clear',
    ENTER: 'enter',
    WEIGH: 'weigh'
  }
}

const NUMBER_KEYS = [
  { type: TYPE.NUMBER, value: '7' },
  { type: TYPE.NUMBER, value: '8' },
  { type: TYPE.NUMBER, value: '9' },
  { type: TYPE.NUMBER, value: '4' },
  { type: TYPE.NUMBER, value: '5' },
  { type: TYPE.NUMBER, value: '6' },
  { type: TYPE.NUMBER, value: '1' },
  { type: TYPE.NUMBER, value: '2' },
  { type: TYPE.NUMBER, value: '3' },
  { type: TYPE.DOT, value: '.', decimal: true },
  { type: TYPE.NUMBER, value: '0' },
  { type: TYPE.FUNC.WEIGH, value: getLocale('称重'), weigh: true }
]

const OPTIONS_KEYS = [
  {
    type: TYPE.FUNC.BACK,
    value: <SVGDeleteBLack style={{ fontSize: '44px' }} />,
    disableValue: <SVGDeleteGray style={{ fontSize: '44px' }} />
  },
  { type: TYPE.FUNC.CLEAR, value: getLocale('清零') },
  { type: TYPE.FUNC.ENTER, value: getLocale('确定') }
]

export { TYPE, NUMBER_KEYS, OPTIONS_KEYS }
