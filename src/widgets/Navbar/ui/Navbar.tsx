import { LangSwitcher } from '@/entities/LangSwitcher'
import { ThemeSwitcher } from '@/entities/ThemeSwitcher'
import { NavbarProfile } from '@/features/NavbarProfile'
import backgImg from '@/shared/assets/img/snowflakes.png'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Flex } from '@/shared/ui/Flex'
import { LogoLink } from './LogoLink/LogoLink'
import cls from './Navbar.module.scss'
import {
  NotificationDropdown,
  getNotifications,
  notificationsActions,
} from '@/entities/NotificationDropdown'
import { useEffect } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { getNotificationCount } from '@/entities/NotificationDropdown/model/services/getNotificationCount'
import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'
import { useSelector } from 'react-redux'
import { getUserIsInited } from '@/entities/User'
interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const dispatch = useAppDispatch()
  const isInited = useSelector(getUserIsInited)

  const subscribeHandler = async () => {
    try {
      await dispatch(getNotificationCount())
      dispatch(notificationsActions.resetIsLoading())
      await subscribeHandler()
    } catch (error) {
      alertMessage({
        type: 'error',
        message: 'Ошибка проверки новых сообщений, перезагрузите страницу',
      })
    }
  }

  useEffect(() => {
    if (isInited) {
      subscribeHandler()
      dispatch(getNotifications())
    }
  }, [isInited])

  return (
    <div className={classNames(cls.wrapper, {}, [className])}>
      <nav
        className={cls.navbar}
        style={{ backgroundImage: `url(${backgImg})` }}
      >
        <LogoLink />
        <Flex gap="32" className={cls.switchBlock}>
          <ThemeSwitcher />
          <LangSwitcher />
        </Flex>

        <Flex gap="32">
          <NotificationDropdown isInited={isInited} />
          <NavbarProfile className={cls.profile} />
        </Flex>
      </nav>
    </div>
  )
}
