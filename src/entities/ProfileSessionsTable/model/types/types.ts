export type TSessionStatus = 'open' | 'in_progress' | 'closed'
export type TSessionStatusFilter = 'all' | 'active' | 'closed'
export type TSessionRoles = 'participant' | 'creator'
export type TSessionSortOrder = 'asc' | 'desc'
export interface ISession {
  _id: string
  created_by: string
  title: string
  session_info?: string
  session_img?: string
  status: TSessionStatus
  total_participants: number
  cards: string[]
  createdAt?: string
  updatedAt?: string
}

export type TSortSessions = 'title' | 'total_participants' | 'createdAt'
