import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'
import { IComment } from '../types/commentSchema'

export const getComments = createAsyncThunk<
  IComment[],
  string,
  ThunkConfig<string>
>(`commentSlice/get`, async (sessionId, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  const params = {
    sessionId,
  }

  try {
    const res = await extra.api.get<IComment[]>(`/comments`, { params })
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
    return rejectWithValue(message || 'Ошибка получения комментариев')
  }
})
