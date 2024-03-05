import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Tabs.module.scss'

import { Tab } from '@headlessui/react'
import { useState } from 'react'

interface TabsProps {
  loading?: boolean
  className?: string
  tabTitleFirst: string
  tabTitleSecond: string
  defaultCheckedIndex?: number
  onTabChange: (tabName: string) => void
}

export const Tabs = ({
  className,
  tabTitleFirst,
  tabTitleSecond,
  onTabChange,
  loading,
  defaultCheckedIndex,
}: TabsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultCheckedIndex ?? 0)

  const handleTabChange = (tabId: string) => {
    onTabChange(tabId)
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
          <Tab
            className={({ selected }) => `
              ${cls.tab} ${selected ? cls.selected : ''}`}
            onClick={() => handleTabChange(tabTitleFirst)}
          >
            {tabTitleFirst}
          </Tab>
          <Tab
            className={({ selected }) => `
              ${cls.tab} ${selected ? cls.selected : ''}`}
            onClick={() => handleTabChange(tabTitleSecond)}
          >
            {tabTitleSecond}
          </Tab>
        </Tab.List>
      </Tab.Group>
    </div>
  )
}
