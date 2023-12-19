import { useTheme } from '@/app/providers/ThemeProvider/lib/useTheme'
import { classNames } from '@/shared/lib/classNames/classNames'

import { Input } from '@/shared/ui/Input'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AppRouter } from './providers/router'

export const App = () => {
  const { theme } = useTheme()
  const { t, i18n } = useTranslation()

  const [value, setValue] = useState('')

  // делаем эффект с me запросом
  return (
    <div className={classNames('app', {}, [theme])}>
      {/* <span>{t('проверка перевода')}</span>
      <button
        onClick={() => {
          const language = i18n.language === 'ru' ? 'en' : 'ru'
          i18n.changeLanguage(language)
        }}
      >
        {t('кнопка')}
      </button>
      <div style={{ width: 400, padding: 20 }}>
        <Input
          value={value}
          onChange={setValue}
          state={'error'}
          // bordered={false}
          // errorMessage="slkjfdl;aksjd;fj;"
        />
      </div> */}

      <AppRouter />
    </div>
  )
}
