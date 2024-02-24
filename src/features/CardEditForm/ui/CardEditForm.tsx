import { CardFormFields } from '@/entities/CardFormFields'
import { CardImg } from '@/entities/CardImg'
import { deleteCard } from '@/features/CardsBlock'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Modal } from '@/shared/ui/Modal'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCardImg } from '../model/selectors/getCardImg'
import { getCardInfo } from '../model/selectors/getCardInfo'
import { getCardIsLoading } from '../model/selectors/getCardIsLoading'
import { getCardTitle } from '../model/selectors/getCardTitle'
import { getCardTh } from '../model/services/getCardTh'
import { updateCardTh } from '../model/services/updateCardTh'
import cls from './CardEditForm.module.scss'
import CloseIcon from '@/shared/assets/icons/close-square.svg'
import { getCardUserAvatar } from '../model/selectors/getCardUserAvatar'
import emojiImg from '@/shared/assets/img/partying-face.png'
import fireworks from '@/shared/assets/img/fireworks.png'
import { useTranslation } from 'react-i18next'

interface CardEditFormProps {
  className?: string
  isOpen: boolean
  isSelected?: boolean
  canEdit?: boolean
  sessionId: string
  cardId: string
  onClose: () => void
}

export const CardEditForm = ({
  className,
  isOpen,
  sessionId,
  isSelected,
  canEdit,
  cardId,
  onClose,
}: CardEditFormProps) => {
  const dispatch = useAppDispatch()

  const { t } = useTranslation()
  const title = useSelector(getCardTitle)
  const cardImg = useSelector(getCardImg)
  const info = useSelector(getCardInfo)
  const cardUserAvatar = useSelector(getCardUserAvatar)
  const isLoading = useSelector(getCardIsLoading)

  const deleteImgHandler = useCallback(() => {
    dispatch(deleteCard({ sessionId, cardId, deleteImg: true }))
  }, [dispatch, sessionId, cardId])

  const updateCardImg = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
          formData.append('card_img', file)
          dispatch(updateCardTh({ sessionId, cardId, data: formData }))
        } else {
          alert(
            'Please upload a file smaller than 500 KB and of type JPEG, PNG, or JPG'
          )
        }
      }
    },
    [dispatch, cardId, sessionId]
  )

  const onUpdateHandler = useCallback(
    (data: FormData) => {
      return dispatch(updateCardTh({ sessionId, cardId, data }))
    },
    [dispatch, cardId, sessionId]
  )

  useEffect(() => {
    if (cardId) {
      dispatch(getCardTh(cardId))
    }
  }, [cardId])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName={classNames(cls.cardeditform, {}, [className])}
      lazy
    >
      {isSelected && (
        <div
          className={cls.isSelectedBlock}
          style={{ backgroundImage: `url(${fireworks})` }}
        >
          <img src={emojiImg} alt="santa img" className={cls.santaImg} />
          <p className={cls.isSelectedTitle}>{t('Вы - тайный санта для:')}</p>
        </div>
      )}
      <CloseIcon className={cls.closeIcon} onClick={onClose} />
      <CardImg
        sessionId={sessionId}
        canEdit={canEdit}
        cardImg={cardImg}
        cardUserAvatar={cardUserAvatar}
        isLoading={isLoading}
        onDeleteImg={deleteImgHandler}
        onChangeImg={updateCardImg}
      />

      <CardFormFields
        canEdit={canEdit}
        title={title}
        info={info}
        isLoading={isLoading}
        onUpdateData={onUpdateHandler}
      />
    </Modal>
  )
}
