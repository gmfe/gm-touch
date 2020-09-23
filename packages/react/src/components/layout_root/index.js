import React from 'react'
import _ from 'lodash'

const TYPE = {
  DRAWER: 'drawer',
  _POPUP: '_popup',
  MODAL: 'modal',
  KEYBOARD: 'keyboard',
  TIPS: 'tips',
  FULL_LOADING: 'full_loading',
  N_PROGRESS: 'n_progress'
}

let setComponentFunc = null

class LayerRoot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      _popup: null,
      modal: null,
      keyboard: null,
      tips: null,
      full_loading: null,
      n_progress: null,
      drawer: null
    }
  }

  componentDidMount() {
    setComponentFunc = (type, component) => {
      const s = {}
      s[type] = component
      this.setState(s)
    }
  }

  componentWillUnmount() {
    setComponentFunc = null
  }

  render() {
    const {
      drawer,
      _popup,
      modal,
      keyboard,
      tips,
      full_loading,
      n_progress
    } = this.state
    // 有层级关系
    return (
      <div className='t-layout-root'>
        {_popup && _popup.length > 0 && (
          <div>
            {_.map(_popup, v =>
              React.cloneElement(
                v.com,
                Object.assign(
                  {
                    key: v.id
                  },
                  v.com.props
                )
              )
            )}
          </div>
        )}

        {drawer && <div>{drawer}</div>}
        {modal && <div>{modal}</div>}
        {keyboard && <div>{keyboard}</div>}

        {tips && tips.length > 0 && (
          <div className='t-tips'>
            {_.map(tips, v =>
              React.cloneElement(
                v.com,
                Object.assign(
                  {
                    key: v.id
                  },
                  v.com.props
                )
              )
            )}
          </div>
        )}

        {full_loading && <div>{full_loading}</div>}

        {n_progress && <div>{n_progress}</div>}
      </div>
    )
  }
}

const componentListMap = {
  _popup: [],
  _tip: []
}

function getList(type) {
  if (!componentListMap[type]) {
    componentListMap[type] = []
  }
  return componentListMap[type]
}

const _setComponentArray = (type, id, com) => {
  const list = getList(type)
  if (setComponentFunc) {
    const index = _.findIndex(list, v => v.id === id)
    if (index === -1) {
      list.push({ id, com })
    } else {
      list[index] = { id, com }
    }

    setComponentFunc(type, list)
  } else {
    console.warn('LayerRoot is uninitialized')
  }
}

const _removeComponentArray = (type, id) => {
  const list = getList(type)
  if (setComponentFunc) {
    _.remove(list, v => v.id === id)
    setComponentFunc(type, list)
  } else {
    console.warn('LayerRoot is uninitialized')
  }
}

LayerRoot._setComponentPopup = (id, com) => {
  _setComponentArray(LayerRoot.TYPE._POPUP, id, com)
}

LayerRoot._removeComponentPopup = id => {
  _removeComponentArray(LayerRoot.TYPE._POPUP, id)
}

LayerRoot._setComponentTip = (id, com) => {
  _setComponentArray(LayerRoot.TYPE.TIPS, id, com)
}

LayerRoot._removeComponentTip = id => {
  _removeComponentArray(LayerRoot.TYPE.TIPS, id)
}

LayerRoot._removeComponentTipAll = () => {
  setComponentFunc(LayerRoot.TYPE.TIPS, [])
}

LayerRoot.setComponent = (type, com) => {
  if (setComponentFunc) {
    LayerRoot.removeComponent()
    setComponentFunc(type, com)
  } else {
    console.warn('LayerRoot is uninitialized')
  }
}

LayerRoot.removeComponent = type => {
  if (setComponentFunc) {
    setComponentFunc(type, undefined)
  } else {
    console.warn('LayerRoot is uninitialized')
  }
}

LayerRoot.TYPE = TYPE

export default LayerRoot
