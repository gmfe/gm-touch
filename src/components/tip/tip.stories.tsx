import React from 'react'
import { storiesOf } from '@storybook/react'
import Tip from './tip'
import { Button } from '../button'

storiesOf('Tip', module).add(
  'default',
  () => (
    <div>
      <div>
        {/*
      // @ts-ignore */}
        <Button onClick={() => Tip.tip('提示啦，提示啦')}>默认 3s 关闭</Button>
        {/*
      // @ts-ignore */}
        <Button onClick={() => Tip.info('info')}>info</Button>
        {/*
      // @ts-ignore */}
        <Button onClick={() => Tip.success('success')}>success</Button>
        {/*
      // @ts-ignore */}
        <Button onClick={() => Tip.warning('warning')}>warning</Button>
        {/*
      // @ts-ignore */}
        <Button onClick={() => Tip.danger('danger')}>danger</Button>
      </div>
      <Button
        onClick={() =>
          // @ts-ignore
          (window.___lastTip = Tip.success({
            children: '需要用户自行关闭的',
            time: 0,
            onClose: () => console.log('tip closed by user')
          }))
        }
      >
        需要用户自行关闭的
      </Button>
      {/*
      // @ts-ignore */}
      <Button onClick={() => Tip.clear(window.___lastTip)}>
        关闭指定 tip （比如最后一个tip）
      </Button>
    </div>
  ),
  {
    info: {
      text: `
### Static

方法返回 id ,可以通过 clear(id) 来关闭指定的 tip

- \`success()\`
- \`info()\`
- \`warning()\`
- \`danger()\`
- \`clear(id)\`
- \`clearAll()\`
`
    }
  }
)
