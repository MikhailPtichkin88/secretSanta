import { MessagesList } from '@/entities/MessagesList'
import { SendMessageBlock } from '@/entities/SendMessageBlock'
import { IMessageOption } from '@/features/SendMessageFromSanta'
import coolSanta from '@/shared/assets/img/cool-santa.png'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Card } from '@/shared/ui/Card'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getMessagesIsLoading } from '../model/selectors/getMessagesIsLoading'
import { getMessagesToSanta } from '../model/selectors/getMessagesToSanta'
import { createMessage } from '../model/services/createMessage'
import { editMessage } from '../model/services/editMessage'
import { getMessages } from '../model/services/getMessages'
import cls from './SendMessageToSanta.module.scss'

interface SendMessageToSantaProps {
  className?: string
  userAvatar?: string
  userName?: string
  sessionId?: string
  cardId?: string
}

export const SendMessageToSanta = ({
  className,
  userAvatar,
  userName: name,
  sessionId,
  cardId,
}: SendMessageToSantaProps) => {
  const { t } = useTranslation('session')
  const messages = useSelector(getMessagesToSanta)
  const isLoading = useSelector(getMessagesIsLoading)
  const dispatch = useAppDispatch()

  const messagesOptions = useMemo(() => {
    let options: IMessageOption[] = []
    if (cardId && name && userAvatar && messages?.length) {
      const onEditHandler = (id: string, text: string) => {
        return dispatch(editMessage({ sessionId, messageId: id, text }))
      }
      options = messages.map(
        ({ _id, text, createdAt, updatedAt, card_from }) => {
          const isUserMessage = card_from === cardId
          const avatar = isUserMessage ? userAvatar : ''
          const userName = isUserMessage ? name : 'Тайный Санта'
          return {
            id: _id,
            text,
            createdAt,
            updatedAt,
            canEdit: isUserMessage,
            avatar,
            placeholderAvatar: coolSanta,
            userName,
            onChangeHandler: onEditHandler,
          }
        }
      )
    }
    return options
  }, [messages, cardId, sessionId])

  const onSendMessage = async (text: string) => {
    return dispatch(createMessage({ sessionId, text }))
  }

  useEffect(() => {
    if (sessionId) {
      dispatch(getMessages(sessionId))
    }
  }, [sessionId])

  return (
    <Card className={classNames(cls.sendmessagetosanta, {}, [className])}>
      <h3>{t('Чат с тем, кто дарит подарок тебе')}</h3>
      <div className={cls.wrapper}>
        <MessagesList messages={messagesOptions} isLoading={false} />
        <div className={cls.messageBlock}>
          <SendMessageBlock onSend={onSendMessage} disabled={isLoading} />
        </div>
      </div>
    </Card>
  )
}
