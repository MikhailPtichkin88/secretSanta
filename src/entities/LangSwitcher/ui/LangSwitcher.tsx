import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './LangSwitcher.module.scss'
import { Switch } from '@/shared/ui/Switch'
import { BrowserView, MobileView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import RuFlagIcon from '@/shared/assets/icons/russia.svg'
import EnFlagIcon from '@/shared/assets/icons/united-kingdom.svg'
interface LangSwitcherProps {
  className?: string
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { i18n } = useTranslation()

  const language = i18n.language === 'ru' ? 'en' : 'ru'

  const onChangeHandler = () => {
    i18n.changeLanguage(language)
  }

  return (
    <>
      <BrowserView>
        <div className={classNames(cls.langswitcher, {}, [className])}>
          <RuFlagIcon
            className={`${i18n.language === 'ru' ? cls.active : ''}`}
            width={28}
            height={28}
          />
          <Switch
            theme="secondary"
            className={cls.switch}
            checked={i18n.language === 'en'}
            onChange={onChangeHandler}
          />
          <EnFlagIcon
            className={`${i18n.language === 'en' ? cls.active : ''}`}
            width={28}
            height={28}
          />
        </div>
      </BrowserView>
      <MobileView>
        {language === 'ru' && (
          <EnFlagIcon
            className={`${i18n.language === 'en' ? cls.active : ''}`}
            onClick={onChangeHandler}
            width={28}
            height={28}
          />
        )}

        {language === 'en' && (
          <RuFlagIcon
            className={`${i18n.language === 'ru' ? cls.active : ''}`}
            onClick={onChangeHandler}
            width={28}
            height={28}
          />
        )}
      </MobileView>
    </>
  )
}
