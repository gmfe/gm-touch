import React from 'react'
import Flex from '../flex'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { WrapContext } from './util'

/**
 * Flex 布局
 *
 * Flex 的props都可用
 * */
const Row = React.forwardRef(({className, gutter, style, children, ...rest}, ref) => {
  const rowStyle =
    gutter > 0
      ? { marginLeft: gutter / -2, marginRight: gutter / -2, ...style }
      : style
  return (
    <WrapContext.Provider value={{ gutter }}>
      <Flex
        ref={ref}
        row
        wrap
        {...rest}
        className={classNames('t-grid-row', className)}
        style={rowStyle}
      >
        {children}
      </Flex>
    </WrapContext.Provider>
  )
})

Row.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  /** 栅格间隔，可以写成像素值或支持响应式的对象写法 { xs: 8, sm: 16, md: 24}， 默认为10 */
  gutter: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
}

Row.defaultProps = {
  gutter: 0
}

export default Row
