import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { Observer } from 'mobx-react'
import { LayoutRoot } from '../src'

// 引入 react-gm 样式
import '../src/index.less'

const reqs = [
  require.context('../src', true, /stories\.js$/),
  require.context('../sortable', true, /stories\.js$/)
]

addDecorator(
  withInfo({
    inline: true,
    header: false
  })
)

addDecorator(storeFn => (
  <React.Fragment>
    <Observer>{() => storeFn()}</Observer>
    <LayoutRoot />
  </React.Fragment>
))

configure(reqs, module)
