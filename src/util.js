import React, { useEffect, useRef, useState } from 'react'
import _ from 'lodash'

const warn = function() {
  if (process.env.NODE_ENV === 'production') {
    return
  }
  console.warn.apply(this, ['[react-gm warn] ', ...arguments])
}

const devWarnForHook = callback => {
  devWarn(() => {
    useEffect(() => {
      callback()
    }, [])
  })
}

const devWarn = callback => {
  if (process.env.NODE_ENV !== 'production') {
    callback()
  }
}

const setBodyCanScroll = canScroll => {
  const documentBody = window.document.body
  if (canScroll) {
    documentBody.classList.remove('t-body-scroll-disabled')
  } else {
    documentBody.classList.add('t-body-scroll-disabled')
  }
}

// 字符串匹配
const textFilter = (list, filterText, what) => {
  if (!filterText) {
    return list || []
  }

  what = what || (v => v)
  filterText = filterText.toLowerCase()

  return _.filter(list, v => {
    let w = what(v)
    if (!_.isString(w)) {
      w = ''
    }
    return w.indexOf(filterText) > -1
  })
}

const isPromise = arg => window.toString.call(arg) === '[object Promise]'

function createChainedFunction() {
  const args = arguments
  return function chainedFunction() {
    for (let i = 0; i < args.length; i++) {
      if (args[i] && args[i].apply) {
        args[i].apply(this, arguments)
      }
    }
  }
}

function getScrollTop() {
  return (
    window.document.documentElement.scrollTop + window.document.body.scrollTop
  )
}

function getScrollLeft() {
  return (
    window.document.documentElement.scrollLeft + window.document.body.scrollLeft
  )
}

export {
  warn,
  devWarn,
  devWarnForHook,
  setBodyCanScroll,
  textFilter,
  isPromise,
  createChainedFunction,
  getScrollLeft,
  getScrollTop
}
