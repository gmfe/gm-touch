import React from 'react'
import { storiesOf } from '@storybook/react'
import DateRangePicker from './index'
import { observable } from 'mobx'
import moment from 'moment'

const store = observable({
  begin: new Date('2020-01-17T03:24:00'),
  end: new Date('2020-03-23T03:24:00'),
  changeDate(begin, end) {
    this.begin = begin
    this.end = end
  }
})

const _store = {
  begin: null,
  end: null,
  changeDate(begin, end) {
    console.log(begin, end)
    this.begin = begin
    this.end = end
  }
}

const storeNull = observable(_store)

storiesOf('DateRangePicker', module)
  .add('default', () => (
    <DateRangePicker
      begin={storeNull.begin}
      end={storeNull.end}
      onChange={(begin, end) => storeNull.changeDate(begin, end)}
    />
  ))
  .add('begin end', () => (
    <DateRangePicker
      begin={store.begin}
      end={store.end}
      onChange={(begin, end) => store.changeDate(begin, end)}
    />
  ))
  .add('disabledDate', () => (
    <DateRangePicker
      begin={store.begin}
      end={store.end}
      onChange={(begin, end) => store.changeDate(begin, end)}
      min={moment().toDate()}
      max={moment()
        .add(10, 'day')
        .toDate()}
    />
  ))
  .add(
    'disabledDate 限制一个月',
    () => (
      <DateRangePicker
        begin={storeNull.begin}
        end={storeNull.end}
        onChange={(begin, end) => storeNull.changeDate(begin, end)}
        disabledDate={(d, { begin, end }) => {
          if (begin) {
            if (+moment(d) > +moment(begin).add(1, 'month')) {
              return true
            }
          }
          return false
        }}
      />
    ),
    {
      info: {
        text: 'DateRangePicker 只能通过 disabledDate 限制一个月'
      }
    }
  )
