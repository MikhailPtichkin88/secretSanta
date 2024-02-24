import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './MobileSession.module.scss'
import { parseDate } from '@/shared/lib/parseDate/parseDate'
import { useNavigate } from 'react-router-dom'
import placeholder from '@/shared/assets/img/cool-santa.png'
import { createSessionImgUrl } from '@/shared/lib/createImgUrl/createImgUrl'
import PeopleIcon from '@/shared/assets/icons/people.svg'
import { Flex } from '../Flex'
import { useTranslation } from 'react-i18next'
import { Skeleton } from '../Skeleton'

interface MobileSessionProps {
  className?: string
  sessionId: string
  title: string
  createdAt: string
  totalParticipants: number
  status: string
  sessionImg: string
  isLoading?: boolean
}

export const MobileSession = ({
  className,
  sessionId,
  title,
  createdAt,
  totalParticipants,
  status,
  sessionImg,
  isLoading,
}: MobileSessionProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  if (isLoading) {
    return (
      <div className={cls.mobilesession}>
        <Skeleton width={60} height={60} />
        <Skeleton width={'100%'} height={40} />
      </div>
    )
  }
  return (
    <div
      className={classNames(cls.mobilesession, {}, [className])}
      onClick={() => navigate(`/session/${sessionId}`)}
    >
      <img
        className={cls.sessionImg}
        src={createSessionImgUrl(sessionImg)}
        alt="session img"
        onError={(e) => ((e.target as HTMLImageElement).src = placeholder)}
      />

      <div className={cls.titleBlock}>
        <p className={cls.title}>{title}</p>
        <span className={cls.createdAt}>{parseDate(createdAt)}</span>
      </div>

      <div>
        <p
          className={`${status === 'closed' ? cls.grey : cls.green} ${
            cls.status
          }`}
        >
          {`${status === 'closed' ? t('закрыта') : t('активная')}`}
        </p>
        <Flex gap="8" align="center">
          <span className={cls.totalParticipants}>{totalParticipants}</span>
          <PeopleIcon className={cls.peopleIcon} />
        </Flex>
      </div>
    </div>
  )
}
