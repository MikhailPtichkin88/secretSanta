import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { User } from '@/entities/User/model/types/userSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const updateUser = createAsyncThunk<User, FormData, ThunkConfig<string>>(
  `auth/updateUser`,
  async (data, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
      const res = await extra.api.patch(`/auth/update`, data, {})
      if (!res.data || res?.status !== 200) {
        throw new Error()
      }

      return res.data
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'Ошибка обновления данных'
      )
    }
  }
)
