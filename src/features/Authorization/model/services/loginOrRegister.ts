import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { profileActions } from '@/entities/ProfileForm'
import { userActions } from '@/entities/User/model/slice/userSlice'
import {
  LoginOrRegisterRes,
  User,
} from '@/entities/User/model/types/userSchema'
import { LOCAL_STORAGE_USER_TOKEN } from '@/shared/const/const'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface ILoginProps {
  email: string
  passwordHash: string
  rememberMe: boolean
}

export const loginOrRegister = (type: 'login' | 'registration') =>
  createAsyncThunk<User, ILoginProps, ThunkConfig<string>>(
    `auth/${type}`,
    async (data, thunkAPI) => {
      const { extra, dispatch, rejectWithValue } = thunkAPI
      const { rememberMe, ...authData } = data
      try {
        const res = await extra.api.post<LoginOrRegisterRes>(
          `/auth/${type}`,
          authData
        )
        if (!res.data || res?.status !== 200) {
          throw new Error()
        }
        const { token, userData } = res.data
        if (rememberMe && token) {
          localStorage.setItem(LOCAL_STORAGE_USER_TOKEN, token)
        }
        dispatch(userActions.setUserData(userData))
        dispatch(profileActions.setProfileData(userData))
        return userData
      } catch (error) {
        return rejectWithValue(
          error?.response?.data?.message || 'Ошибка логинизации'
        )
      }
    }
  )

export const login = loginOrRegister('login')
export const register = loginOrRegister('registration')
