import { getOnboardingStepNumber } from './model/selectors/getOnboardingStep'
import { getOnboardingIsOpen } from './model/selectors/getOnboardingOpen'
export { Onboarding as default } from './ui/Onboarding'
export type { OnboardingSchema } from './model/types/OnboardingSchema'
export {
  onboardingActions,
  onboardingReducer,
} from './model/slice/OnboardingSlice'
export { getOnboardingIsOpen, getOnboardingStepNumber }
