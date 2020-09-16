import _ from 'lodash'
import Storage from './components/storage'

const TYPE = {
  DEFAULT: 'default',
  BLUE: 'blue',
}

const KEY = 'theme'

let computedStyle = null

const CSSVariable = {
  TYPE,
  theme: Storage.get(KEY) || 'default',
  initTheme() {
    document.documentElement.classList.add(`t-theme-${this.theme}`)
  },
  setTheme(theme) {
    if (!_.values(TYPE).includes(theme)) {
      return
    }

    const cl = document.documentElement.classList
    const old = this.theme

    cl.remove(`t-theme-${old}`)
    cl.add(`t-theme-${theme}`)

    this.theme = theme
    Storage.set(KEY, theme)
  },
  // 只获取 html 上面的 css variable
  getValue(name) {
    if (!computedStyle) {
      computedStyle = window.getComputedStyle(document.documentElement)
    }
    // 有空格，要 trim
    return computedStyle.getPropertyValue(name).trim()
  },
}

export default CSSVariable
