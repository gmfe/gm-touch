import React from 'react'
import { LayoutRoot } from '../layout_root'

const NProgress = () => {
  return <div className={'t-nprogress t-nprogress-loading'} />
}

NProgress.start = function() {
  reqLength = reqLength + 1
  if (reqLength === 1) {
    if (timer) {
      clearTimeout(timer)
      // timer = null
    }
    LayoutRoot.setComponent(LayoutRoot.TYPE.N_PROGRESS, <NProgress />)
  }
}

NProgress.done = function() {
  reqLength = reqLength - 1
  const nProgress = document.querySelector('.t-nprogress')
  if (!reqLength && !timer) {
    nProgress && (nProgress.className = 't-nprogress t-nprogress-completed')
    timer = setTimeout(function() {
      LayoutRoot.removeComponent(LayoutRoot.TYPE.N_PROGRESS)
      // timer = null
      clearTimeout(timer)
    }, 250)
  }
}

let timer: ReturnType<typeof setTimeout>
let reqLength = 0

/*const NProgressStatics = {
  start: function() {
    reqLength = reqLength + 1
    if (reqLength === 1) {
      if (timer) {
        clearTimeout(timer)
        // timer = null
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
        // timer = null
        clearTimeout(timer)
      }, 250)
    }
  }
}*/

export default NProgress
