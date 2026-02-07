import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logout } from '@/features/auth/authSlice'
import { Button } from '@/components/ui/button'
import { UserTable } from '@/features/dashboard/components/UserTable'
import { useGetUsersQuery, useDeleteUserMutation } from '@/api/apiSlice'
import { Loader2, Plus } from 'lucide-react'

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
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900">Dashboard</h1>
          <p className="text-zinc-500 text-[13px] mt-0.5">
            Welcome back, {user?.email || 'User'}!
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => {}} className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200">
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
    </div>
  )
}
