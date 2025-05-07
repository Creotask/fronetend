"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type UseAuthOptions = {
  required?: boolean
  redirectTo?: string
  role?: string | string[]
}

export function useAuth(options: UseAuthOptions = {}) {
  const { required = false, redirectTo = "/login", role } = options
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const user = session?.user
  const isAuthenticated = status === "authenticated"
  const isLoading = status === "loading"

  const checkRole = () => {
    if (!role || !user) return true
    if (Array.isArray(role)) {
      return role.includes(user.role as string)
    }
    return user.role === role
  }

  const hasRequiredRole = checkRole()

  useEffect(() => {
    if (isLoading) return
    
    if (required && !isAuthenticated) {
      // Redirect to login if authentication is required but user is not logged in
      console.log("Redirecting to login because authentication is required")
      router.push(`${redirectTo}?callbackUrl=${encodeURIComponent(window.location.pathname)}`)
    } else if (isAuthenticated && role && !hasRequiredRole) {
      // Redirect to dashboard if user doesn't have the required role
      console.log("Redirecting to dashboard because user doesn't have required role")
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, required, redirectTo, router, role, hasRequiredRole])

  return {
    user,
    session,
    status,
    isAuthenticated,
    isLoading,
    hasRequiredRole,
    updateSession: update
  }
}