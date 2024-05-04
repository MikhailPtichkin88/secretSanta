import cls from '../ui/Popup.module.scss'

export type DropdownDirection =
  | 'bottom left'
  | 'bottom right'
  | 'top left'
  | 'top right'

export const mapDirectionsClass: Record<DropdownDirection, string> = {
  'bottom left': cls.bottomLeft,
  'bottom right': cls.bottomRight,
  'top left': cls.topLeft,
  'top right': cls.topRight,
}
