import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Clock, Users, MoreVertical, Edit2, PlayCircle, EyeOff, Eye, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="space-y-0.5">
          <h2 className="text-xl font-semibold text-zinc-900">Course Management</h2>
          <p className="text-zinc-500 text-[13px]">Curate and manage your educational content.</p>
        </div>
        <Button 
          onClick={() => navigate('/dashboard/courses/create')}
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Create Course
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card 
            key={course.id} 
            onClick={() => navigate(`/dashboard/courses/${course.id}`)}
            className="group cursor-pointer overflow-hidden p-0"
          >
            <div className="relative h-40 overflow-hidden">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 via-transparent to-transparent" />
              <div className="absolute top-3 right-3">
                <Badge variant={
                  course.status === 'Active' ? "success" : 
                  course.status === 'Draft' ? "secondary" : "outline"
                }>
                  {course.status}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3">
                <span className="text-white text-[11px] font-medium uppercase tracking-wide bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                  {course.category}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-medium text-[15px] text-zinc-900 leading-snug group-hover:text-zinc-700 transition-colors">
                  {course.title}
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon-sm" className="h-7 w-7">
                      <MoreVertical className="h-3.5 w-3.5 text-zinc-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-lg p-1 min-w-[140px]">
                    <DropdownMenuItem className="rounded-md flex gap-2 text-[13px] px-3 py-2">
                      <Edit2 className="h-3.5 w-3.5" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => toggleStatus(course.id)}
                      className="rounded-md flex gap-2 text-[13px] px-3 py-2"
                    >
                      {course.status === 'Active' ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      {course.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => deleteCourse(course.id)}
                      className="rounded-md flex gap-2 text-[13px] px-3 py-2 text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-zinc-500">
                <div className="flex items-center gap-1">
                  <PlayCircle className="h-3.5 w-3.5" />
                  <span>{course.lessonsCount} lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  <span>{course.studentsCount}</span>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-zinc-100">
                <p className="text-lg font-semibold text-zinc-900">
                  ₹{course.price.toLocaleString('en-IN')}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dashboard/courses/${course.id}`);
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
