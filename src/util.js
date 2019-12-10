import React, { useEffect } from 'react'

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

export { warn, devWarn, devWarnForHook, setBodyCanScroll }
