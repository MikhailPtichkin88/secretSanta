import {
  ISession,
  TSessionRoles,
  TSessionSortOrder,
  TSessionStatusFilter,
} from '@/entities/ProfileSessionsTable'
import { TPerPage } from '@/shared/ui/Pagination/Pagination'

export interface ProfileSessionsSchema {
  data: ISession[]
  pagination: IPagination
  filters: ISessionsFilters
  isLoading: boolean
  error: string
}

export interface IPagination {
  currentPage: number
  limit: TPerPage
  totalPages?: number
  hasNextPage?: boolean
  hasPrevPage?: boolean
  total?: number // общее количество сессий
}

export interface ISessionsFilters {
  sortBy?: keyof Partial<ISession>
  sortOrder: TSessionSortOrder
  status: TSessionStatusFilter
  role: TSessionRoles
  search: string
}
