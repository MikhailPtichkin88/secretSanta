import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { ICurrentSessionData } from '../types/CurrentSessionSchema'

export const getProfileSession = createAsyncThunk<
  ICurrentSessionData,
  string,
  ThunkConfig<string>
>(`currentSession/get`, async (sessionId, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  try {
    const res = await extra.api.get(`/sessions/${sessionId}`)
    if (!res.data || res?.status !== 200) {
      throw new Error()
    }

    return res.data
  } catch (error) {
    return rejectWithValue(
      error?.response?.data?.message || 'Ошибка получения сессии'
    )
  }
})
