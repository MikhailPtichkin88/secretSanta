import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './SendMessageFromSanta.module.scss'
import { useTranslation } from 'react-i18next'
import { Card } from '@/shared/ui/Card'
import { MessagesList } from '@/entities/MessagesList'
import { SendMessageBlock } from '@/entities/SendMessageBlock'
import { useSelector } from 'react-redux'
import { getMessagesFromSanta } from '../model/selectors/getMessagesFromSanta'
import { useEffect } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { getMessages } from '../model/services/getMessages'
import { ICard } from '@/features/CardsBlock'

interface SendMessageFromSantaProps {
  className?: string
  sessionId?: string
  userCard?: ICard
  selectedCard?: ICard
}

export const SendMessageFromSanta = ({
  className,
  sessionId,
  userCard,
  selectedCard,
}: SendMessageFromSantaProps) => {
  const { t } = useTranslation()
  const messages = useSelector(getMessagesFromSanta)
  const dispatch = useAppDispatch()

  const cardId = userCard?._id
  const cardToId = selectedCard?._id

  const onSendMessage = async (text: string) => {}
  console.log(messages)

  useEffect(() => {
    if (!messages?.length && cardId && cardToId) {
      dispatch(getMessages({ sessionId, cardId, cardToId }))
    }
  }, [sessionId, cardId, cardToId])

  return (
    <Card className={classNames(cls.sendmessagefromsanta, {}, [className])}>
      <h3>{t('Чат с тем, кому ты даришь подарок')}</h3>
      <div className={cls.wrapper}>
        <MessagesList messages={[]} />
        <div className={cls.messageBlock}>
          <SendMessageBlock onSend={onSendMessage} />
        </div>
      </div>
    </Card>
  )
}
