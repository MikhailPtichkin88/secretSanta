import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'
import { authSchema } from '../types/authSchema'

export const successChangeState = (state: authSchema) => {
  state.error = undefined
  state.isLoading = false
}

export const pendingChangeState = (state: authSchema) => {
  state.error = undefined
  state.isLoading = true
}

export const errorChangeState = (
  state: authSchema,
  reducer?: PayloadAction<string, string, object>
) => {
  state.error = reducer.payload
  state.isLoading = false
}
