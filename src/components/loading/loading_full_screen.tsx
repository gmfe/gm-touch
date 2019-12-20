import React from 'react'
import PropTypes from 'prop-types'
import Loading from './loading'
import { LayoutRoot } from '../layout_root'
import { setBodyCanScroll } from '../../util'

const LoadingFullScreen = ({ size, text }) => {
  return (
    <div className='t-loading-full-screen'>
      <Loading size={size} text={text} className='t-loading-position' />
    </div>
  )
}

LoadingFullScreen.render = props => {
  LayoutRoot.setComponent(
    LayoutRoot.TYPE.FULL_LOADING,
    <LoadingFullScreen {...props} />
  )

  setBodyCanScroll(false)
}

LoadingFullScreen.hide = () => {
  LayoutRoot.setComponent(LayoutRoot.TYPE.FULL_LOADING, null)

  setBodyCanScroll(true)
}

LoadingFullScreen.propTypes = {
  text: PropTypes.string,
  size: PropTypes.number
}

LoadingFullScreen.defaultProps = {
  size: 50
}

export default LoadingFullScreen
