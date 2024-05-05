import NotificationSvg from '@/shared/assets/icons/notification.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Flex } from '@/shared/ui/Flex'
import { Popup } from '@/shared/ui/Popup'
import { Tooltip } from '@/shared/ui/Tooltip'
import { useSelector } from 'react-redux'
import { getNotifications } from '../model/selectors/getNotifications'
import { getTotalNotifications } from '../model/selectors/getTotalNotifications'
import cls from './NotificationDropdown.module.scss'
import { getNotificationsIsLoading } from '../model/selectors/getNotificationsIsLoading'
import { Loader } from '@/shared/ui/PageLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { notificationsActions } from '../model/slice/slice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
interface NotificationDropdownProps {
  className?: string
  isInited?: boolean
}

export const NotificationDropdown = ({
  className,
  isInited,
}: NotificationDropdownProps) => {
  const dispatch = useAppDispatch()
  const notificaionsNumber = useSelector(getTotalNotifications)
  const notifications = useSelector(getNotifications)
  const isLoading = useSelector(getNotificationsIsLoading)
  const navigate = useNavigate()
  const { t } = useTranslation()
  let timeout: ReturnType<typeof setTimeout>

  useEffect(() => {
    if (isLoading) {
      timeout = setTimeout(() => {
        dispatch(notificationsActions.resetIsLoading())
      }, 3000)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [isLoading])

  if (!isInited) return null

  return (
    <Popup
      className={classNames(cls.notificationdropdown, {}, [className])}
      trigger={
        <Tooltip placement="left" title={t('Новые сообщения в сессиях')}>
          <div className={cls.iconWrapper}>
            <NotificationSvg className={cls.icon} />
            {isLoading && <Loader className={cls.loader} />}
            {Boolean(notificaionsNumber) && !isLoading && (
              <span className={cls.badge}>{notificaionsNumber}</span>
            )}
          </div>
        </Tooltip>
      }
    >
      <ul className={cls.list}>
        {Boolean(!notifications?.length) && (
          <li className={cls.item}>
            <p className={cls.title}>Нет новых сообщений</p>
          </li>
        )}
        {notifications?.map((notification, index) => (
          <li key={index} className={cls.item}>
            <Flex gap="8" justify="between">
              <p
                onClick={() => navigate(`/session/${notification.sessionId}`)}
                className={cls.title}
              >
                {notification.sessionTitle}
              </p>
              <p className={cls.count}>{notification.count}</p>
            </Flex>
          </li>
        ))}
      </ul>
    </Popup>
  )
}
