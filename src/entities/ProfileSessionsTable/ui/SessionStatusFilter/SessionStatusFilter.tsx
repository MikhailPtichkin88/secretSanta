import React, { useState, useRef, useEffect } from 'react'
import { Menu } from '@headlessui/react'
import cls from './SessionStatusFilter.module.scss'
import FilterIcon from '@/shared/assets/icons/filter.svg'
import { Checkbox } from '@/shared/ui/Checkbox'
import { Card } from '@/shared/ui/Card'
import { TSessionStatusFilter } from '../../model/types/types'
import { useTranslation } from 'react-i18next'

interface IProps {
  isLoading: boolean
  status: TSessionStatusFilter
  onChangeStatusHandler: (status: TSessionStatusFilter) => void
}

export const SessionStatusFilter = ({
  isLoading,
  status,
  onChangeStatusHandler,
}: IProps) => {
  const [filters, setFilters] = useState<TSessionStatusFilter[]>([status])
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation('profile')
  const onCancelHandler = () => {
    setFilters([status])
    setIsOpen(false)
  }
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      onCancelHandler()
    }
  }

  const onChangeHandler = (checked: boolean, status: TSessionStatusFilter) => {
    if (checked) {
      setFilters([...filters, status])
    } else {
      setFilters(filters.filter((el) => el !== status))
    }
  }

  const onConfirmHandler = () => {
    if (
      filters.includes('all') ||
      (filters.includes('active') && filters.includes('closed'))
    ) {
      onChangeStatusHandler('all')
      return setIsOpen(false)
    }
    if (filters.includes('active')) {
      onChangeStatusHandler('active')
      return setIsOpen(false)
    }
    if (filters.includes('closed')) {
      onChangeStatusHandler('closed')
      return setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={menuRef}>
      <Menu as="div" className={cls.menu}>
        <Menu.Button
          as={'div'}
          onClick={() => setIsOpen(!isOpen)}
          className={cls.button}
        >
          <FilterIcon className={status !== 'all' ? cls.btnIconActive : ''} />
        </Menu.Button>
        {isOpen && (
          <Menu.Items as={'div'} static>
            <Card className={cls.dropdown}>
              <Menu.Item as={React.Fragment}>
                <Checkbox
                  label={t('Все')}
                  checked={filters.includes('all')}
                  onChange={(checked) => onChangeHandler(checked, 'all')}
                />
              </Menu.Item>
              <Menu.Item as={React.Fragment}>
                <Checkbox
                  label={t('В процессе')}
                  checked={filters.includes('active')}
                  onChange={(checked) => {
                    onChangeHandler(checked, 'active')
                  }}
                />
              </Menu.Item>
              <Menu.Item as={React.Fragment}>
                <Checkbox
                  label={t('Завершенные')}
                  checked={filters.includes('closed')}
                  onChange={(checked) => onChangeHandler(checked, 'closed')}
                />
              </Menu.Item>

              <div className={cls.controlBlock}>
                <Menu.Item
                  as={'button'}
                  className={cls.cancelBtn}
                  onClick={onCancelHandler}
                >
                  {t('Отмена')}
                </Menu.Item>
                <Menu.Item
                  as={'button'}
                  className={cls.confirmlBtn}
                  disabled={isLoading}
                  onClick={onConfirmHandler}
                >
                  {t('Принять')}
                </Menu.Item>
              </div>
            </Card>
          </Menu.Items>
        )}
      </Menu>
    </div>
  )
}
