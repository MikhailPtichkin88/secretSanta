import { ProfileCard } from '@/features/ProfileCard'
import { Card } from '@/shared/ui/Card'
import cls from './ProfilePage.module.scss'
import { useSelector } from 'react-redux'
import { getUserId } from '@/entities/User'

export const ProfilePage = () => {
  const id = useSelector(getUserId)
  console.log(id)
  return (
    <Card className={cls.profilePage}>
      <ProfileCard />
    </Card>
  )
}
