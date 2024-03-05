import { StateSchema } from '@/app/providers/StoreProvider'

export const getOnboardingStepNumber = (state: StateSchema) =>
  state?.onboarding?.stepNumber ?? 0
