import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { ICard } from '@/features/CardsBlock'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const updateCardTh = createAsyncThunk<
  ICard,
  {
    sessionId: string
    cardId: string
    data: FormData
  },
  ThunkConfig<string>
>(`card/update`, async ({ sessionId, cardId, data }, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  try {
    const res = await extra.api.patch(
      `/cards/${cardId}?sessionId=${sessionId}`,
      data
    )
    if (!res.data || res?.status !== 200) {
      throw new Error()
    }

    return res.data
  } catch (error) {
    return rejectWithValue(
      error?.response?.data?.message || 'Ошибка получения сессии'
    )
  }
})
