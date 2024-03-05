import { StateSchema } from '@/app/providers/StoreProvider'

export const getOnboardingCanSee = (state: StateSchema) =>
  state?.onboarding?.canSeeOnboarding ?? false
