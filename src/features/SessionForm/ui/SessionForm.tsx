import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './SessionForm.module.scss'
import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProfileSession } from '../model/services/getCurrentSession'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Card } from '@/shared/ui/Card'
import { SessionImg } from '@/entities/SessionImg/ui/SessionImg'
import { useSelector } from 'react-redux'
import { getCurrentSessionImg } from '../model/selectors/getCurrentSessionImg'
import { updateCurrentSession } from '../model/services/updateCurrentSession'
import { getCurrentSessionIsLoading } from '../model/selectors/getCurrentSessionIsLoading'
import { deleteSessionImg } from '../model/services/deleteSessionImg'
import { SessionFormFields } from '@/entities/SessionFormFields'
import { getCurrentSessionInfo } from '../model/selectors/getCurrentSessionInfo'
import { getCurrentSessionTitle } from '../model/selectors/getCurrentSessionTitle'
import { getCurrentSessionTotalPart } from '../model/selectors/getCurrentSessionTotalPart'

interface SessionCardProps {
  className?: string
}

export const SessionForm = ({ className }: SessionCardProps) => {
  const sessionImg = useSelector(getCurrentSessionImg)
  const title = useSelector(getCurrentSessionTitle)
  const info = useSelector(getCurrentSessionInfo)

  const isLoading = useSelector(getCurrentSessionIsLoading)

  const { id } = useParams()

  const dispatch = useAppDispatch()

  const deleteImgHandler = useCallback(() => {
    dispatch(deleteSessionImg(id))
  }, [dispatch, id])

  const changeSessionImg = useCallback(
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
          formData.append('session_img', file)
          dispatch(updateCurrentSession({ sessionId: id, data: formData }))
        } else {
          alert(
            'Please upload a file smaller than 500 KB and of type JPEG, PNG, or JPG'
          )
        }
      }
    },
    [dispatch]
  )

  const onUpdateHandler = useCallback(
    (data: FormData) => {
      return dispatch(updateCurrentSession({ sessionId: id, data }))
    },
    [dispatch, id]
  )

  useEffect(() => {
    dispatch(getProfileSession(id))
  }, [])
  return (
    <Card className={classNames(cls.sessionform, {}, [className])}>
      <SessionImg
        sessionImg={sessionImg}
        isLoading={isLoading}
        onDeleteImg={deleteImgHandler}
        onChangeImg={changeSessionImg}
      />

      <SessionFormFields
        title={title}
        info={info}
        isLoading={isLoading}
        onUpdateData={onUpdateHandler}
      />
    </Card>
  )
}
