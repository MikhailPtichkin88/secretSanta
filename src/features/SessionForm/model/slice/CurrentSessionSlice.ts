import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
  CurrentSessionSchema,
  ICurrentSessionData,
} from '../types/CurrentSessionSchema'
import { getProfileSession } from '../services/getCurrentSession'
import { deleteSessionImg } from '../services/deleteSessionImg'

const initialState: CurrentSessionSchema = {
  session: {} as ICurrentSessionData,
  isLoading: false,
  error: undefined,
}

const currentSessionSlice = createSlice({
  name: 'currentSession',
  initialState,
  reducers: {
    // changeStatus: (state, { payload }: PayloadAction<CurrentSessionSchema>) => {
    //   state = payload
    // },
  },
  extraReducers: (builder) => {
    builder
      // get current session
      .addCase(getProfileSession.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.session = payload
      })
      .addCase(getProfileSession.rejected, (state, { error }) => {
        state.error = error?.message
        state.isLoading = false
      })
      .addCase(getProfileSession.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })

      // delete img
      .addCase(deleteSessionImg.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.session = payload
      })
      .addCase(deleteSessionImg.rejected, (state, { error }) => {
        state.error = error?.message
        state.isLoading = false
      })
      .addCase(deleteSessionImg.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
  },
})

export const { actions: currentSessionActions } = currentSessionSlice
export const { reducer: currentSessionReducer } = currentSessionSlice
