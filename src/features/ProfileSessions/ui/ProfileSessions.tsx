import { ProfileSessionsControlls } from '@/entities/ProfileSessionsControlls'
import {
  ISession,
  ProfileSessionsTable,
  TSessionSortOrder,
  TSessionStatusFilter,
  TSortSessions,
} from '@/entities/ProfileSessionsTable'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Pagination, TPerPage } from '@/shared/ui/Pagination'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getProfileSessionsCurrentPage } from '../model/selectors/getProfileSessionsCurrentPage'
import { getProfileSessionsData } from '../model/selectors/getProfileSessionsData'
import { getProfileSessionsIsLoading } from '../model/selectors/getProfileSessionsIsLoading'
import { getProfileSessionsPageLimit } from '../model/selectors/getProfileSessionsPageLimit'
import { getProfileSessionsRole } from '../model/selectors/getProfileSessionsRole'
import { getProfileSessionsSearch } from '../model/selectors/getProfileSessionsSearch'
import { getProfileSessionsSortBy } from '../model/selectors/getProfileSessionsSortBy'
import { getProfileSessionsSortOrder } from '../model/selectors/getProfileSessionsSortOrder'
import { getProfileSessionsStatus } from '../model/selectors/getProfileSessionsStatus'
import { getProfileSessionsTotalPages } from '../model/selectors/getProfileSessionsTotalPages'
import { getProfileSessions } from '../model/services/getProfileSessions'
import { profileSessionsActions } from '../model/slice/profileSessionsSlice'
import { BrowserView, MobileView } from 'react-device-detect'
import cls from './ProfileSessions.module.scss'
import { MobileSession } from '@/shared/ui/MobileSession'
import {
  getOnboardingIsOpen,
  getOnboardingStepNumber,
} from '@/entities/Onboarding'

interface SessionsTableProps {
  className?: string
  onOpenCreateSessionModal: () => void
}

export const ProfileSessions = ({
  className,
  onOpenCreateSessionModal,
}: SessionsTableProps) => {
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

  //onboarding
  const isOnboardingOpen = useSelector(getOnboardingIsOpen)
  const onBoardingStep = useSelector(getOnboardingStepNumber)

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
    sortBy: TSortSessions
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

  useEffect(() => {
    if (isOnboardingOpen) {
      dispatch(profileSessionsActions.setOnboardingMockSession(true))
    } else {
      dispatch(profileSessionsActions.setOnboardingMockSession(false))
    }
  }, [isOnboardingOpen])
  return (
    <div className={cls.wrapper}>
      <h2>{t('Сессии выбора подарков')}</h2>
      <ProfileSessionsControlls
        role={role}
        onOpenCreateSessionModal={onOpenCreateSessionModal}
        onSearchHandler={onSearchHandler}
        onTabChangeHandler={onTabChangeHandler}
        isLoading={isLoading}
        onChangeSortOrder={onChangeSortHandler}
        onChangeStatusHandler={onChangeStatusHandler}
      />
      <BrowserView>
        <ProfileSessionsTable
          isLoading={isLoading}
          sessions={sessions}
          sortBy={sortBy}
          sortOrder={sortOrder}
          status={status}
          onChangeSortOrder={onChangeSortHandler}
          onChangeStatusHandler={onChangeStatusHandler}
        />
      </BrowserView>
      <MobileView>
        <div className={'profile_page_onboarding_step_4'}>
          {sessions.map(
            ({
              _id,
              title,
              createdAt,
              total_participants,
              status,
              ...rest
            }) => {
              return (
                <MobileSession
                  key={_id}
                  sessionImg={rest?.session_img}
                  sessionId={_id}
                  title={title}
                  createdAt={createdAt}
                  totalParticipants={total_participants}
                  status={status}
                  isLoading={isLoading}
                />
              )
            }
          )}
        </div>
      </MobileView>
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
