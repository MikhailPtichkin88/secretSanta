import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ProfileSessionsControlls.module.scss'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import { Select } from '@/shared/ui/Select'
import {
  ISession,
  TSessionSortOrder,
  TSortSessions,
} from '@/entities/ProfileSessionsTable'

interface MobileSortSelectProps {
  className?: string
  onChangeSortOrder: (sort: {
    sortBy?: keyof Partial<ISession>
    sortOrder: TSessionSortOrder
  }) => void
}

export const MobileSortSelect = ({
  className,
  onChangeSortOrder,
}: MobileSortSelectProps) => {
  const { t, i18n } = useTranslation()
  const [sortBy, setSortBy] = useState<TSortSessions>('title')
  const [sortOrder, setSortOrder] = useState<TSessionSortOrder>('asc')

  const sortOptions: { value: TSortSessions; content: string }[] = useMemo(
    () => [
      { value: 'title', content: t('Название') },
      { value: 'total_participants', content: t('Количество участников') },
      { value: 'createdAt', content: t('Дата создания') },
    ],
    [i18n.language]
  )

  const sortOrderOptions: { value: TSessionSortOrder; content: string }[] =
    useMemo(
      () => [
        { value: 'asc', content: t('По возрастанию') },
        { value: 'desc', content: t('По убыванию') },
      ],
      [i18n.language]
    )

  useEffect(() => {
    onChangeSortOrder({ sortBy, sortOrder })
  }, [sortBy, sortOrder])

  return (
    <div className={classNames(cls.mobilesortselect, {}, [className])}>
      <div className={cls.sortByWrapper}>
        <span>{t('Сортировать по:')}</span>
        <Select<TSortSessions>
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      <div className={cls.sortOrderWrapper}>
        <span>{t('Порядок')}</span>
        <Select<TSessionSortOrder>
          options={sortOrderOptions}
          value={sortOrder}
          onChange={setSortOrder}
        />
      </div>
    </div>
  )
}
