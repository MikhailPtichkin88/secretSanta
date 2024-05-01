import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './MessagesList.module.scss'
import { useTranslation } from 'react-i18next'
import { Comment } from '@/shared/ui/Comment'
interface IMessage {
  id: string
  text: string
  createdAt: string
  updatedAt: string
  canEdit: boolean
  avatar: string
  userName: string
  onChangeHandler: (id: string, text: string) => Promise<unknown>
}

interface MessagesListProps {
  className?: string
  messages: IMessage[]
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
          createdAt,
          updatedAt,
          canEdit,
          avatar,
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
            createdAt={createdAt}
            avatarImg={avatar}
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
