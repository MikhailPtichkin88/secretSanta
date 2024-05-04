export { NotificationDropdown } from './ui/NotificationDropdown'
export type {
  INotificationSchema,
  INotification,
} from './model/types/notificationsSchema'
export { notificationsActions, notificationsReducer } from './model/slice/slice'
export { getNotifications } from './model/services/getNotifications'
