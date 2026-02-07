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
    <div className="rounded-2xl border border-slate-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox className="rounded-md" />
            </TableHead>
            <TableHead className="text-[13px] font-bold text-slate-500">User</TableHead>
            <TableHead className="text-[13px] font-bold text-slate-500">Role</TableHead>
            <TableHead className="text-[13px] font-bold text-slate-500">Organization ID</TableHead>
            <TableHead className="text-right text-[13px] font-bold text-slate-500">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((user) => (
              <TableRow key={user.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onEdit(user)}>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox className="rounded-md" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-[11px]">{(user.firstName?.[0] || user.email[0]).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-[13.5px] text-slate-900 leading-none">
                        {user.firstName && user.lastName 
                          ? `${user.firstName} ${user.lastName}` 
                          : user.email.split('@')[0]}
                      </span>
                      <span className="text-[11px] text-slate-400 mt-0.5">{user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="rounded-lg font-bold text-[11px] py-0 px-2 border-slate-200 text-slate-600 bg-slate-50/50">
                    {user.role || 'N/A'}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500 text-[12px] font-medium">
                   {user.organizationId || 'None'}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(user); }}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); /* View logic */ }}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600"
                        onClick={(e) => { e.stopPropagation(); onDelete(user.id); }}
                      >
                        <Trash className="mr-2 h-4 w-4" />
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
    </div>
  )
}
