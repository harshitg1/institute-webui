import { useState } from "react"
import { Building2, Plus, RefreshCw, CheckCircle2, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

import { 
  useGetOrganizationsQuery, 
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation
} from "@/api/apiSlice"
import { DataTable } from "@/components/ui/data-table"
import type { ColumnDef, PaginationState } from "@tanstack/react-table"

export default function SuperAdminOrgs() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading, refetch } = useGetOrganizationsQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize
  })

  const [createOrganization, { isLoading: isCreating }] = useCreateOrganizationMutation()
  const [updateOrganization, { isLoading: isUpdating }] = useUpdateOrganizationMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingOrg, setEditingOrg] = useState<{id: string, name: string, active: boolean} | null>(null)
  interface OrgFormData {
    name: string;
    adminEmail: string;
    adminFirstName: string;
    adminLastName: string;
    adminPassword?: string;
    active: boolean;
  }

  const [formData, setFormData] = useState<OrgFormData>({
    name: '',
    adminEmail: '',
    adminFirstName: '',
    adminLastName: '',
    adminPassword: '',
    active: true
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: OrgFormData) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCreate = async () => {
    try {
      if (editingOrg) {
        await updateOrganization({
          id: editingOrg.id,
          data: {
             name: formData.name,
             active: formData.active !== undefined ? formData.active : true
          }
        }).unwrap()
      } else {
        await createOrganization(formData).unwrap()
      }
      setIsModalOpen(false)
      setEditingOrg(null)
      setFormData({
        name: '', adminEmail: '', adminFirstName: '', adminLastName: '', adminPassword: '', active: true
      } as any)
    } catch (err) {
      console.error('Failed to act on org', err)
      alert("Failed to perform action.")
    }
  }

  const handleEdit = (org: any) => {
    setEditingOrg(org)
    setFormData({
       name: org.name,
       active: org.active,
       adminEmail: '', adminFirstName: '', adminLastName: '', adminPassword: ''
    } as any)
    setIsModalOpen(true)
  }

  const openCreateModal = () => {
    setEditingOrg(null)
    setFormData({
      name: '', adminEmail: '', adminFirstName: '', adminLastName: '', adminPassword: '', active: true
    } as any)
    setIsModalOpen(true)
  }

  const orgs = data?.content || []
  const pageCount = data?.totalPages || 1

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Organization Name",
      cell: ({ row }) => <span className="font-medium text-slate-900">{row.getValue("name")}</span>,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <span className="text-slate-500 text-sm">
          {row.getValue("createdAt") ? new Date(row.getValue("createdAt") as string).toLocaleDateString() : 'N/A'}
        </span>
      ),
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.getValue("active") as boolean
        return isActive ? (
           <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1">
             <CheckCircle2 className="w-3 h-3" /> Active
           </Badge>
        ) : (
           <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 gap-1">
             <XCircle className="w-3 h-3" /> Inactive
           </Badge>
        )
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const org = row.original
        return (
          <div className="text-right">
            <Button variant="ghost" size="sm" onClick={() => handleEdit(org)}>
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
            <Building2 className="w-6 h-6 text-violet-600" />
            Organizations Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">Super admin controls for all tenants.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => refetch()} className="gap-2 rounded-xl">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button onClick={openCreateModal} className="gap-2 rounded-xl">
            <Plus className="w-4 h-4" />
            New Organization
          </Button>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={orgs} 
        pageCount={pageCount}
        pagination={pagination}
        onPaginationChange={setPagination}
        isLoading={isLoading}
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-0 shadow-2xl rounded-2xl bg-white">
          <div className="bg-slate-900 px-6 py-4 flex flex-col justify-end h-24 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 rounded-full blur-[40px]" />
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-[40px]" />
             <DialogTitle className="text-xl font-semibold text-white relative z-10">
               {editingOrg ? "Edit Organization" : "New Tenant Organization"}
             </DialogTitle>
             <DialogDescription className="text-slate-300 text-sm relative z-10 mt-1">
               {editingOrg ? "Update organization details and tenant status." : "Provision a new organization and assign its default administrator."}
             </DialogDescription>
          </div>

          <div className="px-6 py-6 space-y-6">
            <div className="space-y-4">
               <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Organization Details</h4>
                  <div className="space-y-1.5">
                    <Label className="text-slate-700 text-xs font-medium">Organization Name</Label>
                    <Input 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder="e.g. Acme Corp" 
                      className="rounded-xl bg-slate-50 border-slate-200 shadow-sm focus-visible:ring-violet-500 h-10"
                    />
                  </div>
                  <div className="space-y-1.5 mt-4">
                    {editingOrg && (
                      <div className="flex items-center gap-2 mt-4 border-t pt-4">
                        <input 
                          type="checkbox" 
                          id="active-status" 
                          checked={(formData as any).active}
                          onChange={(e) => setFormData((prev: OrgFormData) => ({...prev, active: e.target.checked}))}
                          className="w-4 h-4 text-violet-600 rounded bg-slate-100 border-slate-300"
                        />
                        <Label htmlFor="active-status" className="text-sm font-medium text-slate-700">Organization Active</Label>
                      </div>
                    )}
                  </div>
               </div>

               {!editingOrg && (
                 <div className="pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Administrator Credentials</h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1.5">
                      <Label className="text-slate-700 text-xs font-medium">First Name</Label>
                      <Input 
                        name="adminFirstName" 
                        value={formData.adminFirstName} 
                        onChange={handleInputChange} 
                        placeholder="John" 
                        className="rounded-xl bg-slate-50 border-slate-200 shadow-sm focus-visible:ring-violet-500 h-10"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-slate-700 text-xs font-medium">Last Name</Label>
                      <Input 
                        name="adminLastName" 
                        value={formData.adminLastName} 
                        onChange={handleInputChange} 
                        placeholder="Doe" 
                        className="rounded-xl bg-slate-50 border-slate-200 shadow-sm focus-visible:ring-violet-500 h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-slate-700 text-xs font-medium">Admin Email</Label>
                      <Input 
                        name="adminEmail" 
                        type="email" 
                        value={formData.adminEmail} 
                        onChange={handleInputChange} 
                        placeholder="admin@acme.com" 
                        className="rounded-xl bg-slate-50 border-slate-200 shadow-sm focus-visible:ring-violet-500 h-10"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <Label className="text-slate-700 text-xs font-medium">Temporary Password</Label>
                      <Input 
                        name="adminPassword" 
                        type="password" 
                        value={formData.adminPassword} 
                        onChange={handleInputChange} 
                        placeholder="••••••••" 
                        className="rounded-xl bg-slate-50 border-slate-200 shadow-sm focus-visible:ring-violet-500 h-10"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">Requires uppercase, lowercase, numbers, and special characters.</p>
                    </div>
                  </div>
                 </div>
               )}
            </div>
          </div>
          
          <DialogFooter className="px-6 py-4 border-t bg-slate-50 flex items-center justify-end gap-2">
            <Button variant="ghost" className="rounded-xl text-slate-500 hover:text-slate-700 bg-transparent hover:bg-slate-100" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="rounded-xl shadow-sm px-6 bg-violet-600 hover:bg-violet-700 text-white" 
              onClick={handleCreate} 
              disabled={editingOrg ? (isUpdating || !formData.name) : (isCreating || !formData.name || !formData.adminEmail || !formData.adminPassword)}
            >
              {editingOrg ? (isUpdating ? "Updating..." : "Save Changes") : (isCreating ? "Provisioning..." : "Create Tenant")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
