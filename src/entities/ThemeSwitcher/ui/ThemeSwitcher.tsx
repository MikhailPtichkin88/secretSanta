import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ThemeSwitcher.module.scss'
import { useTheme } from '@/app/providers/ThemeProvider/lib/useTheme'
import { BrowserView, MobileView } from 'react-device-detect'
import { Theme } from '@/app/providers/ThemeProvider'
import SunIcon from '@/shared/assets/icons/sun.svg'
import HalfMoonIcon from '@/shared/assets/icons/moon.svg'
import { Switch } from '@/shared/ui/Switch'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme()
  const checked = theme === Theme.DARK
  const sunIconFill = checked ? '#FFF8C9' : '#FFE74C'
  const moonIconFill = checked ? '#AEDCFF' : '#EBF6FF'
  return (
    <>
      <BrowserView>
        <div className={classNames(cls.themeswitcher, {}, [className])}>
          <SunIcon fill={sunIconFill} width={'28'} height={'28'} />
          <Switch
            className={`${cls.switch} ${checked ? cls.checked : ''}`}
            checked={checked}
            onChange={toggleTheme}
          />
          <HalfMoonIcon fill={moonIconFill} width={28} height={28} />
        </div>
      </BrowserView>
      <MobileView>
        {theme === Theme.LIGHT && (
          <SunIcon
            onClick={toggleTheme}
            fill={'#FFE74C'}
            width={'28'}
            height={'28'}
          />
        )}
        {theme === Theme.DARK && (
          <HalfMoonIcon
            onClick={toggleTheme}
            fill={'#AEDCFF'}
            width={28}
            height={28}
          />
        )}
      </MobileView>
    </>
  )
}
