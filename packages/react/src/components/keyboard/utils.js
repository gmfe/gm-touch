import { getLocale } from '@gm-touch/locales'

const TYPE = {
  DOT: 'dot',
  NUMBER: 'number',
  FUNC: {
    BACK: 'back',
    CLEAR: 'clear',
    CANCEL: 'cancel',
    ENTER: 'enter'
  }
}

const KEYS = [
  { type: TYPE.NUMBER, value: '1' },
  { type: TYPE.NUMBER, value: '2' },
  { type: TYPE.NUMBER, value: '3' },
  { type: TYPE.FUNC.BACK, value: '←' },
  { type: TYPE.NUMBER, value: '4' },
  { type: TYPE.NUMBER, value: '5' },
  { type: TYPE.NUMBER, value: '6' },
  { type: TYPE.DOT, value: '.' },
  { type: TYPE.NUMBER, value: '7' },
  { type: TYPE.NUMBER, value: '8' },
  { type: TYPE.NUMBER, value: '9' },
  { type: TYPE.FUNC.CLEAR, value: getLocale('清空') },
  { type: TYPE.FUNC.CANCEL, value: getLocale('取消') },
  { type: TYPE.NUMBER, value: '0' }
]

export { TYPE, KEYS }
