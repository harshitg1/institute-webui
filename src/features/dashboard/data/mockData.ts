import {
  Brush,
  Camera,
  Code,
  FileText,
  Grid,
  Home,
  ImageIcon,
  Layers,
  LayoutGrid,
  Palette,
  Sparkles,
  Type,
  Video,
  CuboidIcon,
  Users,
  BookOpen,
  Bookmark,
} from "lucide-react"

// Sample data for apps
export const apps = [
  {
    name: "PixelMaster",
    icon: ImageIcon,
    description: "Advanced image editing and composition",
    category: "Creative",
    recent: true,
    new: false,
    progress: 100,
    color: "text-violet-500",
  },
  {
    name: "VectorPro",
    icon: Brush,
    description: "Professional vector graphics creation",
    category: "Creative",
    recent: true,
    new: false,
    progress: 100,
    color: "text-orange-500",
  },
  {
    name: "VideoStudio",
    icon: Video,
    description: "Cinematic video editing and production",
    category: "Video",
    recent: true,
    new: false,
    progress: 100,
    color: "text-pink-500",
  },
  {
    name: "MotionFX",
    icon: Sparkles,
    description: "Stunning visual effects and animations",
    category: "Video",
    recent: false,
    new: false,
    progress: 100,
    color: "text-blue-500",
  },
  {
    name: "PageCraft",
    icon: Layers,
    description: "Professional page design and layout",
    category: "Creative",
    recent: false,
    new: false,
    progress: 100,
    color: "text-red-500",
  },
  {
    name: "UXFlow",
    icon: LayoutGrid,
    description: "Intuitive user experience design",
    category: "Design",
    recent: false,
    new: true,
    progress: 85,
    color: "text-fuchsia-500",
  },
  {
    name: "PhotoLab",
    icon: Camera,
    description: "Advanced photo editing and organization",
    category: "Photography",
    recent: false,
    new: false,
    progress: 100,
    color: "text-teal-500",
  },
  {
    name: "DocMaster",
    icon: FileText,
    description: "Document editing and management",
    category: "Document",
    recent: false,
    new: false,
    progress: 100,
    color: "text-red-600",
  },
  {
    name: "WebCanvas",
    icon: Code,
    description: "Web design and development",
    category: "Web",
    recent: false,
    new: true,
    progress: 70,
    color: "text-emerald-500",
  },
  {
    name: "3DStudio",
    icon: CuboidIcon,
    description: "3D modeling and rendering",
    category: "3D",
    recent: false,
    new: true,
    progress: 60,
    color: "text-indigo-500",
  },
  {
    name: "FontForge",
    icon: Type,
    description: "Typography and font creation",
    category: "Typography",
    recent: false,
    new: false,
    progress: 100,
    color: "text-amber-500",
  },
  {
    name: "ColorPalette",
    icon: Palette,
    description: "Color scheme creation and management",
    category: "Design",
    recent: false,
    new: false,
    progress: 100,
    color: "text-purple-500",
  },
]

// Sample data for recent files
export const recentFiles = [
  {
    name: "Brand Redesign.pxm",
    app: "PixelMaster",
    modified: "2 hours ago",
    icon: ImageIcon,
    color: "text-violet-500",
    shared: true,
    size: "24.5 MB",
    collaborators: 3,
  },
  {
    name: "Company Logo.vec",
    app: "VectorPro",
    modified: "Yesterday",
    icon: Brush,
    color: "text-orange-500",
    shared: true,
    size: "8.2 MB",
    collaborators: 2,
  },
  {
    name: "Product Launch Video.vid",
    app: "VideoStudio",
    modified: "3 days ago",
    icon: Video,
    color: "text-pink-500",
    shared: false,
    size: "1.2 GB",
    collaborators: 0,
  },
  {
    name: "UI Animation.mfx",
    app: "MotionFX",
    modified: "Last week",
    icon: Sparkles,
    color: "text-blue-500",
    shared: true,
    size: "345 MB",
    collaborators: 4,
  },
  {
    name: "Magazine Layout.pgc",
    app: "PageCraft",
    modified: "2 weeks ago",
    icon: Layers,
    color: "text-red-500",
    shared: false,
    size: "42.8 MB",
    collaborators: 0,
  },
  {
    name: "Mobile App Design.uxf",
    app: "UXFlow",
    modified: "3 weeks ago",
    icon: LayoutGrid,
    color: "text-fuchsia-500",
    shared: true,
    size: "18.3 MB",
    collaborators: 5,
  },
  {
    name: "Product Photography.phl",
    app: "PhotoLab",
    modified: "Last month",
    icon: Camera,
    color: "text-teal-500",
    shared: false,
    size: "156 MB",
    collaborators: 0,
  },
]

// Sample data for projects
export const projects = [
  {
    name: "Website Redesign",
    description: "Complete overhaul of company website",
    progress: 75,
    dueDate: "June 15, 2025",
    members: 4,
    files: 23,
  },
  {
    name: "Mobile App Launch",
    description: "Design and assets for new mobile application",
    progress: 60,
    dueDate: "July 30, 2025",
    members: 6,
    files: 42,
  },
  {
    name: "Brand Identity",
    description: "New brand guidelines and assets",
    progress: 90,
    dueDate: "May 25, 2025",
    members: 3,
    files: 18,
  },
  {
    name: "Marketing Campaign",
    description: "Summer promotion materials",
    progress: 40,
    dueDate: "August 10, 2025",
    members: 5,
    files: 31,
  },
]

// Sample data for courses
export const courses = [
  {
    id: "c1",
    title: "UI/UX Design Masterclass",
    description: "Learn how to design beautiful interfaces and user experiences from scratch.",
    instructor: "Sarah Chen",
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&q=80&w=600",
    progress: 35,
    category: "Design",
    duration: "12h 30m",
    lessons: [
      {
        id: "l1",
        title: "Introduction to UI Design",
        duration: "15:30",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
        summary: "In this lesson, we explore the fundamental principles of User Interface (UI) design. We cover the importance of visual hierarchy, consistency, and alignment. You'll learn how to create clean and effective layouts that guide the user's eye and enhance usability."
      },
      {
        id: "l2",
        title: "Understanding Typography",
        duration: "22:15",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        summary: "Typography is more than just choosing fonts. This lesson dives into typefaces, weights, line heights, and spacing. We discuss how to pair fonts effectively and use typography to establish a strong brand identity and improve readability."
      },
      {
        id: "l3",
        title: "Color Theory Basics",
        duration: "18:45",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        summary: "Color evokes emotion and drives action. We'll breakdown the color wheel, color harmonies, and psychological effects of different colors. By the end, you'll be able to create harmonious color palettes for any digital product."
      },
      {
        id: "l4",
        title: "Wireframing & Prototyping",
        duration: "30:00",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        summary: "Learn the process of moving from low-fidelity wireframes to high-fidelity prototypes. We'll use industry-standard tools to map out user flows and test interactions before writing a single line of code."
      }
    ]
  },
  {
    id: "c2",
    title: "Advanced React Patterns",
    description: "Level up your React skills with advanced composition and performance techniques.",
    instructor: "Michael Rodriguez",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600",
    progress: 10,
    category: "Development",
    duration: "8h 45m",
    lessons: [
      {
        id: "l1",
        title: "Higher Order Components",
        duration: "20:10",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        summary: "Discover the power of HOCs for reusing component logic. We'll analyze real-world examples of HOCs for authentication and logging, and discuss when to prefer them over hooks."
      },
      {
        id: "l2",
        title: "Custom Hooks Deep Dive",
        duration: "25:30",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        summary: "Go beyond basic hooks. We'll build complex custom hooks for data fetching, form handling, and local storage synchronization, ensuring your code remains clean and testable."
      }
    ]
  },
  {
    id: "c3",
    title: "Motion Graphics with After Effects",
    description: "Create stunning animations and visual effects for video projects.",
    instructor: "James Wilson",
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b7993143a2d?auto=format&fit=crop&q=80&w=600",
    progress: 0,
    category: "Video",
    duration: "15h 00m",
    lessons: [
       {
        id: "l1",
        title: "Interface Walkthrough",
        duration: "12:00",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        summary: "Get comfortable with the After Effects workspace. We'll cover panels, timelines, and essential shortcuts to speed up your workflow."
      },
      {
        id: "l2",
        title: "Keyframe Animation",
        duration: "28:15",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        summary: "Master the art of timing and spacing. We'll explore the graph editor to create smooth, natural movements using easing and interpolation."
      }
    ]
  },
  {
    id: "course-1",
    title: "Nifty Pro Trading Masterclass",
    description: "Master the art of Nifty trading with professional-grade strategies and institutional order flow.",
    instructor: "Rahul Sharma",
    thumbnail: "https://images.unsplash.com/photo-1611974717482-45a0fbe05c11?w=800",
    progress: 0,
    category: "Technical Analysis",
    duration: "12h 30m",
    lessons: [
      {
        id: "l1",
        title: "Introduction to Indian Markets",
        duration: "45:00",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        summary: "Fundamental architectural overview of the Indian equity landscape."
      },
      {
        id: "l2",
        title: "Nifty vs Bank Nifty Dynamics",
        duration: "70:00",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        summary: "Comparative analysis of major benchmarks and their structural differences."
      },
      {
        id: "l3",
        title: "Supply & Demand Zones",
        duration: "90:00",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        summary: "Identifying high-precision price levels within the architecture."
      },
      {
        id: "l4",
        title: "Institutional Order Blocks",
        duration: "135:00",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        summary: "Deconstructing large-scale institutional protocols."
      }
    ]
  },
  {
    id: "course-2",
    title: "Options Writing Strategy",
    description: "Advanced derivative strategies focusing on institutional-grade options writing.",
    instructor: "Vikram Malhotra",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800",
    progress: 0,
    category: "Advanced Trading",
    duration: "8h 45m",
    lessons: [
      {
        id: "l1",
        title: "The Greeks of Risk",
        duration: "55:00",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        summary: "Deep dive into Delta, Theta, and Gamma within the writing framework."
      }
    ]
  },
  {
    id: "course-3",
    title: "Crypto Fundamentals 2024",
    description: "In-depth exploration of blockchain fundamentals and crypto-economic structures.",
    instructor: "Elena Vance",
    thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800",
    progress: 0,
    category: "Blockchain",
    duration: "15h 20m",
    lessons: [
      {
        id: "l1",
        title: "Genesis: The Bitcoin Protocol",
        duration: "65:00",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        summary: "Analyzing the whitepaper that started it all through a technical lens."
      }
    ]
  }
]

// Sample data for tutorials

// Sample data for users
export const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "Now",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
    lastActive: "2 min ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "Viewer",
    status: "Inactive",
    lastActive: "2 days ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "User",
    status: "Active",
    lastActive: "1 hour ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "5 min ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

// Sample data for sidebar navigation
export const sidebarItems = [
  {
    title: "Home",
    icon: Home,
    url: "/dashboard",
  },
  {
    title: "Apps",
    icon: Grid,
    badge: "2",
    url: "/dashboard/apps",
    items: [
      { title: "All Apps", url: "/dashboard/apps" },
      { title: "Recent", url: "/dashboard/apps?filter=recent" },
      { title: "Updates", url: "/dashboard/apps?filter=updates", badge: "2" },
      { title: "Installed", url: "/dashboard/apps?filter=installed" },
    ],
  },
  {
    title: "Files",
    icon: FileText,
    url: "/dashboard/files",
    items: [
      { title: "Recent", url: "/dashboard/files?filter=recent" },
      { title: "Shared with me", url: "/dashboard/files?filter=shared", badge: "3" },
      { title: "Favorites", url: "/dashboard/files?filter=favorites" },
      { title: "Trash", url: "/dashboard/files?filter=trash" },
    ],
  },
  {
    title: "Projects",
    icon: Layers,
    badge: "4",
    url: "/dashboard/projects",
    items: [
      { title: "Active Projects", url: "/dashboard/projects", badge: "4" },
      { title: "Archived", url: "/dashboard/projects?filter=archived" },
      { title: "Templates", url: "/dashboard/projects?filter=templates" },
    ],
  },
  {
    title: "Learn",
    icon: BookOpen,
    url: "/dashboard/learn",
    items: [
      { title: "Tutorials", url: "/dashboard/learn" },
      { title: "Courses", url: "/dashboard/learn?type=courses" },
      { title: "Webinars", url: "/dashboard/learn?type=webinars" },
      { title: "Resources", url: "/dashboard/learn?type=resources" },
    ],
  },
  {
    title: "Users",
    icon: Users,
    url: "/dashboard/users",
    items: [
      { title: "All Users", url: "/dashboard/users" },
      { title: "Admins", url: "/dashboard/users?role=admin" },
      { title: "Active", url: "/dashboard/users?status=active" },
    ],
  },
  {
    title: "Resources",
    icon: Bookmark,
    url: "/dashboard/resources",
    items: [
      { title: "Stock Photos", url: "/dashboard/resources?type=photos" },
      { title: "Fonts", url: "/dashboard/resources?type=fonts" },
      { title: "Icons", url: "/dashboard/resources?type=icons" },
      { title: "Templates", url: "/dashboard/resources?type=templates" },
    ],
  },
]
