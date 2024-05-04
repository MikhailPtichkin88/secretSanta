import EditIcon from '@/shared/assets/icons/edit.svg'
import placeholder from '@/shared/assets/img/profile_avatar.png'
import { classNames } from '@/shared/lib/classNames/classNames'
import { createUserAvatarUrl } from '@/shared/lib/createImgUrl/createImgUrl'
import { parseCommentDate } from '@/shared/lib/parseDate/parseDate'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ConfirmBlock } from '../ConfirmBlock'
import { Input } from '../Input'
import { Tooltip } from '../Tooltip'
import cls from './Comment.module.scss'

interface CommentProps {
  commentId: string
  userName: string
  avatarImg?: string
  placeholderAvatar?: string
  text: string
  createdAt: string
  className?: string
  updatedAt: string
  canEdit?: boolean
  isLoading?: boolean
  onChangeComment: (commentId: string, text: string) => Promise<unknown>
}

export const Comment = ({
  commentId,
  className,
  userName,
  avatarImg,
  text,
  createdAt,
  updatedAt,
  canEdit,
  isLoading,
  placeholderAvatar,
  onChangeComment,
}: CommentProps) => {
  const { t } = useTranslation()

  const [imgUrl, setImgUrl] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  const date =
    updatedAt === createdAt
      ? parseCommentDate(createdAt)
      : `изменено: ${parseCommentDate(updatedAt)}`

  const setEditMode = () => {
    setIsEdit(true)
    setInputValue(text)
  }

  const onChangeCommentHandler = async () => {
    if (!inputValue || inputValue === text) {
      return setIsEdit(false)
    }
    await onChangeComment(commentId, inputValue)
    setIsEdit(false)
  }

  useEffect(() => {
    if (avatarImg) {
      setImgUrl(createUserAvatarUrl(avatarImg))
    } else if (placeholderAvatar) {
      setImgUrl(placeholderAvatar)
    } else {
      setImgUrl(placeholder)
    }
  }, [avatarImg])

  return (
    <div className={classNames(cls.comment, {}, [className])}>
      <img className={cls.avatarImg} src={imgUrl} alt="comment's avatar" />
      <div className={cls.textWrapper}>
        <p className={cls.userName}>{userName}</p>
        {isEdit ? (
          <Input autoFocus value={inputValue} onChange={setInputValue} />
        ) : (
          <p className={cls.text}>{text}</p>
        )}
      </div>
      <div className={cls.editBlock}>
        <p className={cls.createdAt}>{date ?? ''}</p>
        {canEdit && !isEdit && (
          <Tooltip title={t('Редактировать комментарий')} placement="left">
            <EditIcon className={cls.editIcon} onClick={setEditMode} />
          </Tooltip>
        )}
        <ConfirmBlock
          className={cls.confirmBlock}
          isShow={canEdit && isEdit}
          isLoading={isLoading}
          label="Изменить комментарий?"
          onOkHandler={onChangeCommentHandler}
          onCancel={() => setIsEdit(false)}
        />
      </div>
    </div>
  )
}
