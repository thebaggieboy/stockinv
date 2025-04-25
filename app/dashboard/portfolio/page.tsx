"use client"
import Link from "next/link"
import { BarChart3, DollarSign, LineChart, PieChart, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardNav } from "@/components/dashboard-nav"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES, selectUser, selectUserType, setUser, setUserType } from "../../../features/user/userSlice";
import { selectUserEmail,  setUserEmail } from "../../../features/user/userActiveEmail";
import {selectToken, setToken} from "../../../features/token/tokenSlice";
import { useState } from "react"



export default function PortfolioPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const user_email = useSelector(selectUserEmail);
  const token = useSelector(selectToken);
   const router = useRouter();
   const [wallets, setWallets] = useState([]);

   if(user == null){
       router.push('/login')
    }


async function fetchBalance(){
  const res =  await fetch(`https://avantrades-api.onrender.com/api/wallets/${user?.[0]?.id}`, {
    method: "GET",
    headers: {
    
        "Content-Type": "application/json"
    },
})

const data = await res.json()
if (res.status >= 200 & res.status <= 209) {
  setWallets(data)
  console.log("Wallets [STATE]: ", data);
}
 



}
fetchBalance()
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
            <Button variant="ghost" size="icon">
              <PieChart className="h-5 w-5" />
              <span className="sr-only">Portfolio Analysis</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-background p-5">
        <div className="dashboard-container">
          <div className="dashboard-grid">
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">Portfolio</h1>
                <p className="dashboard-subtitle">Track and manage your investment portfolio</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline">
                  <LineChart className="mr-2 h-4 w-4" />
                  View Reports
                </Button>
                <Button onClick={() => router.push("/dashboard/investment-plans")} variant="primary">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Invest More
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="dashboard-card">
                <CardHeader className="dashboard-card-header">
                  <CardTitle className="dashboard-card-title">Total Portfolio Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="dashboard-card-content">
                  <div className="dashboard-card-value">${wallets?.balance}</div>
                  <p className="dashboard-card-metric dashboard-card-metric-positive">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +{wallets?.this_month_roi}% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="dashboard-card">
                <CardHeader className="dashboard-card-header">
                  <CardTitle className="dashboard-card-title">ROI (All Time)</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="dashboard-card-content">
                  <div className="dashboard-card-value">{wallets?.all_time_roi}%</div>
                  <p className="dashboard-card-metric dashboard-card-metric-positive">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +0.00% from last week
                  </p>
                </CardContent>
              </Card>
            
              <Card className="dashboard-card">
                <CardHeader className="dashboard-card-header">
                  <CardTitle className="dashboard-card-title">Monthly Profit</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="dashboard-card-content">
                  <div className="dashboard-card-value">$0.00</div>
                  <p className="dashboard-card-metric dashboard-card-metric-positive">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +0.00% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
 

           {/* { <Card className="dashboard-card mt-6">
              <CardHeader>
                <CardTitle>Active Investments</CardTitle>
                <CardDescription>Your current investment plans</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Plans</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <div className="overflow-x-auto">
                      <table className="dashboard-table">
                        <thead>
                          <tr className="border-b border-border">
                            <th>Plan</th>
                            <th>Investment Date</th>
                            <th>Amount</th>
                            <th>Current Value</th>
                            <th>ROI</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="dashboard-table-row-highlight">
                            <td className="font-medium">Aggressive Boost Plan</td>
                            <td>Apr 14, 2025</td>
                            <td>$10,000.00</td>
                            <td>$15,750.00</td>
                            <td className="profit-text">+57.5%</td>
                            <td>
                              <span className="inline-flex items-center rounded-full bg-[hsl(var(--primary)_/_0.1)] px-2.5 py-0.5 text-xs font-medium text-[hsl(var(--primary))]">
                                Active
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="font-medium">Quick Gain Plan</td>
                            <td>Apr 1, 2025</td>
                            <td>$1,000.00</td>
                            <td>$4,500.00</td>
                            <td className="profit-text">+350%</td>
                            <td>
                              <span className="inline-flex items-center rounded-full bg-[hsl(var(--primary)_/_0.1)] px-2.5 py-0.5 text-xs font-medium text-[hsl(var(--primary))]">
                                Active
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="font-medium">Rapid Growth Plan</td>
                            <td>Mar 15, 2025</td>
                            <td>$5,000.00</td>
                            <td>$25,000.00</td>
                            <td className="profit-text">+400%</td>
                            <td>
                              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                                Completed
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="font-medium">Quick Gain Plan</td>
                            <td>Mar 1, 2025</td>
                            <td>$1,000.00</td>
                            <td>$5,000.00</td>
                            <td className="profit-text">+400%</td>
                            <td>
                              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                                Completed
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  <TabsContent value="active">
                    <div className="overflow-x-auto">
                      <table className="dashboard-table">
                        <thead>
                          <tr className="border-b border-border">
                            <th>Plan</th>
                            <th>Investment Date</th>
                            <th>Amount</th>
                            <th>Current Value</th>
                            <th>ROI</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="dashboard-table-row-highlight">
                            <td className="font-medium">Aggressive Boost Plan</td>
                            <td>Apr 14, 2025</td>
                            <td>$10,000.00</td>
                            <td>$15,750.00</td>
                            <td className="profit-text">+57.5%</td>
                            <td>
                              <span className="inline-flex items-center rounded-full bg-[hsl(var(--primary)_/_0.1)] px-2.5 py-0.5 text-xs font-medium text-[hsl(var(--primary))]">
                                Active
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="font-medium">Quick Gain Plan</td>
                            <td>Apr 1, 2025</td>
                            <td>$1,000.00</td>
                            <td>$4,500.00</td>
                            <td className="profit-text">+350%</td>
                            <td>
                              <span className="inline-flex items-center rounded-full bg-[hsl(var(--primary)_/_0.1)] px-2.5 py-0.5 text-xs font-medium text-[hsl(var(--primary))]">
                                Active
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  <TabsContent value="completed">
                    <div className="overflow-x-auto">
                      <table className="dashboard-table">
                        <thead>
                          <tr className="border-b border-border">
                            <th>Plan</th>
                            <th>Investment Date</th>
                            <th>Amount</th>
                            <th>Final Value</th>
                            <th>ROI</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="font-medium">Rapid Growth Plan</td>
                            <td>Mar 15, 2025</td>
                            <td>$5,000.00</td>
                            <td>$25,000.00</td>
                            <td className="profit-text">+400%</td>
                            <td>
                              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                                Completed
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="font-medium">Quick Gain Plan</td>
                            <td>Mar 1, 2025</td>
                            <td>$1,000.00</td>
                            <td>$5,000.00</td>
                            <td className="profit-text">+400%</td>
                            <td>
                              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                                Completed
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Investments
                </Button>
              </CardFooter>
            </Card>} */}

            <Card className="dashboard-card mt-6">
              <CardHeader>
                <CardTitle>Performance by Sector</CardTitle>
                <CardDescription>ROI breakdown by investment sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Technology</span>
                      <span className="font-medium profit-text">+42.5%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 rounded-full bg-[hsl(var(--primary))]" style={{ width: "42.5%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Finance</span>
                      <span className="font-medium profit-text">+35.2%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 rounded-full bg-[hsl(var(--chart-blue))]" style={{ width: "35.2%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Healthcare</span>
                      <span className="font-medium profit-text">+28.7%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 rounded-full bg-[hsl(var(--chart-purple))]" style={{ width: "28.7%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Energy</span>
                      <span className="font-medium loss-text">-5.3%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 rounded-full bg-[hsl(var(--loss))]" style={{ width: "5.3%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Consumer Goods</span>
                      <span className="font-medium profit-text">+18.9%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 rounded-full bg-[hsl(var(--chart-yellow))]" style={{ width: "18.9%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
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
