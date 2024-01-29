import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Tabs.module.scss'

import { Tab } from '@headlessui/react'
import { useState } from 'react'

interface TabsProps {
  loading?: boolean
  className?: string
  tabTitleFirst: string
  tabTitleSecond: string
  onTabChange: (tabName: string) => void
}

export const Tabs = ({
  className,
  tabTitleFirst,
  tabTitleSecond,
  onTabChange,
  loading,
}: TabsProps) => {
  const [_, setActiveTab] = useState('tab1')

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange(tabId)
  }

  return (
    <div
      className={classNames(cls.tabs, { [cls.loading]: loading }, [className])}
    >
      <Tab.Group defaultIndex={0}>
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
