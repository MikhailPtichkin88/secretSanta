import { classNames } from '@/shared/lib/classNames/classNames'
import cls from '../CreateSessionModal.module.scss'
import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui/Input'
import { getCreateSessionTitle } from '../../model/selectors/getCreateSessionTitle'
import { getCreateSessionTotalPart } from '../../model/selectors/getCreateSessionTotalPart'
import { useSelector } from 'react-redux'
import { getCreateSessionInfo } from '../../model/selectors/getCreateSessionInfo'
import { getCreateSessionIsLoading } from '../../model/selectors/getCreateSessionIsLoading'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { createSessionActions } from '../../model/slice/CreateSessionSlice'
import { Button } from '@/shared/ui/Button'
import { useState } from 'react'
import { ICreateSessionData } from '../../model/types/CreateSessionSchema'
import { validateFields } from '../../model/lib/validateFields'
import { createSession } from '../../model/services/createSession'
import { Textarea } from '@/shared/ui/Textarea'

interface SessionFormProps {
  className?: string
  onClose: () => void
}

const SessionForm = ({ className, onClose }: SessionFormProps) => {
  const [errors, setErrors] = useState<Array<keyof ICreateSessionData>>([])

  const { t } = useTranslation('profile')

  const title = useSelector(getCreateSessionTitle)
  const totalParticipants = useSelector(getCreateSessionTotalPart)
  const sessionInfo = useSelector(getCreateSessionInfo)
  const isLoading = useSelector(getCreateSessionIsLoading)

  const dispatch = useAppDispatch()

  const onChangeTitleHandler = (value: string) => {
    dispatch(createSessionActions.setTitle(value))
  }

  const onChangeTotalParticipants = (value: string) => {
    if (!Number.isNaN(Number(value))) {
      dispatch(createSessionActions.setTotalParticipants(Number(value)))
    }
  }

  const onChangeSessionInfo = (value: string) => {
    dispatch(createSessionActions.setSessionInfo(value))
  }

  const onClearData = () => {
    dispatch(createSessionActions.resetFields())
    onClose()
  }

  const onSubmit = () => {
    const errors = validateFields({ title, totalParticipants })
    if (!errors.length) {
      dispatch(createSession({ title, totalParticipants, sessionInfo }))
      return onClose()
    }
    setErrors(errors)
  }

  return (
    <div className={classNames(cls.sessionform, {}, [className])}>
      <h3>{t('Новая сессия')}</h3>
      <div className={cls.fieldWrapper}>
        <label htmlFor={'sessionTitle'} className={cls.label}>
          {t('Название')}
        </label>
        <Input
          value={title}
          onChange={onChangeTitleHandler}
          autoFocus
          bordered={false}
          size="size_l"
          type="secondary"
          id={'sessionTitle'}
          className={cls.input}
          errorMessage={
            Boolean(errors.includes('title')) && t('Некорректные данные')
          }
        />
      </div>

      <div className={cls.fieldWrapper}>
        <label htmlFor={'sessionTotalParticipants'} className={cls.label}>
          {t('Кол-во участников')}
        </label>
        <Input
          value={totalParticipants}
          onChange={onChangeTotalParticipants}
          bordered={false}
          size="size_l"
          type="secondary"
          id={'sessionTotalParticipants'}
          className={cls.input}
          errorMessage={
            Boolean(errors.includes('totalParticipants')) &&
            t('Некорректные данные')
          }
        />
      </div>

      <div className={cls.fieldWrapper}>
        <label htmlFor={'sessionInfo'} className={cls.label}>
          {t('Описание')}
        </label>
        <Textarea
          minHeight={80}
          value={sessionInfo}
          onChange={onChangeSessionInfo}
          id={'sessionInfo'}
          className={cls.textarea}
        />
      </div>

      <div className={cls.buttonWrapper}>
        <Button theme="danger" outlined onClick={onClearData}>
          {t('Отменить')}
        </Button>
        <Button outlined disabled={isLoading} onClick={onSubmit}>
          {t('Создать')}
        </Button>
      </div>
    </div>
  )
}
export default SessionForm
