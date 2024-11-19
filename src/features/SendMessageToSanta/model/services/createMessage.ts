import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'
import { ICreateMessagesData, IMessage } from '../types/messagesToSantaSchema'

export const createMessage = createAsyncThunk<
  IMessage,
  ICreateMessagesData,
  ThunkConfig<string>
>(`messagesToSanta/post`, async (data, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  try {
    const res = await extra.api.post<IMessage>(`/messages/toSanta`, data)

    if (!res.data || res?.status !== 201) {
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
    return rejectWithValue(message || 'Ошибка создания сообщения')
  }
})
