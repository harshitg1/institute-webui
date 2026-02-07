import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Clock, Users, MoreVertical, Edit2, PlayCircle, EyeOff, Eye, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
}

const INITIAL_COURSES: Course[] = [
  {
    id: "course-1",
    title: "Nifty Pro Trading Masterclass",
    category: "Technical Analysis",
    thumbnail: "https://images.unsplash.com/photo-1611974717482-45a0fbe05c11?w=800&auto=format&fit=crop&q=60",
    duration: "12h 30m",
    studentsCount: 1240,
    lessonsCount: 24,
    status: "Active",
    price: 4999
  },
  {
    id: "course-2",
    title: "Options Writing Strategy",
    category: "Advanced Trading",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60",
    duration: "8h 45m",
    studentsCount: 856,
    lessonsCount: 18,
    status: "Active",
    price: 7999
  },
  {
    id: "course-3",
    title: "Crypto Fundamentals 2024",
    category: "Blockchain",
    thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop&q=60",
    duration: "15h 20m",
    studentsCount: 3200,
    lessonsCount: 32,
    status: "Draft",
    price: 2999
  }
];

export default function CourseManagement() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);

  const toggleStatus = (id: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === id) {
        const nextStatus: CourseStatus = course.status === 'Active' ? 'Inactive' : 'Active';
        return { ...course, status: nextStatus };
      }
      return course;
    }));
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Course Management</h2>
          <p className="text-slate-500 text-xs font-semibold">Curate and manage your educational content.</p>
        </div>
        <Button 
          onClick={() => navigate('/dashboard/courses/create')}
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-5 rounded-xl shadow-lg shadow-violet-600/20 flex items-center gap-2 transition-all active:scale-95"
        >
          <Plus className="w-4.5 h-4.5" />
          CREATE COURSE
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card 
            key={course.id} 
            onClick={() => navigate(`/dashboard/courses/${course.id}`)}
            className="group cursor-pointer overflow-hidden border-slate-200/60 bg-white/50 backdrop-blur-sm hover:shadow-xl hover:shadow-violet-200/20 transition-all duration-300 rounded-2xl border"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 right-4">
                <Badge className={
                  course.status === 'Active' 
                    ? "bg-emerald-500 text-white border-none shadow-lg shadow-emerald-500/30" 
                    : course.status === 'Draft'
                    ? "bg-blue-500 text-white border-none shadow-lg shadow-blue-500/30"
                    : "bg-slate-500 text-white border-none shadow-lg shadow-slate-500/30"
                }>
                  {course.status}
                </Badge>
              </div>
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-xs uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg">
                  {course.category}
                </p>
              </div>
            </div>

            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-lg text-slate-900 leading-snug group-hover:text-violet-600 transition-colors">
                  {course.title}
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-100">
                      <MoreVertical className="h-4 w-4 text-slate-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-2xl p-2 border-slate-100 shadow-xl">
                    <DropdownMenuItem className="rounded-xl flex gap-2 font-bold text-xs p-3">
                      <Edit2 className="h-4 w-4" /> Edit Course
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => toggleStatus(course.id)}
                      className="rounded-xl flex gap-2 font-bold text-xs p-3"
                    >
                      {course.status === 'Active' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      {course.status === 'Active' ? 'Set Inactive' : 'Set Active'}
                    </DropdownMenuItem>
                    <div className="h-px bg-slate-100 my-1" />
                    <DropdownMenuItem 
                      onClick={() => deleteCourse(course.id)}
                      className="rounded-xl flex gap-2 font-bold text-xs p-3 text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="flex flex-col items-center gap-1">
                  <PlayCircle className="h-4 w-4 text-violet-500" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{course.lessonsCount} Lessons</span>
                </div>
                <div className="flex flex-col items-center gap-1 border-x border-slate-100 px-4">
                  <Clock className="h-4 w-4 text-violet-500" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{course.duration}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Users className="h-4 w-4 text-violet-500" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{course.studentsCount} Students</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <p className="text-xl font-bold text-slate-900 tracking-tight">
                  ₹{course.price.toLocaleString('en-IN')}
                </p>
                <Button 
                  variant="outline" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dashboard/courses/${course.id}`);
                  }}
                  className="rounded-xl border-slate-200 text-xs font-bold hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200 transition-all"
                >
                  VIEW DETAILS
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
