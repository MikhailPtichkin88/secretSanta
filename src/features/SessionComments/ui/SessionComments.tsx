import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './SessionComments.module.scss'
import { useTranslation } from 'react-i18next'
import { Card } from '@/shared/ui/Card'
import { Textarea } from '@/shared/ui/Textarea'
import { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { CommentsList } from './CommentsList'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { getCommentIsLoading } from '../model/selectors/getCommentIsLoading'
import { createComment } from '../model/services/createComment'
import { getComments } from '../model/services/getComments'

interface SessionChatProps {
  sessionId: string
  className?: string
  userId?: string
  isActiveSession: boolean
}

export const SessionComments = ({
  className,
  sessionId,
  isActiveSession,
  userId,
}: SessionChatProps) => {
  const { t } = useTranslation('session')
  const [commentText, setCommentText] = useState('')
  const isLoading = useSelector(getCommentIsLoading)
  const dispatch = useAppDispatch()

  const createCommentHandler = async () => {
    await dispatch(createComment({ sessionId, text: commentText }))
    setCommentText('')
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

      {isActiveSession && (
        <Card className={cls.leaveComment}>
          <h3>{t('Оставить комментарий')}</h3>
          <Textarea
            placeholder={t('Введите текст комментария')}
            className={cls.textarea}
            value={commentText}
            onChange={setCommentText}
          />
          <Button
            onClick={createCommentHandler}
            disabled={!commentText}
            theme="secondary"
            loading={isLoading}
          >
            {t('Отправить')}
          </Button>
        </Card>
      )}
    </div>
  )
}
