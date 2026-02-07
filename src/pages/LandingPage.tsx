import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_50%_200px,#d5c5ff,transparent)]"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-800 shadow-sm mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            v1.0.0 Now Available
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 animate-fade-in-up animation-delay-200">
            Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Robust</span> Web Apps
            <br /> With Confidence.
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-400">
            A production-ready architecture featuring Redux Toolkit, React Router, Lazy Loading, and premium Shadcn UI components.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-600">
            <Button size="lg" className="h-12 px-8 text-lg shadow-lg hover:shadow-xl transition-all" asChild>
              <Link to="/register">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-lg bg-white/50 backdrop-blur-sm hover:bg-white/80" asChild>
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose This Stack?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Built with industry-standard best practices to ensure scalability, maintainability, and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-none shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Secure Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Full JWT authentication flow with Redux integration, HTTP interceptors, and protected route guards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">High Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Optimized with React Lazy Loading and Suspense to minimize initial bundle size and speed up load times.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 text-orange-600">
                  <Layers className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Modern UI Kit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Beautifully designed components using Shadcn UI and Tailwind CSS, fully customizable and accessible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
