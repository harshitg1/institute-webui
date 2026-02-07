import { useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { courses } from "../data/mockData"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  PlayCircle, 
  CheckCircle, 
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Maximize2,
  Settings2,
  Layers3
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { Course } from "../types/course.types"

export default function CoursePlayer() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  
  const course = courses.find(c => c.id === courseId) as Course | undefined
  const currentLesson = course?.lessons.find(l => l.id === lessonId)
  const currentLessonIndex = course?.lessons.findIndex(l => l.id === lessonId) ?? -1
  
  const nextLesson = course?.lessons[currentLessonIndex + 1]
  const prevLesson = course?.lessons[currentLessonIndex - 1]
  
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [lessonId])
  
  if (!course || !currentLesson) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6 max-w-sm px-6">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <Layers3 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Access Protocol Fault</h2>
          <p className="text-sm text-slate-500 font-medium">The requested course architecture or lesson node could not be localized within the system.</p>
          <Button onClick={() => navigate("/dashboard/student")} className="rounded-xl w-full h-12 bg-slate-900 font-bold uppercase tracking-widest text-[10px]">
            Return to Node List
          </Button>
        </div>
      </div>
    )
  }

  const completedLessons = Math.round((course.progress / 100) * course.lessons.length)

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] overflow-hidden bg-slate-50/30 font-sans">
      
      {/* Precision Header */}
      <div className="flex items-center justify-between px-8 py-3 border-b border-slate-100 bg-white/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-6">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-xl h-10 w-10 border-slate-100 hover:border-slate-200 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-slate-900" />
          </Button>
          <div className="min-w-0">
             <div className="flex items-center gap-3">
                <h1 className="text-sm font-bold text-slate-900 tracking-tight uppercase truncate">{course.title}</h1>
                <Badge className="bg-emerald-50 text-emerald-600 border-none rounded-md px-2 py-0 text-[9px] font-bold">SYSTEM ACTIVE</Badge>
             </div>
             <div className="flex items-center gap-3 mt-0.5">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{course.instructor} • {course.lessons.length} Nodes</p>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
           <div className="hidden md:flex flex-col items-end gap-1.5 min-w-[120px]">
              <div className="flex items-center justify-between w-full">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Protocol Progress</span>
                <span className="text-[9px] font-bold text-violet-600">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="w-full h-1 bg-slate-100" />
           </div>
           <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 text-slate-400">
              <Settings2 className="w-4.5 h-4.5" />
           </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden flex-col lg:row-reverse lg:flex-row-reverse shadow-inner">
        
        {/* Navigation Rail (Lesson List) */}
        <div className="w-full lg:w-[400px] border-l border-slate-100 bg-white flex flex-col z-10">
          <div className="p-6 border-b border-slate-50 bg-slate-50/30">
            <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-slate-400 mb-4">Architecture Nodes</h3>
            <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex items-center justify-between">
               <div>
                  <p className="text-[10px] font-bold text-slate-900 uppercase">Current Validation</p>
                  <p className="text-[10px] font-semibold text-slate-400">{completedLessons} of {course.lessons.length} Verified</p>
               </div>
               <div className="h-10 w-10 rounded-full border-[3px] border-violet-100 border-t-violet-600 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-slate-900">{course.progress}%</span>
               </div>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-1.5">
              {course.lessons.map((lesson, index) => {
                const isActive = lesson.id === lessonId
                const isCompleted = index < completedLessons
                
                return (
                  <Link 
                    key={lesson.id} 
                    to={`/dashboard/student/learn/course/${course.id}/lesson/${lesson.id}`}
                    className="block outline-none"
                  >
                    <div className={cn(
                        "flex items-start gap-4 p-4 rounded-xl transition-all duration-300 border border-transparent",
                        isActive ? "bg-slate-900 border-slate-900 shadow-xl shadow-slate-200" : "hover:bg-slate-50",
                        !isActive && isCompleted && "opacity-80"
                      )}>
                      <div className="mt-0.5 flex-shrink-0">
                        {isCompleted ? (
                          <div className={cn("h-6 w-6 rounded-lg flex items-center justify-center", isActive ? "bg-white/10 text-emerald-400" : "bg-emerald-50 text-emerald-600")}>
                            <CheckCircle className="h-4 w-4" />
                          </div>
                        ) : isActive ? (
                          <div className="h-6 w-6 rounded-lg bg-violet-600 text-white flex items-center justify-center animate-pulseShadow">
                            <PlayCircle className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="h-6 w-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                             {(index + 1).toString().padStart(2, '0')}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-xs font-bold leading-tight uppercase tracking-tight line-clamp-2 transition-colors",
                          isActive ? "text-white" : "text-slate-900",
                        )}>
                          {lesson.title}
                        </p>
                        <div className="mt-1.5 flex items-center gap-2">
                           <Clock className={cn("h-3 w-3", isActive ? "text-violet-400" : "text-slate-300")} />
                           <span className={cn("text-[9px] font-semibold uppercase tracking-widest", isActive ? "text-slate-400" : "text-slate-400")}>
                             {lesson.duration} Node Latency
                           </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Cinematic Stage (Video + Content) */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50/50">
          <div className="p-8 space-y-10 max-w-5xl mx-auto w-full">
            {/* Stage Container */}
            <div className="relative group">
               <div className="absolute inset-x-4 -bottom-4 h-12 bg-slate-900/10 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
               <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-900 shadow-2xl overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <div className="w-full h-full flex items-center justify-center bg-slate-900">
                        <div className="flex flex-col items-center gap-4 text-slate-500">
                          <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
                          <p className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono">Initializing Protocol...</p>
                        </div>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full h-full relative"
                      >
                        <iframe
                          key={currentLesson.id}
                          src={currentLesson.videoUrl}
                          title={currentLesson.title}
                          className="w-full h-full"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg bg-black/40 backdrop-blur-md border-white/10 text-white hover:bg-black/60">
                             <Maximize2 className="w-4 h-4" />
                           </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </AspectRatio>
               </div>
            </div>
            
            {/* Logic Metadata */}
            <div className="space-y-10 px-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200/60">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-slate-900 text-white rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase">NODE {(currentLessonIndex + 1).toString().padStart(2, '0')}</Badge>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{course.category} Protocol</span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight uppercase">
                    {currentLesson.title}
                  </h2>
                </div>
                
                <div className="flex items-center gap-4">
                   <Button
                    variant="outline"
                    onClick={() => prevLesson && navigate(`/dashboard/student/learn/course/${course.id}/lesson/${prevLesson.id}`)}
                    disabled={!prevLesson}
                    className="rounded-xl border-slate-200 h-12 px-6 gap-3 font-bold text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all active:scale-95"
                   >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                   </Button>
                   <Button
                    onClick={() => nextLesson && navigate(`/dashboard/student/learn/course/${course.id}/lesson/${nextLesson.id}`)}
                    disabled={!nextLesson}
                    className="rounded-xl bg-violet-600 hover:bg-violet-700 h-12 px-8 gap-3 font-bold text-xs uppercase tracking-widest shadow-xl shadow-violet-200 transition-all active:scale-95 text-white border-none"
                   >
                    Next Logic Node
                    <ChevronRight className="h-4 w-4" />
                   </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 <div className="md:col-span-2 space-y-6">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                      Protocol Overview
                    </h3>
                    <p className="leading-relaxed text-slate-500 font-medium text-base text-justify">
                      {currentLesson.summary}
                    </p>
                 </div>
                 
                 <div className="space-y-6">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em]">Contextual Assets</h3>
                    <div className="space-y-3">
                       {["Architecture Specs.pdf", "Validation Checklist.xlsx"].map(file => (
                         <div key={file} className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100 transition-all hover:border-violet-200 cursor-pointer group">
                           <div className="flex items-center gap-3">
                              <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-violet-600" />
                              <span className="text-[10px] font-bold text-slate-600 truncate">{file}</span>
                           </div>
                           <Badge className="bg-slate-50 border-none text-[8px] font-bold text-slate-400 px-2 py-0.5">DL</Badge>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
