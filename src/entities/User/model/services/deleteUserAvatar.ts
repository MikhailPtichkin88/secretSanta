import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { User } from '@/entities/User/model/types/userSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const deleteUserAvatar = createAsyncThunk<
  User,
  void,
  ThunkConfig<string>
>(`auth/deleteUserAvatar`, async (_, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  try {
    const res = await extra.api.delete(`/auth/deleteAvatar`)
    if (!res.data || res?.status !== 200) {
      throw new Error()
    }

    return res.data
  } catch (error) {
    return rejectWithValue(
      error?.response?.data?.message || 'Ошибка удаления аватара'
    )
  }
})
