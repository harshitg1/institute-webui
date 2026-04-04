import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Users,
  PlayCircle,
  Star,
  Share2,
  Lock,
  ChevronRight,
  BookOpen,
  BarChart3,
  Shield,
  Monitor,
  Award,
  Heart,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGetCourseQuery } from "@/api/apiSlice";

// Fallback for fields not yet in backend 
const FALLBACK_DATA = {
  instructor: "Rahul Sharma",
  instructorRole: "Senior Market Analyst",
  instructorImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  rating: 4.8,
  reviewsCount: 124,
  originalPriceMultiplier: 1.5,
  category: "Trading",
};


const DEFAULT_CURRICULUM = [
  {
    title: "Module 1: Getting Started",
    lessons: [
      { id: "l1", title: "Introduction & Course Overview", duration: "15 min", locked: false },
      { id: "l2", title: "Setting Up Your Trading Terminal", duration: "25 min", locked: false },
      { id: "l3", title: "Understanding Market Structure", duration: "40 min", locked: false },
    ],
  },
  {
    title: "Module 2: Core Concepts",
    lessons: [
      { id: "l4", title: "Reading Price Charts Effectively", duration: "35 min", locked: true },
      { id: "l5", title: "Support & Resistance Identification", duration: "45 min", locked: true },
      { id: "l6", title: "Volume Analysis & Confirmation", duration: "30 min", locked: true },
    ],
  },
  {
    title: "Module 3: Strategy & Execution",
    lessons: [
      { id: "l7", title: "Building Your Trading Plan", duration: "50 min", locked: true },
      { id: "l8", title: "Entry, Exit & Stop-Loss Rules", duration: "40 min", locked: true },
      { id: "l9", title: "Live Market Walkthrough", duration: "1h 10m", locked: true },
    ],
  },
];

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: response, isLoading, isError } = useGetCourseQuery(id || "");
  const apiCourse = response?.data;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading course...</div>;
  }

  if (isError || !apiCourse) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Course Not Found</h2>
        <p className="text-slate-500 mb-6">The course you're looking for doesn't exist or was removed.</p>
        <Button onClick={() => navigate(-1)} variant="outline">Go Back</Button>
      </div>
    );
  }

  const course = {
    title: apiCourse.title,
    description: apiCourse.description || "No description provided.",
    price: apiCourse.price,
    originalPrice: apiCourse.price ? Math.round(apiCourse.price * FALLBACK_DATA.originalPriceMultiplier) : 0,
    thumbnail: apiCourse.thumbnailUrl || "https://images.unsplash.com/photo-1611974717482-45a0fbe05c11?w=1200&auto=format&fit=crop&q=80",
    duration: apiCourse.durationHours ? `${apiCourse.durationHours}h` : "TBD",
    lessonsCount: 10,
    studentsCount: apiCourse.enrollmentCount || 0,
    ...FALLBACK_DATA
  };

  const curriculum = DEFAULT_CURRICULUM;
  const discount = course.originalPrice ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero banner with course image */}
      <div className="relative h-72 md:h-80 overflow-hidden bg-slate-900">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />

        {/* Decorative */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-[100px] -mr-20 -mt-10" />

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 p-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-xl gap-2 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Button>
            <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10 rounded-xl">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-violet-500/20 text-violet-300 border-none rounded-lg text-[10px] font-bold px-2.5 py-1">
                {course.category}
              </Badge>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-none rounded-lg text-[10px] font-bold px-2.5 py-1 gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Enrolling Now
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight max-w-2xl">
              {course.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 mt-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <strong className="text-white">{course.rating}</strong> ({course.reviewsCount} reviews)
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {course.studentsCount.toLocaleString("en-IN")} students
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                {course.lessonsCount} lessons
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-6xl mx-auto px-6 -mt-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Content (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-3">About This Course</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{course.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                    {[
                      { icon: BarChart3, label: "Beginner to Pro", color: "text-violet-600 bg-violet-50" },
                      { icon: Monitor, label: "Watch on Any Device", color: "text-sky-600 bg-sky-50" },
                      { icon: Shield, label: "Lifetime Access", color: "text-emerald-600 bg-emerald-50" },
                      { icon: Award, label: "Certificate Included", color: "text-amber-600 bg-amber-50" },
                    ].map((feat) => (
                      <div key={feat.label} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50/50 text-center">
                        <div className={`h-9 w-9 rounded-xl ${feat.color} flex items-center justify-center`}>
                          <feat.icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-600">{feat.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Curriculum */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-slate-900">Course Curriculum</h2>
                    <span className="text-xs text-slate-500 font-medium">
                      {curriculum.reduce((a, m) => a + m.lessons.length, 0)} lessons • {course.duration}
                    </span>
                  </div>

                  <div className="space-y-5">
                    {curriculum.map((module, idx) => (
                      <div key={idx}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-7 w-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </div>
                          <h3 className="font-semibold text-sm text-slate-800">{module.title}</h3>
                        </div>
                        <div className="space-y-2 ml-10">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              onClick={() =>
                                !lesson.locked &&
                                navigate(`/dashboard/student/learn/course/${id}/lesson/${lesson.id}`)
                              }
                              className={cn(
                                "flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200",
                                lesson.locked
                                  ? "bg-slate-50/70 border-slate-100 cursor-default"
                                  : "bg-white border-slate-100 hover:border-violet-200 hover:shadow-md hover:shadow-violet-100/30 cursor-pointer group"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={cn(
                                    "h-8 w-8 rounded-lg flex items-center justify-center transition-colors",
                                    lesson.locked
                                      ? "bg-slate-100 text-slate-400"
                                      : "bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white"
                                  )}
                                >
                                  {lesson.locked ? (
                                    <Lock className="w-3.5 h-3.5" />
                                  ) : (
                                    <PlayCircle className="w-4 h-4" />
                                  )}
                                </div>
                                <div>
                                  <p
                                    className={cn(
                                      "text-sm font-medium",
                                      lesson.locked ? "text-slate-400" : "text-slate-800 group-hover:text-violet-700"
                                    )}
                                  >
                                    {lesson.title}
                                  </p>
                                  <p className="text-[11px] text-slate-400 mt-0.5">{lesson.duration}</p>
                                </div>
                              </div>
                              {!lesson.locked && (
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reviews placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Student Reviews</h2>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-slate-900">{course.rating}</p>
                      <div className="flex items-center gap-0.5 mt-1 justify-center">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={cn(
                              "w-4 h-4",
                              s <= Math.floor(course.rating)
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-200"
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{course.reviewsCount} reviews</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map((level) => {
                        const pct = level === 5 ? 72 : level === 4 ? 20 : level === 3 ? 5 : level === 2 ? 2 : 1;
                        return (
                          <div key={level} className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 w-3">{level}</span>
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-400 rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-[11px] text-slate-400 w-8 text-right">{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right: Sidebar (1/3) */}
          <div className="space-y-6">
            {/* Pricing card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <Card className="rounded-2xl border-slate-200/80 bg-white shadow-lg shadow-slate-200/60 overflow-hidden sticky top-6">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                      <PlayCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 space-y-5">
                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl font-bold text-slate-900">
                        ₹{course.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-base text-slate-400 line-through font-medium">
                        ₹{course.originalPrice.toLocaleString("en-IN")}
                      </span>
                      <Badge className="bg-emerald-50 text-emerald-700 border-none rounded-lg text-[11px] font-bold px-2">
                        {discount}% off
                      </Badge>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="space-y-2.5">
                    <Button className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-lg shadow-slate-300/40 transition-all hover:shadow-xl">
                      Enroll Now
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-xl border-slate-200 font-semibold text-sm text-slate-600 hover:bg-slate-50 gap-2"
                    >
                      <Heart className="w-4 h-4" />
                      Add to Wishlist
                    </Button>
                  </div>

                  {/* Includes */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      This course includes
                    </p>
                    {[
                      { icon: PlayCircle, text: `${course.lessonsCount} on-demand video lessons` },
                      { icon: Globe, text: "Lifetime access from anywhere" },
                      { icon: Monitor, text: "Watch on mobile, tablet & desktop" },
                      { icon: Award, text: "Certificate of completion" },
                      { icon: Shield, text: "30-day money-back guarantee" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2.5 text-sm text-slate-600">
                        <item.icon className="w-4 h-4 text-slate-400 shrink-0" />
                        {item.text}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Instructor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm">
                <CardContent className="p-6">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                    Your Instructor
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={course.instructorImg}
                      alt={course.instructor}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900">{course.instructor}</h3>
                      <p className="text-xs text-slate-500 font-medium">{course.instructorRole}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {course.rating} rating
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" /> {course.studentsCount.toLocaleString("en-IN")} students
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
