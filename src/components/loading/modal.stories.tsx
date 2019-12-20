import React from 'react'
import { storiesOf } from '@storybook/react'
import {Loading,LoadingChunk,LoadingFullScreen} from './index'
import { Button } from '../button'

storiesOf('Loading', module)
  .add('default', () => <Loading />)
  .add('size', () => <Loading size={100} />)
  .add('LoadingChunk', () => (
    <LoadingChunk loading size={60}>
      <div
        style={{
          height: '100px'
        }}
      >
        asdfasfafa
      </div>
    </LoadingChunk>
  ))
  .add('LoadingChunk with text', () => (
    <LoadingChunk loading size={60} text='拼命加载中...'>
      <div
        style={{
          height: '100px'
        }}
      >
        asdfasfafa
      </div>
    </LoadingChunk>
  ))
  .add('LoadingFullScreen', () => (
    <Button
      onClick={() => {
        LoadingFullScreen.render({
          text: '拼命加载中...'
        })
        setTimeout(() => {
          LoadingFullScreen.hide()
        }, 30000)
      }}
    >
      整页加载
    </Button>
  ))
