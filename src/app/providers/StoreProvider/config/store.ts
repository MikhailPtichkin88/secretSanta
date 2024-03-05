import { configureStore } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from './stateSchema'
import { userReducer } from '@/entities/User/model/slice/userSlice'
import { $api } from '@/shared/api/axios'
import { authReducer } from '@/features/Authorization'
import { profileReducer } from '@/entities/ProfileForm'
import { profileSessionsReducer } from '@/features/ProfileSessions'
import { createSessionReducer } from '@/features/CreateSessionForm'
import { currentSessionReducer } from '@/features/SessionForm'
import { participantsReducer } from '@/features/SessionParticipants'
import { cardsBlockReducer } from '@/features/CardsBlock'
import { cardSliceReducer } from '@/features/CardEditForm'
import { commentReducer } from '@/features/SessionComments/model/slice/commentSlice'
import { onboardingReducer } from '@/entities/Onboarding'

const extraArg: ThunkExtraArg = {
  api: $api,
}

export function createReduxStore(initialState?: StateSchema) {
  return configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      profile: profileReducer,
      profileSessions: profileSessionsReducer,
      createSession: createSessionReducer,
      currentSession: currentSessionReducer,
      participants: participantsReducer,
      cardsBlock: cardsBlockReducer,
      card: cardSliceReducer,
      comment: commentReducer,
      onboarding: onboardingReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: extraArg } }),
    devTools: __IS_DEV__,
    preloadedState: initialState,
  })
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
