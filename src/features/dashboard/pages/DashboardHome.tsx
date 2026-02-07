import { motion } from "framer-motion"
import { Download, Plus, Star, Users, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { apps, recentFiles, projects } from "../data/mockData"
import { cn } from "@/lib/utils"

export default function DashboardHome() {
  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
           <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome Home</h2>
           <p className="text-slate-500 mt-1">Here is what's happening with your creative suite today.</p>
        </div>
        <div className="hidden md:flex gap-2">
          <Button variant="outline" className="rounded-2xl">
            <Download className="mr-2 h-4 w-4" />
            Install App
          </Button>
          <Button className="rounded-2xl">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      <section>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-slate-900 p-10 md:p-14 text-white shadow-2xl shadow-slate-200"
        >
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
          
          <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="space-y-6">
              <Badge className="bg-violet-600 text-white hover:bg-violet-700 px-4 py-0.5 rounded-full border-none text-[10px] font-bold uppercase tracking-widest">Dashboard</Badge>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15]">
                Revolutionize Your <br />
                <span className="text-violet-400">Creative Workflow</span>
              </h2>
              <p className="max-w-[550px] text-lg text-slate-400 leading-relaxed font-semibold opacity-90">
                Access your entire toolkit in one place. Streamline your design process with professional features designed for scale.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="rounded-2xl bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 h-auto font-bold text-base shadow-xl shadow-white/10">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/5 px-8 py-6 h-auto font-bold text-base"
                >
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recent Apps</h2>
          <Button variant="ghost" className="rounded-2xl">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {apps
            .filter((app) => app.recent)
            .map((app) => (
              <motion.div key={app.name} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white ring-0 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                        <app.icon className={cn("h-6 w-6", app.color)} />
                      </div>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-colors">
                        <Star className="h-4.5 w-4.5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-5">
                    <CardTitle className="text-xl font-bold text-slate-900 leading-none">{app.name}</CardTitle>
                    <CardDescription className="text-slate-500 font-semibold mt-2 truncate text-xs">{app.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" className="w-full rounded-xl border-slate-200 hover:bg-slate-50 font-bold group h-10 text-xs">
                      Open App
                      <Plus className="ml-2 h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recent Files</h2>
            <Button variant="ghost" className="rounded-2xl">
              View All
            </Button>
          </div>
          <div className="rounded-3xl border">
            <div className="grid grid-cols-1 divide-y">
              {recentFiles.slice(0, 4).map((file) => (
                <motion.div
                  key={file.name}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                      <file.icon className={file.color} />
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {file.app} • {file.modified}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.shared && (
                      <Badge variant="outline" className="rounded-xl">
                        <Users className="mr-1 h-3 w-3" />
                        {file.collaborators}
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm" className="rounded-xl">
                      Open
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Active Projects</h2>
            <Button variant="ghost" className="rounded-2xl">
              View All
            </Button>
          </div>
          <div className="rounded-3xl border">
            <div className="grid grid-cols-1 divide-y">
              {projects.slice(0, 3).map((project) => (
                <motion.div
                  key={project.name}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  className="p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{project.name}</h3>
                    <Badge variant="outline" className="rounded-xl">
                      Due {project.dueDate}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2 rounded-xl" />
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {project.members} members
                    </div>
                    <div className="flex items-center">
                      <FileText className="mr-1 h-4 w-4" />
                      {project.files} files
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
