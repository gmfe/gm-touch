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

export const ProgressCircle: FC<ProgressCircleProps>
