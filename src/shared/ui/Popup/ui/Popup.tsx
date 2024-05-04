import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Popup.module.scss'
import { Popover } from '@headlessui/react'
import { ReactNode } from 'react'

import { DropdownDirection, mapDirectionsClass } from '../lib/consts'

interface PopupProps {
  className?: string
  trigger?: ReactNode
  direction?: DropdownDirection
  children: ReactNode
}

export const Popup = ({
  className,
  trigger,
  direction = 'bottom left',
  children,
}: PopupProps) => {
  return (
    <Popover className={classNames(cls.popup, {}, [className])}>
      <Popover.Button as={'div'} className={cls.trigger}>
        {trigger}
      </Popover.Button>

      <Popover.Panel
        className={classNames(cls.panel, {}, [mapDirectionsClass[direction]])}
      >
        {children}
      </Popover.Panel>
    </Popover>
  )
}
