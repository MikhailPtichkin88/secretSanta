import EditIcon from '@/shared/assets/icons/edit.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Textarea } from '@/shared/ui/Textarea'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './CardFormFields.module.scss'
import { Skeleton } from '@/shared/ui/Skeleton'

interface CardFormFieldsProps {
  title: string
  info: string
  canEdit: boolean
  isLoading?: boolean
  className?: string
  onUpdateData?: (data: FormData) => Promise<unknown>
  onCloseModal?: () => void
}

export const CardFormFields = ({
  className,
  title,
  info,
  canEdit,
  isLoading,
  onUpdateData,
}: CardFormFieldsProps) => {
  const [cardTitle, setCardTitle] = useState('')
  const [cardInfo, setCardInfo] = useState('')

  const [isEditMode, setIsEditMode] = useState(false)

  const { t } = useTranslation('session')

  const resetProfileData = () => {
    setCardTitle(title)
    setCardInfo(info)
    setIsEditMode(false)
  }

  const updateProfileData = () => {
    if (!cardTitle) {
      return
    }
    const formData = new FormData()
    formData.append('title', cardTitle)
    formData.append('card_info', cardInfo)
    onUpdateData(formData).then(() => setIsEditMode(false))
  }

  useEffect(() => {
    if (title) {
      setCardTitle(title)
    }

    setCardInfo(info ?? '')
  }, [title, info])

  useEffect(() => {
    if (!canEdit) {
      setIsEditMode(false)
    }
  }, [canEdit])

  return (
    <div className={classNames(cls.cardformfields, {}, [className])}>
      <div className={cls.container}>
        <span>
          {t('Название')}
          <span className={cls.required}>*</span>
        </span>
        {isLoading ? (
          <Skeleton width={'100%'} height={40} />
        ) : (
          <Input
            autoFocus={isEditMode}
            readonly={!isEditMode}
            value={cardTitle}
            onChange={setCardTitle}
          />
        )}
      </div>
      <div className={cls.container}>
        <span>{t('Описание')}</span>
        {isLoading ? (
          <Skeleton width={'100%'} height={60} />
        ) : isEditMode ? (
          <Textarea
            readonly={!isEditMode}
            value={cardInfo}
            onChange={setCardInfo}
          />
        ) : (
          <span className={cls.cardInfo}>{cardInfo}</span>
        )}
      </div>

      <div className={cls.editBtnWrapper}>
        {isEditMode ? (
          <>
            <Button
              theme="danger"
              className={cls.cancelBtn}
              onClick={resetProfileData}
            >
              {t('Отменить')}
            </Button>

            <Button
              className={cls.saveBtn}
              onClick={updateProfileData}
              disabled={isLoading || !cardTitle}
            >
              {t('Сохранить')}
            </Button>
          </>
        ) : (
          <Button
            theme="secondary"
            className={`${canEdit ? cls.visible : ''} ${cls.editBtn}`}
            onClick={() => setIsEditMode(true)}
          >
            <EditIcon />
            <span>{t('Редактировать')}</span>
          </Button>
        )}
      </div>
    </div>
  )
}
