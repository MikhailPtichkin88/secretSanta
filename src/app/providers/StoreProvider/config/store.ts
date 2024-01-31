import { configureStore } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from './stateSchema'
import { userReducer } from '@/entities/User/model/slice/userSlice'
import { $api } from '@/shared/api/axios'
import { authReducer } from '@/features/Authorization'
import { profileReducer } from '@/entities/ProfileForm'
import { profileSessionsReducer } from '@/features/ProfileSessions'
import { createSessionReducer } from '@/features/CreateSessionForm'

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
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: extraArg } }),
    devTools: __IS_DEV__,
    preloadedState: initialState,
  })
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
