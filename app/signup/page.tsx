'use client'
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SignupForm } from "@/components/signup-form"
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES, selectUser, setUser, setUserType } from "../../features/user/userSlice";
import Head from "next/head"

import { useMutation } from "@tanstack/react-query";
import useSignUp from "@/hooks/useSignUp";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  const user = useSelector(selectUser);
  const router = useRouter(); 
  const [spinner, setSpinner] = useState(false);
   const [isLoading, setIsLoading] = useState(false)
 
  const dispatch = useDispatch();

    const { isIdle, isPending, error, mutateAsync: signUpFn } = useSignUp("http://127.0.0.1:8000/auth/users/", signUpSuccess, USER_TYPES.user)
    //const { isIdle, isPending, error, mutateAsync: signUpFn } = useDjoserSignup("https://altclan-brands-api-1-1.onrender.com/auth/jwt/create", signUpSuccess, USER_TYPES.user)
  
    
    const [formErr, setFormErr] = useState(error)
    const [formData, setFormData] = useState({
      email: "",
      password1: "",
      password2: ""
    })
  
    const { email, password1, password2 } = formData
  
    const emailErr = formErr?.email || null;
    const passwordErr = formErr?.password || formErr?.password2 || null
  
    const inputChangeHandler = (e) => {
      const { name, value } = e.target
      setFormData((prevValue) => {
        return {
          ...prevValue,
          [name]: value
        }
      })
  
    }
    
    function signUpSuccess() {
      
      router.push("/dashboard")
    }
    const submit = async (e) => {
      
      e.preventDefault();
      try {
        if (password1 !== password2) {
          throw { password: "Passwords do not match" }
        }
        setSpinner(true)
        const url = "http://127.0.0.1:8000/auth/users/"
        const res = await fetch(url, {
                  method: "POST",
                  headers: {
  
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email, password:password1}),
                  credentials: "include"
  
              })
              const data = await res.json()
  
              if (res.status >= 200 & res.status <= 209) {
              console.log("New User Registered.")
              console.log(data)
              setSpinner(false)
              signUpSuccess()
              await signUpFn(formData)
             
              
                  
                  
              }
        
              const error = { ...data }
              throw error
  
        
      
      } catch (error) {
        setFormErr(error)
        console.log("SIGNUP ERROR: ", error)
      }
    };
  
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <Link
          href="/"
          className="absolute left-4 top-4 flex items-center text-sm font-medium text-muted-foreground hover:text-green-600 md:left-8 md:top-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your details below to create your account</p>
          </div>
          <div className="grid gap-6">
      <form onSubmit={submit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
							id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
              onChange={inputChangeHandler}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password1"
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              disabled={isLoading}
              required
              onChange={inputChangeHandler}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="password2"
              name="password2"
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete
              autoCorrect="off"
              disabled={isLoading}
              required
              onChange={inputChangeHandler}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" disabled={isLoading}>
          Google
        </Button>
        <Button variant="outline" disabled={isLoading}>
          Apple
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-green-600 hover:underline">
          Sign in
        </Link>
      </div>
    </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-green-600">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-green-600">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
