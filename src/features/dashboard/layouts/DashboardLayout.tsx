import { useState } from "react"
import { Outlet } from "react-router-dom"
import { X, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sidebar } from "../components/Sidebar"

export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-slate-50/50 text-slate-900">

      {/* Mobile menu toggle */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setMobileMenuOpen(true)}
          className="rounded-xl border-slate-200 bg-white/80 backdrop-blur-md shadow-sm"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-sm md:hidden" 
          onClick={() => setMobileMenuOpen(false)} 
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[240px] transform bg-white transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden shadow-2xl",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full relative">
           <Button 
             variant="ghost" 
             size="icon" 
             onClick={() => setMobileMenuOpen(false)} 
             className="absolute top-6 right-4 z-50 text-slate-400 hover:bg-slate-50 rounded-full"
           >
              <X className="h-5 w-5" />
            </Button>
            <Sidebar 
              className="border-none w-full" 
              isExpanded={true} 
            />
        </div>
      </div>

      {/* Desktop Sidebar Container (Fixed at 72px) */}
      <div className="fixed inset-y-0 left-0 z-30 hidden md:block w-[72px]">
        <Sidebar isExpanded={false} />
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col md:pl-[72px]">
        <main className="flex-1 p-8 md:p-12 w-full">
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
