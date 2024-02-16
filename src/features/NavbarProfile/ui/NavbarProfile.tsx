import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './NavbarProfile.module.scss'
import { NavbarAvatar } from '@/entities/NavbarAvatar'
import LogoutIcon from '@/shared/assets/icons/logout.svg'
import { useSelector } from 'react-redux'
import { getUserIsInited } from '@/entities/User/model/selectors/getUserIsInited'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { userActions } from '@/entities/User'
import { useNavigate } from 'react-router-dom'
import { authActions } from '@/features/Authorization/model/slice/authSlice'

interface ProfileBlockProps {
  className?: string
}

export const NavbarProfile = ({ className }: ProfileBlockProps) => {
  const dispatch = useAppDispatch()
  const isInited = useSelector(getUserIsInited)
  const navigate = useNavigate()
  const onLogoutHandler = () => {
    dispatch(userActions.clearUserData())
    dispatch(authActions.setAuthResult(false))
    navigate('/login')
  }
  return (
    <div className={classNames(cls.profileblock, {}, [className])}>
      <NavbarAvatar />
      {isInited && (
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
