import Link from "next/link"
import { Award, DollarSign, Star } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Freelancer {
  id: string
  name: string
  title: string
  rating: number
  completedProjects: number
  hourlyRate: string
  skills: string[]
  avatar: string
}

interface FreelancerCardProps {
  freelancer: Freelancer
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Avatar className="h-16 w-16 border">
            <AvatarImage src={freelancer.avatar || "/placeholder.svg"} alt={freelancer.name} />
            <AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-semibold text-lg">{freelancer.name}</h3>
                <p className="text-muted-foreground">{freelancer.title}</p>
              </div>
              <div className="flex items-center mt-2 md:mt-0">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="font-medium">{freelancer.rating}</span>
                <span className="mx-2 text-muted-foreground">•</span>
                <Award className="h-4 w-4 text-purple-600 mr-1" />
                <span className="text-sm">{freelancer.completedProjects} projects</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {freelancer.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex items-center mt-4">
              <DollarSign className="h-4 w-4 text-green-600 mr-1" />
              <span className="font-medium">{freelancer.hourlyRate}</span>
              <span className="text-sm text-muted-foreground ml-1">/ hour</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/20 px-6 py-3 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/freelancers/${freelancer.id}`}>View Profile</Link>
        </Button>
        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
          Invite to Contest
        </Button>
      </CardFooter>
    </Card>
  )
}
