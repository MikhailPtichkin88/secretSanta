import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ParticipantsSchema } from '../types/participantsSchema'
import { getSessionParticipants } from '../services/getSessionParticipants'
import { createSessionParticipant } from '../services/createSessionParticipant'
import { deleteSessionParticipants } from '../services/removeSessionParticipants'

const initialState: ParticipantsSchema = {
  participants: [],
  error: undefined,
  isLoading: false,
}

const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    setPickedCard: (
      state,
      { payload }: PayloadAction<{ participantId: string; isPickCard: boolean }>
    ) => {
      const participantIndex = state.participants.findIndex(
        (el) => el._id === payload.participantId
      )
      if (participantIndex) {
        state.participants[participantIndex].has_picked_own_card =
          payload.isPickCard
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // get participants
      .addCase(getSessionParticipants.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.participants = payload
      })
      .addCase(getSessionParticipants.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(getSessionParticipants.rejected, (state, { error }) => {
        state.error = error.message
        state.isLoading = false
      })

      // create participant
      .addCase(createSessionParticipant.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.participants = payload
      })
      .addCase(createSessionParticipant.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(createSessionParticipant.rejected, (state, { error }) => {
        state.error = error.message
        state.isLoading = false
      })

      // delete participant
      .addCase(deleteSessionParticipants.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.participants = state.participants.filter(
          (el) => el._id !== payload._id
        )
      })
      .addCase(deleteSessionParticipants.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(deleteSessionParticipants.rejected, (state, { error }) => {
        state.error = error.message
        state.isLoading = false
      })
  },
})

export const { actions: participantsActions } = participantsSlice
export const { reducer: participantsReducer } = participantsSlice
