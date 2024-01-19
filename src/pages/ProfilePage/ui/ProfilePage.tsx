import { ProfileCard } from '@/features/ProfileCard'
import { Card } from '@/shared/ui/Card'
import cls from './ProfilePage.module.scss'

export const ProfilePage = () => {
  return (
    <Card className={cls.profilePage}>
      <ProfileCard />
    </Card>
  )
}
