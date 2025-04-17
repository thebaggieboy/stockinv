'use client'
import Link from "next/link"
import { DollarSign, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { useRouter } from "next/navigation"

export default function InvestmentPlansPage() {
  const router = useRouter()
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
              <DollarSign className="h-5 w-5" />
              <span className="sr-only">Wallet</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-background p-2">
        <div className="dashboard-container">
          <div className="dashboard-grid">
            <div className="dashboard-header">
              <div className="p-2">
                <h1 className="dashboard-title font-bold text-2xl">Investment Plans</h1>
                <p className="dashboard-subtitle">
                  Choose from our high-yield investment plans to maximize your returns.
                </p>
              </div> <br/>
              
            </div>
    <br/>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-full bg-[hsl(var(--primary)_/_0.2)] p-2">
                    <TrendingUp className="h-5 w-5 text-[hsl(var(--primary))]" />
                  </div>
                  <div className="text-sm font-medium text-[hsl(var(--primary))]">2 Weeks</div>
                </div>
                <h3 className="text-xl font-bold">Quick Gain Plan</h3>
                <div className="mt-2 text-3xl font-bold">$1,000</div>
                <p className="mt-1 text-sm text-muted-foreground">Minimum investment</p>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily Interest:</span>
                    <span className="font-medium">$357.14 (35.71% monthly)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cumulative ROI:</span>
                    <span className="font-medium">400% ($5,000)</span>
                  </div>
                </div>
                <Button onClick={() => router.push("/dashboard/signals")} className="mt-6">Invest Now</Button>
              </div>

              <div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-full bg-[hsl(var(--primary)_/_0.2)] p-2">
                    <TrendingUp className="h-5 w-5 text-[hsl(var(--primary))]" />
                  </div>
                  <div className="text-sm font-medium text-[hsl(var(--primary))]">2 Weeks</div>
                </div>
                <h3 className="text-xl font-bold">Rapid Growth Plan</h3>
                <div className="mt-2 text-3xl font-bold">$5,000</div>
                <p className="mt-1 text-sm text-muted-foreground">Minimum investment</p>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily Interest:</span>
                    <span className="font-medium">$1,785.71 (178.57% monthly)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cumulative ROI:</span>
                    <span className="font-medium">400% ($25,000)</span>
                  </div>
                </div>
                <Button onClick={() => router.push("/dashboard/signals")} className="mt-6">Invest Now</Button>
              </div>

              <div className="flex flex-col rounded-lg border bg-[hsl(var(--primary)_/_0.1)] p-6 shadow-md transition-all hover:shadow-lg relative">
                <div className="absolute -right-2 -top-2 rounded-full bg-[hsl(var(--primary))] px-3 py-1 text-xs font-medium text-white">
                  Popular
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-full bg-[hsl(var(--primary)_/_0.2)] p-2">
                    <TrendingUp className="h-5 w-5 text-[hsl(var(--primary))]" />
                  </div>
                  <div className="text-sm font-medium text-[hsl(var(--primary))]">2 Weeks</div>
                </div>
                <h3 className="text-xl font-bold">Aggressive Boost Plan</h3>
                <div className="mt-2 text-3xl font-bold">$10,000</div>
                <p className="mt-1 text-sm text-muted-foreground">Minimum investment</p>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily Interest:</span>
                    <span className="font-medium">$3,571.43 (357.14% monthly)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cumulative ROI:</span>
                    <span className="font-medium">300% ($40,000)</span>
                  </div>
                </div>
                <Button onClick={() => router.push("/dashboard/signals")} className="mt-6">Invest Now</Button>
              </div>

              <div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-full bg-[hsl(var(--primary)_/_0.2)] p-2">
                    <TrendingUp className="h-5 w-5 text-[hsl(var(--primary))]" />
                  </div>
                  <div className="text-sm font-medium text-[hsl(var(--primary))]">2 Weeks</div>
                </div>
                <h3 className="text-xl font-bold">Accelerated Wealth Plan</h3>
                <div className="mt-2 text-3xl font-bold">$15,000</div>
                <p className="mt-1 text-sm text-muted-foreground">Minimum investment</p>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily Interest:</span>
                    <span className="font-medium">$5,357.14 (535.71% monthly)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cumulative ROI:</span>
                    <span className="font-medium">333.33% ($65,000)</span>
                  </div>
                </div>
                <Button onClick={() => router.push("/dashboard/signals")} className="mt-6">Invest Now</Button>
              </div>

              <div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-full bg-[hsl(var(--primary)_/_0.2)] p-2">
                    <TrendingUp className="h-5 w-5 text-[hsl(var(--primary))]" />
                  </div>
                  <div className="text-sm font-medium text-[hsl(var(--primary))]">2 Weeks</div>
                </div>
                <h3 className="text-xl font-bold">Ultimate Prosperity Plan</h3>
                <div className="mt-2 text-3xl font-bold">$20,000</div>
                <p className="mt-1 text-sm text-muted-foreground">Minimum investment</p>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily Interest:</span>
                    <span className="font-medium">$7,142.86 (714.29% monthly)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cumulative ROI:</span>
                    <span className="font-medium">300% ($80,000)</span>
                  </div>
                </div>
                <Button onClick={() => router.push("/dashboard/signals")} className="mt-6">Invest Now</Button>
              </div>

              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-secondary/30 p-6">
                <div className="rounded-full bg-secondary p-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-xl font-medium">Custom Plan</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Need a tailored investment strategy? Contact our team for a custom plan.
                </p>
                <Button variant="outline" className="mt-6">
                  Contact Us
                </Button>
              </div>
            </div>

            <Card className="dashboard-card mt-8">
              <CardHeader>
                <CardTitle>Investment Plan Comparison</CardTitle>
                <CardDescription>
                  Compare our investment plans to find the best option for your financial goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="dashboard-table">
                    <thead>
                      <tr className="border-b border-border">
                        <th>Plan</th>
                        <th>Minimum</th>
                        <th>Duration</th>
                        <th>Daily Interest</th>
                        <th>Total ROI</th>
                        <th>Final Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-medium">Quick Gain</td>
                        <td>$1,000</td>
                        <td>2 Weeks</td>
                        <td>$357.14</td>
                        <td>400%</td>
                        <td>$5,000</td>
                      </tr>
                      <tr>
                        <td className="font-medium">Rapid Growth</td>
                        <td>$5,000</td>
                        <td>2 Weeks</td>
                        <td>$1,785.71</td>
                        <td>400%</td>
                        <td>$25,000</td>
                      </tr>
                      <tr className="dashboard-table-row-highlight">
                        <td className="font-medium">Aggressive Boost</td>
                        <td>$10,000</td>
                        <td>2 Weeks</td>
                        <td>$3,571.43</td>
                        <td>300%</td>
                        <td>$40,000</td>
                      </tr>
                      <tr>
                        <td className="font-medium">Accelerated Wealth</td>
                        <td>$15,000</td>
                        <td>2 Weeks</td>
                        <td>$5,357.14</td>
                        <td>333.33%</td>
                        <td>$65,000</td>
                      </tr>
                      <tr>
                        <td className="font-medium">Ultimate Prosperity</td>
                        <td>$20,000</td>
                        <td>2 Weeks</td>
                        <td>$7,142.86</td>
                        <td>300%</td>
                        <td>$80,000</td>
                      </tr>
                    </tbody>
                  </table>
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
