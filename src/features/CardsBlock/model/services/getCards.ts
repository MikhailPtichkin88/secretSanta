import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { ICard } from '@/features/CardsBlock'
import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'

export const getCards = createAsyncThunk<ICard[], string, ThunkConfig<string>>(
  `cardsBlock/get`,
  async (sessionId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    const params = {
      sessionId,
    }

    try {
      const res = await extra.api.get<ICard[]>(`/cards`, { params })
      if (!res.data || res?.status !== 200) {
        throw new Error()
      }

      return res.data
    } catch (error) {
      const message =
        error?.response?.data?.error ??
        'Что-то пошло не так, попробуйте еще раз'
      alertMessage({
        type: 'error',
        message,
      })
      return rejectWithValue(message || 'Ошибка получения карточек')
    }
  }
)
