import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Textarea.module.scss'
import { TextareaHTMLAttributes } from 'react'

type HtmlTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange' | 'readOnly'
>

interface TextareaProps extends HtmlTextareaProps {
  className?: string
  value: string
  onChange: (value: string) => void
  readonly?: boolean
  minHeight?: number
}

export const Textarea = ({
  className,
  value,
  readonly,
  onChange,
  minHeight = 100,
}: TextareaProps) => {
  return (
    <textarea
      style={{ minHeight }}
      value={value}
      readOnly={readonly}
      onChange={(e) => onChange(e.currentTarget.value)}
      className={classNames(cls.textarea, { [cls.readonly]: readonly }, [
        className,
      ])}
    />
  )
}
