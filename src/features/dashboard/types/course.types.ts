export interface Lesson {
  id: string
  title: string
  duration: string
  videoUrl: string
  summary: string
  completed?: boolean
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  thumbnail: string
  progress: number
  category: string
  duration: string
  lessons: Lesson[]
  rating?: number
  studentsEnrolled?: number
}
