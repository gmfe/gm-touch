import React from 'react'
import { storiesOf } from '@storybook/react'
import { observable } from 'mobx'
import Tree from './'
import _ from 'lodash'
import Flex from '../flex'

const store = observable({
  oneData: [
    {
      value: 1,
      text: '蔬菜'
    },
    {
      value: 2,
      text: '冻品'
    }
  ],
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

storiesOf('Tree', module).add('default', () => (
  <Tree
    list={store.data.slice()}
    selectedValues={store.selectedValues.slice()}
    onSelectValues={values => store.setSelectedValues(values)}
  />
))
