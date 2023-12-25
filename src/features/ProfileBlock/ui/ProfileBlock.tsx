import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ProfileBlock.module.scss'
import { AvatarProfile } from '@/entities/AvatarProfile'
import LogoutIcon from '@/shared/assets/icons/logout.svg'
import { useSelector } from 'react-redux'
import { getUserIsInited } from '@/entities/User/model/selectors/getUserIsInited'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { userActions } from '@/entities/User'
interface ProfileBlockProps {
  className?: string
}

export const ProfileBlock = ({ className }: ProfileBlockProps) => {
  const dispatch = useAppDispatch()

  const isInited = useSelector(getUserIsInited)

  const onLogoutHandler = () => {
    dispatch(userActions.clearUserData())
  }
  return (
    <div className={classNames(cls.profileblock, {}, [className])}>
      <AvatarProfile />
      {!isInited && (
        <LogoutIcon
          className={cls.logoutIcon}
          width={50}
          height={50}
          onClick={onLogoutHandler}
        />
      )}
    </div>
  )
}
