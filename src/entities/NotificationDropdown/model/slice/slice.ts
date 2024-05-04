import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'
import { INotificationSchema } from '../types/notificationsSchema'
import { getNotifications } from '../services/getNotifications'
import { getNotificationCount } from '../services/getNotificationCount'

const initialState: INotificationSchema = {
  notifications: [],
  total: 0,
  isLoading: false,
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    updateNotifications: (state, { payload }: PayloadAction<string>) => {
      const session = current(state.notifications)?.find(
        (el) => el.sessionId === payload
      )
      if (session) {
        state.notifications = current(state.notifications)?.filter((el) => {
          return el.sessionId !== payload
        })
        state.total = state.total - session.count
      }
    },
    resetIsLoading: (state) => {
      state.isLoading = false
    },
    reset: (state) => {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.notifications = payload
        state.total = payload.reduce((acc, el) => acc + el.count, 0)
      })
      .addCase(getNotificationCount.fulfilled, (state, { payload }) => {
        const index = current(state.notifications).findIndex(
          (el) => el.sessionId === payload.sessionId
        )
        if (index !== -1) {
          state.notifications[index].count =
            (state.notifications[index].count ?? 0) + 1
        } else {
          state.notifications.push({
            sessionId: payload.sessionId,
            sessionTitle: payload.sessionTitle,
            count: 1,
          })
        }
        state.total = state.total + 1
        state.isLoading = false
      })
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNotificationCount.pending, (state) => {
        state.isLoading = true
      })
  },
})

export const { actions: notificationsActions } = notificationsSlice
export const { reducer: notificationsReducer } = notificationsSlice
