import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User, UserSchema } from '../types/userSchema'
import { LOCAL_STORAGE_USER_TOKEN } from '@/shared/const/const'

const initialState: UserSchema = {
  _inited: false,
  user: {},
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //login, register, me
    setUserData: (state, { payload }: PayloadAction<User>) => {
      state._inited = true
      state.user = payload
    },

    //logout
    clearUserData: (state) => {
      state._inited = false
      state.user = {}
      localStorage.removeItem(LOCAL_STORAGE_USER_TOKEN)
    },
  },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
