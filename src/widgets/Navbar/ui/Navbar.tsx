import { LangSwitcher } from '@/entities/LangSwitcher'
import { ThemeSwitcher } from '@/entities/ThemeSwitcher'
import { NavbarProfile } from '@/features/NavbarProfile'
import backgImg from '@/shared/assets/img/snowflakes.png'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Flex } from '@/shared/ui/Flex'
import { LogoLink } from './LogoLink/LogoLink'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
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
        <NavbarProfile className={cls.profile} />
      </nav>
    </div>
  )
}
