import { useState } from "react"
import { Users as UsersIcon, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserDialog } from "../components/UserDialog"

import { useGetUsersQuery } from "@/api/apiSlice"
import { DataTable } from "@/components/ui/data-table"
import type { ColumnDef, PaginationState } from "@tanstack/react-table"

export default function DashboardUsers() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data: usersData, isLoading } = useGetUsersQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const users = usersData?.content || []
  const pageCount = usersData?.totalPages || 1

  const handleAddUser = () => {
    setSelectedUser(null)
    setIsDialogOpen(true)
  }

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "User",
      cell: ({ row }) => {
        const user = row.original
        const initials = `${(user.firstName?.[0] || user.email[0]).toUpperCase()}${(user.lastName?.[0] || '').toUpperCase()}`
        return (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-semibold text-sm">
              {initials}
            </div>
            <div>
              <div className="font-medium text-slate-900">{user.firstName} {user.lastName}</div>
              <div className="text-sm text-slate-500">{user.email}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "roles",
      header: "Role",
      cell: ({ row }) => {
        const roles = row.getValue("roles") as string | string[]
        const roleStr = Array.isArray(roles) ? roles.join(', ') : roles || 'Unknown'
        return (
          <Badge variant="secondary" className="font-medium">
             {roleStr.replace('ROLE_', '')}
          </Badge>
        )
      },
    },
    {
      accessorKey: "organizationId",
      header: "Tenant Reference",
      cell: ({ row }) => (
        <span className="text-xs text-slate-400 font-mono">
          {row.getValue("organizationId") || 'Global'}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="text-right">
            <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
              Edit
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <UsersIcon className="w-6 h-6 text-violet-600" />
            User Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manage tenant users, assign roles, and handle access control.</p>
        </div>
        <Button onClick={handleAddUser} className="rounded-xl h-10 px-5 text-[13.5px] font-bold">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={users} 
        pageCount={pageCount}
        pagination={pagination}
        onPaginationChange={setPagination}
        isLoading={isLoading}
      />

      <UserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        user={selectedUser}
        onSave={() => setIsDialogOpen(false)}
      />
    </div>
  )
}
