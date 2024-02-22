import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { ICard, cardsBlockActions } from '@/features/CardsBlock'
import { ICurrentSessionData } from '../types/CurrentSessionSchema'

interface IReturnData {
  session: ICurrentSessionData
  mySelectedCard: ICard
}
export const chooseCards = createAsyncThunk<
  ICurrentSessionData,
  string,
  ThunkConfig<string>
>(`currentSession/chooseCards`, async (sessionId, thunkAPI) => {
  const { extra, rejectWithValue, dispatch } = thunkAPI

  try {
    const res = await extra.api.get<IReturnData>(
      `/sessions/${sessionId}/chooseCards`
    )
    if (!res.data || res?.status !== 200) {
      throw new Error()
    }
    if (res.data.mySelectedCard) {
      dispatch(cardsBlockActions.updateCard(res.data.mySelectedCard))
    }
    return res.data.session
  } catch (error) {
    return rejectWithValue(
      error?.response?.data?.message || 'Ошибка получения сессии'
    )
  }
})
