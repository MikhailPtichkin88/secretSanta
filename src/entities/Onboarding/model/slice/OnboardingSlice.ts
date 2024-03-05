import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { OnboardingSchema } from '../types/OnboardingSchema'

const initialState: OnboardingSchema = {
  isOpen: false,
  stepNumber: 0,
  canSeeOnboarding: false,
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setIsOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpen = payload
    },
    setCanSeeOnboarding: (state, { payload }: PayloadAction<boolean>) => {
      state.canSeeOnboarding = payload
    },
    setStepNumber: (state, { payload }: PayloadAction<number>) => {
      state.stepNumber = payload
    },
  },
})

export const { actions: onboardingActions } = onboardingSlice
export const { reducer: onboardingReducer } = onboardingSlice
