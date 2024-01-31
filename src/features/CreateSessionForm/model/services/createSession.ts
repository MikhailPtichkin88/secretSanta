import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICreateSessionData } from '../types/CreateSessionSchema'
import { ISession } from '@/entities/ProfileSessionsTable'

export const createSession = createAsyncThunk<
  ISession,
  ICreateSessionData,
  ThunkConfig<string>
>('createSession', async (data, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  const params = {
    title: data.title,
    total_participants: data.totalParticipants,
    session_info: data?.sessionInfo ?? null,
  }

  try {
    const res = await extra.api.post<ISession>('/sessions', params)
    if (!res.data) {
      throw new Error()
    }

    return res?.data
  } catch (error) {
    return rejectWithValue(
      error?.response?.data?.message || 'Ошибка обновления пароля'
    )
  }
})
