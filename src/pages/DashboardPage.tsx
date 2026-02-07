import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logout } from '@/features/auth/authSlice'
import { Button } from '@/components/ui/button'
import { UserTable } from '@/features/dashboard/components/UserTable'
import { useGetUsersQuery, useDeleteUserMutation } from '@/api/apiSlice'
import { Loader2, Plus } from 'lucide-react'
import { PageHeader, PageContainer, PageContent } from '@/components/ui/page-header'

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  
  // RTK Query Hooks
  const { data: users = [], isLoading, isError } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId).unwrap()
      } catch (error) {
        console.error('Failed to delete user', error)
      }
    }
  }

  return (
    <PageContainer>
      <PageHeader 
        title="Dashboard" 
        description={`Welcome back, ${user?.email || 'User'}!`}
      >
        <Button onClick={() => {}} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
        <Button onClick={handleLogout} variant="destructive">
          Logout
        </Button>
      </PageHeader>

      <PageContent>
        <div className="h-full overflow-y-auto rounded-lg border border-zinc-200 bg-white">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
            </div>
          ) : isError ? (
            <div className="p-8 text-center text-red-500 text-[13px]">
              Failed to load users. Please try again.
            </div>
          ) : (
            <UserTable 
              data={users} 
              onEdit={(user) => console.log('Edit', user)}
              onDelete={handleDeleteUser}
            />
          )}
        </div>
      </PageContent>
    </PageContainer>
  )
}
