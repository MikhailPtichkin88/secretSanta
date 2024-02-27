import EditIcon from '@/shared/assets/icons/edit.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Loader } from '@/shared/ui/PageLoader'
import { Textarea } from '@/shared/ui/Textarea'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { validateFields } from '../lib/validateFields'
import cls from './SessionForm.module.scss'
import ExitIcon from '@/shared/assets/icons/logout.svg'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { deleteSessionParticipants } from '@/features/SessionParticipants/model/services/removeSessionParticipants'
import { ConfirmBlock } from '@/shared/ui/ConfirmBlock'
import { spawn } from 'child_process'

interface SessionFormProps {
  title: string
  info: string
  isCreator: boolean
  isActiveSession: boolean
  isLoading?: boolean
  className?: string
  participantId: string
  isLoadingParticipants: boolean
  onUpdateData?: (data: FormData) => Promise<unknown>
}

export const SessionFormFields = memo(
  ({
    className,
    title,
    info,
    isCreator,
    isLoading,
    isActiveSession,
    participantId,
    isLoadingParticipants,
    onUpdateData,
  }: SessionFormProps) => {
    const [sessionTitle, setSessionTitle] = useState('')
    const [sessionInfo, setSessionInfo] = useState('')

    const [errors, setErrors] = useState([])
    const [isEditMode, setIsEditMode] = useState(false)
    const [isShowConfirm, setIsShowConfirm] = useState(false)

    const dispatch = useAppDispatch()

    const { t } = useTranslation('session')

    const resetProfileData = () => {
      setSessionTitle(title)
      setSessionInfo(info)
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
    const onLeaveSessionHandler = async () => {
      await dispatch(deleteSessionParticipants(participantId))
      setIsShowConfirm(false)
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
          {isEditMode ? (
            <Input
              autoFocus={isEditMode}
              readonly={!isEditMode}
              value={sessionTitle}
              errorMessage={errors.includes('title') && t('Невалидные данные')}
              onChange={setSessionTitle}
            />
          ) : (
            <p className={cls.titleBlock}>{sessionTitle}</p>
          )}
        </div>
        <div className={cls.container}>
          <span>{t('Описание')}</span>
          {isEditMode ? (
            <Textarea value={sessionInfo} onChange={setSessionInfo} />
          ) : (
            <p className={cls.infoBlock}>{sessionInfo}</p>
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
            <div className={cls.leaveEditBtnsWrapper}>
              <Button
                theme="secondary"
                className={`${
                  isCreator && isActiveSession ? cls.visible : ''
                } ${cls.editBtn}`}
                onClick={() => setIsEditMode(true)}
              >
                <EditIcon />
                <span>{t('Редактировать')}</span>
              </Button>

              {!isShowConfirm && participantId && isActiveSession && (
                <Button
                  theme="danger"
                  className={`${participantId ? cls.visible : ''} ${
                    cls.exitBtn
                  }`}
                  onClick={() => setIsShowConfirm(true)}
                >
                  <ExitIcon />
                  <span>{t('Покинуть сессию')}</span>
                </Button>
              )}

              <ConfirmBlock
                label={t('Вы уверены? Ваша карточка будет удалена')}
                isShow={isShowConfirm}
                onCancel={() => setIsShowConfirm(false)}
                onOkHandler={onLeaveSessionHandler}
                isLoading={isLoadingParticipants}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
)
