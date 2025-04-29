'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES, selectUser, selectUserType, setUser, setUserType } from "../../features/user/userSlice";
import { selectUserEmail,  setUserEmail } from "../../features/user/userActiveEmail";
import {selectToken, setToken} from "../../features/token/tokenSlice";
import Head from "next/head"
import useLogin from "../../hooks/useLogin";
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginError() {
  return (
    <div id="alert-2" class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span class="sr-only">Info</span>
      <div class="ml-3 text-sm text-center font-medium">
        Email or password is incorrect.
      </div>

    </div>
  )
}

const signupSuccess = <div class="flex items-center text-center p-4 mb-4 text-sm text-green-800 border border-0 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
<svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
</svg>
<span class="sr-only">Info</span>
<div>
You have created a new account, please login to complete your profile
</div>
</div>


export default function LoginPage() {

    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(selectUser);
    const user_email = useSelector(selectUserEmail);
    const [isLoading, setIsLoading] = useState(false)
    const token = useSelector(selectToken);
    const [formErr, setFormErr] = useState(null)
    const searchParams = useSearchParams()
    const search = searchParams.get('user')
    const [spinner, setSpinner] = useState(false)	

    const { isIdle, isPending, error, mutateAsync: loginFn } = useLogin("https://avantrades-api.onrender.com/auth/jwt/create/", loginSuccess, USER_TYPES.user)
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    })
 
  
    const inputChangeHandler = (e) => {
      const { name, value } = e.target
      setFormData((prevValue) => {
        return {
          ...prevValue,
          [name]: value
        }
      })
  
    }
   
    async function loginEmail(){
      dispatch(setUserEmail(formData?.email))
      console.log("User Email: ", user_email)
    
    }

    loginEmail()
    
    async function loginSuccess() {
      
          console.log("Successful Login")
          const today = new Date();
          const oneMonthFromToday = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
          document.cookie = `user_type=user; expires=${oneMonthFromToday.toUTCString()} Path=/`
      
          console.log(document.cookie)
      }
  
  
    const submit = async (e) => {
      e.preventDefault();  
      try {
        
        await loginFn(formData)    
        loginSuccess()

      } catch (error) {
        console.log(error)
        setSpinner(false)
        setFormErr(error)
      }
    };
    
    if (user !== null) {

      router.push("/dashboard");
      
    }
    

  return (
    <div className="flex min-h-screen flex-col">
      	{search == "success" ? signupSuccess : ""}
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
            <h1 className="text-2xl font-semibold tracking-tight">Log in to your account</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials below to access your account</p>
          </div>
          <div className="grid gap-6">
      <form onSubmit={submit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-xs text-green-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
              required
              onChange={inputChangeHandler}
            />
          </div>
          <Button disabled={isPending} className="bg-green-600 hover:bg-green-700">
            {isPending ? "Logging in..." : "Log in"}
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
    </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-green-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
