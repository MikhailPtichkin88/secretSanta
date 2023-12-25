import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Checkbox.module.scss'

interface CheckboxProps {
  className?: string
  label?: string
  checked: boolean
  onChange: (value: boolean) => void
}

export const Checkbox = ({
  className,
  label,
  checked,
  onChange,
}: CheckboxProps) => {
  return (
    <div className={classNames(cls.checkbox, {}, [className])}>
      <input
        type="checkbox"
        id="myCheckbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor="myCheckbox" className={cls.checkboxLabel}>
        {label}
      </label>
    </div>
  )
}
