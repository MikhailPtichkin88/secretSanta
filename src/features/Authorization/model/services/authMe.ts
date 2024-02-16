import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { profileActions } from '@/entities/ProfileForm'
import { userActions } from '@/entities/User/model/slice/userSlice'
import { User } from '@/entities/User/model/types/userSchema'
import { LOCAL_STORAGE_USER_TOKEN } from '@/shared/const/const'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const authMe = createAsyncThunk<User, void, ThunkConfig<string>>(
  'auth/authMe',
  async (_, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI

    try {
      const res = await extra.api.get<User>('/auth/me')
      if (!res.data) {
        const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN)
        if (token) {
          localStorage.removeItem(LOCAL_STORAGE_USER_TOKEN)
        }
        throw new Error()
      }

      dispatch(userActions.setUserData(res.data))
      dispatch(profileActions.setProfileData(res.data))
      return res.data
    } catch (error) {
      return rejectWithValue(error?.message || 'Ошибка авторизации')
    }
  }
)
