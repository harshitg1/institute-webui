import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
  Users,
  BookOpen,
  Layers,
  TrendingUp,
  ArrowUpRight,
  BarChart3,
  Activity,
  Zap,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  useGetStudentsQuery,
  useGetBatchesQuery,
  useGetCoursesQuery,
} from "@/api/apiSlice"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
}

// Mini sparkline SVG component for flair
function Sparkline({ color = "#8b5cf6" }: { color?: string }) {
  return (
    <svg viewBox="0 0 80 32" className="w-20 h-8 opacity-60">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="0,28 8,24 16,26 24,18 32,20 40,12 48,16 56,8 64,14 72,6 80,10"
      />
    </svg>
  )
}

export default function DashboardHome() {
  const navigate = useNavigate()
  const { data: studentsRes, isLoading: isLoadingStudents } = useGetStudentsQuery()
  const { data: batchesRes, isLoading: isLoadingBatches } = useGetBatchesQuery()
  const { data: coursesRes, isLoading: isLoadingCourses } = useGetCoursesQuery()

  const studentsCount = studentsRes?.data?.length || 0
  const batchesCount = (batchesRes as any)?.data?.length || (batchesRes as any)?.length || 0
  const coursesCount = coursesRes?.data?.length || 0

  const stats = [
    {
      label: "Active Students",
      value: isLoadingStudents ? "—" : studentsCount,
      change: "+12%",
      changePositive: true,
      icon: Users,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-500",
      sparkColor: "#8b5cf6",
    },
    {
      label: "Live Batches",
      value: isLoadingBatches ? "—" : batchesCount,
      change: "+3",
      changePositive: true,
      icon: Layers,
      iconBg: "bg-sky-500/10",
      iconColor: "text-sky-500",
      sparkColor: "#0ea5e9",
    },
    {
      label: "Courses Published",
      value: isLoadingCourses ? "—" : coursesCount,
      change: "Active",
      changePositive: true,
      icon: BookOpen,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
      sparkColor: "#10b981",
    },
    {
      label: "Completion Rate",
      value: "78%",
      change: "+5%",
      changePositive: true,
      icon: BarChart3,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-500",
      sparkColor: "#f59e0b",
    },
  ]

  const quickActions = [
    {
      title: "Student Management",
      desc: "View enrollments & batches",
      icon: Users,
      path: "/dashboard/students",
      gradient: "from-violet-600 to-indigo-600",
    },
    {
      title: "Course Catalog",
      desc: "Create or manage courses",
      icon: BookOpen,
      path: "/dashboard/courses",
      gradient: "from-emerald-600 to-teal-600",
    },
    {
      title: "Batch Operations",
      desc: "Assign students to batches",
      icon: Layers,
      path: "/dashboard/students",
      gradient: "from-sky-600 to-cyan-600",
    },
  ]

  return (
    <div className="space-y-8 pb-10">
      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 md:p-10 text-white"
      >
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/20 rounded-full blur-[100px] -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-emerald-500/15 rounded-full blur-[80px] -mb-16" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-sky-500/10 rounded-full blur-[60px]" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-emerald-300 border border-white/10">
              <Activity className="w-3 h-3" />
              Live Dashboard
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Trading Institute
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">
                Command Center
              </span>
            </h1>
            <p className="max-w-md text-slate-400 text-sm leading-relaxed">
              Monitor real-time enrollments, course performance, and batch
              analytics. Everything you need to scale your trading education
              business.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-3">
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-white mt-1">₹12.4L</p>
              <p className="text-xs text-emerald-400 font-medium flex items-center justify-end mt-1">
                <TrendingUp className="w-3 h-3 mr-1" /> +24% this month
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stat cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Card className="rounded-2xl border-slate-200/80 bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div
                    className={`h-10 w-10 ${stat.iconBg} ${stat.iconColor} rounded-xl flex items-center justify-center`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <Sparkline color={stat.sparkColor} />
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">
                      {stat.value}
                    </span>
                    <span
                      className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${
                        stat.changePositive
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Quick actions */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Quick Actions
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.title}
              custom={i + 4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              onClick={() => navigate(action.path)}
              className="group cursor-pointer"
            >
              <Card className="rounded-2xl border-slate-200/80 bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-11 w-11 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white shadow-lg shadow-slate-200/50`}
                      >
                        <action.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">
                          {action.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {action.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent activity / performance hint */}
      <section>
        <motion.div
          custom={7}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Card className="rounded-2xl border-slate-200/80 bg-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-violet-500/10 text-violet-600 rounded-xl flex items-center justify-center">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">
                      Performance Overview
                    </h3>
                    <p className="text-xs text-slate-500">Last 30 days</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs rounded-xl gap-1 text-slate-500"
                >
                  View Details <ArrowUpRight className="w-3 h-3" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  {
                    label: "Avg. Session",
                    value: "42 min",
                    sub: "per student",
                  },
                  {
                    label: "Course Completion",
                    value: "78%",
                    sub: "across all",
                  },
                  {
                    label: "New Enrollments",
                    value: "156",
                    sub: "this month",
                  },
                  {
                    label: "Revenue Growth",
                    value: "+24%",
                    sub: "vs last month",
                  },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-2xl font-bold text-slate-900 tracking-tight">
                      {item.value}
                    </p>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                      {item.label}
                    </p>
                    <p className="text-[10px] text-slate-400">{item.sub}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}
