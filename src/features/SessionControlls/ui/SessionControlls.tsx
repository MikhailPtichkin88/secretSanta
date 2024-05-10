import {
  getOnboardingIsOpen,
  getOnboardingStepNumber,
} from '@/entities/Onboarding'
import {
  chooseCards,
  createCard,
  deleteCard,
  getCardsIsLoading,
} from '@/features/CardsBlock'
import {
  deleteCurrentSession,
  getCurrentSessionIsLoading,
} from '@/features/SessionForm'
import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { ConfirmBlock } from '@/shared/ui/ConfirmBlock'
import { Flex } from '@/shared/ui/Flex'
import { Modal } from '@/shared/ui/Modal'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { OnboardingBlock } from './OnboardingBlock'
import cls from './SessionControlls.module.scss'

interface SessionControllsProps {
  sessionId: string
  canChooseCards: boolean
  isCreator: boolean
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
  canChooseCards,
  isParticipant,
  isCreator,
  cardId,
  isLoadingParticipants,
  onAddParticipant,
  onOpenCardModal,
}: SessionControllsProps) => {
  const { t } = useTranslation('session')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isCardsLoading = useSelector(getCardsIsLoading)
  const isSessionLoading = useSelector(getCurrentSessionIsLoading)
  const [isShowConfirmBlock, setIsShowConfirmBlock] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)

  // onboarding
  const isOnboardingOpen = useSelector(getOnboardingIsOpen)
  const onboardingStep = useSelector(getOnboardingStepNumber)

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

  const onDeleteSession = async () => {
    await dispatch(deleteCurrentSession(sessionId))
    alertMessage({ type: 'success', message: t('Сессия успешно удалена') })
    navigate('/')
  }

  const onChooseCardHandler = async () => {
    await dispatch(chooseCards(sessionId))
    setIsOpenModal(false)
  }
  const handleCopyLink = () => {
    const currentUrl = window.location.href
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alertMessage({
          type: 'success',
          message: 'URL скопирован в буфер обмена!',
        })
      })
      .catch((err) => {
        alertMessage({
          type: 'error',
          message: `Не удалось скопировать URL: ', ${err}`,
        })
      })
  }

  // для онбординга рисуем моковую разметку
  if (isOnboardingOpen) {
    return <OnboardingBlock onboardingStep={onboardingStep} />
  }

  return (
    <>
      <Card className={classNames(cls.sessioncontrolls, {}, [className])}>
        <h3>{t('Управление')}</h3>
        <div className={cls.buttonWrapper}>
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
          {!isParticipant && !cardId && isCreator && (
            <>
              {isShowConfirmBlock ? (
                <ConfirmBlock
                  onOkHandler={onDeleteSession}
                  label={t('Вы уверены?')}
                  isShow={isShowConfirmBlock}
                  onCancel={onCancelConfirm}
                  isLoading={isSessionLoading}
                />
              ) : (
                <Button
                  theme="danger"
                  onClick={() => setIsShowConfirmBlock(true)}
                  outlined
                  loading={isLoadingParticipants}
                >
                  {t('Удалить сессию')}
                </Button>
              )}
            </>
          )}
          {/* 2 шаг - создаем карточку */}
          {isParticipant && !cardId && (
            <Flex direction="column" gap="16" className={cls.buttonWrapper}>
              <Button theme="secondary" outlined onClick={handleCopyLink}>
                {t('Скопировать ссылку')}
              </Button>
              <Button onClick={onCreateCard} outlined>
                {t('Создать карточку')}
              </Button>
            </Flex>
          )}
          {/* 3 шаг - редактируем или удаляем карточку */}
          {isParticipant && cardId && (
            <Flex direction="column" gap={'16'} className={cls.buttonWrapper}>
              {canChooseCards && (
                <Button onClick={() => setIsOpenModal(true)}>
                  {t('Провести жеребьевку')}
                </Button>
              )}
              <Button theme="secondary" outlined onClick={handleCopyLink}>
                {t('Скопировать ссылку')}
              </Button>
              <Button outlined onClick={() => onOpenCardModal()}>
                {t('Редактировать карточку')}
              </Button>
              {isShowConfirmBlock ? (
                <ConfirmBlock
                  onOkHandler={onConfirmHandler}
                  label={t('Вы уверены?')}
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
      <Modal
        className={cls.modal}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <div className={cls.modalWrapper}>
          <div className={cls.modalBodyWrapper}>
            <p className={cls.title}>
              {t('Вы уверены, что хотите провести жеребьевку?')}
            </p>

            <p className={cls.body}>
              {t(
                'Каждому участнику выпадет карточка, на почту прийдет уведомление, а дальнейшее редактирование сессии (карточек, участников, комментариев) будет невозможно.'
              )}
            </p>
          </div>
          <div className={cls.modalBtns}>
            <Button theme="danger" onClick={() => setIsOpenModal(false)}>
              {t('Отмена')}
            </Button>
            <Button onClick={onChooseCardHandler} loading={isSessionLoading}>
              {t('Принять')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
