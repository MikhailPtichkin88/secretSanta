import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ProfileSessionsTable.module.scss'
import { useTranslation } from 'react-i18next'
import { parseDate } from '@/shared/lib/parseDate/parseDate'
import { Loader } from '@/shared/ui/PageLoader'
import { Tooltip } from '@/shared/ui/Tooltip'

import { SessionStatusFilter } from './SessionStatusFilter/SessionStatusFilter'

import { useMemo } from 'react'
import { v4 } from 'uuid'

import {
  ISession,
  TSessionSortOrder,
  TSessionStatusFilter,
} from '../model/types/types'
import { ProfileSortIcons } from './SessionSortIcons/ProfileSortIcons'

interface SessionsTableProps {
  className?: string
  sessions: ISession[]
  isLoading: boolean
  sortBy: keyof Partial<ISession>
  sortOrder: TSessionSortOrder
  status: TSessionStatusFilter
  onChangeStatusHandler: (status: TSessionStatusFilter) => void
  onChangeSortOrder: (sort: {
    sortBy?: keyof Partial<ISession>
    sortOrder: TSessionSortOrder
  }) => void
}

export const ProfileSessionsTable = ({
  className,
  sessions,
  isLoading,
  sortOrder,
  sortBy,
  status,
  onChangeStatusHandler,
  onChangeSortOrder,
}: SessionsTableProps) => {
  const { t } = useTranslation('profile')

  const tableContent = useMemo(() => {
    return sessions.map((session) => {
      const statusColor = session.status === 'closed' ? cls.grey : cls.green
      const statusTitle =
        session.status === 'closed' ? 'завершена' : 'в процессе'
      return (
        <tr key={v4()} className={cls.bodyRow}>
          <td className={cls.titleCell}>
            <div>{session.title} </div>
          </td>
          <td className={cls.participantsCell}>{session.total_participants}</td>
          <td className={cls.createdAtCell}>{parseDate(session.createdAt)}</td>
          <td className={cls.statusCell}>
            <div>
              <Tooltip title={statusTitle} className={cls.statusTooltip}>
                <span className={statusColor} />
              </Tooltip>
              <span className={cls.statusTitle}>{statusTitle}</span>
            </div>
          </td>
          <td className={cls.infoCell}>
            <div>{session.session_info || <>&mdash;</>}</div>
          </td>
        </tr>
      )
    })
  }, [sessions])

  if (isLoading) {
    return (
      <div style={{ margin: '0 auto' }}>
        <Loader />
      </div>
    )
  }
  return (
    <>
      <table className={classNames(cls.sessionstable, {}, [className])}>
        <thead>
          <tr>
            <th className={cls.headerCell}>
              <div>
                {t('Название')}
                <ProfileSortIcons
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onChangeSortOrder={onChangeSortOrder}
                  isLoading={isLoading}
                  fieldTitle="title"
                />
              </div>
            </th>
            <th className={cls.headerCell}>
              <div>
                {t('Кол-во участников')}
                <ProfileSortIcons
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onChangeSortOrder={onChangeSortOrder}
                  isLoading={isLoading}
                  fieldTitle="total_participants"
                />
              </div>
            </th>
            <th className={cls.headerCell}>
              <div>
                {t('Дата создания')}
                <ProfileSortIcons
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onChangeSortOrder={onChangeSortOrder}
                  isLoading={isLoading}
                  fieldTitle="createdAt"
                />
              </div>
            </th>
            <th className={cls.headerCell}>
              <div>
                {t('Статус')}
                <SessionStatusFilter
                  isLoading={isLoading}
                  status={status}
                  onChangeStatusHandler={onChangeStatusHandler}
                />
              </div>
            </th>
            <th className={cls.headerCell}>{t('Описание')}</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </>
  )
}
