"use client"

import { useEffect, useState, useRef } from "react"
import { Award, Edit, MapPin, Star, CheckCircle, Lock, TrendingUp, Trophy, UserPlus, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth({ required: true })
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("portfolio")
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState<any>({})

  useEffect(() => {
    if (!user) return
    setLoading(true)
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data)
        setEditData({
          ...data,
          ...(data.profile || {}),
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [user])

  // Helper: update both user and profile fields
  const handleEditChange = (field: string, value: any) => {
    setEditData((prev: any) => ({ ...prev, [field]: value }))
  }

  // Calculate profile completion (example logic)
  const completion = profile
    ? Math.round((
        [
          profile.name,
          profile.bio,
          profile.profile?.skills?.length,
          profile.profile?.portfolio?.length,
        ].filter(Boolean).length / 4) * 100)
    : 0

  // Example rating/review summary (replace with real data if available)
  const rating = profile ? profile.rating || 4.8 : 4.8;
  const reviewCount = profile ? profile.reviewCount || 28 : 28;

  // For animated completion
  const prevCompletion = useRef(completion)

  // Use real XP, level, streak, endorsements, achievements from backend
  const xp = profile?.profile?.xp ?? 0
  const level = profile?.profile?.level ?? 1
  const streak = profile?.profile?.streak ?? 0
  const endorsements = profile?.profile?.endorsements ?? []
  const achievements = profile?.profile?.achievements ?? []
  const xpToNext = 500 - (xp % 500)

  // Completion tasks
  const completionTasks = [
    { label: "Add Name", done: !!profile?.name },
    { label: "Add Bio", done: !!profile?.profile?.bio },
    { label: "Add Skills", done: profile?.profile?.skills?.length > 0 },
    { label: "Add Portfolio", done: profile?.profile?.portfolio?.length > 0 },
  ]

  // Leaderboard (mocked)
  const leaderboardPos = 12
  // Trending (mocked)
  const trending = true
  // Daily/Weekly challenge (mocked)
  const dailyChallenge = { desc: "Apply to 2 new contests", timeLeft: "04:12:33", done: false }
  // Skill tree (mocked)
  const skillTree = [
    { name: "Design", children: [
      { name: "UI/UX", children: [{ name: "Figma" }, { name: "Adobe XD" }] },
      { name: "Branding" },
    ] },
    { name: "Development", children: [
      { name: "React" }, { name: "Next.js" }, { name: "TypeScript" }
    ] }
  ]

  if (isLoading || loading) {
    return <div className="container py-8 text-center">Loading profile...</div>
  }
  if (!profile) {
    return <div className="container py-8 text-center">Profile not found.</div>
  }

  // Example: profile.role, profile.name, etc. Adjust as needed for your API shape
  const isFreelancer = profile.role === "FREELANCER"
  const isClient = profile.role === "CLIENT"

  return (
    <div className="container py-10">
      {/* Gamified Profile Completion */}
      <div className="flex flex-col md:flex-row gap-8 mb-8 items-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative flex flex-col items-center"
        >
          {/* Circular Progress */}
          <svg width="110" height="110" className="rotate-[-90deg]">
            <circle cx="55" cy="55" r="48" fill="none" stroke="#ede9fe" strokeWidth="10" />
            <motion.circle
              cx="55" cy="55" r="48" fill="none"
              stroke="#a78bfa"
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 48}
              strokeDashoffset={2 * Math.PI * 48 * (1 - completion / 100)}
              strokeLinecap="round"
              animate={{ strokeDashoffset: 2 * Math.PI * 48 * (1 - completion / 100) }}
              transition={{ duration: 0.7 }}
            />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-purple-700">{completion}%</span>
            <span className="text-xs text-purple-400 font-semibold">Complete</span>
          </div>
        </motion.div>
        <div className="flex-1">
          <div className="flex flex-wrap gap-3 mb-2">
            {completionTasks.map((task, i) => (
              <span key={i} className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border transition-all",
                task.done
                  ? "bg-green-100 text-green-700 border-green-300 animate-pulse"
                  : "bg-purple-50 text-purple-400 border-purple-200 opacity-70"
              )}>
                {task.done ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Lock className="h-4 w-4 text-purple-300" />}
                {task.label}
              </span>
            ))}
          </div>
          <div className="flex gap-4 items-center mt-2">
            <span className="text-xs text-purple-400 font-semibold">XP: <span className="text-purple-700 font-bold">{xp}</span></span>
            <span className="text-xs text-purple-400 font-semibold">Level: <span className="text-purple-700 font-bold">{level}</span></span>
            <span className="text-xs text-purple-400 font-semibold">To next: <span className="text-purple-700 font-bold">{xpToNext} XP</span></span>
            <span className="text-xs text-purple-400 font-semibold flex items-center gap-1"><Zap className="h-4 w-4 text-yellow-400 animate-pulse" /> Streak: <span className="text-purple-700 font-bold">{streak}d</span></span>
            {trending && <span className="text-xs text-pink-500 font-bold flex items-center gap-1 animate-bounce"><TrendingUp className="h-4 w-4" /> Trending</span>}
          </div>
        </div>
      </div>
      {/* Profile Card + Leaderboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <Card className="bg-gradient-to-br from-purple-100/80 to-white shadow-2xl border-0 rounded-3xl relative">
            <CardContent className="pt-12 pb-10 flex flex-col items-center text-center relative">
              {/* Leaderboard */}
              <div className="absolute top-4 right-4 flex flex-col items-end">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold shadow flex items-center gap-1"><Trophy className="h-4 w-4" /> #{leaderboardPos} Leaderboard</span>
              </div>
              {/* Avatar */}
              <div className="relative mb-2">
                <Avatar className="h-32 w-32 border-4 border-purple-300 shadow-xl">
                  <AvatarImage src={profile.avatar || "/placeholder-user.jpg"} alt={profile.name} />
                  <AvatarFallback className="bg-purple-200 text-purple-700 text-4xl">{profile.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button size="icon" className="absolute bottom-2 right-2 bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 rounded-full p-3 shadow-lg border-2 border-white" onClick={() => setEditOpen(true)}>
                  <Edit className="h-6 w-6 text-white" />
                </Button>
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-purple-900 flex items-center gap-2 drop-shadow-sm">
                {profile.name}
                {isFreelancer && <Star className="h-6 w-6 text-yellow-400 animate-pulse" />}
              </h2>
              <p className="text-purple-700 font-medium text-lg mt-1 mb-2 tracking-wide">
                {profile.title || (isFreelancer ? 'Creative Specialist' : isClient ? 'Project Owner' : '')}
              </p>
              <div className="flex items-center justify-center gap-2 text-base text-purple-600 mb-2">
                <MapPin className="h-5 w-5" />
                <span>{profile.location || "Remote"}</span>
              </div>
              {/* Rating/Review Summary */}
              <div className="flex items-center justify-center gap-2 mt-2 mb-4">
                <Star className="h-6 w-6 text-yellow-400" />
                <span className="font-bold text-xl text-purple-900">{rating}</span>
                <span className="text-xs text-purple-400">({reviewCount} reviews)</span>
              </div>
              {/* Bio */}
              <div className="w-full mt-6">
                <h3 className="font-bold text-purple-800 mb-2 text-left text-lg">About</h3>
                <p className="text-base text-purple-700 bg-purple-50 rounded-xl p-4 shadow-inner min-h-[48px] border border-purple-100">{profile.profile?.bio || "No bio yet."}</p>
              </div>
              {/* Skills */}
              {isFreelancer && profile.profile?.skills && profile.profile.skills.length > 0 && (
                <div className="w-full mt-8">
                  <h3 className="font-bold text-purple-800 mb-2 text-left text-lg">Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {profile.profile.skills.map((skill: string, idx: number) => (
                      <Badge
                        key={idx}
                        className="bg-gradient-to-br from-purple-200 to-purple-400 text-purple-900 font-semibold px-4 py-2 rounded-full shadow-md transition-all duration-200 hover:bg-purple-600 hover:text-white cursor-pointer animate-fade-in text-base border border-purple-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {/* Endorsements */}
              {isFreelancer && endorsements.length > 0 && (
                <div className="w-full mt-4">
                  <h3 className="font-bold text-purple-800 mb-2 text-left text-lg">Endorsements</h3>
                  <div className="flex flex-wrap gap-2">
                    {endorsements.map((endorsement: string, idx: number) => (
                      <span key={idx} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Endorsed: {endorsement}</span>
                    ))}
                  </div>
                </div>
              )}
              {/* Skill Tree Visualization (mocked) */}
              <div className="w-full mt-8">
                <h3 className="font-bold text-purple-800 mb-2 text-left text-lg">Skill Tree</h3>
                <div className="flex flex-col gap-2 items-start">
                  {skillTree.map((branch, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="font-bold text-purple-700">{branch.name}</span>
                      {branch.children && branch.children.map((child: any, j: number) => (
                        <span key={j} className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">{child.name}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {/* Daily/Weekly Challenge */}
              <div className="w-full mt-8">
                <h3 className="font-bold text-purple-800 mb-2 text-left text-lg">Daily Challenge</h3>
                <div className="flex items-center gap-3 bg-purple-50 rounded-xl p-3 border border-purple-100">
                  <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
                  <span className="font-semibold text-purple-700">{dailyChallenge.desc}</span>
                  <span className="ml-auto text-xs text-purple-400 font-bold">{dailyChallenge.timeLeft}</span>
                  {dailyChallenge.done ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Lock className="h-5 w-5 text-purple-300" />}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Dynamic Content: Profile Stats, Portfolio Carousel, Achievements, Projects */}
        <div className="md:col-span-2 flex flex-col gap-10">
          {/* Profile Stats (XP, Level, Streak) - Moved from gamified section */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-purple-400 font-semibold">XP</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-extrabold text-purple-900">{xp}</span>
                  <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
                    <div className="h-2 bg-purple-400 rounded-full" style={{width: `${Math.min(100, (xp / 500) * 100)}%`}} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-purple-400 font-semibold">Level</span>
                <span className="text-2xl font-extrabold text-purple-900">{level}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-purple-400 font-semibold">Streak</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-extrabold text-purple-900">{streak}d</span>
                  <Zap className="h-6 w-6 text-yellow-400 animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-purple-400 font-semibold">To Next Level</span>
                <span className="text-2xl font-extrabold text-purple-900">{xpToNext} XP</span>
              </div>
            </div>
          </div>
          {/* Achievement Showcase */}
          <div className="mb-8">
            <h3 className="font-bold text-2xl text-purple-900 mb-4">Achievements</h3>
            <div className="flex flex-wrap gap-4">
              {achievements.length === 0 && <span className="text-purple-400">No achievements yet.</span>}
              {achievements.map((ach: any, idx: number) => (
                <motion.div
                  key={ach.id || idx}
                  initial={{ scale: 0.9, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.1, type: "spring" }}
                  className={cn(
                    "flex flex-col items-center p-4 rounded-2xl border-2 shadow-md min-w-[120px]",
                    "border-purple-300 bg-purple-50",
                    !ach.unlocked && "opacity-50 grayscale"
                  )}
                >
                  {ach.iconUrl ? (
                    <img src={ach.iconUrl} alt={ach.title} className="h-8 w-8 mb-2 rounded-full bg-purple-100" />
                  ) : (
                    <Trophy className="h-8 w-8 mb-2 text-purple-400" />
                  )}
                  <span className="font-bold text-purple-900 text-base text-center">{ach.title}</span>
                  <span className="text-xs text-purple-400 text-center mb-1">{ach.description}</span>
                  <span className="text-xs font-bold text-purple-700">{ach.achievedAt ? new Date(ach.achievedAt).toLocaleDateString() : ""}</span>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Portfolio Carousel */}
          {isFreelancer && profile.profile?.portfolio && profile.profile.portfolio.length > 0 && (
            <div>
              <h3 className="font-bold text-2xl text-purple-900 mb-4">Portfolio</h3>
              <Carousel className="w-full">
                <CarouselContent>
                  {profile.profile.portfolio.map((item: any, idx: number) => (
                    <CarouselItem key={idx} className="basis-1/1 md:basis-1/2 lg:basis-1/3 px-3">
                      <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-200 rounded-2xl bg-gradient-to-br from-purple-50 to-white">
                        <div className="aspect-video relative">
                          <img
                            src={item.image || "/placeholder.jpg"}
                            alt={item.title}
                            className="object-cover w-full h-full rounded-t-2xl"
                          />
                        </div>
                        <CardHeader className="p-5">
                          <CardTitle className="text-xl line-clamp-1 text-purple-900 font-bold">{item.title || "Untitled"}</CardTitle>
                          <CardDescription className="line-clamp-2 text-purple-700">{item.description || "No description."}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-5 pt-0">
                          <div className="flex flex-wrap gap-2">
                            {(item.tags || []).map((tag: string, i: number) => (
                              <Badge key={i} className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full font-semibold shadow-sm">{tag}</Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )}
          {/* Reviews Section */}
          <div className="mb-8">
            <h3 className="font-bold text-2xl text-purple-900 mb-4">Reviews</h3>
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Star className="h-8 w-8 text-yellow-400" />
                <span className="text-2xl font-bold text-purple-900">{rating}</span>
                <span className="text-base text-purple-400">({reviewCount} reviews)</span>
                <div className="flex-1 flex gap-2 ml-4">
                  {/* Visual rating breakdown (mocked) */}
                  {[5,4,3,2,1].map(star => (
                    <div key={star} className="flex items-center gap-1">
                      <span className="text-xs text-purple-400">{star}★</span>
                      <div className="w-16 h-2 bg-purple-100 rounded-full overflow-hidden">
                        <div className="h-2 bg-purple-400 rounded-full" style={{width: `${Math.max(0, 30 - (star-1)*5)}%`}} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Highlighted quote (mocked) */}
              <div className="italic text-purple-700 text-lg border-l-4 border-purple-300 pl-4">“Great work and fast delivery!”</div>
              {/* Client logos (mocked) */}
              <div className="flex gap-3 mt-2">
                <img src="/placeholder-logo.png" alt="Client Logo" className="h-8 w-8 rounded-full bg-purple-100" />
                <img src="/placeholder-logo.png" alt="Client Logo" className="h-8 w-8 rounded-full bg-purple-100" />
                <img src="/placeholder-logo.png" alt="Client Logo" className="h-8 w-8 rounded-full bg-purple-100" />
              </div>
            </div>
          </div>
          {/* Projects (Client) */}
          {isClient && (
            <div className="mb-8">
              <h3 className="font-bold text-2xl text-purple-900 mb-4">Projects</h3>
              <div className="space-y-4">
                {(profile.projects || []).length === 0 && (
                  <div className="text-purple-400 text-center text-lg">No projects yet.</div>
                )}
                {(profile.projects || []).map((project: any, idx: number) => (
                  <Card key={idx} className="overflow-hidden border-0 shadow-md rounded-xl bg-gradient-to-br from-purple-100 to-white">
                    <CardHeader className="p-5">
                      <CardTitle className="text-xl text-purple-900 font-bold">{project.title}</CardTitle>
                      <CardDescription className="text-purple-700">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Budget: {project.budget}</Badge>
                        <Badge variant="secondary">Deadline: {project.deadline}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
