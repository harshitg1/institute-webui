import { NavLink, useNavigate } from "react-router-dom"
import { LogOut, Wand2, Home, Users, BookOpen, Layers, Shield, School, User, Settings, Command } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { logout } from "@/features/auth/authSlice"
import { routeConfig } from "@/config/routes.config"
import { getNavigationMenu, getUserPermissions } from "@/utils/routeUtils"
import type { RouteConfig } from "@/config/routes.config"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const iconMap: Record<string, any> = {
  home: Home,
  dashboard: Home,
  people: Users,
  menu_book: BookOpen,
  auto_stories: Layers,
  shield: Shield,
  school: School,
  person: User,
  business: Users,
}

interface SidebarProps {
  className?: string;
  isExpanded: boolean;
}

export function Sidebar({ className, isExpanded }: SidebarProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)
  
  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const userPermissions = user?.permissions || getUserPermissions(user?.role)
  const navItems = getNavigationMenu(routeConfig, user?.role, userPermissions)

  const renderNavItem = (item: RouteConfig) => {
    const Icon = item.icon ? iconMap[item.icon] || Home : Home
    
    const content = (
      <div key={item.path} className="px-3">
        <NavLink
          to={item.path}
          end
          className={({ isActive }) =>
            cn(
              "group relative flex items-center h-11 rounded-xl transition-all duration-300",
              isActive 
                ? "bg-violet-600/10 text-violet-600 font-bold" 
                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50 font-semibold",
              isExpanded ? "px-4 gap-3" : "justify-center"
            )
          }
        >
          <Icon className={cn("shrink-0", isExpanded ? "h-4.5 w-4.5" : "h-5 w-5")} />
          
          <span className={cn(
            "text-[13px] whitespace-nowrap overflow-hidden transition-all duration-300",
            isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"
          )}>
            {item.name}
          </span>
        </NavLink>
      </div>
    );

    if (isExpanded) return content;

    return (
      <Tooltip key={item.path}>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={10} className="bg-slate-900 text-white font-black text-[10px] tracking-widest uppercase border-none px-3 py-2 rounded-lg shadow-xl">
          {item.name}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div 
      className={cn(
        "flex h-full flex-col ",
        isExpanded ? "w-60" : "w-[72px]",
        className
      )}
    >
      {/* Brand Logo */}
      <div className={cn("p-2 flex items-center mb-10", isExpanded ? "px-6" : "px-4")}>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-3 overflow-hidden cursor-default">
              <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xl shadow-slate-900/20">
                <Command className="size-5" />
              </div>
              <div className={cn("transition-all duration-500 space-y-0.5", isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none absolute")}>
                <h2 className="font-display font-bold text-lg leading-none text-slate-900 tracking-tight text-nowrap">Lavender</h2>
                <p className="text-[9px] font-bold text-violet-600 uppercase tracking-widest font-sans">PRO SUITE</p>
              </div>
            </div>
          </TooltipTrigger>
          {!isExpanded && (
            <TooltipContent side="right" sideOffset={10} className="bg-slate-900 text-white font-bold text-[10px] tracking-widest uppercase border-none px-3 py-2 rounded-lg shadow-xl">
              Lavender Market
            </TooltipContent>
          )}
        </Tooltip>
      </div>

      {/* Nav Section */}
      <ScrollArea className="flex-1">
        <div className="space-y-1.5 py-4">
          {navItems.map((item) => renderNavItem(item))}
        </div>
      </ScrollArea>

      {/* User Section */}
      <div className="p-3 mt-auto space-y-4">
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <div className={cn(
              "flex items-center gap-3 rounded-xl p-2 bg-slate-50 transition-all duration-300",
              isExpanded ? "px-3" : "justify-center"
            )}>
              <Avatar className="h-8 w-8 border border-white shadow-sm transition-all duration-500">
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" />
                  <AvatarFallback className="bg-violet-100 text-violet-600 text-[10px] font-black">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className={cn(
                  "overflow-hidden transition-all duration-500", 
                  isExpanded ? "w-auto opacity-100" : "w-0 opacity-0 pointer-events-none absolute"
                )}>
                  <p className="text-[12px] font-bold text-slate-900 truncate leading-none">{user?.email?.split('@')[0] || 'User'}</p>
                  <p className="text-[9px] font-semibold text-slate-400 uppercase mt-1">
                    {user?.role?.replace('_', ' ') || 'GUEST'}
                  </p>
                </div>
            </div>
          </TooltipTrigger>
          {!isExpanded && (
            <TooltipContent side="right" sideOffset={10} className="bg-slate-900 text-white font-bold text-[10px] tracking-widest uppercase border-none px-3 py-2 rounded-lg shadow-xl">
              Account: {user?.email || 'User'}
            </TooltipContent>
          )}
        </Tooltip>
        
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard/personal-settings')}
              className={cn(
                "w-full flex items-center transition-all duration-300 rounded-xl h-10 font-bold text-[11px] text-slate-400 hover:text-violet-600 hover:bg-violet-50",
                isExpanded ? "px-3 gap-3" : "justify-center"
              )}
            >
              <Settings className="h-4.5 w-4.5" />
              {isExpanded && <span className="uppercase tracking-widest text-[#565555]">Settings</span>}
            </Button>
          </TooltipTrigger>
          {!isExpanded && (
            <TooltipContent side="right" sideOffset={10} className="bg-slate-900 text-white font-bold text-[10px] tracking-widest uppercase border-none px-3 py-2 rounded-lg shadow-xl">
              Personal Settings
            </TooltipContent>
          )}
        </Tooltip>
 
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className={cn(
                "w-full flex items-center transition-all duration-300 rounded-xl h-10 font-semibold text-[11px] text-slate-400 hover:text-red-500 hover:bg-red-50",
                isExpanded ? "px-3 gap-3" : "justify-center"
              )}
            >
              <LogOut className="h-4.5 w-4.5" />
              {isExpanded && <span className="uppercase tracking-widest">Logout</span>}
            </Button>
          </TooltipTrigger>
          {!isExpanded && (
            <TooltipContent side="right" sideOffset={10} className="bg-red-600 text-white font-bold text-[10px] tracking-widest uppercase border-none px-3 py-2 rounded-lg shadow-xl">
              Terminate Session
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    </div>
  )
}
