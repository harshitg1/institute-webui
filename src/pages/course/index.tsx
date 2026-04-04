import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Clock,
  Users,
  MoreVertical,
  Edit2,
  PlayCircle,
  EyeOff,
  Eye,
  Trash2,
  BookOpen,
  Search,
  TrendingUp,
  Star,
  ArrowRight,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useGetCoursesQuery, useGetAdminCoursesQuery, useDeleteCourseMutation, useUpdateCourseMutation } from "@/api/apiSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type CourseStatus = 'Active' | 'Draft' | 'Inactive';

export interface Course {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  duration: string;
  studentsCount: number;
  lessonsCount: number;
  status: CourseStatus;
  price: number;
  rating: number;
}

export default function CourseManagement() {
  const navigate = useNavigate();
  // For now, we use getCourses to ensure the active catalog data you provided is visible.
  // Note: Backend /api/courses usually filters out unpublished (inactive) items.
  const { data: response, isLoading, isError } = useGetCoursesQuery();
  const [deleteCourseMutation] = useDeleteCourseMutation();
  const [updateCourseMutation] = useUpdateCourseMutation();
  
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | CourseStatus>('all');

  const rawCourses = response?.data || [];

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Access Error</h2>
        <p className="text-slate-500 mb-6 font-medium">Failed to load courses. Please check your connection or role permissions.</p>
        <Button onClick={() => window.location.reload()} variant="outline">Try Again</Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-violet-600 animate-spin" />
          <p className="text-sm font-medium text-slate-500 animate-pulse">Syncing catalog data...</p>
        </div>
      </div>
    );
  }

  const courses: Course[] = rawCourses.map(c => ({
    id: c.id,
    title: c.title,
    category: "General",
    thumbnail: c.thumbnailUrl || "https://images.unsplash.com/photo-1611974717482-45a0fbe05c11?w=800&auto=format&fit=crop&q=60",
    duration: c.durationHours ? `${c.durationHours}h` : "TBD",
    studentsCount: c.enrollmentCount || 0,
    lessonsCount: 10,
    status: c.published ? 'Active' : 'Inactive',
    price: c.price || 0,
    rating: 4.8,
    _original: c 
  } as Course & { _original: any }));

  const toggleStatus = async (courseId: string) => {
    const target = courses.find(c => c.id === courseId) as any;
    if (!target) return;
    try {
      await updateCourseMutation({
        id: courseId,
        data: {
          title: target._original.title,
          description: target._original.description,
          price: target._original.price,
          thumbnailUrl: target._original.thumbnailUrl,
          durationHours: target._original.durationHours,
          published: !target._original.published
        }
      }).unwrap();
    } catch (err) {
      console.error('Failed to update course status', err);
    }
  };

  const deleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await deleteCourseMutation(id).unwrap();
    } catch (err: any) {
      if (err?.data?.message?.includes('enrollment')) {
        alert('Cannot delete a course that has enrollments.');
      } else {
        alert('Failed to delete course.');
      }
    }
  };

  const filtered = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'all' || c.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const totalStudents = courses.reduce((a, c) => a + c.studentsCount, 0);
  const activeCourses = courses.filter(c => c.status === 'Active').length;

  const statusStyles: Record<CourseStatus, { dot: string; label: string; bg: string; text: string }> = {
    Active: { dot: 'bg-emerald-400', label: 'Live', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
    Draft: { dot: 'bg-amber-400', label: 'Draft', bg: 'bg-amber-500/10', text: 'text-amber-400' },
    Inactive: { dot: 'bg-slate-400', label: 'Paused', bg: 'bg-slate-500/10', text: 'text-slate-400' },
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Hero header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8 md:p-10"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/15 rounded-full blur-[100px] -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-emerald-500/10 rounded-full blur-[80px] -mb-10" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sky-500/10 rounded-full blur-[60px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-violet-300">
              <Sparkles className="w-3.5 h-3.5" />
              Course Management
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Your Trading <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Curriculum</span>
            </h1>
            <p className="text-slate-400 text-sm max-w-md">
              Build, publish, and manage courses that transform beginners into profitable traders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick stats in hero */}
            <div className="hidden md:flex items-center gap-6 mr-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{courses.length}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Courses</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-400">{activeCourses}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Live</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{(totalStudents / 1000).toFixed(1)}k</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Students</p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/dashboard/courses/create')}
              className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl h-10 px-5 text-sm font-bold gap-2 shadow-lg shadow-white/10"
            >
              <Plus className="w-4 h-4" />
              New Course
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Search & filter bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-xl border-slate-200 h-10 text-sm bg-white"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
          {(['all', 'Active', 'Draft', 'Inactive'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === f
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Course grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter + search}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filtered.map((course, i) => {
            const sConfig = statusStyles[course.status];
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group"
              >
                <div
                  onClick={() => navigate(`/dashboard/courses/${course.id}`)}
                  className="cursor-pointer rounded-2xl bg-white border border-slate-200/80 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-500"
                >
                  {/* Image section */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Multi-layered gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Top row: status + actions */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                      <Badge className={`${sConfig.bg} ${sConfig.text} border-none rounded-lg text-[10px] font-bold px-2.5 py-1 gap-1.5 backdrop-blur-sm`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sConfig.dot} animate-pulse`} />
                        {sConfig.label}
                      </Badge>

                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <button className="h-8 w-8 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center transition-colors">
                              <MoreVertical className="h-4 w-4 text-white" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl p-1.5 min-w-[170px] border-slate-200/80">
                            <DropdownMenuItem className="rounded-lg flex gap-2.5 text-[13px] px-3 py-2.5 font-medium">
                              <Edit2 className="h-3.5 w-3.5 text-slate-500" /> Edit Course
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => { e.stopPropagation(); toggleStatus(course.id); }}
                              className="rounded-lg flex gap-2.5 text-[13px] px-3 py-2.5 font-medium"
                            >
                              {course.status === 'Active' ? <EyeOff className="h-3.5 w-3.5 text-slate-500" /> : <Eye className="h-3.5 w-3.5 text-slate-500" />}
                              {course.status === 'Active' ? 'Deactivate' : 'Activate'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1" />
                            <DropdownMenuItem
                              onClick={(e) => { e.stopPropagation(); deleteCourse(course.id); }}
                              className="rounded-lg flex gap-2.5 text-[13px] px-3 py-2.5 font-medium text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete Course
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Bottom overlay: category + price */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-end justify-between">
                        <div className="space-y-1.5">
                          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-violet-300 bg-white/10 backdrop-blur-md rounded-md px-2 py-0.5">
                            {course.category}
                          </span>
                          <h3 className="text-lg font-bold text-white leading-tight drop-shadow-lg line-clamp-2">
                            {course.title}
                          </h3>
                        </div>
                        <div className="text-right shrink-0 ml-3">
                          <p className="text-2xl font-black text-white drop-shadow-lg">
                            ₹{course.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4 space-y-3">
                    {/* Meta row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5 font-medium">
                          <PlayCircle className="h-3.5 w-3.5 text-slate-400" />
                          {course.lessonsCount} lessons
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          {course.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-slate-700">{course.rating}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Users className="h-3.5 w-3.5" />
                        <span className="font-semibold text-slate-700">{course.studentsCount.toLocaleString('en-IN')}</span>
                        <span>enrolled</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/courses/${course.id}`);
                        }}
                        className="flex items-center gap-1 text-xs font-bold text-violet-600 hover:text-violet-800 group/btn transition-colors"
                      >
                        Manage
                        <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-4">
            <BookOpen className="h-7 w-7 text-slate-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-800">No courses found</h3>
          <p className="text-sm text-slate-500 mt-1.5 max-w-xs mx-auto">Try adjusting your search or filters, or create a new course to get started.</p>
          <Button
            onClick={() => navigate('/dashboard/courses/create')}
            className="mt-5 rounded-xl gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Your First Course
          </Button>
        </motion.div>
      )}
    </div>
  );
}
