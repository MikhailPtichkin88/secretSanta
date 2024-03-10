import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'
import { CardsBlockSchema, ICard } from '../types/cardsBlockSchema'
import { createCard } from '../services/createCard'
import { getCards } from '../services/getCards'
import { deleteCard } from '../services/deleteCard'
import { updateCardTh } from '@/features/CardEditForm/model/services/updateCardTh'
import { mockOnboardingCard } from '../../lib/const'

const initialState: CardsBlockSchema = {
  cards: [],
  totalParticipants: 0,
  isLoading: false,
  error: undefined,
}

const cardsBlockSlice = createSlice({
  name: 'cardsBlock',
  initialState,
  reducers: {
    updateCard: (state, { payload }: PayloadAction<ICard>) => {
      state.cards = current(state.cards)?.map((card) =>
        card._id === payload._id ? payload : card
      )
    },
    changeTotalParticipants: (state, { payload }: PayloadAction<number>) => {
      state.totalParticipants = payload
    },
    deleteCard: (state, { payload }: PayloadAction<ICard>) => {
      state.cards = current(state.cards)?.filter((el) => el._id !== payload._id)
    },
    deleteCardImg: (state, { payload }: PayloadAction<string>) => {
      const cardIndex = state.cards.findIndex((el) => el._id === payload)
      if (cardIndex) {
        state.cards[cardIndex].card_img = null
      }
    },
    resetCardsStore: (state) => (state = initialState),
    setOnboardingCard: (state, { payload }: PayloadAction<boolean>) => {
      if (payload) {
        state.cards = [mockOnboardingCard, ...current(state.cards)]
      } else {
        state.cards = current(state.cards)?.filter(
          (card) => card._id !== 'mockCard'
        )
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // get cards
      .addCase(getCards.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.cards = payload
      })
      .addCase(getCards.rejected, (state, { error }) => {
        state.error = error?.message
        state.isLoading = false
      })
      .addCase(getCards.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      // create card
      .addCase(createCard.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.cards = [...state.cards, payload.card]
      })
      .addCase(createCard.rejected, (state, { error }) => {
        state.error = error?.message
        state.isLoading = false
      })
      .addCase(createCard.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      // delete card or delete card img
      .addCase(deleteCard.fulfilled, (state, { meta }) => {
        state.error = undefined
        state.isLoading = false

        if (meta.arg.cardId) {
          state.cards = current(state.cards)?.filter(
            (el) => el._id !== meta.arg.cardId
          )
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

      // delete card
      .addCase(updateCardTh.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false

        state.cards = state.cards.map((card) =>
          card._id === payload._id ? payload : card
        )
      })
      .addCase(updateCardTh.rejected, (state, { error }) => {
        state.error = error?.message
        state.isLoading = false
      })
      .addCase(updateCardTh.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
  },
})

export const { actions: cardsBlockActions } = cardsBlockSlice
export const { reducer: cardsBlockReducer } = cardsBlockSlice
