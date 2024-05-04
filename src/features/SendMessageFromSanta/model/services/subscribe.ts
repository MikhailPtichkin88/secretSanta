import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'
import { IMessage } from '../types/messagesFromSantaSchema'

export const subscribe = createAsyncThunk<
  IMessage,
  { sessionId: string; cardId: string },
  ThunkConfig<string>
>(`messagesFromSanta/subscribe`, async (params, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  try {
    const res = await extra.api.get<IMessage>(`/messages/subscribe`, {
      params,
    })

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
