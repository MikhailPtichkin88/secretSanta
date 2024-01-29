import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ProfileSessionsSchema } from '../types/profileSessionsSchema'
import {
  ISession,
  TSessionRoles,
  TSessionStatusFilter,
} from '@/entities/ProfileSessionsTable'

type IReturnData = Omit<
  ProfileSessionsSchema,
  'filters' | 'error' | 'isLoading'
>
interface IParams {
  userId?: string
  page?: number
  limit?: number
  sortBy?: keyof Partial<ISession>
  sortOrder?: 'asc' | 'desc' | undefined
  status?: TSessionStatusFilter
  search?: string
  role?: TSessionRoles
}

export const getProfileSessions = createAsyncThunk<
  IReturnData,
  IParams,
  ThunkConfig<string>
>(`profileSessions`, async (data, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI
  const params = { ...data }
  if (!data.sortOrder) {
    delete params.sortOrder
    delete params.sortBy
  }
  try {
    const res = await extra.api.get(`/sessions`, { params })
    if (!res.data || res?.status !== 200) {
      throw new Error()
    }

    return res.data
  } catch (error) {
    return rejectWithValue(
      error?.response?.data?.message || 'Ошибка получения сессий'
    )
  }
})
