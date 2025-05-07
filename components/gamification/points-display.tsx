"use client"

import { useGamification } from "@/components/gamification/gamification-provider"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function PointsDisplay() {
  const { points, level } = useGamification()

  // Calculate progress to next level
  const nextLevel = level.level < 5 ? level.level + 1 : level.level
  const nextLevelPoints =
    level.level < 5
      ? level.pointsRequired + (nextLevel === 2 ? 100 : nextLevel === 3 ? 200 : nextLevel === 4 ? 400 : 800)
      : level.pointsRequired

  const progressPercentage =
    level.level < 5 ? ((points - level.pointsRequired) / (nextLevelPoints - level.pointsRequired)) * 100 : 100

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 bg-muted/50 rounded-full px-3 py-1 cursor-pointer hover:bg-muted transition-colors">
            <div className={`flex items-center justify-center h-6 w-6 rounded-full ${level.color} bg-opacity-20`}>
              {level.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium">{level.title}</span>
              <div className="flex items-center gap-1">
                <Progress value={progressPercentage} className="h-1 w-16" />
                <span className="text-xs text-muted-foreground">{points}</span>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <div className="text-center">
            <p className="font-medium">{level.title} Level</p>
            <p className="text-sm text-muted-foreground">
              {level.level < 5
                ? `${points - level.pointsRequired}/${nextLevelPoints - level.pointsRequired} points to next level`
                : "Max level reached!"}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
