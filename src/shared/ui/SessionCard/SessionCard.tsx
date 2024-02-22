import placeholder from '@/shared/assets/img/profile_avatar.png'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useEffect, useState } from 'react'
import { Button } from '../Button'
import EditIcon from '@/shared/assets/icons/edit.svg'

import cls from './SessionCard.module.scss'
import { Loader } from '../PageLoader'
interface SessionCardProps {
  className?: string
  imgUrl?: string
  cardName?: string
  canEdit?: boolean
  onCardClick: () => void
  isLoading?: boolean
}

export const SessionCard = ({
  className,
  imgUrl,
  cardName,
  canEdit,
  onCardClick,
  isLoading,
}: SessionCardProps) => {
  const [cardImg, setCardImg] = useState(null)
  useEffect(() => {
    if (imgUrl) {
      setCardImg(imgUrl)
    } else {
      setCardImg(placeholder)
    }
  }, [imgUrl])

  return (
    <Button
      outlined
      theme="secondary"
      className={classNames(cls.sessioncard, {}, [className])}
      onClick={onCardClick}
    >
      <img className={cls.cardImg} src={cardImg} alt="picture in user's card" />
      {isLoading ? (
        <Loader className={cls.loader} />
      ) : (
        <div className={cls.infoWrapper}>
          <p className={cls.cardName}>{cardName}</p>
          {canEdit && <EditIcon className={cls.cardIcon} />}
        </div>
      )}
    </Button>
  )
}
