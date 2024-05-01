import { SendMessageBlock } from '@/entities/SendMessageBlock'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Card } from '@/shared/ui/Card'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getCommentIsLoading } from '../model/selectors/getCommentIsLoading'
import { createComment } from '../model/services/createComment'
import { getComments } from '../model/services/getComments'
import { CommentsList } from './CommentsList'
import cls from './SessionComments.module.scss'

interface SessionChatProps {
  sessionId: string
  className?: string
  userId?: string
}

export const SessionComments = ({
  className,
  sessionId,
  userId,
}: SessionChatProps) => {
  const { t } = useTranslation('session')

  const isLoading = useSelector(getCommentIsLoading)
  const dispatch = useAppDispatch()

  const createCommentHandler = async (text: string) => {
    await dispatch(createComment({ sessionId, text }))
  }

  useEffect(() => {
    if (sessionId) {
      dispatch(getComments(sessionId))
    }
  }, [sessionId])

  return (
    <div className={classNames(cls.sessionCommentsBlock, {}, [className])}>
      <Card className={cls.sessionchat}>
        <h3>{t('Комментарии')}</h3>
        <CommentsList userId={userId} />
      </Card>

      <Card className={cls.leaveComment}>
        <SendMessageBlock
          title={t('Введите текст комментария')}
          onSend={createCommentHandler}
          isLoading={isLoading}
        />
      </Card>
    </div>
  )
}
