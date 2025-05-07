import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FreelancerCard } from "@/components/freelancer-card"

export default function FreelancersPage() {
  // Mock data for freelancers
  const freelancers = [
    {
      id: "1",
      name: "Alex Johnson",
      title: "UI/UX Designer",
      rating: 4.9,
      completedProjects: 78,
      hourlyRate: "$45",
      skills: ["UI Design", "Wireframing", "Figma", "Adobe XD"],
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Sarah Williams",
      title: "Full Stack Developer",
      rating: 4.8,
      completedProjects: 64,
      hourlyRate: "$55",
      skills: ["React", "Node.js", "MongoDB", "TypeScript"],
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      name: "Michael Chen",
      title: "Graphic Designer",
      rating: 4.7,
      completedProjects: 92,
      hourlyRate: "$40",
      skills: ["Illustrator", "Photoshop", "Branding", "Logo Design"],
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "4",
      name: "Emily Rodriguez",
      title: "Content Writer",
      rating: 4.9,
      completedProjects: 51,
      hourlyRate: "$35",
      skills: ["Blog Writing", "SEO", "Copywriting", "Editing"],
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "5",
      name: "David Kim",
      title: "Mobile App Developer",
      rating: 4.6,
      completedProjects: 43,
      hourlyRate: "$60",
      skills: ["React Native", "Swift", "Kotlin", "Firebase"],
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Find Freelancers</h1>
          <p className="text-muted-foreground mt-1">Discover talented professionals for your projects</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Search</h3>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search freelancers..." className="pl-8" />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Skills</h3>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="ui-design" className="rounded border-gray-300" />
                    <label htmlFor="ui-design" className="text-sm">
                      UI Design
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="development" className="rounded border-gray-300" />
                    <label htmlFor="development" className="text-sm">
                      Web Development
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="writing" className="rounded border-gray-300" />
                    <label htmlFor="writing" className="text-sm">
                      Content Writing
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="graphic-design" className="rounded border-gray-300" />
                    <label htmlFor="graphic-design" className="text-sm">
                      Graphic Design
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="mobile-dev" className="rounded border-gray-300" />
                    <label htmlFor="mobile-dev" className="text-sm">
                      Mobile Development
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Hourly Rate</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Min" type="number" />
                  <Input placeholder="Max" type="number" />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Rating</h3>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="rating-4.5" className="rounded border-gray-300" />
                    <label htmlFor="rating-4.5" className="text-sm">
                      4.5 & up
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="rating-4" className="rounded border-gray-300" />
                    <label htmlFor="rating-4" className="text-sm">
                      4.0 & up
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="rating-3.5" className="rounded border-gray-300" />
                    <label htmlFor="rating-3.5" className="text-sm">
                      3.5 & up
                    </label>
                  </div>
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </Card>
        </div>

        <div className="md:w-3/4">
          <div className="space-y-4">
            {freelancers.map((freelancer) => (
              <FreelancerCard key={freelancer.id} freelancer={freelancer} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
