import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Tabs } from '@/shared/ui/Tabs'
import { Button } from '@/shared/ui/Button'
import SantaIcon from '@/shared/assets/icons/present.svg'
import SearchIcon from '@/shared/assets/icons/search.svg'
import { Input } from '@/shared/ui/Input'
import { memo, useEffect, useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import cls from './ProfileSessionsControlls.module.scss'
import { MobileView, BrowserView } from 'react-device-detect'
import { MobileSortSelect } from './MobileSortSelect'
import FilterIcon from '@/shared/assets/icons/filter.svg'
import {
  TSessionSortOrder,
  TSessionStatusFilter,
  TSortSessions,
} from '@/entities/ProfileSessionsTable'
import { MobileStatusSelect } from './MobileStatusSelect'
import { useSelector } from 'react-redux'
import { getOnboardingIsOpen } from '@/entities/Onboarding'

interface SessionControllsProps {
  role: string
  className?: string
  isLoading: boolean
  onTabChangeHandler: (tabName: string) => void
  onSearchHandler: (value: string) => void
  onOpenCreateSessionModal: () => void
  onChangeStatusHandler: (status: TSessionStatusFilter) => void
  onChangeSortOrder: (sort: {
    sortBy?: TSortSessions
    sortOrder: TSessionSortOrder
  }) => void
}

export const ProfileSessionsControlls = memo(
  ({
    role,
    className,
    isLoading,
    onTabChangeHandler,
    onSearchHandler,
    onChangeStatusHandler,
    onChangeSortOrder,
    onOpenCreateSessionModal,
  }: SessionControllsProps) => {
    const isOnboardingOpen = useSelector(getOnboardingIsOpen)

    const [searchValue, setSearchValue] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const { t, i18n } = useTranslation('profile')
    const filtersBlock = useMemo(() => {
      return (
        <>
          <div className={cls.tabsWrapper}>
            <p className={cls.tabsTitle}>{t('Роль')}</p>
            <Tabs
              className={cls.tabs + ` profile_page_onboarding_step_5`}
              tabTitleFirst={t('Создатель')}
              tabTitleSecond={t('Участник')}
              onTabChange={onTabChangeHandler}
              loading={isLoading}
              defaultCheckedIndex={role === 'creator' ? 0 : 1}
            />
          </div>
          <div className={cls.searchBlock}>
            <p className={cls.searchTitle}>{t('Название')}</p>
            <SearchIcon className={cls.searchIcon} />
            <Input
              className={cls.searchInput}
              bordered={false}
              onChange={setSearchValue}
              value={searchValue}
            />
          </div>
        </>
      )
    }, [i18n.language])
    const debouncedSearch = useDebounce(
      () => onSearchHandler(searchValue),
      1000
    )

    useEffect(() => {
      debouncedSearch()
    }, [searchValue])

    useEffect(() => {
      if (isOnboardingOpen) {
        setShowFilters(true)
      } else {
        setShowFilters(false)
      }
    }, [isOnboardingOpen])

    return (
      <>
        <BrowserView>
          <div className={classNames(cls.sessionControlls, {}, [className])}>
            {filtersBlock}
            <Button
              theme="secondary"
              outlined
              className={
                cls.createSessionBtn + ` profile_page_onboarding_step_6`
              }
              onClick={onOpenCreateSessionModal}
            >
              <SantaIcon className={cls.icon} width={30} height={30} />
              {t('Создать сессию')}
            </Button>
          </div>
        </BrowserView>

        <MobileView className={cls.mobileWrapper}>
          <div className={classNames(cls.sessionControlls, {}, [className])}>
            <Button
              outlined
              className={cls.filterBtn}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterIcon width={25} height={25} />
              {t('Фильтры')}
            </Button>
            <div
              className={`${cls.onboardingBlock} profile_page_onboarding_step_5`}
            />
            {showFilters && (
              <>
                {filtersBlock}
                <MobileSortSelect onChangeSortOrder={onChangeSortOrder} />
                <MobileStatusSelect onChangeStatus={onChangeStatusHandler} />
              </>
            )}
            <Button
              theme="secondary"
              outlined
              className={
                cls.createSessionBtn + ` profile_page_onboarding_step_6`
              }
              onClick={onOpenCreateSessionModal}
            >
              <SantaIcon className={cls.icon} width={30} height={30} />
              {t('Создать сессию')}
            </Button>
          </div>
        </MobileView>
      </>
    )
  }
)
