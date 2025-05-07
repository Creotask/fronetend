import Link from "next/link"
import { Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ContestCard } from "@/components/contest-card"

export default function ContestsPage() {
  // Mock data for contests
  const contests = [
    {
      id: "1",
      title: "Modern Logo Design for Tech Startup",
      description:
        "Looking for a sleek, minimalist logo that represents innovation and growth for our AI-powered analytics platform.",
      budget: "$500",
      deadline: "5 days",
      submissions: 12,
      category: "Design",
      client: {
        name: "TechVision Inc.",
        rating: 4.8,
      },
    },
    {
      id: "2",
      title: "E-commerce Website Redesign",
      description: "Need a complete overhaul of our online store to improve user experience and conversion rates.",
      budget: "$1,500",
      deadline: "14 days",
      submissions: 8,
      category: "Web Development",
      client: {
        name: "Fashion Forward",
        rating: 4.5,
      },
    },
    {
      id: "3",
      title: "Mobile App UI/UX Design",
      description:
        "Seeking creative designs for a fitness tracking app that motivates users and provides clear data visualization.",
      budget: "$800",
      deadline: "7 days",
      submissions: 15,
      category: "UI/UX",
      client: {
        name: "FitLife Solutions",
        rating: 4.9,
      },
    },
    {
      id: "4",
      title: "Content Writing for Blog Series",
      description: "Looking for engaging, SEO-optimized articles about sustainable living and eco-friendly products.",
      budget: "$300",
      deadline: "10 days",
      submissions: 6,
      category: "Writing",
      client: {
        name: "EcoLife Magazine",
        rating: 4.2,
      },
    },
    {
      id: "5",
      title: "Product Packaging Design",
      description:
        "Need creative packaging designs for a new line of organic skincare products that stand out on shelves.",
      budget: "$650",
      deadline: "8 days",
      submissions: 10,
      category: "Design",
      client: {
        name: "Pure Organics",
        rating: 4.7,
      },
    },
  ]

  // Placeholder variables to resolve errors.  These would ideally be used in the component logic.
  const SEO = ""
  const optimized = ""
  const articles = ""
  const about = ""
  const sustainable = ""

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Contests</h1>
          <p className="text-muted-foreground mt-1">Find opportunities to showcase your skills and win prizes</p>
        </div>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/contests/create">Post a Contest</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Keywords..." className="pl-8" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Categories</label>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="design" className="rounded border-gray-300" />
                    <label htmlFor="design" className="text-sm">
                      Design
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
                      Writing
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="marketing" className="rounded border-gray-300" />
                    <label htmlFor="marketing" className="text-sm">
                      Marketing
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="uiux" className="rounded border-gray-300" />
                    <label htmlFor="uiux" className="text-sm">
                      UI/UX
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <label className="text-sm font-medium">Budget</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Min" type="number" />
                  <Input placeholder="Max" type="number" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Deadline</label>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="any" name="deadline" className="rounded-full border-gray-300" />
                    <label htmlFor="any" className="text-sm">
                      Any time
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="24h" name="deadline" className="rounded-full border-gray-300" />
                    <label htmlFor="24h" className="text-sm">
                      24 hours
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="3days" name="deadline" className="rounded-full border-gray-300" />
                    <label htmlFor="3days" className="text-sm">
                      3 days
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="7days" name="deadline" className="rounded-full border-gray-300" />
                    <label htmlFor="7days" className="text-sm">
                      7 days
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Apply Filters</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-3 space-y-6">
          {contests.map((contest) => (
            <ContestCard key={contest.id} contest={contest} />
          ))}
        </div>
      </div>
    </div>
  )
}
