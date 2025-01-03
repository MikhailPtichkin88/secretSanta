import { SessionFormFields } from '@/entities/SessionFormFields'
import { SessionImg } from '@/entities/SessionImg/ui/SessionImg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Card } from '@/shared/ui/Card'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getCurrentSessionImg } from '../model/selectors/getCurrentSessionImg'
import { getCurrentSessionInfo } from '../model/selectors/getCurrentSessionInfo'
import { getCurrentSessionIsLoading } from '../model/selectors/getCurrentSessionIsLoading'
import { getCurrentSessionTitle } from '../model/selectors/getCurrentSessionTitle'
import { deleteSessionImg } from '../model/services/deleteSessionImg'
import { getProfileSession } from '../model/services/getCurrentSession'
import { updateCurrentSession } from '../model/services/updateCurrentSession'
import cls from './SessionForm.module.scss'
import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'

interface SessionCardProps {
  sessionId: string
  className?: string
  isCreator: boolean
  isActiveSession: boolean
  participantId: string
  isLoadingParticipants: boolean
}

export const SessionForm = ({
  sessionId,
  className,
  isCreator,
  isActiveSession,
  participantId,
  isLoadingParticipants,
}: SessionCardProps) => {
  const sessionImg = useSelector(getCurrentSessionImg)
  const title = useSelector(getCurrentSessionTitle)
  const info = useSelector(getCurrentSessionInfo)

  const isLoading = useSelector(getCurrentSessionIsLoading)

  const dispatch = useAppDispatch()

  const deleteImgHandler = useCallback(() => {
    dispatch(deleteSessionImg(sessionId))
  }, [dispatch, sessionId])

  const changeSessionImg = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0]
      const MAX_SIZE = 3 * 1024 * 1024
      if (file) {
        if (file.size <= MAX_SIZE) {
          const formData = new FormData()
          formData.append('session_img', file)
          dispatch(updateCurrentSession({ sessionId, data: formData }))
        } else {
          alertMessage({
            type: 'error',
            message:
              'Please upload a file smaller than 3 MB and of type JPEG, PNG, or JPG',
          })
        }
      }
    },
    [dispatch]
  )

  const onUpdateHandler = useCallback(
    (data: FormData) => {
      return dispatch(updateCurrentSession({ sessionId, data }))
    },
    [dispatch, sessionId]
  )

  useEffect(() => {
    dispatch(getProfileSession(sessionId))
  }, [sessionId])

  return (
    <Card className={classNames(cls.sessionform, {}, [className])}>
      <SessionImg
        canEdit={isCreator && isActiveSession}
        sessionImg={sessionImg}
        isLoading={isLoading}
        onDeleteImg={deleteImgHandler}
        onChangeImg={changeSessionImg}
      />

      <SessionFormFields
        isCreator={isCreator}
        isActiveSession={isActiveSession}
        title={title}
        info={info}
        isLoading={isLoading}
        participantId={participantId}
        isLoadingParticipants={isLoadingParticipants}
        onUpdateData={onUpdateHandler}
      />
    </Card>
  )
}
