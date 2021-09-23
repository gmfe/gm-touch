import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'

class RadioGroup extends React.Component {
  render() {
    const { onChange, value, className, children, inline, ...rest } = this.props

    return (
      <div {...rest} className={classNames('t-radio-group', className)}>
        {_.map(React.Children.toArray(children), (child, i) => {
          return React.cloneElement(child, {
            key: i,
            index: i,
            inline,
            checked: child.props.value === value,
            onChange: () => {
              onChange(child.props.value)
            }
          })
        })}
      </div>
    )
  }
}

RadioGroup.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  inline: PropTypes.bool
}

RadioGroup.defaultProps = {
  onChange: _.noop
}

export default RadioGroup
