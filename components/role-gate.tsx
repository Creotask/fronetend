"use client"

import { useAuth } from "@/hooks/use-auth"
import { Role } from "@/lib/generated/prisma/client"

type RoleGateProps = {
  children: React.ReactNode
  allowedRoles: Role[] | Role
  fallback?: React.ReactNode
}

export function RoleGate({ children, allowedRoles, fallback }: RoleGateProps) {
  const { user, isAuthenticated } = useAuth()
  
  if (!isAuthenticated || !user) {
    return fallback || null
  }
  
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]
  
  if (!roles.includes(user.role as Role)) {
    return fallback || null
  }
  
  return <>{children}</>
}