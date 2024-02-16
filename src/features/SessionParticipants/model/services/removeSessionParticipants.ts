import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IParticipant } from '../types/participantsSchema'
import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'
import { ICard, cardsBlockActions } from '@/features/CardsBlock'

interface IReturnData {
  deletedParticipant: IParticipant
  deletedCard: ICard
}

export const deleteSessionParticipants = createAsyncThunk<
  IParticipant,
  string,
  ThunkConfig<string>
>(`participants/delete`, async (participantId, thunkAPI) => {
  const { extra, rejectWithValue, dispatch } = thunkAPI

  try {
    const res = await extra.api.delete<IReturnData>(`/participants`, {
      params: { participantId },
    })
    if (!res.data || res?.status !== 200) {
      throw new Error()
    }

    if (res.data.deletedCard) {
      dispatch(cardsBlockActions.deleteCard(res.data.deletedCard))
    }

    return res.data?.deletedParticipant
  } catch (error) {
    alertMessage({
      type: 'error',
      message: 'Ошибка получения участников',
    })
    return rejectWithValue(
      error?.response?.data?.message || 'Ошибка получения участников'
    )
  }
})
