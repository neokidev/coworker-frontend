import { MainLayout } from '@/components/Layout'
import { MemberTable } from '@/features/members/MemberTable'

export default function Members() {
  return (
    <MainLayout title="メンバー一覧">
      <MemberTable />
    </MainLayout>
  )
}
