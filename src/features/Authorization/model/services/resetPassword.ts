import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const resetPassword = createAsyncThunk<
  { message: string },
  { email: string },
  ThunkConfig<string>
>('auth/resetPassword', async (data, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  try {
    const res = await extra.api.post('/auth/resetPassword', data)
    if (!res.data) {
      throw new Error()
    }

    return res.data
  } catch (error) {
    return rejectWithValue(
      error?.response?.data?.message || 'Ошибка отправки письма'
    )
  }
})
