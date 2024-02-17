import { getUserId } from '@/entities/User'
import { CardEditForm } from '@/features/CardEditForm'
import { CardsBlock } from '@/features/CardsBlock'
import { getCardsData } from '@/features/CardsBlock/model/selectors/getCardsData'
import { SessionComments } from '@/features/SessionComments'
import { SessionControlls } from '@/features/SessionControlls'
import { SessionForm, getCurrentSessionCreatedBy } from '@/features/SessionForm'
import {
  SessionParticipants,
  createSessionParticipant,
  getParticipantsData,
} from '@/features/SessionParticipants'
import { getParticipantsIsLoading } from '@/features/SessionParticipants/model/selectors/getParticipantsIsLoading'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Flex } from '@/shared/ui/Flex'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import cls from './SessionPage.module.scss'

interface SessionPageProps {
  className?: string
}

export const SessionPage = ({ className }: SessionPageProps) => {
  const { id } = useParams()

  const sessionCreatedBy = useSelector(getCurrentSessionCreatedBy)
  const userId = useSelector(getUserId)
  const participants = useSelector(getParticipantsData)
  const participantId = participants?.find(
    (el) => el?.user?._id === userId
  )?._id

  const cards = useSelector(getCardsData)

  const userCardId = cards?.find((el) => el.created_by === userId)?._id

  const isLoadingParticipants = useSelector(getParticipantsIsLoading)

  const dispatch = useAppDispatch()

  const [cardModalId, setCardModalId] = useState('')

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
          sessionId={id}
          isCreator={sessionCreatedBy === userId}
          participantId={participantId}
          isLoadingParticipants={isLoadingParticipants}
        />
        <SessionParticipants
          sessionId={id}
          isCreator={sessionCreatedBy === userId}
        />
      </Flex>
      <div className={cls.cardsControllBlock}>
        <CardsBlock
          sessionId={id}
          userId={userId}
          onCardClick={onOpenCardModal}
        />
        <SessionControlls
          sessionId={id}
          cardId={userCardId}
          isParticipant={Boolean(participantId)}
          isLoadingParticipants={isLoadingParticipants}
          onOpenCardModal={onOpenCardModal}
          onAddParticipant={onAddParticipant}
        />
      </div>
      <SessionComments sessionId={id} userId={userId} />
      <CardEditForm
        onClose={onCloseCardModal}
        isOpen={Boolean(cardModalId)}
        sessionId={id}
        cardId={cardModalId}
        canEdit={cardModalId === userCardId}
      />
    </div>
  )
}
