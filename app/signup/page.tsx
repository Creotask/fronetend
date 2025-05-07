"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, Mail, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SignupPage() {
  const searchParams = useSearchParams()
  const defaultType = searchParams.get("type") === "client" ? "client" : "freelancer"
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to home</span>
              </Link>
            </Button>
            <CardTitle className="text-2xl">Create an account</CardTitle>
          </div>
          <CardDescription>Choose your account type and enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue={defaultType} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="freelancer">Freelancer</TabsTrigger>
              <TabsTrigger value="client">Client</TabsTrigger>
            </TabsList>
            <TabsContent value="freelancer" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="freelancer-name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="freelancer-name" placeholder="John Doe" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="freelancer-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="freelancer-email" type="email" placeholder="john@example.com" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="freelancer-password">Password</Label>
                <div className="relative">
                  <Input id="freelancer-password" type={showPassword ? "text" : "password"} className="pr-10" />
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="client" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="client-company">Company Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="client-company" placeholder="Acme Inc." className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="client-email" type="email" placeholder="contact@acme.com" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-password">Password</Label>
                <div className="relative">
                  <Input id="client-password" type={showPassword ? "text" : "password"} className="pr-10" />
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-purple-600 hover:bg-purple-700">Create account</Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline text-purple-600 hover:text-purple-700">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
