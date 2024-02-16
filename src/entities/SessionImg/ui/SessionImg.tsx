import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './SessionImg.module.scss'
import { useTranslation } from 'react-i18next'
import DeleteImgIcon from '@/shared/assets/icons/delete_img.svg'
import EditImgIcon from '@/shared/assets/icons/edit_img.svg'
import { Loader } from '@/shared/ui/PageLoader'
import { Tooltip } from '@/shared/ui/Tooltip'
import { IconBtn } from '@/shared/ui/IconBtn'
import placeholder from '@/shared/assets/img/profile_avatar.png'
import { memo } from 'react'
import { createSessionImgUrl } from '@/shared/lib/createImgUrl/createImgUrl'

interface SessionImgProps {
  isCreator: boolean
  className?: string
  sessionImg?: string
  isLoading?: boolean
  onDeleteImg?: () => void
  onChangeImg?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const SessionImg = memo(
  ({
    className,
    isLoading,
    sessionImg,
    isCreator,
    onChangeImg,
    onDeleteImg,
  }: SessionImgProps) => {
    const { t } = useTranslation('profile')

    const imgSrc = sessionImg ? createSessionImgUrl(sessionImg) : placeholder

    return (
      <div className={classNames(cls.sessionimg, {}, [className])}>
        {isLoading ? (
          <div className={cls.loaderBlock}>
            <Loader />
          </div>
        ) : (
          <img
            className={cls.avatar}
            src={imgSrc}
            alt="sessions's photo"
            loading="lazy"
          />
        )}
        <div className={cls.iconsWrapper}>
          {sessionImg && isCreator && (
            <Tooltip title={t('Удалить картинку')}>
              <IconBtn ghost onClick={onDeleteImg}>
                <DeleteImgIcon
                  className={cls.deleteIcon}
                  width={30}
                  height={30}
                />
              </IconBtn>
            </Tooltip>
          )}
          {isCreator && (
            <Tooltip
              title={
                sessionImg ? t('Поменять картинку') : t('Загрузить картинку')
              }
            >
              <label htmlFor="session_img" className={cls.customButton}>
                <EditImgIcon className={cls.editIcon} width={30} height={30} />
                <input
                  type="file"
                  id="session_img"
                  name="session_img"
                  accept="image/jpeg, image/png, image/jpg"
                  className={cls.input}
                  onChange={onChangeImg}
                />
              </label>
            </Tooltip>
          )}
        </div>
      </div>
    )
  }
)
