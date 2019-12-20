import React, {
  Component,
  HTMLAttributes,
  ReactElement,
  ReactNode
} from 'react'
import { findDOMNode } from 'react-dom'
import { createChainedFunction, getScrollTop, getScrollLeft } from 'gm-util'
import { LayoutRoot } from '../layout_root'
import Popup from '../popup/popup'
import _ from 'lodash'
import classNames from 'classnames'
import EVENT_TYPE from '../../event_type'

function isContains(target, fun) {
  let node = target
  while (node) {
    if (fun(node)) {
      return true
    }
    node = node.parentNode
  }

  return false
}

function getElementPositionWithScrollTop(element) {
  let { left, top } = element.getBoundingClientRect()
  left += getScrollLeft()
  top += getScrollTop()

  return {
    top,
    left
  }
}

export interface PopoverProps {
  /**
   * 命名问题，focus 不是真正的 focus事件，和 click 类似，只不过 focus 不会因为二次点击而关掉。
   * 想要 focus 事件的效果，请用 realFocus，失焦会 hide
   */
  type?: 'focus' | 'click' | 'hover' | 'realFocus'
  popup: ReactNode | ReactElement | JSX.Element
  /* 也可以用children props disable */
  disabled?: boolean
  right?: boolean
  top?: boolean
  center?: boolean
  /* 偏移量 */
  offset?: number
  /* 是否显示三角标 */
  showArrow?: boolean
  arrowLeft?: string
  pureContainer?: boolean
  isInPopup?: boolean
  animName?:
    | boolean
    | 'fade-in-right'
    | 'fade-in-left'
    | 'fade-in-top'
    | 'fade-in-bottom'
    | 'zoom-in'
    | 'zoom-in-top'
    | 'zoom-in-bottom'
  /* 预判高度。因为 popup 的宽高会是可变的，所以没法判断视窗内是否能放得下，于是有此。 */
  predictingHeight?: number
}

export interface PopoverState {
  active: boolean
}

class Popover extends Component<
  PopoverProps & HTMLAttributes<HTMLDivElement>,
  PopoverState
> {
  // 注意 Popover 的 popup 不会随 render 更新
  static defaultProps = {
    type: 'focus',
    showArrow: false,
    animName: true,
    isInPopup: false
  }

  state = {
    active: false
  }

  handleDrawerScroll = () => {
    if (this.state.active) {
      this.setActive(this.state.active)
    }
  }

  handleModalScroll = () => {
    if (this.state.active) {
      this.setActive(this.state.active)
    }
  }

  handleBrowserScroll = () => {
    if (this.state.active) {
      this.setActive(this.state.active)
    }
  }

  handleTableScroll = () => {
    if (this.state.active) {
      this.setActive(this.state.active)
    }
  }

  debounceHandleModalScroll = _.debounce(this.handleModalScroll, 200)
  debounceHandleBrowserScroll = _.debounce(this.handleBrowserScroll, 200)
  debounceHandleDrawerScroll = _.debounce(this.handleDrawerScroll, 200)
  debounceHandleTableScroll = _.debounce(this.handleTableScroll, 200)

  timer: ReturnType<typeof setTimeout>

  id = +new Date() + '' + Math.random()

  // 延迟的，可能不存在。使用的时候判断下
  refPopup

  rect

  constructor(props) {
    super(props)
  }

  /** 注意，先调用这个，再处理业务的 onXXX。比如 date_picker */
  apiDoSetActive = active => {
    this.setActive(active)
  }

  componentDidMount() {
    if (this.props.type === 'click' || this.props.type === 'focus') {
      window.document.body.addEventListener('click', this.handleBodyClick)
    } else if (this.props.type === 'realFocus') {
      // 原生 blur 不能冒泡，focusout 才能冒泡
      window.document.body.addEventListener('focusout', this.handleBodyFocusOut)
    }

    // 用 debounce
    window.addEventListener(
      EVENT_TYPE.MODAL_SCROLL,
      this.debounceHandleModalScroll
    )
    window.addEventListener(
      EVENT_TYPE.BROWSER_SCROLL,
      this.debounceHandleBrowserScroll
    )
    window.addEventListener(
      EVENT_TYPE.DRAWER_SCROLL,
      this.debounceHandleDrawerScroll
    )
    window.addEventListener(
      EVENT_TYPE.TABLE_SCROLL,
      this.debounceHandleTableScroll
    )
  }

  componentWillUnmount() {
    if (this.props.type === 'click' || this.props.type === 'focus') {
      window.document.body.removeEventListener('click', this.handleBodyClick)
    } else if (this.props.type === 'realFocus') {
      window.document.body.removeEventListener(
        'focusout',
        this.handleBodyFocusOut
      )
    }

    LayoutRoot._removeComponentPopup(this.id)

    window.removeEventListener(
      EVENT_TYPE.MODAL_SCROLL,
      this.debounceHandleModalScroll
    )
    window.removeEventListener(
      EVENT_TYPE.BROWSER_SCROLL,
      this.debounceHandleBrowserScroll
    )
    window.removeEventListener(
      EVENT_TYPE.DRAWER_SCROLL,
      this.debounceHandleDrawerScroll
    )
    window.removeEventListener(
      EVENT_TYPE.TABLE_SCROLL,
      this.debounceHandleTableScroll
    )
  }

  componentDidUpdate() {
    this.doRenderPopup(this.state.active)
  }

  doRenderPopup(active) {
    const {
      style,
      className,
      popup,
      type,
      top,
      right,
      center,
      offset,
      showArrow,
      arrowLeft,
      animName,
      predictingHeight,
      pureContainer,
      isInPopup
    } = this.props

    const disabled = this.getDisabled()

    if (active && popup) {
      LayoutRoot._setComponentPopup(
        this.id,
        // @ts-ignore
        <Popup
          key={'popup_' + this.id}
          ref={ref => (this.refPopup = ref)}
          onMouseEnter={
            !disabled && type === 'hover' ? this.handleMouseEnter : _.noop
          }
          onMouseLeave={
            !disabled && type === 'hover' ? this.handleMouseLeave : _.noop
          }
          rect={this.rect}
          top={top}
          right={right}
          center={center}
          offset={offset}
          showArrow={showArrow}
          arrowLeft={arrowLeft}
          animName={animName}
          predictingHeight={predictingHeight}
          pureContainer={pureContainer}
          className={classNames(
            {
              't-popover-is-in-popup': isInPopup
            },
            className
          )}
          style={style}
        >
          {/*{_.isFunction(popup) ? popup() : popup}*/}
          {popup}
        </Popup>
      )
    } else {
      LayoutRoot._removeComponentPopup(this.id)
    }
  }

  setActive = active => {
    this.setState({
      active
    })

    if (active) {
      const dom = findDOMNode(this)
      const pos = getElementPositionWithScrollTop(dom)
      const rect = {
        left: pos.left,
        top: pos.top,
        height: dom.offsetHeight,
        width: dom.offsetWidth
      }
      this.rect = rect
    }
    // 不需要，重复了，didUpdate 会做了
    // this.doRenderPopup(active)
  }

  doBodyClickAndFocusOut = target => {
    const { active } = this.state

    // 没激活就没有必要判断了
    if (!active) {
      return
    }

    // type 为 focus 存在 由于时机问题，可能 refPopup 还没出来，此时啥也不做
    if (!this.refPopup) {
      return
    }

    const $this = findDOMNode(this)
    const $popup = findDOMNode(this.refPopup)

    if (
      isContains(target, node => {
        return (
          node === $this ||
          node === $popup ||
          (node.classList && node.classList.contains('t-popover-is-in-popup'))
        )
      })
    ) {
      return
    }

    this.setActive(false)
  }

  handleBodyClick = event => {
    this.doBodyClickAndFocusOut(event.target)
  }

  handleBodyFocusOut = event => {
    this.doBodyClickAndFocusOut(event.relatedTarget)
  }

  handleClick = () => {
    // focus 也会进来
    const { type } = this.props

    if (type === 'click') {
      this.setActive(!this.state.active)
    } else {
      this.setActive(true)
    }
  }

  handleFocus = () => {
    this.setActive(true)
  }

  handleMouseEnter = () => {
    clearTimeout(this.timer)
    this.setActive(true)
  }

  handleMouseLeave = () => {
    clearTimeout(this.timer)

    this.timer = setTimeout(() => {
      this.setActive(false)
    }, 500)
  }

  getDisabled = () => {
    const { disabled, children } = this.props
    // @ts-ignore
    return disabled || children.props.disabled
  }

  render() {
    const { children, type } = this.props

    const { active } = this.state

    const child = React.Children.only(children)

    const p = {
      onClick: undefined,
      onFocus: undefined,
      onMouseEnter: undefined,
      onMouseLeave: undefined
    }
    if (!this.getDisabled()) {
      if (type === 'click' || type === 'focus') {
        // @ts-ignore
        p.onClick = createChainedFunction(child.props.onClick, this.handleClick)
      } else if (type === 'realFocus') {
        // @ts-ignore
        p.onFocus = createChainedFunction(child.props.onFocus, this.handleFocus)
      } else if (type === 'hover') {
        p.onMouseEnter = createChainedFunction(
          // @ts-ignore
          child.props.onMouseEnter,
          this.handleMouseEnter
        )
        p.onMouseLeave = createChainedFunction(
          // @ts-ignore
          child.props.onMouseLeave,
          this.handleMouseLeave
        )
      }
    }

    // 通过类名告知 target 做好 active 的应变
    // @ts-ignore
    return React.cloneElement(child, {
      ...p,
      // @ts-ignore
      className: classNames(child.props.className, {
        't-popover-active': active
      })
    })
  }
}

export default Popover
