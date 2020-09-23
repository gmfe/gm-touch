import { Component, FC, HTMLAttributes } from 'react'

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
  onChange?(value: string): void
  keep?: boolean
  className?: string
  style?: CSSProperties
  headBorder?: boolean
}

export const ProgressCircle: FC<ProgressCircleProps>
export const Tabs: FC<TabsProps>
