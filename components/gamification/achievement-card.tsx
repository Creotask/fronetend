"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useGamification } from "@/components/gamification/gamification-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AchievementCard() {
  const { achievements } = useGamification()

  // Get the most recent unlocked achievement
  const recentAchievement = achievements.find((a) => a.unlocked)

  // Get the next achievement to unlock (with progress if available)
  const nextAchievement = achievements.find((a) => !a.unlocked && a.progress !== undefined)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-amber-500" />
          Achievements
        </CardTitle>
        <CardDescription>Your latest milestones</CardDescription>
      </CardHeader>
      <CardContent>
        {recentAchievement && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Recently Unlocked</h3>
            <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/20">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 shrink-0">
                {recentAchievement.icon}
              </div>
              <div>
                <h4 className="font-medium">{recentAchievement.title}</h4>
                <p className="text-xs text-muted-foreground">{recentAchievement.description}</p>
              </div>
            </div>
          </div>
        )}

        {nextAchievement && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Next Achievement</h3>
            <div className="flex items-start gap-3 p-3 rounded-lg border">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 shrink-0">
                <Award className="h-5 w-5 text-gray-400" />
              </div>
              <div className="w-full">
                <h4 className="font-medium">{nextAchievement.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{nextAchievement.description}</p>

                {nextAchievement.maxProgress && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>
                        {nextAchievement.progress} / {nextAchievement.maxProgress}
                      </span>
                      <span>{Math.round((nextAchievement.progress / nextAchievement.maxProgress) * 100)}%</span>
                    </div>
                    <Progress value={(nextAchievement.progress / nextAchievement.maxProgress) * 100} className="h-2" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <Button asChild variant="link" className="text-sm text-purple-600 dark:text-purple-400">
            <Link href="/achievements">View all achievements</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
