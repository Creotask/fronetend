"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CreateContestPage() {
  const [contestType, setContestType] = useState("public")

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/contests">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to contests</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create a Contest</h1>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Contest Details</CardTitle>
          <CardDescription>Provide clear information to attract the best talent for your contest</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Contest Title</Label>
            <Input id="title" placeholder="E.g., Logo Design for Tech Startup" />
            <p className="text-xs text-muted-foreground">Be specific and clear about what you're looking for</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="writing">Writing</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="uiux">UI/UX</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your contest in detail. Include requirements, preferences, and any specific guidelines."
              rows={5}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="budget">Prize Amount ($)</Label>
              <Input id="budget" type="number" placeholder="500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline (days)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select deadline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Contest Type</Label>
            <RadioGroup value={contestType} onValueChange={setContestType} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public" className="font-normal">
                  Public Contest (Open to all freelancers)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private" className="font-normal">
                  Private Contest (Invite-only)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {contestType === "private" && (
            <div className="space-y-2">
              <Label htmlFor="invites">Invite Freelancers (Email addresses)</Label>
              <Textarea id="invites" placeholder="Enter email addresses separated by commas" rows={3} />
              <p className="text-xs text-muted-foreground">
                Only invited freelancers will be able to view and participate in your contest
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/contests">Cancel</Link>
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">Create Contest</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
