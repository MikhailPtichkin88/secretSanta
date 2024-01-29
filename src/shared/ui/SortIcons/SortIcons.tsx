import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './SortIcons.module.scss'

import ArrowUpIcon from '@/shared/assets/icons/arrow_up.svg'
import ArrowDownIcon from '@/shared/assets/icons/arrow_down.svg'

interface SortIconsProps {
  className?: string
  isSortAsc?: boolean
  isSortDesc?: boolean
  disabled?: boolean
  onChangeSort: () => void
}

export const SortIcons = ({
  className,
  isSortAsc,
  isSortDesc,
  onChangeSort,
  disabled,
}: SortIconsProps) => {
  const mods: Mods = {
    [cls.sortAsc]: isSortAsc,
    [cls.sortDesc]: isSortDesc,
    [cls.disabled]: disabled,
  }
  return (
    <div
      className={classNames(cls.sorticons, mods, [className])}
      onClick={onChangeSort}
    >
      <ArrowUpIcon className={cls.ascIcon} />
      <ArrowDownIcon className={cls.descIcon} />
    </div>
  )
}
