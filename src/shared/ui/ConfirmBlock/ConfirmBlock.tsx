import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ConfirmBlock.module.scss'
import OkIcon from '@/shared/assets/icons/tick-square.svg'
import CancelIcon from '@/shared/assets/icons/close-square.svg'
import { Loader } from '../PageLoader'

interface ConfirmBlockProps {
  className?: string
  isShow: boolean
  onOkHandler: () => void
  onCancel: () => void
  label?: string
  isLoading?: boolean
}

export const ConfirmBlock = ({
  className,
  isShow,
  label,
  onOkHandler,
  onCancel,
  isLoading,
}: ConfirmBlockProps) => {
  if (!isShow) {
    return null
  }

  return (
    <div className={classNames(cls.editParticipantsBlock, {}, [className])}>
      {label && <span>{label}</span>}
      <div className={cls.editParticipantsBlock}>
        <CancelIcon className={cls.cancelIcon} onClick={onCancel} />
        <OkIcon className={cls.okIcon} onClick={onOkHandler} />
      </div>
      {isLoading && <Loader className={cls.loader} />}
    </div>
  )
}
