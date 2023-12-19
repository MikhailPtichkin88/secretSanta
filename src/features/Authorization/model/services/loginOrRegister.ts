import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { userActions } from '@/entities/User/model/slice/userSlice'
import { User } from '@/entities/User/model/types/userSchema'
import { LOCAL_STORAGE_USER_TOKEN } from '@/shared/const/const'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface ILoginProps {
  email: string
  passwordHash: string
  rememberMe: boolean
}

const loginOrRegister = (type: 'login' | 'register') =>
  createAsyncThunk<User, ILoginProps, ThunkConfig<string>>(
    `auth/${type}`,
    async (data, thunkAPI) => {
      const { extra, dispatch, rejectWithValue } = thunkAPI
      const { rememberMe, ...authData } = data
      try {
        const res = await extra.api.post<User>(`/auth/${type}`, authData)
        if (!res.data) {
          throw new Error()
        }
        const { token, ...restUserData } = res.data
        if (rememberMe && token) {
          localStorage.setItem(LOCAL_STORAGE_USER_TOKEN, token)
        }
        dispatch(userActions.setUserData(restUserData))
        return res.data
      } catch (error) {
        rejectWithValue('Ошибка логинизации')
      }
    }
  )

export const login = loginOrRegister('login')
export const register = loginOrRegister('register')
