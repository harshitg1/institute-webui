import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserDialog } from "../components/UserDialog"
import { users as initialUsers } from "../data/mockData"
import { UserTable } from "../components/UserTable"

export default function DashboardUsers() {
  const [users, setUsers] = useState(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddUser = () => {
    setSelectedUser(null)
    setIsDialogOpen(true)
  }

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  const handleSaveUser = (user: any) => {
    if (selectedUser) {
      // Edit existing user
      setUsers(users.map((u) => (u.id === user.id ? user : u)))
    } else {
      // Add new user
      setUsers([...users, user])
    }
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== userId))
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">User Management</h2>
          <p className="text-sm text-slate-500">Manage users, roles, and permissions.</p>
        </div>
        <Button onClick={handleAddUser} className="rounded-xl h-10 px-5 text-[13.5px] font-bold">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-slate-200 bg-card text-card-foreground shadow-sm"
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full rounded-2xl pl-9 md:w-[300px]"
                />
              </div>
              <Button variant="outline" size="icon" className="rounded-2xl">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <UserTable
            data={filteredUsers} 
            onEdit={handleEditUser} 
            onDelete={handleDeleteUser} 
          />
        </div>
      </motion.div>

      <UserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </div>
  )
}
