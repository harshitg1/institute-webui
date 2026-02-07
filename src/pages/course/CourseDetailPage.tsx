import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  PlayCircle, 
  Star, 
  MessageSquare, 
  Share2,
  Lock,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { courses } from "@/features/dashboard/data/mockData";

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find course from global mock data or fallback
  const globalCourse = courses.find(c => c.id === id);
  
  const course = globalCourse ? {
    ...globalCourse,
    instructorRole: "Head Portfolio Manager",
    rating: 4.8,
    reviewsCount: 124,
    studentsCount: 1240,
    price: 4999,
    curriculum: [
      { 
        title: "Module 1: Market Foundations", 
        lessons: globalCourse.lessons.slice(0, 2).map(l => ({ ...l, locked: false }))
      },
      { 
        title: "Module 2: Advanced Price Action", 
        lessons: globalCourse.lessons.slice(2).map(l => ({ ...l, locked: true }))
      }
    ]
  } : {
    id,
    title: "Nifty Pro Trading Masterclass",
    description: "Master the art of Nifty trading with professional-grade strategies, risk management protocols, and live market execution.",
    instructor: "Rahul Sharma",
    instructorRole: "Head Portfolio Manager",
    rating: 4.8,
    reviewsCount: 124,
    studentsCount: 1240,
    duration: "12h 30m",
    lessonsCount: 24,
    price: 4999,
    category: "Technical Analysis",
    thumbnail: "https://images.unsplash.com/photo-1611974717482-45a0fbe05c11?w=1200",
    curriculum: [
      { 
        title: "Module 1: Market Foundations", 
        lessons: [
          { id: "l1", title: "Introduction to Indian Markets", duration: "45m", locked: false },
          { id: "l2", title: "Nifty vs Bank Nifty: The Core Differences", duration: "1h 10m", locked: false }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 font-sans selection:bg-violet-100 selection:text-violet-700">
      
      {/* Navigation Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-2xl border-b border-slate-100 px-8 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="rounded-xl h-10 w-10 border-slate-100 hover:border-slate-200 transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-slate-900" />
            </Button>
            <div className="hidden sm:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Course Catalog</p>
              <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-none uppercase">
                {course.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 text-slate-400 hover:text-slate-900">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button className="bg-slate-900 text-white font-bold h-10 px-6 rounded-xl text-xs uppercase tracking-widest shadow-xl shadow-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
               Enroll Now
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Header section */}
            <div className="space-y-6">
               <div className="flex flex-wrap gap-2">
                 <Badge className="bg-violet-600/10 text-violet-600 border-none px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                   {course.category}
                 </Badge>
                 <Badge className="bg-blue-600/10 text-blue-600 border-none px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                   Professional Suite
                 </Badge>
               </div>
               
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1] max-w-3xl">
                 {course.title}
               </h2>

               <div className="flex flex-wrap items-center gap-8 py-5 border-y border-slate-100/80">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shadow-sm">
                      <Star className="w-4.5 h-4.5 fill-amber-500" />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-900 leading-none">{course.rating}</p>
                       <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight mt-0.5">{course.reviewsCount} Reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shadow-sm">
                      <Users className="w-4.5 h-4.5" />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-900 leading-none">{course.studentsCount}</p>
                       <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight mt-0.5">Active Learners</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shadow-sm">
                      <Clock className="w-4.5 h-4.5" />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-900 leading-none">{course.duration}</p>
                       <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight mt-0.5">Intensity</p>
                    </div>
                  </div>
               </div>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList className="bg-transparent p-0 gap-10 h-auto mb-10 border-b border-slate-100 w-full justify-start rounded-none">
                <TabsTrigger 
                  value="curriculum" 
                  className="rounded-none border-b-2 border-transparent px-0 pb-4 pt-0 font-bold text-xs uppercase tracking-[0.15em] text-slate-400 data-[state=active]:border-violet-600 data-[state=active]:text-slate-900 data-[state=active]:bg-transparent shadow-none transition-all focus-visible:ring-0"
                >
                  Learning Path
                </TabsTrigger>
                <TabsTrigger 
                  value="about" 
                  className="rounded-none border-b-2 border-transparent px-0 pb-4 pt-0 font-bold text-xs uppercase tracking-[0.15em] text-slate-400 data-[state=active]:border-violet-600 data-[state=active]:text-slate-900 data-[state=active]:bg-transparent shadow-none transition-all focus-visible:ring-0"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="rounded-none border-b-2 border-transparent px-0 pb-4 pt-0 font-bold text-xs uppercase tracking-[0.15em] text-slate-400 data-[state=active]:border-violet-600 data-[state=active]:text-slate-900 data-[state=active]:bg-transparent shadow-none transition-all focus-visible:ring-0"
                >
                  Feedback
                </TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum" className="mt-0 animate-in slide-in-from-bottom-2 duration-400">
                 <div className="space-y-6">
                    {course.curriculum.map((module, idx) => (
                      <div key={idx} className="space-y-4">
                        <div className="flex items-center gap-4 px-2">
                           <div className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold transition-all group-hover:bg-violet-600">
                             {idx + 1}
                           </div>
                           <h4 className="font-bold text-slate-800 tracking-tight text-lg">{module.title}</h4>
                        </div>
                          <div className="space-y-3">
                          {module.lessons.map((lesson, lIdx) => (
                            <div 
                              key={lIdx}
                              onClick={() => !lesson.locked && navigate(`/dashboard/student/learn/course/${course.id}/lesson/${lesson.id}`)}
                              className={cn(
                                "group flex items-center justify-between p-4 px-6 rounded-2xl border transition-all",
                                lesson.locked 
                                  ? "bg-slate-50/50 border-slate-100 cursor-not-allowed" 
                                  : "bg-white border-slate-100 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-200/20 cursor-pointer"
                              )}
                            >
                              <div className="flex items-center gap-5">
                                <div className={cn(
                                  "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                                  lesson.locked ? "bg-white text-slate-300 border border-slate-100" : "bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white"
                                )}>
                                  {lesson.locked ? <Lock className="w-4 h-4" /> : <PlayCircle className="w-5 h-5" />}
                                </div>
                                <div>
                                   <p className={cn(
                                     "font-bold text-sm uppercase tracking-tight transition-colors",
                                     lesson.locked ? "text-slate-400" : "text-slate-800 group-hover:text-violet-700"
                                   )}>
                                     {lesson.title}
                                   </p>
                                   <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{lesson.duration} duration</span>
                                      {lesson.locked ? (
                                        <Badge className="text-[9px] font-bold text-slate-300 bg-transparent border border-slate-100 px-2 py-0">LOCKED</Badge>
                                      ) : (
                                        <Badge className="text-[9px] font-bold text-emerald-500 bg-emerald-50 border-none px-2 py-0">READY</Badge>
                                      )}
                                   </div>
                                </div>
                              </div>
                              {!lesson.locked && (
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                 </div>
              </TabsContent>

              <TabsContent value="about" className="mt-0 animate-in fade-in duration-500 space-y-10">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2 uppercase">
                    <ShieldCheck className="w-5 h-5 text-violet-600" />
                    Intellectual Thesis
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-semibold opacity-90 text-sm md:text-base max-w-3xl">
                    {course.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "High Precision Logic", icon: TrendingUp },
                    { label: "Architecture Models", icon: Zap },
                    { label: "Community protocols", icon: MessageSquare },
                    { label: "Industrial Validation", icon: Award }
                  ].map((feat) => (
                    <div key={feat.label} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                      <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:text-violet-600">
                        <feat.icon className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-700 text-xs uppercase tracking-widest">{feat.label}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Action Card */}
            <Card className="rounded-[2rem] border-none shadow-2xl shadow-slate-200/60 bg-white overflow-hidden sticky top-28">
               <div className="relative aspect-video overflow-hidden">
                  <img src={course.thumbnail} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-slate-900/10" />
               </div>
               <CardContent className="p-8 space-y-8">
                 <div className="space-y-3">
                   <p className="text-[10px] font-bold text-indigo-500 tracking-[0.2em] uppercase">Architecture Node Access</p>
                   <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-slate-900 tracking-tight">₹{course.price.toLocaleString('en-IN')}</span>
                      <span className="text-slate-300 line-through font-bold text-base">₹12,499</span>
                   </div>
                   <div className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md font-bold text-[9px] uppercase tracking-wider">
                     Cycle Efficiency: 60% SAVED
                   </div>
                 </div>

                 <div className="space-y-4">
                   <Button className="w-full h-14 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-widest shadow-xl shadow-slate-300 transition-all hover:scale-[1.02] active:scale-[0.98]">
                     Initialize Enrollment
                   </Button>
                   <Button variant="outline" className="w-full h-14 rounded-xl border-slate-100 font-bold text-xs text-slate-500 hover:bg-slate-50 uppercase tracking-widest">
                     Save Protocol
                   </Button>
                 </div>

                 <div className="pt-6 border-t border-slate-100 space-y-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digital Deliverables:</p>
                    <div className="grid grid-cols-1 gap-3">
                       {[
                         "Continuous Architecture Access",
                         "Multidevice Protocol logic",
                         "Industrial Accreditation",
                         "Risk Vector Protocols"
                       ].map(text => (
                         <div key={text} className="flex items-center gap-3 text-[11px] font-bold text-slate-600">
                           <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                           {text}
                         </div>
                       ))}
                    </div>
                 </div>
               </CardContent>
            </Card>

            {/* Instructor Card */}
            <Card className="rounded-3xl border border-slate-100 bg-white/50 backdrop-blur-sm shadow-xl shadow-slate-200/40 p-1">
               <div className="bg-white rounded-[1.4rem] p-8 space-y-6 text-center">
                  <div className="relative inline-block">
                     <div className="absolute inset-0 bg-violet-500 rounded-full blur-2xl opacity-10" />
                     <img 
                       src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" 
                       className="w-20 h-20 rounded-2xl border-4 border-white shadow-xl relative z-10 mx-auto object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                       alt={course.instructor}
                     />
                  </div>
                  <div>
                     <h5 className="text-lg font-bold text-slate-900 tracking-tight">{course.instructor}</h5>
                     <p className="text-[9px] font-bold text-violet-600 uppercase tracking-widest mt-1 opacity-80">{course.instructorRole}</p>
                  </div>
                  <p className="text-[11px] text-slate-400 font-semibold italic leading-relaxed px-2">
                    "Navigating dynamic markets with industrial precision and structural confidence."
                  </p>
                  <Button variant="ghost" className="h-auto p-0 text-[10px] font-bold tracking-widest text-slate-400 hover:text-violet-600 uppercase transition-colors">
                     Explore Node <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
               </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
