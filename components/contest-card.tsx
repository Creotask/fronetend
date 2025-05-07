import Link from "next/link"
import { Clock, DollarSign, Star, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Contest {
  id: string
  title: string
  description: string
  budget: string
  deadline: string
  submissions: number
  category: string
  client: {
    name: string
    rating: number
  }
}

interface ContestCardProps {
  contest: Contest
}

export function ContestCard({ contest }: ContestCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
          <div>
            <Badge className="mb-2">{contest.category}</Badge>
            <CardTitle className="text-xl">{contest.title}</CardTitle>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span>{contest.client.rating}</span>
            <span className="mx-2">•</span>
            <span>{contest.client.name}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{contest.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-green-600" />
            <div>
              <p className="text-sm font-medium">{contest.budget}</p>
              <p className="text-xs text-muted-foreground">Prize</p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-orange-600" />
            <div>
              <p className="text-sm font-medium">{contest.deadline}</p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-blue-600" />
            <div>
              <p className="text-sm font-medium">{contest.submissions}</p>
              <p className="text-xs text-muted-foreground">Submissions</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View Details</Button>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href={`/contests/${contest.id}/submit`}>Submit Entry</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
