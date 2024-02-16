import { classNames } from '@/shared/lib/classNames/classNames'
import './Loader.scss'

interface LoaderProps {
  className?: string
  transparent?: boolean
  whiteFill?: boolean
}

export const Loader = ({ className, transparent, whiteFill }: LoaderProps) => {
  return (
    <div
      className={classNames(
        'lds-ellipsis',
        { transparent: transparent, whiteFill: whiteFill },
        [className]
      )}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
