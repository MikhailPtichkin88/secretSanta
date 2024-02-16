import placeholder from '@/shared/assets/img/profile_avatar.png'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Card } from '@/shared/ui/Card'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getCardsData } from '../model/selectors/getCardsData'
import { getCardsTotalParticipants } from '../model/selectors/getCardsTotalParticipants'
import { getCards } from '../model/services/getCards'
import cls from './CardsBlock.module.scss'
import { SessionCard } from '@/shared/ui/SessionCard'
import {
  createCardImgUrl,
  createUserAvatarUrl,
} from '@/shared/lib/createImgUrl/createImgUrl'

interface CardsBlockProps {
  className?: string
  sessionId: string
  userId: string
  onCardClick?: (cardId: string) => void
}

export const CardsBlock = ({
  className,
  sessionId,
  userId,
  onCardClick,
}: CardsBlockProps) => {
  const totalParticipants = useSelector(getCardsTotalParticipants)
  const cards = useSelector(getCardsData)

  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const cardsPlaceholders = useMemo(() => {
    const total = totalParticipants - cards.length
    const arr = []
    for (let i = 0; i < total; i++) {
      arr.push(
        <div key={i} className={cls.placeholderCard}>
          <img src={placeholder} alt="card placeholder" />
        </div>
      )
    }
    return arr
  }, [totalParticipants, cards])

  useEffect(() => {
    dispatch(getCards(sessionId))
  }, [])

  return (
    <Card className={classNames(cls.cardsWrapper, {}, [className])}>
      <h3>{t('Карточки участников')}</h3>
      <div className={cls.cardsblock}>
        <>
          {cards.map((card) => {
            let cardImg
            if (card?.user?.avatarUrl) {
              cardImg = createUserAvatarUrl(card.user.avatarUrl)
            }
            if (card?.card_img) {
              cardImg = createCardImgUrl(sessionId, card.card_img)
            }
            return (
              <SessionCard
                key={card._id}
                imgUrl={cardImg}
                canEdit={card.created_by === userId}
                cardName={card.title}
                onCardClick={() => onCardClick(card._id)}
              />
            )
          })}
          {cardsPlaceholders}
        </>
      </div>
    </Card>
  )
}
