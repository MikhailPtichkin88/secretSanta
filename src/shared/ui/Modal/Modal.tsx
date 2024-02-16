import { ReactNode } from 'react'
import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal'
import { Portal } from '@/shared/ui/Modal/Portal'

import cls from './Modal.module.scss'
import { useTheme } from '@/app/providers/ThemeProvider/lib/useTheme'
import { Overlay } from './Overlay/Overlay'

interface ModalProps {
  className?: string
  contentClassName?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

const ANIMATION_DELAY = 300

export const Modal = ({
  className,
  children,
  isOpen,
  onClose,
  lazy,
  contentClassName,
}: ModalProps) => {
  const { theme } = useTheme()

  const { close, isMounted, isClosing } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
  })

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  }

  if (!isMounted && lazy) {
    return null
  }
  return (
    <Portal>
      <div
        className={classNames(cls.modal, mods, [className, theme, 'app_modal'])}
      >
        <Overlay onClick={close}>
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${contentClassName ? contentClassName : ''} ${
              cls.content
            }`}
          >
            {children}
          </div>
        </Overlay>
      </div>
    </Portal>
  )
}
