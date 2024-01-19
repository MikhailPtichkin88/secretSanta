import { getUserAvatar, getUserData, getUserId } from '@/entities/User'
import { getUserIsInited } from '@/entities/User/model/selectors/getUserIsInited'
import placeholder from '@/shared/assets/img/avatar.png'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Tooltip } from '@/shared/ui/Tooltip'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import cls from './NavbarAvatar.module.scss'

interface AvatarProfileProps {
  className?: string
}

export const NavbarAvatar = ({ className }: AvatarProfileProps) => {
  const inited = useSelector(getUserIsInited)
  const { avatarUrl } = useSelector(getUserData)
  const userId = useSelector(getUserId)

  const { t } = useTranslation()

  const [avatar, setAvatar] = useState(placeholder)

  useEffect(() => {
    if (inited && avatarUrl) {
      setAvatar(`${__API__}/uploads/avatars/${avatarUrl}`)
    }
    if (!inited && avatar !== placeholder) {
      setAvatar(placeholder)
    }
  }, [inited, avatarUrl])

  return (
    <NavLink
      className={classNames(cls.avatarprofile, {}, [className])}
      to={inited ? `/profile/${userId}` : `/login`}
    >
      {inited ? (
        <Tooltip title={t('Перейти в профиль')} placement="bottom">
          <img
            className={cls.avatarImg}
            src={avatar}
            alt="users avatar img"
            loading="lazy"
          />
        </Tooltip>
      ) : (
        <img
          className={cls.avatarImg}
          src={placeholder}
          alt="users avatar img"
        />
      )}
    </NavLink>
  )
}
