import { Play, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import type { Course } from "../types/course.types"

interface CourseCardProps {
  course: Course
  index?: number
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link to={`/dashboard/student/learn/course/${course.id}/lesson/${course.lessons[0].id}`}>
        <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 h-full flex flex-col group hover:shadow-xl">
          {/* Thumbnail with overlay */}
          <div className="aspect-video overflow-hidden relative">
            <motion.img 
              src={course.thumbnail} 
              alt={course.title} 
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Play Button Overlay */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1 }}
            >
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-full ring-2 ring-white/50">
                <Play className="h-8 w-8 text-white fill-white" />
              </div>
            </motion.div>
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-black/60 backdrop-blur-md text-white border-none rounded-full px-3 py-1">
                {course.category}
              </Badge>
            </div>

            {/* Progress Indicator */}
            {course.progress > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            )}
          </div>

          {/* Content */}
          <CardHeader className="pb-3 flex-1">
            <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
              {course.title}
            </CardTitle>
            <CardDescription className="line-clamp-2 text-sm">
              {course.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pb-4">
            {/* Instructor */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-sm font-bold text-primary ring-2 ring-primary/10">
                {course.instructor.charAt(0)}
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {course.instructor}
              </span>
            </div>

            {/* Course Stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Play className="h-4 w-4" />
                <span>{course.lessons.length} lessons</span>
              </div>
            </div>

            {/* Progress Bar */}
            {course.progress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-primary">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            )}
          </CardContent>

          <CardFooter className="pt-0">
            <Button className="w-full rounded-2xl gap-2 group-hover:shadow-lg transition-shadow">
              {course.progress > 0 ? (
                <>
                  Continue Learning
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Play className="h-4 w-4" />
                  </motion.div>
                </>
              ) : (
                <>
                  Start Course
                  <Play className="h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
