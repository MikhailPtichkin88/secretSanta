import { createSlice, current } from '@reduxjs/toolkit'
import { IMessageToSantaSchema } from '../types/messagesToSantaSchema'
import { getMessages } from '../services/getMessages'
import { createMessage } from '../services/createMessage'
import { editMessage } from '../services/editMessage'
import { subscribe } from '@/features/SendMessageFromSanta'

const initialState: IMessageToSantaSchema = {
  messages: [],
  isLoading: false,
  error: undefined,
}

const messagesToSantaSlice = createSlice({
  name: 'messagesToSanta',
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder
      // get messages
      .addCase(getMessages.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.messages = payload
      })
      .addCase(getMessages.rejected, (state, { error }) => {
        state.error = error?.message
        state.isLoading = false
      })
      .addCase(getMessages.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })

      // create messages
      .addCase(createMessage.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.messages.push(payload)
      })
      .addCase(createMessage.rejected, (state, { error }) => {
        state.error = error?.message
        state.isLoading = false
      })
      .addCase(createMessage.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      // update messages
      .addCase(editMessage.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.messages = current(state.messages)?.map((message) =>
          message._id === payload._id ? payload : message
        )
      })
      .addCase(editMessage.rejected, (state, { error }) => {
        state.error = error?.message
        state.isLoading = false
      })
      .addCase(editMessage.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })

      // subcribe to new  messages
      .addCase(subscribe.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        if (!payload.card_from) {
          state.messages.push(payload)
        }
      })
  },
})

export const { actions: messagesToSantaActions } = messagesToSantaSlice
export const { reducer: messagesToSantaReducer } = messagesToSantaSlice
