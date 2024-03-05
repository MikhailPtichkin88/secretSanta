import { onboardingActions } from '@/entities/Onboarding'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Card } from '@/shared/ui/Card'
import { ProfileCard } from '@/widgets/ProfileCard'
import cls from './ProfilePage.module.scss'

export const ProfilePage = () => {
  const onboardingShown = localStorage.getItem('profile_onboarding_shown')
  const dispatch = useAppDispatch()

  if (!onboardingShown) {
    dispatch(onboardingActions.setIsOpen(true))
    localStorage.setItem('profile_onboarding_shown', 'true')
  }

  return (
    <Card className={cls.profilePage}>
      <ProfileCard />
    </Card>
  )
}
