import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface IProps {
  token: string
  password: string
}

export const setNewPassword = createAsyncThunk<
  string,
  IProps,
  ThunkConfig<string>
>('auth/setNewPassword', async (data, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  try {
    const res = await extra.api.post<{ message: string }>(
      '/auth/setNewPassword',
      data
    )
    if (!res.data) {
      throw new Error()
    }

    return res?.data?.message
  } catch (error) {
    return rejectWithValue(
      error?.response?.data?.message || 'Ошибка обновления пароля'
    )
  }
})
