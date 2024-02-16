import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { ICard, cardsBlockActions } from '@/features/CardsBlock'
import {
  IParticipant,
  participantsActions,
} from '@/features/SessionParticipants'
import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'

interface IReturnData {
  card: ICard
  participant: IParticipant
}

export const createCard = createAsyncThunk<
  IReturnData,
  string,
  ThunkConfig<string>
>(`cardsBlock/create`, async (sessionId, thunkAPI) => {
  const { extra, rejectWithValue, dispatch, getState } = thunkAPI
  const userName = getState()?.user?.user?.fullName

  const data = {
    sessionId,
    title: userName,
  }

  try {
    const res = await extra.api.post<IReturnData>(`/cards`, data)
    if (!res.data || res?.status !== 200) {
      throw new Error()
    }

    if (res?.data?.participant && res?.data?.participant?.has_picked_own_card) {
      dispatch(
        participantsActions.setPickedCard({
          participantId: res?.data?.participant?._id,
          isPickCard: true,
        })
      )
    }

    alertMessage({
      type: 'success',
      message: 'Карточка успешно создана',
    })

    return res.data
  } catch (error) {
    const message =
      error?.response?.data?.error ?? 'Что-то пошло не так, попробуйте еще раз'
    alertMessage({
      type: 'error',
      message,
    })
    return rejectWithValue(message || 'Ошибка создания карточки')
  }
})
