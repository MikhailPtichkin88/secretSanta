import { StateSchema } from '@/app/providers/StoreProvider'

export const getUserIsInited = (state: StateSchema) =>
  state?.user?._inited ?? false
