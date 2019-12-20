import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import SVGSuccessCircle from '../../../svg/success-circle.svg'
import SVGCircle from '../../../svg/circle.svg'
import { Flex } from '../flex'

export interface RadioProps {
  checked?: boolean
  onChange?(event: boolean): void
  disabled?: boolean
  size?: 'lg'
}

const Radio: FC<RadioProps & HTMLAttributes<HTMLInputElement>> = ({
  checked,
  onChange,
  size,
  disabled,
  className,
  children,
  ...rest
}) => {
  const handleClick = () => {
    !disabled && onChange && onChange(!checked)
  }
  return (
    <Flex
      {...rest}
      alignCenter
      className={classNames(
        't-radio',
        {
          [`t-radio-${size}`]: size,
          disabled
        },
        className
      )}
      onClick={handleClick}
    >
      {checked ? (
        <SVGSuccessCircle className='t-text-primary' />
      ) : (
        <SVGCircle />
      )}
      {children}
    </Flex>
  )
}

export default Radio
