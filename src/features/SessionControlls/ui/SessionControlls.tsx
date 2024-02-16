import {
  createCard,
  deleteCard,
  getCardsIsLoading,
} from '@/features/CardsBlock'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { ConfirmBlock } from '@/shared/ui/ConfirmBlock'
import { Flex } from '@/shared/ui/Flex'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import cls from './SessionControlls.module.scss'

interface SessionControllsProps {
  sessionId: string
  className?: string
  isParticipant: boolean
  cardId: string
  isLoadingParticipants: boolean
  onAddParticipant: () => void
  onOpenCardModal: () => void
}

export const SessionControlls = ({
  sessionId,
  className,
  isParticipant,
  cardId,
  isLoadingParticipants,
  onAddParticipant,
  onOpenCardModal,
}: SessionControllsProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const isCardsLoading = useSelector(getCardsIsLoading)
  const [isShowConfirmBlock, setIsShowConfirmBlock] = useState(false)

  const onCreateCard = () => {
    dispatch(createCard(sessionId))
  }
  const onCancelConfirm = () => {
    setIsShowConfirmBlock(false)
  }
  const onConfirmHandler = async () => {
    await dispatch(deleteCard({ sessionId, cardId }))
    setIsShowConfirmBlock(false)
  }

  return (
    <Card className={classNames(cls.sessioncontrolls, {}, [className])}>
      <h3>{t('Управление')}</h3>
      <div className={cls.buttonBlock}>
        {/* 1 шаг - становимся участником */}
        {!isParticipant && !cardId && (
          <Button
            onClick={onAddParticipant}
            outlined
            loading={isLoadingParticipants}
          >
            {t('Участвовать')}
          </Button>
        )}
        {/* 2 шаг - создаем карточку */}
        {isParticipant && !cardId && (
          <Button onClick={onCreateCard} outlined>
            {t('Создать карточку')}
          </Button>
        )}
        {/* 2 шаг - редактируем или удаляем карточку */}
        {isParticipant && cardId && (
          <Flex direction="column" gap={'16'}>
            <Button outlined onClick={onOpenCardModal}>
              {t('Редактировать карточку')}
            </Button>
            {isShowConfirmBlock ? (
              <ConfirmBlock
                onOkHandler={onConfirmHandler}
                label="Вы уверены?"
                isShow={isShowConfirmBlock}
                onCancel={onCancelConfirm}
                isLoading={isCardsLoading}
              />
            ) : (
              <Button
                theme="danger"
                outlined
                onClick={() => setIsShowConfirmBlock(true)}
              >
                {t('Удалить карточку')}
              </Button>
            )}
          </Flex>
        )}
      </div>
    </Card>
  )
}
