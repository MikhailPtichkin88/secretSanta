export interface INotificationSchema {
  notifications: INotification[]
  total: number
  isLoading: boolean
}

export interface INotification {
  sessionId: string
  sessionTitle: string
  count: number
}
export interface IResponceNotificationData {
  sessionId: string
  sessionTitle: string
  text: string
}
