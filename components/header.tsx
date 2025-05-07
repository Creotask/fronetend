"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useGamification } from "@/components/gamification/gamification-provider"
import { PointsDisplay } from "@/components/gamification/points-display"
import { LevelUpAnimation } from "@/components/gamification/level-up-animation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { LogoText } from "@/components/animated-text"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // For demo purposes
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { showLevelUpAnimation, setShowLevelUpAnimation } = useGamification()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Contests", href: "/contests" },
    { name: "Freelancers", href: "/freelancers" },
    { name: "How It Works", href: "/how-it-works" },
  ]

  // Close level up animation after 3 seconds
  useEffect(() => {
    if (showLevelUpAnimation) {
      const timer = setTimeout(() => {
        setShowLevelUpAnimation(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showLevelUpAnimation, setShowLevelUpAnimation])

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {showLevelUpAnimation && <LevelUpAnimation />}

      <motion.header
        className={cn(
          "sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
          isScrolled
            ? "bg-background/95 border-purple-900/20 shadow-md shadow-purple-900/5"
            : "bg-transparent border-transparent",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2 relative group">
              <LogoText />
            </Link>
            <nav className="hidden md:flex gap-6 ml-6">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary relative group",
                      pathname === item.href
                        ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-purple-600 after:to-indigo-600"
                        : "text-muted-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-purple-600 after:to-indigo-600 after:transition-all after:duration-300 hover:after:w-full",
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <PointsDisplay />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-purple-600">
                        3
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-[300px] overflow-auto">
                      <DropdownMenuItem className="p-3 cursor-pointer">
                        <div className="flex flex-col gap-1">
                          <p className="font-medium">New contest available</p>
                          <p className="text-xs text-muted-foreground">A new UI design contest has been posted</p>
                          <p className="text-xs text-purple-600">2 minutes ago</p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-3 cursor-pointer">
                        <div className="flex flex-col gap-1">
                          <p className="font-medium">Your submission was reviewed</p>
                          <p className="text-xs text-muted-foreground">Client left feedback on your logo design</p>
                          <p className="text-xs text-purple-600">1 hour ago</p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-3 cursor-pointer">
                        <div className="flex flex-col gap-1">
                          <p className="font-medium">Achievement unlocked!</p>
                          <p className="text-xs text-muted-foreground">You've earned the "Fast Responder" badge</p>
                          <p className="text-xs text-purple-600">Yesterday</p>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="@user" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/achievements">Achievements</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Log In</Link>
                </Button>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none"
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </motion.div>
            </div>
          )}

          <motion.button
            className="flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
            onClick={toggleMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <motion.div
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-x-0 top-16 z-50 p-6 bg-background border-b"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <nav className="flex flex-col space-y-4">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "text-base font-medium transition-colors hover:text-primary",
                        pathname === item.href ? "text-foreground" : "text-muted-foreground",
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {isLoggedIn ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="pt-2"
                    >
                      <PointsDisplay />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Link
                        href="/dashboard"
                        className="text-base font-medium text-muted-foreground"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Link
                        href="/profile"
                        className="text-base font-medium text-muted-foreground"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Link
                        href="/achievements"
                        className="text-base font-medium text-muted-foreground"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Achievements
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Button variant="outline" size="sm" onClick={() => setIsMenuOpen(false)}>
                        Log Out
                      </Button>
                    </motion.div>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 pt-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button asChild variant="outline" size="sm">
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                          Log In
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        asChild
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none"
                      >
                        <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                          Sign Up
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                )}
              </nav>
            </motion.div>
          </div>
        )}
      </motion.header>
    </>
  )
}
