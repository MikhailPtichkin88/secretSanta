import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { ICurrentSessionData } from '../types/CurrentSessionSchema'
import { cardsBlockActions } from '@/features/CardsBlock'

export const updateCurrentSession = createAsyncThunk<
  ICurrentSessionData,
  {
    sessionId: string
    data: FormData
  },
  ThunkConfig<string>
>(`currentSession/update`, async ({ sessionId, data }, thunkAPI) => {
  const { extra, rejectWithValue, dispatch } = thunkAPI

  try {
    const res = await extra.api.patch<ICurrentSessionData>(
      `/sessions/${sessionId}`,
      data
    )
    if (!res.data || res?.status !== 200) {
      throw new Error()
    }
    dispatch(
      cardsBlockActions.changeTotalParticipants(res.data.total_participants)
    )
    return res.data
  } catch (error) {
    return rejectWithValue(
      error?.response?.data?.message || 'Ошибка получения сессии'
    )
  }
})
