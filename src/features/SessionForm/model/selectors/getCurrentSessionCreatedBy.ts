import { StateSchema } from '@/app/providers/StoreProvider'

export const getCurrentSessionCreatedBy = (state: StateSchema) =>
  state?.currentSession?.session?.created_by
