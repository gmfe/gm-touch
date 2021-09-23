import { Component, FC, HTMLAttributes, ReactNode } from 'react'

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  flex?: boolean
  column?: boolean
}

export class Flex extends Component<FlexProps> {}

export interface ProgressCircleProps extends HTMLAttributes<HTMLDivElement> {
  size?: number
  percentage?: number
  lineWidth?: number
  disabledText?: boolean
  type?: 'success' | 'danger'
}

interface TabsItem {
  text: string
  value: string
  children: ReactNode
}
export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: TabsItem[]
  defaultActive?: string
  active?: string
  keep?: boolean
  headBorder?: boolean
}

export const ProgressCircle: FC<ProgressCircleProps>
export const Tabs: FC<TabsProps>

export type KeyType = 'dot' | 'number' | 'enter' | 'back' | 'cancel' | 'clear'

export interface KeyInfo {
  value: string
  type: KeyType
}
export interface KeyboardProps {
  customFuncArea?: ReactNode
  onKeyClick: (key: KeyInfo) => void
  onBackSpace: () => void
  onCancel: () => void
  onClear: () => void
  onConfirm: () => void
}

export const Keyboard: FC<KeyboardProps>
