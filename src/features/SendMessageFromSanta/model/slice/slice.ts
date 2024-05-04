import { createSlice, current } from '@reduxjs/toolkit'
import { IMessagesFromSantaSchema } from '../types/messagesFromSantaSchema'
import { getMessages } from '../services/getMessages'
import { createMessage } from '../services/createMessage'
import { editMessage } from '../services/editMessage'
import { subscribe } from '../services/subscribe'

const initialState: IMessagesFromSantaSchema = {
  messages: [],
  isLoading: false,
  error: undefined,
}

const messagesFromSantaSlice = createSlice({
  name: 'messagesFromSanta',
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
      .addCase(subscribe.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        if (payload.card_from) {
          state.messages.push(payload)
        }
      })
  },
})

export const { actions: messagesFromSantaActions } = messagesFromSantaSlice
export const { reducer: messagesFromSantaReducer } = messagesFromSantaSlice
