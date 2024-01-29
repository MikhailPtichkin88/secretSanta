import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Checkbox.module.scss'
import { forwardRef } from 'react'

interface CheckboxProps {
  className?: string
  label?: string
  checked: boolean
  onChange: (value: boolean) => void
}

export const Checkbox = forwardRef(
  (
    { className, label, checked, onChange }: CheckboxProps,
    innerRef: React.MutableRefObject<HTMLInputElement>
  ) => {
    const uniqueId = `checkbox-${label}-${Math.floor(Math.random() * 1000)}`
    return (
      <div className={classNames(cls.checkbox, {}, [className])}>
        <input
          ref={innerRef}
          type="checkbox"
          id={uniqueId}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <label htmlFor={uniqueId} className={cls.checkboxLabel}>
          {label}
        </label>
      </div>
    )
  }
)
