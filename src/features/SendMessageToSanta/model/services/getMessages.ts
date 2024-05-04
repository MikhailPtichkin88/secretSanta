import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'
import { IMessage } from '../types/messagesToSantaSchema'

export const getMessages = createAsyncThunk<
  IMessage[],
  string,
  ThunkConfig<string>
>(`messagesToSanta/get`, async (sessionId, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  try {
    const res = await extra.api.get<IMessage[]>(`/messages/toSanta`, {
      params: { sessionId },
    })
    if (!res.data || res?.status !== 200) {
      rejectWithValue('Ошибка получения сообщений')
    }
    return res.data
  } catch (error) {
    const message =
      error?.response?.data?.error ?? 'Что-то пошло не так, попробуйте еще раз'
    alertMessage({
      type: 'error',
      message,
    })
    return rejectWithValue(message || 'Ошибка получения сообщений')
  }
})
