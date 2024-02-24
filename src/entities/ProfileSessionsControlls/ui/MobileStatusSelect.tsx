import { TSessionStatusFilter } from '@/entities/ProfileSessionsTable'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Select } from '@/shared/ui/Select'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './ProfileSessionsControlls.module.scss'

interface MobileStatusSelectProps {
  className?: string
  onChangeStatus: (status: TSessionStatusFilter) => void
}

export const MobileStatusSelect = ({
  className,
  onChangeStatus,
}: MobileStatusSelectProps) => {
  const { t, i18n } = useTranslation()

  const [status, setStatus] = useState<TSessionStatusFilter>('all')

  const statusOptions: { value: TSessionStatusFilter; content: string }[] =
    useMemo(
      () => [
        { value: 'all', content: t('Все') },
        { value: 'active', content: t('Активные') },
        { value: 'closed', content: t('Завершенные') },
      ],
      [i18n.language]
    )

  const onChangeStatusHandler = (value: TSessionStatusFilter) => {
    setStatus(value)
    onChangeStatus(value)
  }

  return (
    <div className={classNames(cls.mobilesortselect, {}, [className])}>
      <div className={cls.sortByWrapper}>
        <span>{t('Статус')}</span>
        <Select<TSessionStatusFilter>
          options={statusOptions}
          value={status}
          onChange={onChangeStatusHandler}
        />
      </div>
    </div>
  )
}
