import { StateSchema } from '@/app/providers/StoreProvider'

export const getOnboardingIsOpen = (state: StateSchema) =>
  state?.onboarding?.isOpen ?? false
