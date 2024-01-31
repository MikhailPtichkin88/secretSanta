import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CreateSessionSchema } from '../types/CreateSessionSchema'
import { createSession } from '../services/createSession'

const initialState: CreateSessionSchema = {
  title: null,
  totalParticipants: null,
  sessionInfo: null,
  isLoading: false,
  error: undefined,
}

const createSessionSlice = createSlice({
  name: 'createSession',
  initialState,
  reducers: {
    setTitle: (state, { payload }: PayloadAction<string>) => {
      state.title = payload
    },
    setTotalParticipants: (state, { payload }: PayloadAction<number>) => {
      state.totalParticipants = payload
    },
    setSessionInfo: (state, { payload }: PayloadAction<string>) => {
      state.sessionInfo = payload
    },
    resetFields: (state) => {
      state.title = null
      state.sessionInfo = null
      state.totalParticipants = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSession.fulfilled, (state) => {
        state.error = undefined
        state.isLoading = false
      })
      .addCase(createSession.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(createSession.rejected, (state, { error }) => {
        state.error = error?.message || 'Oшибка создания сессии'
        state.isLoading = false
      })
  },
})

export const { actions: createSessionActions } = createSessionSlice
export const { reducer: createSessionReducer } = createSessionSlice
