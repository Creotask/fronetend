"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, Mail, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const defaultType = searchParams.get("type") === "client" ? "client" : "freelancer"
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [accountType, setAccountType] = useState(defaultType)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    
    // Extract field name from id (remove prefix)
    const fieldName = id.includes('-') ? id.split('-')[1] : id
    
    setFormData({
      ...formData,
      [fieldName]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: accountType === 'client' ? 'CLIENT' : 'FREELANCER',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      toast({
        title: "Account created!",
        description: "You've successfully signed up. Redirecting to login...",
      })
      
      // Redirect to login page after short delay
      setTimeout(() => {
        router.push('/login')
      }, 2000)
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "Something went wrong",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
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
            <Tabs 
              defaultValue={defaultType} 
              className="w-full"
              onValueChange={(value) => setAccountType(value)}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="freelancer">Freelancer</TabsTrigger>
                <TabsTrigger value="client">Client</TabsTrigger>
              </TabsList>
              <TabsContent value="freelancer" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="freelancer-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="freelancer-name" 
                      placeholder="John Doe" 
                      className="pl-10" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freelancer-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="freelancer-email" 
                      type="email" 
                      placeholder="john@example.com" 
                      className="pl-10" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freelancer-password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="freelancer-password" 
                      type={showPassword ? "text" : "password"} 
                      className="pr-10" 
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                    />
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
                  <Label htmlFor="client-name">Company Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="client-name" 
                      placeholder="Acme Inc." 
                      className="pl-10" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="client-email" 
                      type="email" 
                      placeholder="contact@acme.com" 
                      className="pl-10" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="client-password" 
                      type={showPassword ? "text" : "password"} 
                      className="pr-10" 
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                    />
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
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline text-purple-600 hover:text-purple-700">
                Log in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
