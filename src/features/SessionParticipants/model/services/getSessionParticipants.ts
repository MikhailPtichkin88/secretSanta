import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IParticipant } from '../types/participantsSchema'
import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'

export const getSessionParticipants = createAsyncThunk<
  IParticipant[],
  string,
  ThunkConfig<string>
>(`participants/get`, async (sessionId, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  try {
    const res = await extra.api.get(`/participants`, {
      params: { sessionId },
    })
    if (!res.data || res?.status !== 200) {
      throw new Error()
    }

    return res.data
  } catch (error) {
    alertMessage({
      type: 'error',
      message: 'Ошибка получения участников',
    })
    return rejectWithValue(
      error?.response?.data?.message || 'Ошибка получения участников'
    )
  }
})
