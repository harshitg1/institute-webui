import { Building2, TrendingUp, Users, Activity, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

import { useGetOrganizationsQuery, useGetPlatformAdminsQuery } from "@/api/apiSlice"

export default function SuperAdminDashboard() {
  const navigate = useNavigate()
  // Fetch platform data
  const { data: orgData, isLoading: isLoadingOrgs } = useGetOrganizationsQuery()
  const { data: adminsData, isLoading: isLoadingAdmins } = useGetPlatformAdminsQuery()

  const organizations = orgData?.content || []
  const platformAdmins = adminsData?.content || []

  const totalOrgs = organizations.length
  const activeOrgs = organizations.filter(o => o.active).length
  const inactiveOrgs = totalOrgs - activeOrgs
  
  // Calculate newly onboarded orgs (last 30 days) if createdAt exists
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  const recentOrgs = organizations.filter(o => {
    if (!o.createdAt) return false
    return new Date(o.createdAt) >= thirtyDaysAgo
  }).length

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Platform Overview</h2>
          <p className="text-slate-500 mt-1">Real-time metrics and system health across all tenant organizations.</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/super-admin/orgs')}
          className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 gap-2"
        >
          <Plus className="-ml-0.5 h-4 w-4" />
          Add Organization
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Total Organizations */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-500">Total Organizations</h3>
            <div className="h-10 w-10 rounded-xl bg-violet-50 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-violet-600" />
            </div>
          </div>
          <p className="text-4xl font-bold text-slate-900 mt-4">
            {isLoadingOrgs ? "..." : totalOrgs}
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm text-emerald-600 font-medium">
            <TrendingUp className="h-4 w-4" />
            <span>+{recentOrgs} this month</span>
          </div>
        </div>

        {/* Active Organizations */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-500">Active Tenants</h3>
            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Activity className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-4xl font-bold text-slate-900 mt-4">
            {isLoadingOrgs ? "..." : activeOrgs}
          </p>
          <div className="mt-4 text-sm text-slate-500">
            {isLoadingOrgs ? "..." : ((activeOrgs / (totalOrgs || 1)) * 100).toFixed(0)}% engagement rate
          </div>
        </div>

        {/* Inactive Organizations */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-500">Inactive Tenants</h3>
            <div className="h-10 w-10 rounded-xl bg-rose-50 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-rose-600 opacity-50" />
            </div>
          </div>
          <p className="text-4xl font-bold text-slate-900 mt-4">
            {isLoadingOrgs ? "..." : inactiveOrgs}
          </p>
          <div className="mt-4 text-sm text-slate-500">
            Requires intervention
          </div>
        </div>

        {/* Platform Admins */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-500">Tenant Admins</h3>
            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <p className="text-4xl font-bold text-slate-900 mt-4">
            {isLoadingAdmins ? "..." : platformAdmins.length}
          </p>
          <div className="mt-4 text-sm text-slate-500">
            Managing organizations
          </div>
        </div>
      </motion.div>

      {/* Decorative / System Map placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between pointer-events-none blur-[0.3px]">
           <div className="space-y-4">
              <h3 className="text-2xl font-bold">Platform Diagnostics</h3>
              <p className="text-slate-400 max-w-md">
                System resources are currently optimal. Network latency across all distributed nodes is well below standard thresholds.
              </p>
           </div>
           
           <div className="mt-8 md:mt-0 flex gap-4">
             <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 flex items-center justify-center animate-spin" style={{ animationDuration: "3s"}}>
                   <div className="h-20 w-20 rounded-full bg-slate-900 border border-slate-800" />
                </div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 mt-4 font-semibold">99.9% UPTIME</span>
             </div>
             
             <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full border-4 border-blue-500/30 border-t-blue-500 flex items-center justify-center animate-spin" style={{ animationDuration: "4s"}}>
                   <div className="h-20 w-20 rounded-full bg-slate-900 border border-slate-800" />
                </div>
                <span className="text-xs uppercase tracking-widest text-blue-400 mt-4 font-semibold">12ms LATENCY</span>
             </div>
           </div>
        </div>
      </motion.div>
    </div>
  )
}
