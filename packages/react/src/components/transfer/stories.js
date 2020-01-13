import React from 'react'
import Transfer from './index'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

const store = observable({
  data: [
    {
      value: 1,
      text: '蔬菜',
      children: [
        {
          value: 11,
          text: '叶菜',
          children: [
            {
              value: 111,
              text:
                '皇帝菜皇帝菜皇帝菜皇帝菜皇帝菜皇帝菜皇帝菜皇帝菜皇帝菜皇帝菜皇帝菜'
            },
            {
              value: 112,
              text: '金不换'
            }
          ]
        },
        {
          value: 12,
          text: '甘蓝',
          children: [
            {
              value: 121,
              text: '甘蓝1'
            },
            {
              value: 122,
              text: '甘蓝2'
            }
          ]
        }
      ]
    },
    {
      value: 2,
      text: '冻品',
      children: [
        {
          value: 21,
          text: '冻猪肉',
          children: [
            {
              value: 211,
              text: '五花肉'
            },
            {
              value: 212,
              text: '猪脚'
            }
          ]
        }
      ]
    }
  ],
  selectedValues: [],
  setSelectedValues(values) {
    console.log(values)
    this.selectedValues = values
  }
})

const Wrap = observer(() => {
  return (
    <div style={{ height: '500px' }}>
      <Transfer
        list={store.data.slice()}
        selectedValues={store.selectedValues.slice()}
        onSelectValues={values => store.setSelectedValues(values)}
      />
    </div>
  )
})

export const Default = () => <Wrap />

export default {
  title: 'Transfer'
}
