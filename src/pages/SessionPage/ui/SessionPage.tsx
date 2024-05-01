import Onboarding, { onboardingActions } from '@/entities/Onboarding'
import { getUserId } from '@/entities/User'
import { CardEditForm } from '@/features/CardEditForm'
import { CardsBlock } from '@/features/CardsBlock'
import { getCardsData } from '@/features/CardsBlock/model/selectors/getCardsData'
import { SessionComments } from '@/features/SessionComments'
import { SessionControlls } from '@/features/SessionControlls'
import {
  SessionForm,
  getCurrentSessionCreatedBy,
  getCurrentSessionTotalPart,
} from '@/features/SessionForm'
import { getCurrentSessionStatus } from '@/features/SessionForm/model/selectors/getCurrentSessionStatus'
import {
  SessionParticipants,
  createSessionParticipant,
  getParticipantsData,
} from '@/features/SessionParticipants'
import { getParticipantsIsLoading } from '@/features/SessionParticipants/model/selectors/getParticipantsIsLoading'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Flex } from '@/shared/ui/Flex'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { sessionOnboardingSteps } from '../lib/onboardingSteps'
import cls from './SessionPage.module.scss'
import { SendMessageFromSanta } from '@/features/SendMessageFromSanta'

interface SessionPageProps {
  className?: string
}

export const SessionPage = ({ className }: SessionPageProps) => {
  const { id } = useParams()

  const sessionCreatedBy = useSelector(getCurrentSessionCreatedBy)
  const sessionTotalParticipants = useSelector(getCurrentSessionTotalPart)
  const isActiveSession = useSelector(getCurrentSessionStatus) !== 'closed'

  const userId = useSelector(getUserId)

  const participants = useSelector(getParticipantsData)
  const isLoadingParticipants = useSelector(getParticipantsIsLoading)
  const participantId = participants?.find(
    (el) => el?.user?._id === userId
  )?._id

  const cards = useSelector(getCardsData)
  const canChooseCards =
    sessionCreatedBy === userId && sessionTotalParticipants === cards?.length
  const userCard = cards?.find((el) => el.created_by === userId)
  const selectedCard = cards?.find((el) => el.selected_by === userId)

  const [cardModalId, setCardModalId] = useState('')

  const dispatch = useAppDispatch()

  //onboarding
  const onboardingShown = localStorage.getItem('session_onboarding_shown')

  if (!onboardingShown) {
    dispatch(onboardingActions.setIsOpen(true))
    localStorage.setItem('session_onboarding_shown', 'true')
  }

  const onAddParticipant = useCallback(() => {
    dispatch(createSessionParticipant(id))
  }, [dispatch, id])

  const onCloseCardModal = useCallback(() => {
    setCardModalId('')
  }, [])

  const onOpenCardModal = useCallback(
    (cardId?: string) => {
      if (cardId && typeof cardId === 'string') {
        return setCardModalId(cardId)
      }
      setCardModalId(userCard?._id)
    },
    [userCard]
  )
  useEffect(() => {
    return () => setCardModalId('')
  }, [])

  return (
    <div className={classNames(cls.sessionpage, {}, [className])}>
      <Flex gap={'16'} className={cls.container}>
        <SessionForm
          className="session_page_onboarding_step_7"
          sessionId={id}
          isCreator={sessionCreatedBy === userId}
          isActiveSession={isActiveSession}
          participantId={participantId}
          isLoadingParticipants={isLoadingParticipants}
        />
        <SessionParticipants
          sessionId={id}
          canEdit={sessionCreatedBy === userId && isActiveSession}
        />
      </Flex>
      <div className={cls.cardsControllBlock}>
        <CardsBlock
          sessionId={id}
          userId={userId}
          onCardClick={onOpenCardModal}
        />

        {isActiveSession && (
          <SessionControlls
            sessionId={id}
            canChooseCards={canChooseCards}
            cardId={userCard?._id}
            isCreator={sessionCreatedBy === userId}
            isParticipant={Boolean(participantId)}
            isLoadingParticipants={isLoadingParticipants}
            onOpenCardModal={onOpenCardModal}
            onAddParticipant={onAddParticipant}
          />
        )}
      </div>

      {isActiveSession && (
        <SessionComments
          className="session_page_onboarding_step_6"
          sessionId={id}
          userId={userId}
        />
      )}

      {!isActiveSession && (
        <SendMessageFromSanta
          sessionId={id}
          userCard={userCard}
          selectedCard={selectedCard}
        />
      )}

      <CardEditForm
        onClose={onCloseCardModal}
        isOpen={Boolean(cardModalId)}
        sessionId={id}
        cardId={cardModalId}
        canEdit={cardModalId === userCard?._id}
        isSelected={Boolean(
          cards?.find((card) => card._id === cardModalId)?.selected_by
        )}
      />

      <Onboarding steps={sessionOnboardingSteps} />
    </div>
  )
}
