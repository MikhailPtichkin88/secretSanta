import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { ICard } from '@/features/CardsBlock'

export const getCardTh = createAsyncThunk<ICard, string, ThunkConfig<string>>(
  `card/get`,
  async (cardId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
      const res = await extra.api.get<ICard>(`/cards/${cardId}`)
      if (!res.data || res?.status !== 200) {
        throw new Error()
      }
      return res.data
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'Ошибка получения сессии'
      )
    }
  }
)
