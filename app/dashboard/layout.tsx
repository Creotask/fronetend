"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { status } = useSession()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && status === "unauthenticated") {
      console.log("User is not authenticated, redirecting to login")
      router.replace("/login?callbackUrl=/dashboard")
    }
  }, [status, router, mounted])

  // Only check authentication after mounting to avoid hydration errors
  if (!mounted) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading dashboard...</h2>
          <div className="animate-pulse h-4 w-32 bg-muted rounded mx-auto"></div>
        </div>
      </div>
    )
  }

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading dashboard...</h2>
          <div className="animate-pulse h-4 w-32 bg-muted rounded mx-auto"></div>
        </div>
      </div>
    )
  }

  // If authenticated, show dashboard
  if (status === "authenticated") {
    return <>{children}</>
  }

  // Fallback while redirecting
  return (
    <div className="container py-8 flex items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Please log in to access the dashboard</h2>
        <p>Redirecting to login page...</p>
      </div>
    </div>
  )
}