import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProfileSessionsSchema } from '../types/profileSessionsSchema'
import { getProfileSessions } from '../services/getProfileSessions'
import { TPerPage } from '@/shared/ui/Pagination/Pagination'
import {
  ISession,
  TSessionRoles,
  TSessionSortOrder,
  TSessionStatusFilter,
} from '@/entities/ProfileSessionsTable'

const initialState: ProfileSessionsSchema = {
  data: [],
  pagination: {
    currentPage: 1,
    limit: 10,
    totalPages: 1,
  },
  filters: {
    sortOrder: null,
    sortBy: 'title',
    status: 'all',
    role: 'creator',
    search: '',
  },
  isLoading: false,
  error: undefined,
}

const profileSessionsSlice = createSlice({
  name: 'profileSessions',
  initialState,
  reducers: {
    sortData: (
      state,
      {
        payload,
      }: PayloadAction<{
        sortBy: keyof ISession
        sortOrder: 'asc' | 'desc' | undefined
      }>
    ) => {
      state.filters.sortBy = payload.sortBy
      state.filters.sortOrder = payload.sortOrder
    },
    changeStatus: (state, { payload }: PayloadAction<TSessionStatusFilter>) => {
      state.filters.status = payload
    },
    changePage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload
    },
    changePageLimit: (state, { payload }: PayloadAction<TPerPage>) => {
      state.pagination.limit = payload
    },
    changeRole: (state, { payload }: PayloadAction<TSessionRoles>) => {
      state.filters.role = payload
    },
    changeSearch: (state, { payload }: PayloadAction<string>) => {
      state.filters.search = payload
    },
    changeSort: (
      state,
      {
        payload,
      }: PayloadAction<{ sortOrder: TSessionSortOrder; sortBy: keyof ISession }>
    ) => {
      state.filters.sortOrder = payload.sortOrder
      state.filters.sortBy = payload.sortBy
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getProfileSessions.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.data = payload.data
        state.pagination = payload.pagination
      })
      .addCase(getProfileSessions.rejected, (state, { error }) => {
        state.data = initialState.data
        state.pagination = initialState.pagination
        state.error = error?.message
        state.isLoading = false
      })
      .addCase(getProfileSessions.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
  },
})

export const { actions: profileSessionsActions } = profileSessionsSlice
export const { reducer: profileSessionsReducer } = profileSessionsSlice
