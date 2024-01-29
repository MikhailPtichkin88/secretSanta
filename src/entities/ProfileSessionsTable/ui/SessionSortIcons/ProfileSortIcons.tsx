import { classNames } from '@/shared/lib/classNames/classNames'
import { SortIcons } from '@/shared/ui/SortIcons/SortIcons'
import cls from './ProfileSortIcons.module.scss'
import { ISession, TSessionSortOrder } from '../../model/types/types'

interface ProfileSortIconsProps {
  className?: string
  fieldTitle: keyof ISession
  isLoading: boolean
  sortBy?: keyof Partial<ISession>
  sortOrder: TSessionSortOrder
  onChangeSortOrder: (sort: {
    sortBy?: keyof Partial<ISession>
    sortOrder: TSessionSortOrder
  }) => void
}

export const ProfileSortIcons = ({
  className,
  fieldTitle,
  isLoading,
  sortOrder,
  sortBy,
  onChangeSortOrder,
}: ProfileSortIconsProps) => {
  const isSortAsc = fieldTitle === sortBy && sortOrder === 'asc'
  const isSortDesc = fieldTitle === sortBy && sortOrder === 'desc'

  const onChangeHandler = () => {
    if (fieldTitle !== sortBy) {
      return onChangeSortOrder({
        sortBy: fieldTitle,
        sortOrder: 'asc',
      })
    }
    if (sortOrder === 'asc') {
      return onChangeSortOrder({
        sortBy: fieldTitle,
        sortOrder: 'desc',
      })
    }
    if (sortOrder === 'desc') {
      return onChangeSortOrder({
        sortBy: fieldTitle,
        sortOrder: null,
      })
    }
    onChangeSortOrder({
      sortBy: fieldTitle,
      sortOrder: 'asc',
    })
  }

  return (
    <div className={classNames(cls.sortIcons, {}, [className])}>
      <SortIcons
        disabled={isLoading}
        isSortAsc={isSortAsc}
        isSortDesc={isSortDesc}
        onChangeSort={onChangeHandler}
      />
    </div>
  )
}
