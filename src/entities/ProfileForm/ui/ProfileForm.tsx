import { getUserData, updateUser, getUserIsLoading } from '@/entities/User'
import EditIcon from '@/shared/assets/icons/edit.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { validateFields } from '../lib/validateFields'
import { getProfileAge } from '../model/selectors/getProfileAge'
import { getProfileCity } from '../model/selectors/getProfileCity'
import { getProfileEmail } from '../model/selectors/getProfileEmail'
import { getProfileName } from '../model/selectors/getProfileName'
import { profileActions } from '../model/slice/profileSlice'
import cls from './ProfileForm.module.scss'
import { Loader } from '@/shared/ui/PageLoader/Loader'
import { Skeleton } from '@/shared/ui/Skeleton'

interface ProfileFormProps {
  className?: string
}

export const ProfileForm = ({ className }: ProfileFormProps) => {
  const userData = useSelector(getUserData)
  const fullName = useSelector(getProfileName)
  const email = useSelector(getProfileEmail)
  const city = useSelector(getProfileCity)
  const age = useSelector(getProfileAge)
  const isLoading = useSelector(getUserIsLoading)

  const [errors, setErrors] = useState([])
  const [isEditMode, setIsEditMode] = useState(false)

  const { t } = useTranslation('profile')

  const dispatch = useAppDispatch()

  const resetProfileData = () => {
    dispatch(profileActions.setProfileData(userData))
    setErrors([])
    setIsEditMode(false)
  }

  const updateProfileData = async () => {
    setErrors([])
    const errors = validateFields({ fullName, email })
    setErrors(errors)

    if (!errors.length) {
      const formData = new FormData()
      formData.append('fullName', fullName)
      formData.append('email', email)
      formData.append('age', String(age))
      formData.append('city', city)

      await dispatch(updateUser(formData))
    }
    setIsEditMode(false)
  }

  return (
    <div className={classNames(cls.profileform, {}, [className])}>
      <div className={cls.container}>
        <label htmlFor="name">{t('Имя')}</label>
        {isLoading ? (
          <Skeleton width={'100%'} height={40} />
        ) : (
          <Input
            id="name"
            autoFocus={isEditMode}
            readonly={!isEditMode}
            value={fullName}
            errorMessage={errors.includes('fullName') && t('Невалидные данные')}
            onChange={(value) => dispatch(profileActions.setProfileName(value))}
          />
        )}
      </div>
      <div className={cls.container}>
        <label htmlFor="email">{t('Почта')}</label>
        {isLoading ? (
          <Skeleton width={'100%'} height={40} />
        ) : (
          <Input
            id="email"
            readonly={!isEditMode}
            value={email}
            errorMessage={errors.includes('email') && t('Невалидные данные')}
            onChange={(value) =>
              dispatch(profileActions.setProfileEmail(value))
            }
          />
        )}
      </div>
      <div className={cls.container}>
        <label htmlFor="age">{t('Возраст')}</label>
        {isLoading ? (
          <Skeleton width={'100%'} height={40} />
        ) : (
          <Input
            readonly={!isEditMode}
            id="age"
            value={age}
            errorMessage={errors.includes('age') && t('Невалидные данные')}
            onChange={(value) => dispatch(profileActions.setProfileAge(value))}
          />
        )}
      </div>
      <div className={cls.container}>
        <label htmlFor="city">{t('Город')}</label>
        {isLoading ? (
          <Skeleton width={'100%'} height={40} />
        ) : (
          <Input
            id="city"
            readonly={!isEditMode}
            value={city}
            errorMessage={errors.includes('city') && t('Невалидные данные')}
            onChange={(value) => dispatch(profileActions.setProfileCity(value))}
          />
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
