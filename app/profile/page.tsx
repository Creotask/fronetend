"use client"

import { useState } from "react"
import { Award, Edit, MapPin, Star } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("portfolio")

  // Mock user data
  const user = {
    name: "Alex Johnson",
    title: "UI/UX Designer & Frontend Developer",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=150&width=150",
    bio: "Passionate designer with 5+ years of experience creating user-centered digital experiences. Specialized in UI/UX design, wireframing, and frontend development.",
    rating: 4.9,
    completedProjects: 78,
    joinedDate: "January 2021",
    skills: [
      { name: "UI Design", level: 95 },
      { name: "Wireframing", level: 90 },
      { name: "Figma", level: 85 },
      { name: "React", level: 80 },
      { name: "HTML/CSS", level: 90 },
      { name: "JavaScript", level: 85 },
    ],
    portfolio: [
      {
        id: "1",
        title: "E-commerce Mobile App",
        description: "Designed a complete mobile shopping experience with a focus on simplicity and conversion.",
        image: "/placeholder.svg?height=200&width=300",
        tags: ["UI/UX", "Mobile", "E-commerce"],
      },
      {
        id: "2",
        title: "Financial Dashboard",
        description: "Created an intuitive dashboard for tracking investments and financial goals.",
        image: "/placeholder.svg?height=200&width=300",
        tags: ["Dashboard", "Data Visualization", "Web App"],
      },
      {
        id: "3",
        title: "Travel Booking Platform",
        description: "Redesigned the user flow for a travel booking website to improve conversion rates.",
        image: "/placeholder.svg?height=200&width=300",
        tags: ["UI/UX", "Web Design", "Travel"],
      },
    ],
    achievements: [
      { title: "Top Rated Freelancer", description: "Maintained 4.9+ rating for over 2 years", icon: "star" },
      { title: "Contest Winner", description: "Won 12 design contests", icon: "award" },
      { title: "Fast Responder", description: "Average response time under 2 hours", icon: "clock" },
    ],
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 border-2 border-purple-200">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.title}</p>
                <div className="flex items-center mt-2 text-sm">
                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="font-medium">{user.rating}</span>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <Award className="h-4 w-4 text-purple-600 mr-1" />
                  <span className="text-sm">{user.completedProjects} projects</span>
                </div>
                <Button className="mt-4 w-full bg-purple-600 hover:bg-purple-700">
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-medium mb-2">About</h3>
                  <p className="text-sm text-muted-foreground">{user.bio}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Skills</h3>
                  <div className="space-y-3">
                    {user.skills.map((skill, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Member Since</h3>
                  <p className="text-sm text-muted-foreground">{user.joinedDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="portfolio" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.portfolio.map((item) => (
                      <Card key={item.id} className="overflow-hidden border">
                        <div className="aspect-video relative">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="achievements" className="mt-4">
                  <div className="space-y-4">
                    {user.achievements.map((achievement, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-4 flex items-center">
                          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                            {achievement.icon === "star" && <Star className="h-6 w-6 text-purple-600" />}
                            {achievement.icon === "award" && <Award className="h-6 w-6 text-purple-600" />}
                          </div>
                          <div>
                            <h3 className="font-medium">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-4">
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">{user.rating}</h3>
                    <p className="text-muted-foreground">Based on 28 client reviews</p>

                    <div className="mt-8">
                      <p className="text-muted-foreground">
                        Client reviews would appear here, showing feedback from previous projects.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
