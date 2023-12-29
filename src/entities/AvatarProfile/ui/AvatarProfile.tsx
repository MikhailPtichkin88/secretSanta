import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AvatarProfile.module.scss'
import placeholder from '@/shared/assets/img/avatar.png'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserData } from '@/entities/User/model/selectors/getUserData'
import { getUserIsInited } from '@/entities/User/model/selectors/getUserIsInited'
import { useEffect, useState } from 'react'
import { getUserAvatar } from '@/entities/User'

interface AvatarProfileProps {
  className?: string
}

export const AvatarProfile = ({ className }: AvatarProfileProps) => {
  const userAvatar = useSelector(getUserAvatar)

  const inited = useSelector(getUserIsInited)

  const [avatar, setAvatar] = useState(placeholder)

  useEffect(() => {
    if (inited && userAvatar) {
      setAvatar(`${__API__}/uploads/avatars/${userAvatar}`)
    }
    if (!inited && avatar !== placeholder) {
      setAvatar(placeholder)
    }
  }, [inited, userAvatar])

  return (
    <NavLink
      className={classNames(cls.avatarprofile, {}, [className])}
      to={inited ? '/profile' : `/login`}
    >
      <img className={cls.avatarImg} src={avatar} alt="avatar" loading="lazy" />
    </NavLink>
  )
}
