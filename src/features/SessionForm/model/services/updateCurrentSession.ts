import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { ICurrentSessionData } from '../types/CurrentSessionSchema'

export const updateCurrentSession = createAsyncThunk<
  ICurrentSessionData,
  {
    sessionId: string
    data: FormData
  },
  ThunkConfig<string>
>(`currentSession/get`, async ({ sessionId, data }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  try {
    const res = await extra.api.patch(`/sessions/${sessionId}`, data)
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
