import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AvatarProfile.module.scss'
import placeholder from '@/shared/assets/img/avatar.png'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserData } from '@/entities/User/model/selectors/getUserData'

interface AvatarProfileProps {
  className?: string
}

export const AvatarProfile = ({ className }: AvatarProfileProps) => {
  const { avatarUrl } = useSelector(getUserData)
  const avatar = avatarUrl ? `${__API__}/${avatarUrl}` : placeholder

  return (
    <NavLink
      className={classNames(cls.avatarprofile)}
      to={`${avatarUrl ? '/profile' : '/login'}`}
    >
      <img className={cls.avatarImg} src={avatar} alt="avatar" />
    </NavLink>
  )
}
