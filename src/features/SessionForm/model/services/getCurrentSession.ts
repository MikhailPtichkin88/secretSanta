import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { cardsBlockActions } from '@/features/CardsBlock'
import { ICurrentSessionData } from '../types/CurrentSessionSchema'
import { notificationsActions } from '@/entities/NotificationDropdown'

export const getProfileSession = createAsyncThunk<
  ICurrentSessionData,
  string,
  ThunkConfig<string>
>(`currentSession/get`, async (sessionId, thunkAPI) => {
  const { extra, rejectWithValue, dispatch } = thunkAPI

  try {
    const res = await extra.api.get<ICurrentSessionData>(
      `/sessions/${sessionId}`
    )
    if (!res.data || res?.status !== 200) {
      throw new Error()
    }

    res?.data?.total_participants &&
      dispatch(
        cardsBlockActions.changeTotalParticipants(res.data.total_participants)
      )

    if (res.data?.status === 'closed') {
      dispatch(notificationsActions.updateNotifications(sessionId))
    }

    return res.data
  } catch (error) {
    return rejectWithValue(
      error?.response?.data?.message || 'Ошибка получения сессии'
    )
  }
})
