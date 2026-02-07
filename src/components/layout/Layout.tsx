import { Outlet, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Layout() {
  return (
    <div className="min-h-screen w-full  flex flex-col">
      <header className="border-b p-4 flex justify-between items-center bg-white shadow-sm">
        <div className="font-bold text-xl">MyApp</div>
        <nav className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Register</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <footer className="p-4 text-center text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  )
}
