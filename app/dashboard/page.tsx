"use client"
import Link from "next/link"
import { BarChart3, CreditCard, DollarSign, LineChart, Menu, Settings, TrendingUp, User, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { WalletDeposit } from "@/components/wallet-deposit"
import { DashboardNav } from "@/components/dashboard-nav"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES, selectUser, selectUserType, setUser, setUserType } from "../../features/user/userSlice";
import { selectUserEmail,  setUserEmail } from "../../features/user/userActiveEmail";
import {selectToken, setToken} from "../../features/token/tokenSlice";


export default function DashboardPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const user_email = useSelector(selectUserEmail);
  const token = useSelector(selectToken);
   const router = useRouter();

  // if(user == null){
  //      router.push('/login')
  //   }

  async function logout() {
    try {
    
      document.cookie = ""

      dispatch(setToken(null))
    
      dispatch(setUserEmail(null))
      dispatch(setUser(null));
    
      
      
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-[hsl(var(--primary))]" />
            <span className="text-xl font-bold">StockGrowth</span>
          </div>
          <DashboardNav />
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User profile</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-background p-5">
        <div className="dashboard-container">
          <div className="dashboard-grid">
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title font-bold text-2xl">Dashboard</h1>
                <p className="dashboard-subtitle pt-2">Welcome back, {user?.[0]?.email}! Here's an overview of your investments.</p>
              </div> <br/>
              <div className="flex items-center gap-4">
              {user !== null ?  <Button style={{backgroundColor:'red'}}  onClick={logout}> Logout </Button> : ""}
                <Button onClick={() => router.push("/dashboard/investment-plans")} style={{backgroundColor:'green'}} variant="primary">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Invest Now
                </Button>
              
              </div>
            </div>
  <br/>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="dashboard-card">
                <CardHeader className="dashboard-card-header">
                  <CardTitle className="dashboard-card-title">Total Portfolio Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="dashboard-card-content">
                  <div className="dashboard-card-value">$1000.00</div>
                  <p className="dashboard-card-metric dashboard-card-metric-positive">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +0.00% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="dashboard-card">
                <CardHeader className="dashboard-card-header">
                  <CardTitle className="dashboard-card-title">ROI (All Time)</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="dashboard-card-content">
                  <div className="dashboard-card-value">0.00%</div>
                  <p className="dashboard-card-metric dashboard-card-metric-positive">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +0.00% from last week
                  </p>
                </CardContent>
              </Card>
              <Card className="dashboard-card">
                <CardHeader className="dashboard-card-header">
                  <CardTitle className="dashboard-card-title">Available Balance</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="dashboard-card-content">
                  <div className="dashboard-card-value">$1000.00</div>
                  <p className="dashboard-card-metric">Ready to invest</p>
                </CardContent>
              </Card>
            
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="col-span-1 dashboard-card">
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>Your investment growth over time</CardDescription>
                </CardHeader>
                <CardContent className="chart-container flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="mx-auto h-10 w-10 mb-2" />
                    <p>Portfolio performance chart</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1 dashboard-card">
                <CardHeader>
                  <CardTitle>Deposit to Wallet</CardTitle>
                  <CardDescription>Fund your account with cryptocurrency</CardDescription>
                </CardHeader>
                <CardContent>
                  <WalletDeposit />
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Deposits are typically processed within 10-30 minutes after confirmation.
                  </p>
                </CardFooter>
              </Card>
            </div>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your recent investment activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-[hsl(var(--primary)_/_0.2)] p-2">
                        <Wallet className="h-4 w-4 text-[hsl(var(--primary))]" />
                      </div>
                      <div>
                        <p className="font-medium">Deposit (Bitcoin)</p>
                        <p className="text-sm text-muted-foreground">Apr 15, 2025</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">+$5,000.00</p>
                      <p className="text-sm profit-text">Completed</p>
                    </div>  
                  </div>
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-[hsl(var(--chart-blue)_/_0.2)] p-2">
                        <DollarSign className="h-4 w-4 text-[hsl(var(--chart-blue))]" />
                      </div>
                      <div>
                        <p className="font-medium">Stock Purchase (AAPL)</p>
                        <p className="text-sm text-muted-foreground">Apr 14, 2025</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">-$2,450.00</p>
                      <p className="text-sm profit-text">Completed</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-[hsl(var(--chart-blue)_/_0.2)] p-2">
                        <DollarSign className="h-4 w-4 text-[hsl(var(--chart-blue))]" />
                      </div>
                      <div>
                        <p className="font-medium">Stock Purchase (MSFT)</p>
                        <p className="text-sm text-muted-foreground">Apr 12, 2025</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">-$1,850.00</p>
                      <p className="text-sm profit-text">Completed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t border-border py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 StockGrowth. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-[hsl(var(--primary))]">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-[hsl(var(--primary))]">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-[hsl(var(--primary))]">
              Help
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
