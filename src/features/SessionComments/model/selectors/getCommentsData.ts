import { StateSchema } from '@/app/providers/StoreProvider'

export const getCommentsData = (state: StateSchema) =>
  state?.comment?.comments ?? []
