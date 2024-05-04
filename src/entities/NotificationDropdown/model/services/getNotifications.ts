import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'
import { INotification } from '../types/notificationsSchema'

export const getNotifications = createAsyncThunk<
  INotification[],
  void,
  ThunkConfig<string>
>(`notifications/get`, async (_, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  try {
    const res = await extra.api.get<INotification[]>(`/messages`)
    if (!res.data) {
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
