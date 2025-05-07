"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, Mail } from "lucide-react"
import { signIn } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { loginSchema, type LoginFormData } from "@/lib/validations/auth"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"  // Changed from "/dashboard" to "/" (home page)
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false
    }
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login submission started", data);
    setIsLoading(true)
    
    try {
      console.log("Calling signIn with redirect=true to enable NextAuth's built-in cookie handling");
      // Use redirect: true to let NextAuth handle cookie setting
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/dashboard"
      })
      
      // Code below won't execute due to redirect
      
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid email or password",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
      <Card className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="space-y-1">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" asChild className="mr-2">
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to home</span>
                  </Link>
                </Button>
                <CardTitle className="text-2xl">Log in to your account</CardTitle>
              </div>
              <CardDescription>Enter your email and password to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input 
                          placeholder="m@example.com" 
                          className="pl-10" 
                          type="email"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <FormControl>
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          className="pr-10" 
                          {...field}
                        />
                      </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      Remember me for 30 days
                    </FormLabel>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline text-purple-600 hover:text-purple-700">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
