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
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.email || 'User'}!
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => {}} className="gap-2">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-1">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500">
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
