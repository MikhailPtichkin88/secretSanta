import {
  deleteUserAvatar,
  getUserData,
  updateUser,
  getUserIsLoading,
} from '@/entities/User'
import DeleteImgIcon from '@/shared/assets/icons/delete_img.svg'
import EditImgIcon from '@/shared/assets/icons/edit_img.svg'
import avatarPlaceholder from '@/shared/assets/img/profile_avatar.png'
import { classNames } from '@/shared/lib/classNames/classNames'
import { IconBtn } from '@/shared/ui/IconBtn'
import { Tooltip } from '@/shared/ui/Tooltip'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import cls from './ProfileAvatar.module.scss'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Loader } from '@/shared/ui/PageLoader/Loader'

interface ProfileAvatarProps {
  className?: string
}

export const ProfileAvatar = ({ className }: ProfileAvatarProps) => {
  const { t } = useTranslation('profile')
  const isLoading = useSelector(getUserIsLoading)

  const dispatch = useAppDispatch()
  const { avatarUrl } = useSelector(getUserData)

  const [userAvatar, setUserAvatar] = useState(
    `${__API__}/uploads/avatars/${avatarUrl}`
  )

  const deleteUserAvatarHandler = () => {
    if (!isLoading) {
      dispatch(deleteUserAvatar())
    }
  }

  useEffect(() => {
    if (!avatarUrl) {
      setUserAvatar(avatarPlaceholder)
    } else {
      setUserAvatar(`${__API__}/uploads/avatars/${avatarUrl}`)
    }
  }, [avatarUrl])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    if (file) {
      // Проверка размера файла (менее 500 KB) и типа изображения
      if (
        file.size <= 500 * 1024 &&
        (file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/jpg')
      ) {
        const formData = new FormData()
        formData.append('avatar', file)
        dispatch(updateUser(formData))
      } else {
        alert(
          'Please upload a file smaller than 500 KB and of type JPEG, PNG, or JPG'
        )
      }
    }
  }

  return (
    <div className={classNames(cls.profileavatar, {}, [className])}>
      {isLoading ? (
        <div className={cls.loaderBlock}>
          <Loader />
        </div>
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
