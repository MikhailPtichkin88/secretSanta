import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ProfileCard.module.scss'
import { ProfileAvatar } from '@/entities/ProfileAvatar'
import { ProfileForm } from '@/entities/ProfileForm'
import { ProfileSessions } from '@/features/ProfileSessions'
import { useCallback, useState } from 'react'
import { CreateSessionModal } from '@/features/CreateSessionForm'
import Onboarding from '@/entities/Onboarding'
import { PROFILE_PAGE_STEPS } from '../lib/constant'

interface ProfileCardProps {
  className?: string
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const onCloseHandler = useCallback(() => setIsOpenModal(false), [])
  const onOpenCreateSessionModal = useCallback(() => setIsOpenModal(true), [])
  return (
    <div className={classNames(cls.profilecard, {}, [className])}>
      <div className={cls.formWrapper}>
        <ProfileAvatar />
        <ProfileForm />
      </div>
      <ProfileSessions onOpenCreateSessionModal={onOpenCreateSessionModal} />
      <CreateSessionModal isOpen={isOpenModal} onClose={onCloseHandler} />

      <Onboarding steps={PROFILE_PAGE_STEPS} />
    </div>
  )
}
