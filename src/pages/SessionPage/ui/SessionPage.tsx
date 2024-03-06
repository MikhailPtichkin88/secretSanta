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
import { getOnboardingIsOpen } from '@/entities/Onboarding/model/selectors/getOnboardingOpen'

interface SessionPageProps {
  className?: string
}

export const SessionPage = ({ className }: SessionPageProps) => {
  const { id } = useParams()

  const sessionCreatedBy = useSelector(getCurrentSessionCreatedBy)
  const sessionTotalParticipants = useSelector(getCurrentSessionTotalPart)
  const sessionStatus = useSelector(getCurrentSessionStatus)

  const userId = useSelector(getUserId)

  const participants = useSelector(getParticipantsData)
  const isLoadingParticipants = useSelector(getParticipantsIsLoading)
  const participantId = participants?.find(
    (el) => el?.user?._id === userId
  )?._id

  const cards = useSelector(getCardsData)
  const canChooseCards =
    sessionCreatedBy === userId && sessionTotalParticipants === cards?.length
  const userCardId = cards?.find((el) => el.created_by === userId)?._id

  const [cardModalId, setCardModalId] = useState('')

  const dispatch = useAppDispatch()

  //onboarding
  const isOnboardingOpen = useSelector(getOnboardingIsOpen)
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
      setCardModalId(userCardId)
    },
    [userCardId]
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
          isActiveSession={sessionStatus !== 'closed'}
          participantId={participantId}
          isLoadingParticipants={isLoadingParticipants}
        />
        <SessionParticipants
          sessionId={id}
          canEdit={sessionCreatedBy === userId && sessionStatus !== 'closed'}
        />
      </Flex>
      <div className={cls.cardsControllBlock}>
        <CardsBlock
          sessionId={id}
          isActiveSession={sessionStatus !== 'closed'}
          userId={userId}
          onCardClick={onOpenCardModal}
        />
        <SessionControlls
          sessionId={id}
          sessionStatus={sessionStatus}
          canChooseCards={canChooseCards}
          cardId={userCardId}
          isCreator={sessionCreatedBy === userId}
          isParticipant={Boolean(participantId)}
          isLoadingParticipants={isLoadingParticipants}
          onOpenCardModal={onOpenCardModal}
          onAddParticipant={onAddParticipant}
        />
      </div>
      <SessionComments
        className="session_page_onboarding_step_6"
        sessionId={id}
        userId={userId}
        isActiveSession={sessionStatus !== 'closed'}
      />
      <CardEditForm
        onClose={onCloseCardModal}
        isOpen={Boolean(cardModalId)}
        sessionId={id}
        cardId={cardModalId}
        canEdit={cardModalId === userCardId}
        isSelected={Boolean(
          cards?.find((card) => card._id === cardModalId)?.selected_by
        )}
      />

      <Onboarding steps={sessionOnboardingSteps} />
    </div>
  )
}
