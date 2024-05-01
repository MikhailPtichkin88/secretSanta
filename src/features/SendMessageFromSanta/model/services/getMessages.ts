import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'
import { IGetMessagesData, IMessage } from '../types/messagesFromSantaSchema'

export const getMessages = createAsyncThunk<
  IMessage[],
  IGetMessagesData,
  ThunkConfig<string>
>(`messagesFromSanta/get`, async (params, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  try {
    const res = await extra.api.get<IMessage[]>(`/messages/fromSanta`, {
      params,
    })
    if (!res.data || res?.status !== 200) {
      throw new Error()
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
