import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import { ThemeSwitcher } from '@/entities/ThemeSwitcher'
import { LangSwitcher } from '@/entities/LangSwitcher'
import { LogoLink } from './LogoLink/LogoLink'
import backgImg from '@/shared/assets/img/snowflakes.png'
import { Flex } from '@/shared/ui/Flex/Flex'
import { AvatarProfile } from '@/entities/AvatarProfile/ui/AvatarProfile'
import { ProfileBlock } from '@/features/ProfileBlock'
interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.wrapper, {}, [className])}>
      <nav
        className={cls.navbar}
        style={{ backgroundImage: `url(${backgImg})` }}
      >
        <LogoLink />
        <Flex gap="32" className={cls.switchBlock}>
          <ThemeSwitcher />
          <LangSwitcher />
        </Flex>
        <ProfileBlock className={cls.profile} />
      </nav>
    </div>
  )
}
