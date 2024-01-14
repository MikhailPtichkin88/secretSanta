import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ProfileCard.module.scss'
import { ProfileAvatar } from '@/entities/ProfileAvatar'
interface ProfileCardProps {
  className?: string
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
  return (
    <div className={classNames(cls.profilecard, {}, [className])}>
      <ProfileAvatar />
    </div>
  )
}
