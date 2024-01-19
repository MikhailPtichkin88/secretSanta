import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileCity = (state: StateSchema) => state?.profile?.city ?? ''
