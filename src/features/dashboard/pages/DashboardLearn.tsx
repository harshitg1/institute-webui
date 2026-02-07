import { motion } from "framer-motion"
import { Search, Crown, BookOpen, TrendingUp, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { courses } from "../data/mockData"
import { CourseCard } from "../components/CourseCard"
import { useState } from "react"

export default function DashboardLearn() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(courses.map(c => c.category)))
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 md:p-12 text-white relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3 max-w-2xl">
              <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-full px-4 py-1 w-fit">
                <BookOpen className="h-3 w-3 mr-1.5 inline" />
                Learning Platform
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Expand Your Skills
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Master new technologies with expert-led courses. Learn at your own pace with hands-on projects and real-world examples.
              </p>
            </div>
            <Button 
              size="lg"
              className="w-fit rounded-2xl bg-white text-emerald-700 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all"
            >
              <Crown className="mr-2 h-5 w-5" />
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Filters and Search */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="rounded-2xl"
            >
              All Courses
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-2xl"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-[300px] rounded-2xl pl-9"
            />
          </div>
        </div>
      </motion.div>

      {/* Course Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">
              {selectedCategory ? `${selectedCategory} Courses` : 'All Courses'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} available
            </p>
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 space-y-4"
          >
            <div className="text-6xl">📚</div>
            <h3 className="text-xl font-semibold">No courses found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="rounded-3xl border-2 p-6 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{courses.length}</p>
              <p className="text-sm text-muted-foreground">Total Courses</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border-2 p-6 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {courses.filter(c => c.progress > 0).length}
              </p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border-2 p-6 hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {courses.reduce((acc, c) => {
                  const hours = parseInt(c.duration.split('h')[0])
                  return acc + (isNaN(hours) ? 0 : hours)
                }, 0)}h
              </p>
              <p className="text-sm text-muted-foreground">Total Content</p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
