"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Award, Star, Trophy, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

type Level = {
  level: number
  title: string
  pointsRequired: number
  icon: React.ReactNode
  color: string
}

type Achievement = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  points: number
  progress?: number
  maxProgress?: number
}

type GamificationContextType = {
  points: number
  level: Level
  achievements: Achievement[]
  addPoints: (amount: number, reason?: string) => void
  unlockAchievement: (id: string) => void
  updateAchievementProgress: (id: string, progress: number) => void
  showLevelUpAnimation: boolean
  setShowLevelUpAnimation: (show: boolean) => void
}

const levels: Level[] = [
  { level: 1, title: "Novice", pointsRequired: 0, icon: <Zap className="h-4 w-4" />, color: "text-blue-500" },
  { level: 2, title: "Apprentice", pointsRequired: 100, icon: <Star className="h-4 w-4" />, color: "text-green-500" },
  { level: 3, title: "Specialist", pointsRequired: 300, icon: <Award className="h-4 w-4" />, color: "text-yellow-500" },
  { level: 4, title: "Expert", pointsRequired: 700, icon: <Trophy className="h-4 w-4" />, color: "text-purple-500" },
  { level: 5, title: "Master", pointsRequired: 1500, icon: <Trophy className="h-4 w-4" />, color: "text-red-500" },
]

const initialAchievements: Achievement[] = [
  {
    id: "profile_complete",
    title: "Profile Perfectionist",
    description: "Complete your profile with all details",
    icon: <Award className="h-5 w-5 text-purple-500" />,
    unlocked: false,
    points: 50,
    progress: 0,
    maxProgress: 5,
  },
  {
    id: "first_submission",
    title: "First Steps",
    description: "Submit your first contest entry",
    icon: <Zap className="h-5 w-5 text-yellow-500" />,
    unlocked: false,
    points: 30,
  },
  {
    id: "contest_winner",
    title: "Winner's Circle",
    description: "Win your first contest",
    icon: <Trophy className="h-5 w-5 text-amber-500" />,
    unlocked: false,
    points: 100,
  },
  {
    id: "submission_streak",
    title: "Consistency Champion",
    description: "Submit entries for 5 days in a row",
    icon: <Zap className="h-5 w-5 text-green-500" />,
    unlocked: false,
    points: 75,
    progress: 0,
    maxProgress: 5,
  },
]

const GamificationContext = createContext<GamificationContextType | undefined>(undefined)

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = useState(0)
  const [achievements, setAchievements] = useState(initialAchievements)
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false)
  const { toast } = useToast()

  // Calculate current level based on points
  const getCurrentLevel = (points: number): Level => {
    for (let i = levels.length - 1; i >= 0; i--) {
      if (points >= levels[i].pointsRequired) {
        return levels[i]
      }
    }
    return levels[0]
  }

  const [level, setLevel] = useState(getCurrentLevel(points))

  // Check for level up when points change
  useEffect(() => {
    const newLevel = getCurrentLevel(points)
    if (newLevel.level > level.level) {
      setLevel(newLevel)
      setShowLevelUpAnimation(true)
      toast({
        title: "Level Up!",
        description: `Congratulations! You've reached ${newLevel.title} level!`,
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-none",
        ),
      })
    } else {
      setLevel(newLevel)
    }
  }, [points, level.level, toast])

  const addPoints = (amount: number, reason?: string) => {
    setPoints((prev) => prev + amount)
    if (amount > 0) {
      toast({
        title: `+${amount} points earned!`,
        description: reason || "Keep up the good work!",
        className: "bg-gradient-to-r from-green-600 to-emerald-600 text-white border-none",
      })
    }
  }

  const unlockAchievement = (id: string) => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.id === id && !achievement.unlocked) {
          addPoints(achievement.points, `Achievement unlocked: ${achievement.title}`)
          toast({
            title: "Achievement Unlocked!",
            description: achievement.title,
            className: "bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-none",
          })
          return { ...achievement, unlocked: true }
        }
        return achievement
      }),
    )
  }

  const updateAchievementProgress = (id: string, progress: number) => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.id === id && !achievement.unlocked) {
          const newProgress = Math.min(progress, achievement.maxProgress || progress)

          // Check if achievement should be unlocked
          if (achievement.maxProgress && newProgress >= achievement.maxProgress) {
            unlockAchievement(id)
            return { ...achievement, progress: newProgress, unlocked: true }
          }

          return { ...achievement, progress: newProgress }
        }
        return achievement
      }),
    )
  }

  return (
    <GamificationContext.Provider
      value={{
        points,
        level,
        achievements,
        addPoints,
        unlockAchievement,
        updateAchievementProgress,
        showLevelUpAnimation,
        setShowLevelUpAnimation,
      }}
    >
      {children}
    </GamificationContext.Provider>
  )
}

export const useGamification = () => {
  const context = useContext(GamificationContext)
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider")
  }
  return context
}
