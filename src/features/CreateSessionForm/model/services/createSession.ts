import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICreateSessionData } from '../types/CreateSessionSchema'
import { ISession } from '@/entities/ProfileSessionsTable'
import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'

export const createSession = createAsyncThunk<
  ISession,
  ICreateSessionData,
  ThunkConfig<string>
>('createSession', async (data, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  const params = {
    title: data.title,
    total_participants: data.totalParticipants,
    session_info: data?.sessionInfo,
  }
  if (!params.session_info) {
    delete params.session_info
  }
  try {
    const res = await extra.api.post<ISession>('/sessions', params)
    if (!res.data) {
      throw new Error()
    }

    alertMessage({ type: 'success', message: 'Сессия успешно создана' })
    return res?.data
  } catch (error) {
    alertMessage({
      type: 'error',
      message: error?.response?.data?.message || 'Ошибка при создании сессии',
    })
    return rejectWithValue(
      error?.response?.data?.message || 'Ошибка при создании сессии'
    )
  }
})
