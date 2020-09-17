import { Component, FC, HTMLAttributes } from 'react'
import { CircleProgressProps } from './components/progress'

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  flex?: boolean
  column?: boolean
}

export class Flex extends Component<FlexProps> {}

export const CircleProgress: FC<CircleProgressProps>
