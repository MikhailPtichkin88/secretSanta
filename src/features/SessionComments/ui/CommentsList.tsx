import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './SessionComments.module.scss'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getCommentsData } from '../model/selectors/getCommentsData'
import { Comment } from '@/shared/ui/Comment'
import { useCallback } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { updateComment } from '../model/services/updateComment'
import { getCommentIsLoading } from '../model/selectors/getCommentIsLoading'

interface CommentsListProps {
  className?: string
  userId?: string
}

export const CommentsList = ({ className, userId }: CommentsListProps) => {
  const { t } = useTranslation('session')
  const comments = useSelector(getCommentsData)
  const isLoading = useSelector(getCommentIsLoading)
  const dispatch = useAppDispatch()
  const onChangeComment = useCallback(
    (commentId: string, text: string) => {
      return dispatch(updateComment({ commentId, text }))
    },
    [dispatch]
  )

  return (
    <div className={classNames(cls.commentslist, {}, [className])}>
      {comments?.map(({ _id, text, createdAt, updatedAt, user }) => (
        <Comment
          isLoading={isLoading}
          key={_id}
          commentId={_id}
          updatedAt={updatedAt}
          canEdit={userId === user?._id}
          text={text}
          createdAt={createdAt}
          avatarImg={user?.avatarUrl}
          userName={user?.fullName}
          onChangeComment={onChangeComment}
        />
      ))}
      {!comments?.length && (
        <span className={cls.placeholder}>
          {t('Здесь пока нет комментариев')}
        </span>
      )}
    </div>
  )
}
