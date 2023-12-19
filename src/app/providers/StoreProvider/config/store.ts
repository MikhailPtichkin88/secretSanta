import { configureStore } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from './stateSchema'
import { userReducer } from '@/entities/User/model/slice/userSlice'
import { $api } from '@/shared/api/axios'
import { authReducer } from '@/features/Authorization'

const extraArg: ThunkExtraArg = {
  api: $api,
}

export function createReduxStore(initialState?: StateSchema) {
  return configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: extraArg } }),
    devTools: __IS_DEV__,
    preloadedState: initialState,
  })
}
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
