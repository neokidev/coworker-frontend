import { MainLayout } from '@/components/Layout'
import { FormValues, MemberForm } from '@/features/members/MemberForm'
import { SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useGetMember, useUpdateMember } from '@/features/members/useMembers'

export default function Edit() {
  const router = useRouter()
  const id = router.query.id as string
  const { data, isLoading } = useGetMember(id)
  const { updateMember } = useUpdateMember(() => {
    router.push('/members')
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    updateMember(id, data)
  }

  if (isLoading) {
    return null
  }

  return (
    <MainLayout title="メンバー編集">
      <MemberForm
        initialValues={{
          firstName: data?.firstName || '',
          lastName: data?.lastName || '',
          email: data?.email || '',
        }}
        onSubmit={onSubmit}
      />
    </MainLayout>
  )
}
