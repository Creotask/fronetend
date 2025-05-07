"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Award, BarChart3, Clock, DollarSign, FileText, Plus, Star, Users, Zap } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useGamification } from "@/components/gamification/gamification-provider"
import { DailyStreakCard } from "@/components/gamification/daily-streak-card"
import { AchievementCard } from "@/components/gamification/achievement-card"

export default function DashboardPage() {
  const { points, level, achievements, addPoints } = useGamification()
  const [showWelcome, setShowWelcome] = useState(true)
  
  // Mock data for active contests
  const activeContests = [
    {
      id: "1",
      title: "Logo Design for Tech Startup",
      submissions: 24,
      deadline: "3 days left",
      budget: "$500"
    },
    {
      id: "2",
      title: "Website Redesign Project",
      submissions: 18,
      deadline: "5 days left",
      budget: "$1,200"
    }
  ]
  
  // Mock data for recent submissions
  const recentSubmissions = [
    {
      id: "1",
      contestTitle: "Mobile App UI Design",
      date: "Yesterday",
      status: "Under Review"
    },
    {
      id: "2",
      contestTitle: "Brand Identity Package",
      date: "3 days ago",
      status: "Winner Selected"
    },
    {
      id: "3",
      contestTitle: "Marketing Materials Design",
      date: "1 week ago",
      status: "Completed"
    }
  ]

  // Hide welcome message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // For demo purposes - add points when clicking "Find New Contests"
  const handleFindContests = () => {
    addPoints(10, "Exploring new opportunities")
  }

  return (
    <div className="container py-8">
      {showWelcome && (
        <motion.div
          className="mb-6 p-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold">Welcome back, Alex!</h2>
              <p className="text-sm opacity-90">You have 2 active contests and 3 new notifications</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto text-white border-white/30 hover:bg-white/20 hover:text-white"
              onClick={() => setShowWelcome(false)}
            >
              Dismiss
            </Button>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Alex!</p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          onClick={handleFindContests}
        >
          <Link href="/contests">
            <Plus className="mr-2 h-4 w-4" /> Find New Contests
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">$4,550</div>
              <div className="flex items-center mt-1">
                <Badge
                  variant="outline"
                  className="text-green-500 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/30"
                >
                  +12%
                </Badge>
                <span className="text-xs text-muted-foreground ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
              <CardTitle className="text-sm font-medium">Contest Wins</CardTitle>
              <Award className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">12</div>
              <div className="flex items-center mt-1">
                <Badge
                  variant="outline"
                  className="text-purple-500 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/30"
                >
                  +2
                </Badge>
                <span className="text-xs text-muted-foreground ml-2">new this month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20">
              <CardTitle className="text-sm font-medium">Submissions</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">42</div>
              <div className="flex items-center mt-1">
                <Badge
                  variant="outline"
                  className="text-blue-500 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/30"
                >
                  +8
                </Badge>
                <span className="text-xs text-muted-foreground ml-2">new this month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">4.9</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">Based on 28 reviews</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-7 mt-6">
        <motion.div
          className="md:col-span-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Active Contests</CardTitle>
              <CardDescription>Contests you're currently participating in</CardDescription>
            </CardHeader>
            <CardContent>
              {activeContests.length > 0 ? (
                <div className="space-y-4">
                  {activeContests.map((contest) => (
                    <div
                      key={contest.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:border-purple-200 dark:hover:border-purple-800 transition-colors group"
                    >
                      <div className="space-y-1">
                        <Link
                          href={`/contests/${contest.id}`}
                          className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
                        >
                          {contest.title}
                        </Link>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-1 h-4 w-4" />
                          <span>{contest.submissions} submissions</span>
                          <span className="mx-2">•</span>
                          <Clock className="mr-1 h-4 w-4" />
                          <span>{contest.deadline}</span>
                        </div>
                      </div>
                      <div className="font-medium text-green-600">{contest.budget}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="font-medium">No active contests</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You're not participating in any contests right now
                  </p>
                  <Button
                    asChild
                    className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    <Link href="/contests">Browse Contests</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="md:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>Your latest contest entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-purple-200 dark:hover:border-purple-800 transition-colors group"
                  >
                    <div className="space-y-1">
                      <Link
                        href={`/submissions/${submission.id}`}
                        className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
                      >
                        {submission.contestTitle}
                      </Link>
                      <div className="text-sm text-muted-foreground">{submission.date}</div>
                    </div>
                    <Badge
                      variant={
                        submission.status === "Winner Selected"
                          ? "default"
                          : submission.status === "Under Review"
                            ? "outline"
                            : "secondary"
                      }
                      className={
                        submission.status === "Winner Selected" ? "bg-gradient-to-r from-green-600 to-emerald-600" : ""
                      }
                    >
                      {submission.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <DailyStreakCard />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Level Progress</CardTitle>
              <CardDescription>Your journey to mastery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full ${level.color} bg-opacity-20`}>
                  {level.icon}
                </div>
                <div>
                  <h3 className="font-medium">{level.title}</h3>
                  <p className="text-sm text-muted-foreground">Level {level.level}</p>
                </div>
              </div>

              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-sm">
                  <span>{points} points</span>
                  <span>
                    {level.level < 5
                      ? `${level.pointsRequired + (level.level === 1 ? 100 : level.level === 2 ? 200 : level.level === 3 ? 400 : 800)} next level`
                      : "Max level"}
                  </span>
                </div>
                <Progress
                  value={
                    level.level < 5
                      ? ((points - level.pointsRequired) /
                          (level.level === 1 ? 100 : level.level === 2 ? 200 : level.level === 3 ? 400 : 800)) *
                        100
                      : 100
                  }
                  className="h-2"
                />
              </div>

              <div className="text-center">
                <Link href="/achievements" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                  View all achievements
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <AchievementCard />
        </motion.div>
      </div>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>Track your contest performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="earnings">
              <TabsList className="mb-4 bg-muted/50 p-1">
                <TabsTrigger
                  value="earnings"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                >
                  Earnings
                </TabsTrigger>
                <TabsTrigger
                  value="submissions"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                >
                  Submissions
                </TabsTrigger>
                <TabsTrigger
                  value="wins"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                >
                  Contest Wins
                </TabsTrigger>
              </TabsList>
              <TabsContent value="earnings" className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Earnings chart visualization would appear here</p>
                </div>
              </TabsContent>
              <TabsContent value="submissions" className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Submissions chart visualization would appear here</p>
                </div>
              </TabsContent>
              <TabsContent value="wins" className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Contest wins chart visualization would appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
