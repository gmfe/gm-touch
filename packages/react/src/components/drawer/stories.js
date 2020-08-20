import React from 'react'
import { storiesOf } from '@storybook/react'
import Drawer from './index'

storiesOf('Drawer', module)
  .add('default', () => (
    <div>
      <button
        className='btn btn-default'
        onClick={() => {
          Drawer.render({
            onHide: Drawer.hide,
            style: {
              width: '300px',
              heighe: '100%',
            },
            children: <div>hahah</div>
          })
        }}
      >
        Drawer
      </button>
    </div>
  ))
