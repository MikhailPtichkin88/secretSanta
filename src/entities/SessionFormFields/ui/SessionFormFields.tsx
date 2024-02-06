import EditIcon from '@/shared/assets/icons/edit.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Loader } from '@/shared/ui/PageLoader'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { validateFields } from '../lib/validateFields'
import cls from './SessionForm.module.scss'
import { Textarea } from '@/shared/ui/Textarea'

interface SessionFormProps {
  title: string
  info: string
  isLoading?: boolean
  className?: string
  onUpdateData?: (data: FormData) => Promise<unknown>
}

export const SessionFormFields = memo(
  ({
    className,
    title,
    info,

    isLoading,
    onUpdateData,
  }: SessionFormProps) => {
    const [sessionTitle, setSessionTitle] = useState('')
    const [sessionInfo, setSessionInfo] = useState('')

    const [errors, setErrors] = useState([])
    const [isEditMode, setIsEditMode] = useState(false)

    const { t } = useTranslation('profile')

    const resetProfileData = () => {
      setSessionTitle(title)
      setSessionInfo(info)
      setSessionInfo
      setIsEditMode(false)
    }

    const updateProfileData = () => {
      setErrors([])
      const errors = validateFields({
        title: sessionTitle,
      })
      setErrors(errors)

      if (!errors.length) {
        const formData = new FormData()
        formData.append('title', sessionTitle)
        formData.append('session_info', sessionInfo)

        onUpdateData(formData).then(() => setIsEditMode(false))
      }
    }
    useEffect(() => {
      if (title) {
        setSessionTitle(title)
      }
      if (info) {
        setSessionInfo(info)
      }
    }, [title, info])

    return (
      <div className={classNames(cls.sessionform, {}, [className])}>
        <div className={cls.container}>
          <span>{t('Название')}</span>
          <Input
            autoFocus={isEditMode}
            readonly={!isEditMode}
            value={sessionTitle}
            errorMessage={errors.includes('title') && t('Невалидные данные')}
            onChange={setSessionTitle}
          />
        </div>
        <div className={cls.container}>
          <span>{t('Описание')}</span>
          <Textarea
            readonly={!isEditMode}
            value={sessionInfo}
            onChange={setSessionInfo}
          />
        </div>
        {/* <div className={cls.container}>
          <label htmlFor="total_participants">
            {t('Количество участников')}
          </label>
          <Input
            readonly={!isEditMode}
            id="total_participants"
            value={sessionTotalPart}
            errorMessage={
              errors.includes('total_participants') && t('Невалидные данные')
            }
            onChange={(value) => setSessionTotalPart(Number(value))}
          />
        </div> */}

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

              {isLoading && <Loader className={cls.loader} />}

              <Button
                className={cls.saveBtn}
                onClick={updateProfileData}
                disabled={isLoading}
              >
                {t('Сохранить')}
              </Button>
            </>
          ) : (
            <Button
              theme="secondary"
              className={cls.editBtn}
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
)
