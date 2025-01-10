import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useSignup } from "@/features/auth-management"
import { useNavigate } from "react-router-dom"
import { signupSchema, SignupFormValues } from "../schemas/auth"

export default function SignupForm() {
  const [formState, setFormState] = useState<SignupFormValues>({
    name: "",
    email: "",
    password: ""
  })
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({})
  const navigate = useNavigate()
  const mutation = useSignup()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    setErrorMessages((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      signupSchema.parse(formState)
      mutation.mutate(formState, {
        onSuccess: () => {
          navigate("/login")
        },
        onError: (err: Error) => {
          setErrorMessages({ form: err.message })
        }
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = (err as z.ZodError).flatten().fieldErrors
        const formattedErrors = Object.keys(fieldErrors).reduce((acc, key) => {
          acc[key] = fieldErrors[key]?.join(", ") || ""
          return acc
        }, {} as Record<string, string>)
        setErrorMessages(formattedErrors)
      }
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formState.name}
              onChange={handleChange}
              aria-invalid={!!errorMessages.name}
              aria-describedby="name-error"
            />
            {errorMessages.name && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription id="name-error">{errorMessages.name}</AlertDescription>
              </Alert>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formState.email}
              onChange={handleChange}
              aria-invalid={!!errorMessages.email}
              aria-describedby="email-error"
            />
            {errorMessages.email && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription id="email-error">{errorMessages.email}</AlertDescription>
              </Alert>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formState.password}
              onChange={handleChange}
              aria-invalid={!!errorMessages.password}
              aria-describedby="password-error"
            />
            {errorMessages.password && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription id="password-error">{errorMessages.password}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "Signing up..." : "Sign Up"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
