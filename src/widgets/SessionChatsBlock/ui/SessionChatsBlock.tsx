import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './SessionChatsBlock.module.scss'
import { Flex } from '@/shared/ui/Flex'
import {
  SendMessageFromSanta,
  messagesFromSantaActions,
  subscribe,
} from '@/features/SendMessageFromSanta'
import { ICard } from '@/features/CardsBlock'
import {
  SendMessageToSanta,
  messagesToSantaActions,
} from '@/features/SendMessageToSanta'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'
import { getIsHaveToSantaMessages } from '@/features/SendMessageToSanta/model/selectors/getIsHaveMessages'
import { useSelector } from 'react-redux'

interface SessionChatsProps {
  className?: string
  sessionId: string
  userCard?: ICard
  selectedCard?: ICard
}

export const SessionChatsBlock = ({
  className,
  sessionId,
  userCard,
  selectedCard,
}: SessionChatsProps) => {
  const dispatch = useAppDispatch()
  const cardId = userCard?._id
  const isPageOpenRef = useRef(true)

  // показываем чат с Сантой, когда есть хотя бы одно сообщение от Санты
  const isHaveToSantaMessages = useSelector(getIsHaveToSantaMessages)

  const subscribeHandler = async () => {
    if (!isPageOpenRef.current) return
    try {
      await dispatch(subscribe({ sessionId, cardId }))
      await subscribeHandler()
    } catch (error) {
      alertMessage({
        type: 'error',
        message: 'Ошибка подключения к чату, перезагрузите страницу',
      })
    }
  }

  useEffect(() => {
    if (sessionId && cardId && isPageOpenRef.current) {
      subscribeHandler()
    }
  }, [sessionId, cardId, isPageOpenRef.current])

  useEffect(() => {
    isPageOpenRef.current = true

    return () => {
      isPageOpenRef.current = false
      dispatch(messagesFromSantaActions.reset())
      dispatch(messagesToSantaActions.reset())
    }
  }, [])

  return (
    <Flex gap="16" className={classNames(cls.sessionchats, {}, [className])}>
      {/* Чат с тем, кому ты даришь подарок (для кого ты Тайный Санта)*/}
      <SendMessageFromSanta
        className={`${!isHaveToSantaMessages ? cls.oneLine : ''}`}
        sessionId={sessionId}
        userCard={userCard}
        selectedCard={selectedCard}
      />
      {/* Чат с тем, кто дарит подарок тебе (с твоим Тайным Сантой*/}
      <SendMessageToSanta
        sessionId={sessionId}
        cardId={cardId}
        userName={userCard?.user?.fullName}
        userAvatar={userCard?.user?.avatarUrl}
      />
    </Flex>
  )
}
