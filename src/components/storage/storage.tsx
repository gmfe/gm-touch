import { useEffect } from 'react'
import _ from 'lodash'

const prefix = '_gm-touch_'
const { localStorage } = window

const StorageStatics = {
  set(key, value) {
    localStorage.setItem(prefix + key, JSON.stringify(value))
  },
  get(key) {
    const v = localStorage.getItem(prefix + key)
    return v ? JSON.parse(v) : v
  },
  remove(key) {
    localStorage.removeItem(prefix + key)
  },
  clear() {
    localStorage.clear()
  },
  getAll() {
    const result = {}
    _.each(_.range(localStorage.length), i => {
      let key = localStorage.key(i)
      if (key?.startsWith(prefix)) {
        key = key.slice(prefix.length)
        result[key] = StorageStatics.get(key)
      }
    })
    return _.keys(result) ? result : null
  }
}

export interface StorageProps<T extends string | object | Array<T>> {
  name: string
  value?: T
}

function Storage<T extends string | object | Array<T>>({
  name,
  value
}: StorageProps<T>) {
  useEffect(() => {
    StorageStatics.set(name, value)
  }, [value])

  return null
}

Object.assign(Storage, StorageStatics)

export default Storage
