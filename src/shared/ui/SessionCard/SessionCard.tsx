import placeholder from '@/shared/assets/img/profile_avatar.png'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useEffect, useState } from 'react'
import { Button } from '../Button'
import EditIcon from '@/shared/assets/icons/edit.svg'
import santaImg from '@/shared/assets/img/cool-santa.png'

import cls from './SessionCard.module.scss'
import { Loader } from '../PageLoader'
import { Skeleton } from '../Skeleton'
interface SessionCardProps {
  className?: string
  isSelected?: boolean
  imgUrl?: string
  cardName?: string
  canEdit?: boolean
  onCardClick: () => void
  isLoading?: boolean
}

export const SessionCard = ({
  className,
  isSelected,
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

  if (isLoading) {
    return (
      <div className={cls.sessioncard}>
        <Skeleton width={'100%'} height={125} className={cls.skeletonImg} />
        <Skeleton width={'100%'} height={20} className={cls.skeletonTitle} />
      </div>
    )
  }
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
          {isSelected && (
            <img
              src={santaImg}
              alt="santa img"
              width={25}
              height={25}
              className={cls.santaImg}
            />
          )}
        </div>
      )}
    </Button>
  )
}
