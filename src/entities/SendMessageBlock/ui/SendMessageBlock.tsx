import cls from './SendMessageBlock.module.scss'
import { useTranslation } from 'react-i18next'
import { Textarea } from '@/shared/ui/Textarea'
import { Button } from '@/shared/ui/Button'
import { useState } from 'react'

interface SendMessageBlockProps {
  title?: string
  onSend: (text: string) => Promise<unknown>
  disabled?: boolean
  isLoading?: boolean
}

export const SendMessageBlock = ({
  title,
  disabled = false,
  isLoading,
  onSend,
}: SendMessageBlockProps) => {
  const { t } = useTranslation('session')
  const [value, setValue] = useState('')

  const onSendHandler = async () => {
    await onSend(value)
    setValue('')
  }

  return (
    <>
      {Boolean(title) && <h3>{title}</h3>}
      <Textarea
        placeholder={t('Введите текст комментария')}
        className={cls.textarea}
        value={value}
        onChange={setValue}
      />
      <Button
        onClick={onSendHandler}
        disabled={!value || disabled}
        theme="secondary"
        loading={isLoading}
      >
        {t('Отправить')}
      </Button>
    </>
  )
}
