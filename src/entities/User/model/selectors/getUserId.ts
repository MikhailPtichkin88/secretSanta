import { StateSchema } from '@/app/providers/StoreProvider'

export const getUserId = (state: StateSchema) => state?.user?.user?._id
