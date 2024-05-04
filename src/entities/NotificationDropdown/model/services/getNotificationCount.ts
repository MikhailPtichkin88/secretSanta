import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'
import { IResponceNotificationData } from '../types/notificationsSchema'

export const getNotificationCount = createAsyncThunk<
  IResponceNotificationData,
  void,
  ThunkConfig<string>
>(`notifications/subscribe`, async (_, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  try {
    const res = await extra.api.get<IResponceNotificationData>(
      `/messages/count`
    )
    if (!res.data) {
      rejectWithValue('Ошибка получения сообщений')
    }

    alertMessage({
      type: 'success',
      message: `В сессии ${res.data.sessionTitle}\n
      новое сообщение: ${res.data.text}`,
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
