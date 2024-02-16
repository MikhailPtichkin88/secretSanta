import { StateSchema } from '@/app/providers/StoreProvider'

export const getCommentIsLoading = (state: StateSchema) =>
  state?.comment?.isLoading ?? false
