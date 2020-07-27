import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { Observer } from 'mobx-react'
import { LayoutRoot } from '../packages/react/src/index'

// 引入 react-gm 样式
import '../packages/react/src/index.less'

const reqs = [require.context('../packages', true, /stories\.js$/)]

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
