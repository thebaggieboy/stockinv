import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SignupForm } from "@/components/signup-form"
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES, selectUser, setUser, setUserType } from "../../features/user/userSlice";
import Head from "next/head"
 
import { useMutation } from "@tanstack/react-query";
import useSignup from "@/hooks/useSignup";

export default function SignupPage() {
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
          <SignupForm />
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
