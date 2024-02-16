import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'
import { IComment } from '../types/commentSchema'

export const createComment = createAsyncThunk<
  IComment,
  { sessionId: string; text: string },
  ThunkConfig<string>
>(`commentSlice/create`, async (data, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  try {
    const res = await extra.api.post<IComment>(`/comments`, data)
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
