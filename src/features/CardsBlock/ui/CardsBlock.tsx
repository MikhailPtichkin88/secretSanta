import { getCurrentSessionTotalPart } from '@/features/SessionForm'
import placeholder from '@/shared/assets/img/profile_avatar.png'
import { classNames } from '@/shared/lib/classNames/classNames'
import { createUserAvatarUrl } from '@/shared/lib/createImgUrl/createImgUrl'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Card } from '@/shared/ui/Card'
import { SessionCard } from '@/shared/ui/SessionCard'
import { Skeleton } from '@/shared/ui/Skeleton'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getCardsData } from '../model/selectors/getCardsData'
import { getCardsIsLoading } from '../model/selectors/getCardsIsLoading'
import { getCards } from '../model/services/getCards'
import { cardsBlockActions } from '../model/slice/cardsBlockSlice'
import cls from './CardsBlock.module.scss'
import {
  getOnboardingIsOpen,
  getOnboardingStepNumber,
} from '@/entities/Onboarding'

interface CardsBlockProps {
  className?: string
  isActiveSession?: boolean
  sessionId: string
  userId: string
  onCardClick?: (cardId: string) => void
}

export const CardsBlock = ({
  className,
  sessionId,
  isActiveSession,
  userId,
  onCardClick,
}: CardsBlockProps) => {
  const totalParticipants = useSelector(getCurrentSessionTotalPart)
  const cards = useSelector(getCardsData)
  const isLoading = useSelector(getCardsIsLoading)
  const { t } = useTranslation('session')

  // onboarding
  const onboardingNumber = useSelector(getOnboardingStepNumber)
  const isOnboardingOpen = useSelector(getOnboardingIsOpen)

  const dispatch = useAppDispatch()
  const cardsPlaceholders = useMemo(() => {
    const arr = []
    if (totalParticipants) {
      const total = totalParticipants - cards.length

      if (isLoading) {
        for (let i = 0; i < total; i++) {
          arr.push(
            <div className={cls.sessioncard} key={i}>
              <Skeleton
                width={'100%'}
                height={125}
                className={cls.skeletonImg}
              />
              <Skeleton
                width={'100%'}
                height={20}
                className={cls.skeletonTitle}
              />
            </div>
          )
        }
        return arr
      }

      for (let i = 0; i < total; i++) {
        arr.push(
          <div key={i} className={cls.placeholderCard}>
            <img src={placeholder} alt="card placeholder" />
          </div>
        )
      }
    }

    return arr
  }, [totalParticipants, cards?.length, isLoading])

  useEffect(() => {
    dispatch(getCards(sessionId))
    return () => {
      dispatch(cardsBlockActions.resetCardsStore())
    }
  }, [sessionId])

  // onboarding
  useEffect(() => {
    if (onboardingNumber === 3) {
      dispatch(cardsBlockActions.setOnboardingCard(true))
    }
    if (onboardingNumber === 2 || onboardingNumber === 4 || !isOnboardingOpen) {
      dispatch(cardsBlockActions.setOnboardingCard(false))
    }
  }, [onboardingNumber, isOnboardingOpen])

  useEffect(() => {
    if (cards && cards.length) {
      const selectedCard = cards.find((card) => card.selected_by)
      const sessionsWithShownCards = JSON.parse(
        localStorage.getItem('sessions_with_shown_cards')
      )
      if (selectedCard) {
        if (
          sessionsWithShownCards &&
          !sessionsWithShownCards?.includes(sessionId)
        ) {
          onCardClick(selectedCard._id)
          sessionsWithShownCards.push(sessionId)
          localStorage.setItem(
            'sessions_with_shown_cards',
            JSON.stringify(sessionsWithShownCards)
          )
        }
        if (!sessionsWithShownCards) {
          onCardClick(selectedCard._id)
          localStorage.setItem(
            'sessions_with_shown_cards',
            JSON.stringify([sessionId])
          )
        }
      }
    }
  }, [cards])

  return (
    <Card className={classNames(cls.cardsWrapper, {}, [className])}>
      <h3>{t('Карточки участников')}</h3>
      <div className={cls.cardsblock}>
        <div
          className={`${cls.onboardingBlock} session_page_onboarding_step_3 ${
            onboardingNumber !== 3 ? cls.hidden : ''
          }`}
        />
        <>
          {cards.map((card) => {
            let cardImg
            if (card?.user?.avatarUrl) {
              cardImg = createUserAvatarUrl(card.user.avatarUrl)
            }
            const isCanEdit =
              (card.created_by === userId && isActiveSession) ||
              card._id === 'mockCard'

            // TODO связать аву карточки с комментариями и участниками
            // if (card?.card_img) {
            //   cardImg = createCardImgUrl(sessionId, card.card_img)
            // }
            return (
              <SessionCard
                key={card._id}
                imgUrl={cardImg}
                canEdit={isCanEdit}
                cardName={card.title}
                onCardClick={() => onCardClick(card._id)}
                isSelected={Boolean(card?.selected_by)}
                isLoading={isLoading}
              />
            )
          })}
          {cardsPlaceholders}
        </>
      </div>
    </Card>
  )
}
