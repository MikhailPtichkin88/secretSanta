import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User, UserSchema } from '../types/userSchema'
import { LOCAL_STORAGE_USER_TOKEN } from '@/shared/const/const'
import { deleteUserAvatar } from '../services/deleteUserAvatar'
import { updateUser } from '../services/updateUser'

const initialState: UserSchema = {
  _inited: false,
  error: undefined,
  isLoading: false,
  user: {},
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //login, register, me
    setUserData: (state, { payload }: PayloadAction<User>) => {
      state._inited = true
      state.user = payload
    },

    //logout
    clearUserData: (state) => {
      state._inited = false
      state.user = {}
      localStorage.removeItem(LOCAL_STORAGE_USER_TOKEN)
    },
  },
  extraReducers: (builder) => {
    builder
      // delete avatar
      .addCase(deleteUserAvatar.fulfilled, (state) => {
        state.error = undefined
        state.isLoading = false
        state.user.avatarUrl = null
      })
      .addCase(deleteUserAvatar.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(deleteUserAvatar.rejected, (state, { error }) => {
        state.error = error.message
        state.isLoading = false
      })
      // update user data
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.error = undefined
        state.isLoading = false
        state.user = payload
        if (state.user.avatarUrl) {
          state.user.avatarUrl = state.user.avatarUrl =
            state.user.avatarUrl +
            `?lastmod=${String(Math.floor(Math.random() * 1000))}`
        }
      })
      .addCase(updateUser.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.error = error.message
        state.isLoading = false
      })
  },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
