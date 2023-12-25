import { classNames } from '@/shared/lib/classNames/classNames'
import { Switch, SwitchProps } from '@headlessui/react'
import cls from './Switch.module.scss'

interface ISwitchProps extends SwitchProps<'button'> {
  className?: string
  theme?: 'primary' | 'secondary'
}

export const CustomSwitch = ({
  className,
  checked,
  onChange,
  theme = 'primary',
  ...props
}: ISwitchProps) => {
  return (
    <Switch
      className={classNames(cls.switch, { [cls.checked]: checked }, [
        className,
        cls[theme],
      ])}
      checked={checked}
      onChange={onChange}
      {...props}
    />
  )
}
