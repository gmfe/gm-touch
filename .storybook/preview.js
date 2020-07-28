import React from 'react'
import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { Observer } from 'mobx-react'
import { LayoutRoot } from '../packages/react/src/index'

// 引入 react-gm 样式
import '../packages/react/src/index.less'

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
