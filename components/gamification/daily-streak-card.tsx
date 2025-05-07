"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useGamification } from "@/components/gamification/gamification-provider"

export function DailyStreakCard() {
  const { addPoints } = useGamification()
  const [streak, setStreak] = useState(4)
  const [lastActive, setLastActive] = useState("Today")
  const [showAnimation, setShowAnimation] = useState(false)

  // Days of the week
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // For demo purposes - increment streak when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (streak < 5) {
        setStreak(5)
        setShowAnimation(true)
        addPoints(15, "Daily login streak bonus")

        setTimeout(() => {
          setShowAnimation(false)
        }, 3000)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [streak, addPoints])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Flame className="h-5 w-5 mr-2 text-orange-500" />
          Daily Streak
        </CardTitle>
        <CardDescription>Keep the momentum going</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 mr-3">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-2xl font-bold">{streak}</span>
                <span className="text-sm ml-1">days</span>

                {showAnimation && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.5, x: 10 }}
                    className="ml-2 text-sm font-medium text-green-500"
                  >
                    +1
                  </motion.div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Last active: {lastActive}</p>
            </div>
          </div>

          {streak >= 5 && (
            <div className="text-xs px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
              5 day milestone!
            </div>
          )}
        </div>

        <div className="flex justify-between">
          {days.map((day, index) => {
            const isActive = index < streak % 7
            const isToday = index === (streak % 7) - 1

            return (
              <div key={day} className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex items-center justify-center h-8 w-8 rounded-full mb-1",
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {isActive && <Flame className="h-4 w-4" />}
                </div>
                <span className={cn("text-xs", isToday ? "font-bold" : "text-muted-foreground")}>{day}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
