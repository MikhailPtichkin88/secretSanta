import cls from './ProfileSessions.module.scss'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { getProfileSessions } from '../model/services/getProfileSessions'
import { useSelector } from 'react-redux'
import { getProfileSessionsData } from '../model/selectors/getProfileSessionsData'
import { ProfileSessionsControlls } from '@/entities/ProfileSessionsControlls'
import { profileSessionsActions } from '../model/slice/profileSessionsSlice'
import { getProfileSessionsIsLoading } from '../model/selectors/getProfileSessionsIsLoading'
import {
  ISession,
  ProfileSessionsTable,
  TSessionSortOrder,
  TSessionStatusFilter,
} from '@/entities/ProfileSessionsTable'
import { getProfileSessionsSortOrder } from '../model/selectors/getProfileSessionsSortOrder'
import { getProfileSessionsSortBy } from '../model/selectors/getProfileSessionsSortBy'
import { getProfileSessionsStatus } from '../model/selectors/getProfileSessionsStatus'
import { Pagination, TPerPage } from '@/shared/ui/Pagination'
import { getProfileSessionsCurrentPage } from '../model/selectors/getProfileSessionsCurrentPage'
import { getProfileSessionsPageLimit } from '../model/selectors/getProfileSessionsPageLimit'
import { getProfileSessionsTotalPages } from '../model/selectors/getProfileSessionsTotalPages'
import { getProfileSessionsSearch } from '../model/selectors/getProfileSessionsSearch'
import { getProfileSessionsRole } from '../model/selectors/getProfileSessionsRole'

interface SessionsTableProps {
  className?: string
}

export const ProfileSessions = ({ className }: SessionsTableProps) => {
  const isLoading = useSelector(getProfileSessionsIsLoading)
  const sessions = useSelector(getProfileSessionsData)
  const sortOrder = useSelector(getProfileSessionsSortOrder)
  const sortBy = useSelector(getProfileSessionsSortBy)
  const status = useSelector(getProfileSessionsStatus)
  const current = useSelector(getProfileSessionsCurrentPage)
  const perPage = useSelector(getProfileSessionsPageLimit)
  const total = useSelector(getProfileSessionsTotalPages)
  const search = useSelector(getProfileSessionsSearch)
  const role = useSelector(getProfileSessionsRole)

  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const onTabChangeHandler = (tabName: string) => {
    if (tabName === 'Создатель') {
      dispatch(profileSessionsActions.changeRole('creator'))
    } else {
      dispatch(profileSessionsActions.changeRole('participant'))
    }
  }

  const onSearchHandler = useCallback(
    (searchValue: string) => {
      dispatch(dispatch(profileSessionsActions.changeSearch(searchValue)))
    },
    [dispatch]
  )

  const onChangeSortHandler = (sort: {
    sortBy: keyof Partial<ISession>
    sortOrder: TSessionSortOrder
  }) => {
    dispatch(profileSessionsActions.changeSort(sort))
  }

  const onChangeStatusHandler = (status: TSessionStatusFilter) => {
    dispatch(profileSessionsActions.changeStatus(status))
  }

  const onChangePageHandler = useCallback(
    (page: number) => {
      dispatch(profileSessionsActions.changePage(page))
    },
    [dispatch]
  )

  const onPerPageChange = useCallback(
    (perPage: TPerPage) => {
      dispatch(profileSessionsActions.changePageLimit(perPage))
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(
      getProfileSessions({
        sortBy,
        sortOrder,
        page: current,
        limit: perPage,
        status,
        search,
        role,
      })
    )
  }, [sortBy, sortOrder, current, perPage, status, search, role])

  return (
    <div className={cls.wrapper}>
      <h2>Сессии выбора подарков</h2>
      <ProfileSessionsControlls
        onSearchHandler={onSearchHandler}
        onTabChangeHandler={onTabChangeHandler}
        isLoading={isLoading}
      />
      <ProfileSessionsTable
        isLoading={isLoading}
        sessions={sessions}
        sortBy={sortBy}
        sortOrder={sortOrder}
        status={status}
        onChangeSortOrder={onChangeSortHandler}
        onChangeStatusHandler={onChangeStatusHandler}
      />
      <Pagination
        current={current}
        total={total}
        perPage={perPage}
        onPageChange={onChangePageHandler}
        onPerPageChange={onPerPageChange}
      />
    </div>
  )
}
