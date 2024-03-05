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
import { NavLink } from 'react-router-dom'

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
  const { t, i18n } = useTranslation('profile')

  const tableContent = useMemo(() => {
    return sessions.map((session) => {
      const statusColor = session.status === 'closed' ? cls.grey : cls.green
      const statusTitle =
        session.status === 'closed' ? t('завершена') : t('в процессе')
      return (
        <tr key={v4()} className={cls.bodyRow}>
          <td className={cls.titleCell}>
            <NavLink className={cls.link} to={`/session/${session._id}`}>
              {session.title}{' '}
            </NavLink>
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
  }, [sessions, i18n.language])

  return (
    <>
      <table
        className={classNames(cls.sessionstable, {}, [
          className,
          `profile_page_onboarding_step_4`,
        ])}
      >
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
        <tbody>{isLoading ? null : tableContent}</tbody>
      </table>
      {isLoading && (
        <div
          className={cls.loaderWrapper}
          style={{ minHeight: sessions?.length > 5 ? 500 : 200 }}
        >
          <Loader />
        </div>
      )}
    </>
  )
}
