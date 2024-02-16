import { createSlice } from '@reduxjs/toolkit'

import { ICard, deleteCard } from '@/features/CardsBlock'
import { CardSchema } from '../types/cardSchema'
import { updateCardTh } from '../services/updateCardTh'
import { getCardTh } from '../services/getCardTh'

const initialState: CardSchema = {
  card: {} as ICard,
  isLoading: false,
  error: undefined,
}

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    // changeStatus: (state, { payload }: PayloadAction<CurrentSessionSchema>) => {
    //   state = payload
    // },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getCardTh.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.card = payload
      })
      .addCase(getCardTh.rejected, (state, { error }) => {
        state.error = error?.message
        state.isLoading = false
      })
      .addCase(getCardTh.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })

      .addCase(updateCardTh.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.card = payload
      })
      .addCase(updateCardTh.rejected, (state, { error }) => {
        state.error = error?.message
        state.isLoading = false
      })
      .addCase(updateCardTh.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })

      .addCase(deleteCard.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        if (!Array.isArray(payload)) {
          state.card.card_img = null
        }
      })
      .addCase(deleteCard.rejected, (state, { error }) => {
        state.error = error?.message
        state.isLoading = false
      })
      .addCase(deleteCard.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
  },
})

export const { actions: cardSliceActions } = cardSlice
export const { reducer: cardSliceReducer } = cardSlice
