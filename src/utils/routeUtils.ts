import type { RouteConfig } from '@/config/routes.config'
import { UserRole, Permission, rolePermissions, canAccessRoute, getDashboardPathByRole } from '@/config/routes.config'

// Re-export for convenience
export { getDashboardPathByRole as getDashboardPath }

// Get user's permissions based on role
export const getUserPermissions = (role?: string): Permission[] => {
  if (!role) return []
  return rolePermissions[role as UserRole] || []
}

// Filter routes user can access
export const getAccessibleRoutes = (
  routes: RouteConfig[],
  userRole?: string,
  userPermissions?: Permission[]
): RouteConfig[] => {
  return routes.filter(route => {
    const accessible = canAccessRoute(route, userRole, userPermissions)
    
    if (accessible && route.children) {
      // Recursively filter children
      route.children = getAccessibleRoutes(route.children, userRole, userPermissions)
    }
    
    return accessible
  })
}

// Get navigation menu items (only routes with showInNav = true)
export const getNavigationMenu = (
  routes: RouteConfig[],
  userRole?: string,
  userPermissions?: Permission[]
): RouteConfig[] => {
  const accessibleRoutes = getAccessibleRoutes(routes, userRole, userPermissions)
  
  return accessibleRoutes
    .filter(route => route.showInNav)
    .map(route => ({
      ...route,
      children: route.children?.filter(child => child.showInNav)
    }))
}

// Check if user has specific permission
export const hasPermission = (
  userPermissions: Permission[],
  requiredPermission: Permission | Permission[]
): boolean => {
  const required = Array.isArray(requiredPermission) 
    ? requiredPermission 
    : [requiredPermission]
  
  return required.every(perm => userPermissions.includes(perm))
}

// Check if user has specific role
export const hasRole = (
  userRole: string | undefined,
  requiredRole: UserRole | UserRole[]
): boolean => {
  if (!userRole) return false
  
  const required = Array.isArray(requiredRole) 
    ? requiredRole 
    : [requiredRole]
  
  return required.includes(userRole as UserRole)
}

// Check if user has any of the required roles
export const hasAnyRole = (
  userRole: string | undefined,
  requiredRoles: UserRole[]
): boolean => {
  if (!userRole) return false
  return requiredRoles.includes(userRole as UserRole)
}

// Check if user can perform action (role + permission check)
export const canPerformAction = (
  userRole: string | undefined,
  userPermissions: Permission[],
  requiredRoles?: UserRole[],
  requiredPermissions?: Permission[]
): boolean => {
  // Check roles if required
  if (requiredRoles && !hasAnyRole(userRole, requiredRoles)) {
    return false
  }
  
  // Check permissions if required
  if (requiredPermissions && !hasPermission(userPermissions, requiredPermissions)) {
    return false
  }
  
  return true
}
