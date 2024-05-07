import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './MessagesList.module.scss'
import { useTranslation } from 'react-i18next'
import { Comment } from '@/shared/ui/Comment'
import { IMessageOption } from '@/features/SendMessageFromSanta/model/types/messagesFromSantaSchema'

interface MessagesListProps {
  className?: string
  messages: IMessageOption[]
  isLoading?: boolean
}

export const MessagesList = ({
  className,
  messages,
  isLoading = false,
}: MessagesListProps) => {
  const { t } = useTranslation('session')

  return (
    <div className={classNames(cls.messageslist, {}, [className])}>
      {messages?.map(
        ({
          id,
          text,
          updatedAt,
          canEdit,
          avatar,
          placeholderAvatar,
          userName,
          onChangeHandler,
        }) => (
          <Comment
            isLoading={isLoading}
            key={id}
            commentId={id}
            updatedAt={updatedAt}
            canEdit={canEdit}
            text={text}
            createdAt={updatedAt}
            avatarImg={avatar}
            placeholderAvatar={placeholderAvatar}
            userName={userName}
            onChangeComment={onChangeHandler}
          />
        )
      )}
      {!messages?.length && (
        <span className={cls.placeholder}>{t('Здесь пока нет сообщений')}</span>
      )}
    </div>
  )
}
