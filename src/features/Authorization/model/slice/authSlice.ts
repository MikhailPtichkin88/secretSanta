import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { authSchema } from '../types/authSchema'
import {
  errorChangeState,
  pendingChangeState,
  successChangeState,
} from '../lib/stateChangeHelpers'
import { authMe } from '../services/authMe'
import { login, register } from '../services/loginOrRegister'

const initialState: authSchema = {
  email: '',
  password: '',
  newPassword: '',
  rememberMe: false,
  isLoading: false,
  error: undefined,
  isAuthResult: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, { payload }: PayloadAction<string>) => {
      state.email = payload
    },
    setPassword: (state, { payload }: PayloadAction<string>) => {
      state.password = payload
    },
    setNewPassword: (state, { payload }: PayloadAction<string>) => {
      state.newPassword = payload
    },
    setRememberMe: (state, { payload }: PayloadAction<boolean>) => {
      state.rememberMe = payload
    },
    setAuthResult: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthResult = payload
    },
    resetAuthError: (state) => {
      state.error = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.fulfilled, successChangeState)
      .addCase(register.pending, pendingChangeState)
      .addCase(register.rejected, errorChangeState)
      // login
      .addCase(login.fulfilled, successChangeState)
      .addCase(login.pending, pendingChangeState)
      .addCase(login.rejected, errorChangeState)
      // me
      .addCase(authMe.fulfilled, successChangeState)
      .addCase(authMe.pending, pendingChangeState)
      .addCase(authMe.rejected, errorChangeState)
  },
})

export const { actions: authActions } = authSlice
export const { reducer: authReducer } = authSlice
