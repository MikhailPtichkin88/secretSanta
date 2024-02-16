import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Tabs } from '@/shared/ui/Tabs'
import { Button } from '@/shared/ui/Button'
import SantaIcon from '@/shared/assets/icons/present.svg'
import SearchIcon from '@/shared/assets/icons/search.svg'
import { Input } from '@/shared/ui/Input'
import { memo, useEffect, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import cls from './ProfileSessionsControlls.module.scss'

interface RoleTabsProps {
  role: string
  className?: string
  isLoading: boolean
  onTabChangeHandler: (tabName: string) => void
  onSearchHandler: (value: string) => void
  onOpenCreateSessionModal: () => void
}

export const ProfileSessionsControlls = memo(
  ({
    role,
    className,
    isLoading,
    onTabChangeHandler,
    onSearchHandler,
    onOpenCreateSessionModal,
  }: RoleTabsProps) => {
    const [searchValue, setSearchValue] = useState('')

    const { t } = useTranslation('profile')

    const debouncedSearch = useDebounce(
      () => onSearchHandler(searchValue),
      1000
    )

    useEffect(() => {
      debouncedSearch()
    }, [searchValue])

    return (
      <div className={classNames(cls.roletabs, {}, [className])}>
        <div>
          <p className={cls.tabsTitle}>{t('Роль')}</p>
          <Tabs
            className={cls.tabs}
            tabTitleFirst={t('Создатель')}
            tabTitleSecond={t('Участник')}
            onTabChange={onTabChangeHandler}
            loading={isLoading}
            defaultCheckedIndex={role === 'creator' ? 0 : 1}
          />
        </div>
        <div className={cls.searchBlock}>
          <p className={cls.searchTitle}>Название:</p>
          <SearchIcon className={cls.searchIcon} />
          <Input
            className={cls.searchInput}
            bordered={false}
            onChange={setSearchValue}
            value={searchValue}
          />
        </div>
        <Button
          theme="secondary"
          outlined
          className={cls.createSessionBtn}
          onClick={onOpenCreateSessionModal}
        >
          <SantaIcon className={cls.icon} width={30} height={30} />
          {t('Создать сессию')}
        </Button>
      </div>
    )
  }
)
