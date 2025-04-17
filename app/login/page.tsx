import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
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
            <h1 className="text-2xl font-semibold tracking-tight">Log in to your account</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials below to access your account</p>
          </div>
          <LoginForm />
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
