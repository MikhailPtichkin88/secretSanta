import { classNames } from '@/shared/lib/classNames/classNames'

interface ErrorPageProps {
  className?: string
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
  // const {t} = useTranslation();
  const reloadPage = () => {
    location.reload()
  }
  return (
    <div className={classNames('', {}, [className])}>
      <p>{'Произошла ошибка'}</p>
      <button onClick={reloadPage}>{'Обновить страницу'}</button>
    </div>
  )
}
