import { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { ICard, cardsBlockActions } from '@/features/CardsBlock'
import { alertMessage } from '@/shared/lib/alertMessage/alertMessage'
import { participantsActions } from '@/features/SessionParticipants'

interface IParams {
  cardId: string
  sessionId: string
  deleteImg?: boolean
}
export type TReturnData<T> = T extends true ? ICard[] : { message: string }

export const deleteCard = createAsyncThunk<
  ICard[] | { message: string },
  IParams,
  ThunkConfig<string>
>(`cardsBlock/delete`, async (data, thunkAPI) => {
  const { extra, rejectWithValue, dispatch, getState } = thunkAPI

  const { cardId } = data

  const params: Partial<IParams> = { sessionId: data.sessionId }

  if (data?.deleteImg) {
    params.deleteImg = true
  }

  const userId = getState()?.user?.user?._id
  const participantId = getState()?.participants?.participants?.find(
    (el) => el.user?._id === userId
  )?._id

  try {
    const res = await extra.api.delete<TReturnData<typeof data.deleteImg>>(
      `/cards/${cardId}`,
      {
        params,
      }
    )
    if (!res.data || res?.status !== 200) {
      throw new Error()
    }

    if (participantId && !data.deleteImg) {
      dispatch(
        participantsActions.setPickedCard({
          participantId,
          isPickCard: false,
        })
      )
    }

    if (data.deleteImg) {
      cardsBlockActions.deleteCardImg(cardId)
    }

    alertMessage({
      type: 'success',
      message: 'Карточка успешно удалена',
    })
    return res.data
  } catch (error) {
    const message =
      error?.response?.data?.error ?? 'Что-то пошло не так, попробуйте еще раз'
    alertMessage({
      type: 'error',
      message,
    })
    return rejectWithValue(message || 'Ошибка удаления карточки')
  }
})
