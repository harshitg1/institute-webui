import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react"
import type { User } from "@/types/models"

interface UserTableProps {
  data: User[]
  onEdit: (user: User) => void
  onDelete: (userId: string) => void
}

export function UserTable({ data, onEdit, onDelete }: UserTableProps) {
  return (
    <Table>
        <TableHeader className="bg-zinc-50/80">
          <TableRow className="hover:bg-transparent border-zinc-100">
            <TableHead className="w-[40px]">
              <Checkbox className="rounded" />
            </TableHead>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-zinc-500">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((user) => (
              <TableRow key={user.id} className="cursor-pointer" onClick={() => onEdit(user)}>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox className="rounded" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-[10px] bg-zinc-100 text-zinc-600">
                        {(user.firstName?.[0] || user.email[0]).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-[13px] text-zinc-900 leading-none">
                        {user.firstName && user.lastName 
                          ? `${user.firstName} ${user.lastName}` 
                          : user.email.split('@')[0]}
                      </span>
                      <span className="text-[11px] text-zinc-400 mt-0.5">{user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="rounded-md font-medium text-[10px] py-0 px-1.5 border-zinc-200 text-zinc-600 bg-zinc-50">
                    {user.role || 'N/A'}
                  </Badge>
                </TableCell>
                <TableCell className="text-zinc-500 text-[12px]">
                   {user.organizationId || 'None'}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel className="text-[11px]">Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(user); }}>
                        <Edit className="mr-2 h-3.5 w-3.5" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); /* View logic */ }}>
                        <Eye className="mr-2 h-3.5 w-3.5" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600"
                        onClick={(e) => { e.stopPropagation(); onDelete(user.id); }}
                      >
                        <Trash className="mr-2 h-3.5 w-3.5" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
  )
}
