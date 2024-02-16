import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProfileSchema } from '../types/profileSchema'
import { User } from '@/entities/User'

const initialState: ProfileSchema = {
  fullName: '',
  email: '',
  city: '',
  age: '',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, { payload }: PayloadAction<User>) => {
      state.fullName = payload.fullName
      state.email = payload.email
      state.age = String(payload.age ?? '')
      state.city = payload.city
    },
    setProfileName: (state, { payload }: PayloadAction<string>) => {
      state.fullName = payload
    },
    setProfileEmail: (state, { payload }: PayloadAction<string>) => {
      state.email = payload
    },
    setProfileCity: (state, { payload }: PayloadAction<string>) => {
      state.city = payload
    },
    setProfileAge: (state, { payload }: PayloadAction<string>) => {
      if (!Number.isNaN(Number(payload))) {
        state.age = payload
      }
    },
  },
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
