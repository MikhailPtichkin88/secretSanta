import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Tabs.module.scss'

import { Tab } from '@headlessui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface TabsProps<T extends string> {
  tabs: T[]
  loading?: boolean
  className?: string
  defaultValue?: T
  onTabChange: (tabName: T) => void
}

export const Tabs = <T extends string>({
  className,
  tabs,
  onTabChange,
  loading,
  defaultValue,
}: TabsProps<T>) => {
  const defaultValueIndex = tabs.findIndex((tab) => tab === defaultValue)
  const [selectedIndex, setSelectedIndex] = useState(defaultValueIndex ?? 0)
  const { t } = useTranslation('profile')
  const handleTabChange = (tabIndex: number) => {
    onTabChange(tabs[tabIndex])
  }

  return (
    <div
      className={classNames(cls.tabs, { [cls.loading]: loading }, [
        className,
        `profile_page_onboarding_step_5`,
      ])}
    >
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List>
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              className={({ selected }) => `
                ${cls.tab} ${selected ? cls.selected : ''}`}
              onClick={() => handleTabChange(index)}
            >
              {t(tab)}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  )
}
