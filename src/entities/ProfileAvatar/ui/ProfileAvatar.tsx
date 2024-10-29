import {
  deleteUserAvatar,
  getUserData,
  getUserIsLoading,
  updateUser,
} from '@/entities/User'
import DeleteImgIcon from '@/shared/assets/icons/delete_img.svg'
import EditImgIcon from '@/shared/assets/icons/edit_img.svg'
import avatarPlaceholder from '@/shared/assets/img/profile_avatar.png'
import { classNames } from '@/shared/lib/classNames/classNames'
import { createUserAvatarUrl } from '@/shared/lib/createImgUrl/createImgUrl'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { IconBtn } from '@/shared/ui/IconBtn'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Tooltip } from '@/shared/ui/Tooltip'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import cls from './ProfileAvatar.module.scss'
import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'

interface ProfileAvatarProps {
  className?: string
}

export const ProfileAvatar = ({ className }: ProfileAvatarProps) => {
  const { t } = useTranslation('profile')
  const isLoading = useSelector(getUserIsLoading)

  const dispatch = useAppDispatch()
  const { avatarUrl } = useSelector(getUserData)

  const [userAvatar, setUserAvatar] = useState(``)

  const deleteUserAvatarHandler = () => {
    if (!isLoading) {
      dispatch(deleteUserAvatar())
    }
  }

  useEffect(() => {
    if (!avatarUrl) {
      setUserAvatar(avatarPlaceholder)
    } else {
      setUserAvatar(createUserAvatarUrl(avatarUrl))
    }
  }, [avatarUrl])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    const MAX_SIZE = 3 * 1024 * 1024
    if (file) {
      if (file.size <= MAX_SIZE) {
        const formData = new FormData()
        formData.append('avatar', file)
        dispatch(updateUser(formData))
      } else {
        alertMessage({
          type: 'error',
          message:
            'Please upload a file smaller than 3 MB and of type JPEG, PNG, or JPG',
        })
      }
    }
  }

  return (
    <div
      className={classNames(cls.profileavatar, {}, [
        className,
        'profile_page_onboarding_step_3',
      ])}
    >
      {isLoading ? (
        <Skeleton width={250} height={250} />
      ) : (
        <img
          className={cls.avatar}
          src={userAvatar}
          alt="user's photo"
          loading="lazy"
        />
      )}
      <div className={cls.iconsWrapper}>
        {avatarUrl && (
          <Tooltip title={t('Удалить фото')}>
            <IconBtn ghost onClick={deleteUserAvatarHandler}>
              <DeleteImgIcon
                className={cls.deleteIcon}
                width={30}
                height={30}
              />
            </IconBtn>
          </Tooltip>
        )}

        <Tooltip title={avatarUrl ? t('Поменять фото') : t('Загрузить фото')}>
          <label htmlFor="avatar" className={cls.customButton}>
            <EditImgIcon className={cls.editIcon} width={30} height={30} />
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/jpeg, image/png, image/jpg"
              className={cls.input}
              onChange={handleFileChange}
            />
          </label>
        </Tooltip>
      </div>
    </div>
  )
}
