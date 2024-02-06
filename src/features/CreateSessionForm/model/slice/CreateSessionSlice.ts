import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CreateSessionSchema } from '../types/CreateSessionSchema'
import { createSession } from '../services/createSession'

const initialState: CreateSessionSchema = {
  title: '',
  totalParticipants: 3,
  sessionInfo: '',
  isLoading: false,
  error: undefined,
  createdSessionId: null,
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
      state.createdSessionId = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSession.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.createdSessionId = payload._id
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
