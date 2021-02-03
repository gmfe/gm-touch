import React, { useCallback, useMemo } from 'react'
import _ from 'lodash'
import ReactDOM from 'react-dom'

const List = ({ data, onShow }) => {
  const labelHeight = 30
  const itemHeight = 50

  const heights = useMemo(() => {
    const arr = []
    let height = 0
    _.each(data, one => {
      arr.push(height)
      height += labelHeight
      _.each(one.children, () => {
        height += itemHeight
      })
    })
    return arr
  }, [data])

  const doScroll = useCallback(
    _.debounce(({ scrollTop }) => {
      console.log(scrollTop, heights)
      const itemIndex = _.findIndex(heights, v => scrollTop < v)
      console.log(data[itemIndex - 1])
    }, 500),
    [data]
  )

  const handleScroll = useCallback(event => {
    doScroll({ scrollTop: event.target.scrollTop })
  }, [])

  return (
    <div style={{ height: '300px', overflow: 'auto' }} onScroll={handleScroll}>
      {_.map(data, one => {
        return (
          <div key={one.label} data-v={one.label}>
            <div
              style={{ background: 'whitesmoke', height: `${labelHeight}px` }}
            >
              {one.label}
            </div>
            <div>
              {_.map(one.children, val => {
                return (
                  <div key={val.value} style={{ height: `${itemHeight}px` }}>
                    {val.text}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const Demo = () => {
  return (
    <div>
      <div className='lala'>
        <img src='' alt='' />
      </div>
      <div className='lala' />
      <List
        data={_.map(_.range(10), v => ({
          label: v,
          children: _.map(_.range(5), val => ({
            value: val,
            text: `${v}-${val}`
          }))
        }))}
        onShow={v => console.log(v)}
      />
    </div>
  )
}

export default {
  title: 'Demo|Demo'
}
