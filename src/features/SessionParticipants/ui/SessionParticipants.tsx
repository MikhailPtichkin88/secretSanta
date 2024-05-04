import { getCurrentSessionTotalPart } from '@/features/SessionForm'
import { updateCurrentSession } from '@/features/SessionForm/model/services/updateCurrentSession'
import CancelIcon from '@/shared/assets/icons/close-square.svg'
import EditIcon from '@/shared/assets/icons/edit.svg'
import OkIcon from '@/shared/assets/icons/tick-square.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getParticipantsData } from '../model/selectors/getParticipantsData'
import { getSessionParticipants } from '../model/services/getSessionParticipants'
import cls from './SessionParticipants.module.scss'
import placeholer from '@/shared/assets/img/profile_avatar.png'
import { Skeleton } from '@/shared/ui/Skeleton'
import { getParticipantsIsLoading } from '../model/selectors/getParticipantsIsLoading'

interface SessionParticipantsProps {
  sessionId: string
  className?: string
  canEdit: boolean
}

export const SessionParticipants = ({
  sessionId,
  className,
  canEdit,
}: SessionParticipantsProps) => {
  const { t } = useTranslation('session')
  const participants = useSelector(getParticipantsData)
  const totalParticipants = useSelector(getCurrentSessionTotalPart)
  const isLoading = useSelector(getParticipantsIsLoading)
  const [editMode, setEditMode] = useState(false)
  const [participantsNumber, setParticipantsNumber] = useState(0)
  const dispatch = useAppDispatch()

  const onChangeNumber = (value: string) => {
    if (!Number.isNaN(Number(value))) {
      setParticipantsNumber(Number(value))
    }
  }

  const onChangeParticipants = async () => {
    if (
      Number(participantsNumber) > participants?.length &&
      Number(participantsNumber) < 25
    ) {
      const formData = new FormData()
      formData.append('total_participants', String(participantsNumber))
      await dispatch(updateCurrentSession({ sessionId, data: formData }))
      setEditMode(false)
    } else {
      setParticipantsNumber(totalParticipants)
      setEditMode(false)
    }
  }

  useEffect(() => {
    dispatch(getSessionParticipants(sessionId))
  }, [sessionId])

  useEffect(() => {
    if (totalParticipants) {
      setParticipantsNumber(totalParticipants)
    }
  }, [totalParticipants])

  return (
    <Card className={classNames(cls.sessionparticipants, {}, [className])}>
      <h3 className={cls.title}>{t('Участники')}</h3>
      <div className={cls.totalParticipantsWrapper}>
        <p>{t('Общее количество участников')}</p>
        {editMode ? (
          <Input
            size="size_s"
            className={cls.editInput}
            autoFocus
            onPressEnter={onChangeParticipants}
            value={participantsNumber}
            onChange={onChangeNumber}
          />
        ) : (
          <p className={cls.number}>{totalParticipants}</p>
        )}
        {editMode ? (
          <div className={cls.editParticipantsBlock}>
            <CancelIcon
              className={cls.cancelIcon}
              onClick={() => {
                setParticipantsNumber(totalParticipants)
                setEditMode(false)
              }}
            />
            <OkIcon className={cls.okIcon} onClick={onChangeParticipants} />
          </div>
        ) : (
          <EditIcon
            className={`${canEdit ? cls.visible : ''} ${cls.editIcon}`}
            onClick={() => setEditMode(true)}
          />
        )}
      </div>
      {isLoading ? (
        <div className={cls.participantWrapper}>
          <Skeleton width={'30px'} height={30} border={'50%'} />
          <Skeleton width={'90%'} height={30} />
        </div>
      ) : (
        <>
          {participants.map((part) => {
            const statusClass = part?.has_picked_own_card ? cls.green : cls.grey
            return (
              <div key={part?._id} className={cls.participantWrapper}>
                <div className={`${statusClass} ${cls.status}`} />
                <img
                  src={`${__API__}/uploads/avatars/${part?.user?.avatarUrl}`}
                  alt="participant avatar"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src = placeholer)
                  }
                />
                <div className={cls.fullName}>
                  {part?.user?.fullName ?? 'Новый участник'}
                </div>
              </div>
            )
          })}
        </>
      )}
    </Card>
  )
}
