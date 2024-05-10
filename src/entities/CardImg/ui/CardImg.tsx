import placeholder from '@/shared/assets/img/profile_avatar.png'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  createCardImgUrl,
  createUserAvatarUrl,
} from '@/shared/lib/createImgUrl/createImgUrl'
import { Loader } from '@/shared/ui/PageLoader'
import { useEffect, useState } from 'react'
import cls from './CardImg.module.scss'

interface CardImgProps {
  canEdit: boolean
  className?: string
  sessionId: string
  cardImg?: string
  cardUserAvatar?: string
  isLoading?: boolean
  onDeleteImg?: () => void
  onChangeImg?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CardImg = ({
  className,
  isLoading,
  cardImg,
  sessionId,
  cardUserAvatar,
  canEdit,
}: // onChangeImg,
// onDeleteImg,
CardImgProps) => {
  const [imgSrc, setImgSrc] = useState(null)

  useEffect(() => {
    if (cardImg) {
      return setImgSrc(createCardImgUrl(sessionId, cardImg))
    }
    if (cardUserAvatar) {
      return setImgSrc(createUserAvatarUrl(cardUserAvatar))
    }
    setImgSrc(placeholder)
  }, [cardImg, cardUserAvatar])
  return (
    <div className={classNames(cls.cardimg, {}, [className])}>
      {isLoading ? (
        <div className={cls.loaderBlock}>
          <Loader />
        </div>
      ) : (
        <img
          className={cls.avatar}
          src={imgSrc}
          alt="card's photo"
          loading="lazy"
        />
      )}
      <div className={cls.iconsWrapper}>
        {/* временно убрал функционал смены картинки карточки т.к. нужно синхронизировать с картинкой участника и комментария, сейчас все подвязаны на аватарку пользователя */}
        {/* {cardImg && canEdit && (
          <Tooltip title={t('Удалить картинку')} placement="bottom">
            <IconBtn ghost onClick={onDeleteImg}>
              <DeleteImgIcon
                className={cls.deleteIcon}
                width={30}
                height={30}
              />
            </IconBtn>
          </Tooltip>
        )} */}
        {canEdit && (
          <></>
          // <Tooltip
          //   title={cardImg ? t('Поменять картинку') : t('Загрузить картинку')}
          //   placement="bottom"
          // >
          //   <label htmlFor="card_img" className={cls.customButton}>
          //     {/* <EditImgIcon className={cls.editIcon} width={30} height={30} /> */}
          //     <input
          //       type="file"
          //       id="card_img"
          //       name="card_img"
          //       accept="image/jpeg, image/png, image/jpg"
          //       className={cls.input}
          //       onChange={onChangeImg}
          //     />
          //   </label>
          // </Tooltip>
        )}
      </div>
    </div>
  )
}
