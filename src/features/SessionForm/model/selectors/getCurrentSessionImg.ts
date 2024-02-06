import { StateSchema } from '@/app/providers/StoreProvider'

export const getCurrentSessionImg = (state: StateSchema) =>
  state?.currentSession?.session?.session_img
