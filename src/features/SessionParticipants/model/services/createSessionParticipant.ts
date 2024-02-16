import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IParticipant } from '../types/participantsSchema'
import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'

export const createSessionParticipant = createAsyncThunk<
  IParticipant[],
  string,
  ThunkConfig<string>
>(`participants/post`, async (sessionId, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  try {
    const res = await extra.api.post(`/participants`, {
      session_id: sessionId,
    })
    if (!res.data || res?.status !== 200) {
      throw new Error()
    }
    alertMessage({
      type: 'success',
      message: 'Вы приняли участие в сессии',
    })
    return res.data
  } catch (error) {
    alertMessage({
      type: 'error',
      message: 'Что-то пошло не так, попробуйте еще раз',
    })
    return rejectWithValue(
      error?.response?.data?.message ||
        'Что-то пошло не так, попробуйте еще раз'
    )
  }
})
