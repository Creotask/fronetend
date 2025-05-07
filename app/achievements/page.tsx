"use client"

import { useGamification } from "@/components/gamification/gamification-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Award, Lock, Trophy } from "lucide-react"

export default function AchievementsPage() {
  const { achievements, points, level } = useGamification()

  // Calculate total achievements and unlocked achievements
  const totalAchievements = achievements.length
  const unlockedAchievements = achievements.filter((a) => a.unlocked).length

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
          <p className="text-muted-foreground mt-1">Track your progress and earn rewards</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-100 dark:border-purple-900/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Level</CardTitle>
            <CardDescription>Your current rank</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center h-12 w-12 rounded-full ${level.color} bg-opacity-20`}>
                {level.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{level.title}</h3>
                <p className="text-sm text-muted-foreground">Level {level.level}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-100 dark:border-amber-900/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Points</CardTitle>
            <CardDescription>Your total score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-full text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{points}</h3>
                <p className="text-sm text-muted-foreground">Total points earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-100 dark:border-green-900/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Achievements</CardTitle>
            <CardDescription>Your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-full text-green-500 bg-green-100 dark:bg-green-900/30">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  {unlockedAchievements}/{totalAchievements}
                </h3>
                <p className="text-sm text-muted-foreground">Achievements unlocked</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-6">Your Achievements</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`h-full ${achievement.unlocked ? "border-purple-200 dark:border-purple-800" : "border-gray-200 dark:border-gray-800"}`}
            >
              <CardContent className="pt-6 pb-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex items-center justify-center h-12 w-12 rounded-full ${
                      achievement.unlocked ? "bg-purple-100 dark:bg-purple-900/30" : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {achievement.unlocked ? achievement.icon : <Lock className="h-5 w-5 text-gray-400" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{achievement.title}</h3>
                      {achievement.unlocked && (
                        <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                          +{achievement.points}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>

                    {achievement.maxProgress && (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>
                            {achievement.progress} / {achievement.maxProgress}
                          </span>
                          <span>{Math.round((achievement.progress / achievement.maxProgress) * 100)}%</span>
                        </div>
                        <Progress
                          value={(achievement.progress / achievement.maxProgress) * 100}
                          className={`h-2 ${achievement.unlocked ? "bg-purple-100" : "bg-gray-100"}`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
