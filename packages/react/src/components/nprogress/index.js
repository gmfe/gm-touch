import React from 'react'
import LayoutRoot from '../layout_root'

const NProgress = () => <div className={'t-nprogress t-nprogress-loading'} />

let timer = null
let reqLength = 0

const NProgressStatics = {
  start: function() {
    reqLength = reqLength + 1
    if (reqLength === 1) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      LayoutRoot.setComponent(LayoutRoot.TYPE.N_PROGRESS, <NProgress />)
    }
  },
  done: function() {
    reqLength = reqLength - 1
    const nProgress = document.querySelector('.t-nprogress')
    if (!reqLength && !timer) {
      nProgress && (nProgress.className = 't-nprogress t-nprogress-completed')
      timer = setTimeout(function() {
        LayoutRoot.removeComponent(LayoutRoot.TYPE.N_PROGRESS)
        timer = null
      }, 250)
    }
  }
}

Object.assign(NProgress, NProgressStatics)
export default NProgress
