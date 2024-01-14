import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ProfileAvatar.module.scss'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserAvatar } from '@/entities/User'
import avatarPlaceholder from '@/shared/assets/img/profile_avatar.png'
import EditImgIcon from '@/shared/assets/icons/edit_img.svg'

interface ProfileAvatarProps {
  className?: string
}

export const ProfileAvatar = ({ className }: ProfileAvatarProps) => {
  const { t } = useTranslation('profile')
  const userImg = useSelector(getUserAvatar)

  const [userAvatar, setUserAvatar] = useState(
    `${__API__}/uploads/avatars/${userImg}`
  )

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
        console.log(formData.get('avatar'))
        console.log(event.target.files)
        // Отправка formData на сервер
      } else {
        alert(
          'Please upload a file smaller than 500 KB and of type JPEG, PNG, or JPG'
        )
      }
    }
  }

  return (
    <div className={classNames(cls.profileavatar, {}, [className])}>
      <img
        className={cls.avatar}
        src={userAvatar}
        alt="user's photo"
        onError={() => setUserAvatar(avatarPlaceholder)}
      />

      <label htmlFor="avatar" className={cls.customButton}>
        <EditImgIcon width={30} height={30} />
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/jpeg, image/png, image/jpg"
          className={cls.input}
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}
