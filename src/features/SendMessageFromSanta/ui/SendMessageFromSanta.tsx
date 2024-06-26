import { MessagesList } from '@/entities/MessagesList'
import { SendMessageBlock } from '@/entities/SendMessageBlock'
import { ICard } from '@/features/CardsBlock'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Card } from '@/shared/ui/Card'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getMessagesFromSanta } from '../model/selectors/getMessagesFromSanta'
import { getMessagesIsLoading } from '../model/selectors/getMessagesIsLoading'
import { createMessage } from '../model/services/createMessage'
import { editMessage } from '../model/services/editMessage'
import { getMessages } from '../model/services/getMessages'
import { IMessageOption } from '../model/types/messagesFromSantaSchema'
import cls from './SendMessageFromSanta.module.scss'
import { Flex } from '@/shared/ui/Flex'
import { Popup } from '@/shared/ui/Popup'
import { SessionCard } from '@/shared/ui/SessionCard'
import AttentionSvg from '@/shared/assets/icons/attention.svg'
import { createUserAvatarUrl } from '@/shared/lib/createImgUrl/createImgUrl'

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
  const { t } = useTranslation('session')
  const messages = useSelector(getMessagesFromSanta)
  const isLoading = useSelector(getMessagesIsLoading)
  const dispatch = useAppDispatch()

  const cardId = userCard?._id
  const cardToId = selectedCard?._id

  const messagesOptions = useMemo(() => {
    let options: IMessageOption[] = []
    if (
      userCard &&
      Object.keys(userCard).length &&
      selectedCard &&
      Object.keys(selectedCard).length &&
      messages?.length
    ) {
      const onEditHandler = (id: string, text: string) => {
        return dispatch(editMessage({ sessionId, messageId: id, text }))
      }
      options = messages.map(
        ({ _id, text, createdAt, updatedAt, card_from }) => {
          const isUserMessage = card_from === userCard?._id
          const avatar = isUserMessage
            ? userCard?.user?.avatarUrl
            : selectedCard?.user?.avatarUrl
          const userName = isUserMessage
            ? userCard?.user?.fullName
            : selectedCard?.user?.fullName
          return {
            id: _id,
            text,
            createdAt,
            updatedAt,
            canEdit: isUserMessage,
            avatar,
            userName,
            onChangeHandler: onEditHandler,
          }
        }
      )
    }
    return options
  }, [messages, userCard, selectedCard])

  const onSendMessage = async (text: string) => {
    return dispatch(createMessage({ sessionId, cardId, cardToId, text }))
  }

  useEffect(() => {
    if (sessionId && cardId && cardToId) {
      dispatch(getMessages({ sessionId, cardId, cardToId }))
    }
  }, [sessionId, cardId, cardToId])

  return (
    <Card className={classNames(cls.sendmessagefromsanta, {}, [className])}>
      <Flex justify="between" align="start" max>
        <h3>{t('Чат с тем, кому ты даришь подарок')}</h3>
        <Popup
          className={cls.popup}
          trigger={<AttentionSvg className={cls.triggerIcon} />}
        >
          <Card className={cls.popupCard}>
            <Flex gap="16" direction="column">
              <p>{t('Ты даришь подарок')}</p>
              <SessionCard
                className={cls.sessionCard}
                imgUrl={createUserAvatarUrl(selectedCard?.user?.avatarUrl)}
                cardName={selectedCard?.title}
                canEdit={false}
              />
            </Flex>
          </Card>
        </Popup>
      </Flex>
      <div className={cls.wrapper}>
        <MessagesList messages={messagesOptions} isLoading={isLoading} />
        <div className={cls.messageBlock}>
          <SendMessageBlock onSend={onSendMessage} disabled={isLoading} />
        </div>
      </div>
    </Card>
  )
}
