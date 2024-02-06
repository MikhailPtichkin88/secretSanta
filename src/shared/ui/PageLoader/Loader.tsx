import { classNames } from '@/shared/lib/classNames/classNames'
import './Loader.scss'

interface LoaderProps {
  className?: string
  transparent?: boolean
}

export const Loader = ({ className, transparent }: LoaderProps) => {
  return (
    <div
      className={classNames('lds-ellipsis', { transparent: transparent }, [
        className,
      ])}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
