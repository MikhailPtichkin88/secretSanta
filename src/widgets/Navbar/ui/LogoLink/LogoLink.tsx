import { classNames } from '@/shared/lib/classNames/classNames'
import cls from '../Navbar.module.scss'
import { NavLink } from 'react-router-dom'
import LogoIcon from '@/shared/assets/img/cool-santa.png'

interface LogoLinkProps {
  className?: string
}

export const LogoLink = ({ className }: LogoLinkProps) => {
  return (
    <NavLink to={'/'} className={classNames(cls.logoLink, {}, [className])}>
      <img className={cls.logoImage} src={LogoIcon} alt="presents bag" />
      <p className={cls.logoTitle}>Secret Santa</p>
    </NavLink>
  )
}
