"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Bell,
  Brain,
  ChevronDown,
  Filter,
  Home,
  LineChartIcon,
  Menu,
  Package,
  PieChartIcon,
  Rocket,
  Search,
  Settings,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function StrategiesPage() {
  const [deployModalOpen, setDeployModalOpen] = useState(false)
  const [selectedStrategy, setSelectedStrategy] = useState<{
    name: string
    risk: string
    return: string
    assets: string
    minInvestment: string
  } | null>(null)
  const [investmentAmount, setInvestmentAmount] = useState<number | string>("")

  const handleDeployClick = (strategy: {
    name: string
    risk: string
    return: string
    assets: string
    minInvestment: string
  }) => {
    setSelectedStrategy(strategy)
    // Set initial investment amount to the minimum
    setInvestmentAmount(Number(strategy.minInvestment.replace("$", "")))
    setDeployModalOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
    
      <div className="flex flex-1">
       
        <main className="flex-1 overflow-auto p-3">
          <div className="container py-6">
            <div className="mb-6 flex flex-col gap-2">
              <h1 className="text-3xl font-bold">Strategy Marketplace</h1>
              <p className="text-muted-foreground">
                Browse and deploy AI-generated trading strategies optimized for the BNB Chain.
              </p>
            </div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search strategies..." className="w-full pl-8" />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      Sort by: Performance <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Performance</DropdownMenuItem>
                    <DropdownMenuItem>Risk Level</DropdownMenuItem>
                    <DropdownMenuItem>Popularity</DropdownMenuItem>
                    <DropdownMenuItem>Newest</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Strategies</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          High Performance
                        </Badge>
                        <Badge variant="outline">Moderate Risk</Badge>
                      </div>
                      <CardTitle className="mt-2">Balanced Growth</CardTitle>
                      <CardDescription>Multi-asset strategy with dynamic rebalancing</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">30-day return</span>
                          <span className="font-medium text-green-500">+12.8%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Assets</span>
                          <span>BNB, CAKE, BUSD</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Min. Investment</span>
                          <span>$100</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[70%] rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Risk</span>
                          <span>Return</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full gap-2"
                        onClick={() =>
                          handleDeployClick({
                            name: "Balanced Growth",
                            risk: "Moderate Risk",
                            return: "+12.8%",
                            assets: "BNB, CAKE, BUSD",
                            minInvestment: "$100",
                          })
                        }
                      >
                        Deploy Strategy <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                          Stable Returns
                        </Badge>
                        <Badge variant="outline">Low Risk</Badge>
                      </div>
                      <CardTitle className="mt-2">Yield Optimizer</CardTitle>
                      <CardDescription>Automated yield farming with impermanent loss protection</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">30-day return</span>
                          <span className="font-medium text-green-500">+8.5%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Assets</span>
                          <span>BUSD, USDT, DAI</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Min. Investment</span>
                          <span>$50</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[40%] rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Risk</span>
                          <span>Return</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full gap-2"
                        onClick={() =>
                          handleDeployClick({
                            name: "Yield Optimizer",
                            risk: "Low Risk",
                            return: "+8.5%",
                            assets: "BUSD, USDT, DAI",
                            minInvestment: "$50",
                          })
                        }
                      >
                        Deploy Strategy <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
                          New
                        </Badge>
                        <Badge variant="outline">High Risk</Badge>
                      </div>
                      <CardTitle className="mt-2">Momentum Trader</CardTitle>
                      <CardDescription>Capitalizes on trending markets with volatility protection</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">30-day return</span>
                          <span className="font-medium text-green-500">+18.2%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Assets</span>
                          <span>BNB, ETH, CAKE</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Min. Investment</span>
                          <span>$200</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[90%] rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Risk</span>
                          <span>Return</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full gap-2"
                        onClick={() =>
                          handleDeployClick({
                            name: "Momentum Trader",
                            risk: "High Risk",
                            return: "+18.2%",
                            assets: "BNB, ETH, CAKE",
                            minInvestment: "$200",
                          })
                        }
                      >
                        Deploy Strategy <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-orange-500/10 text-orange-500">
                          Popular
                        </Badge>
                        <Badge variant="outline">Moderate Risk</Badge>
                      </div>
                      <CardTitle className="mt-2">DeFi Aggregator</CardTitle>
                      <CardDescription>Optimizes across multiple DeFi protocols for maximum returns</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">30-day return</span>
                          <span className="font-medium text-green-500">+10.3%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Assets</span>
                          <span>Multiple</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Min. Investment</span>
                          <span>$150</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[65%] rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Risk</span>
                          <span>Return</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full gap-2"
                        onClick={() =>
                          handleDeployClick({
                            name: "DeFi Aggregator",
                            risk: "Moderate Risk",
                            return: "+10.3%",
                            assets: "Multiple",
                            minInvestment: "$150",
                          })
                        }
                      >
                        Deploy Strategy <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                          Stable Returns
                        </Badge>
                        <Badge variant="outline">Low Risk</Badge>
                      </div>
                      <CardTitle className="mt-2">Stablecoin Maximizer</CardTitle>
                      <CardDescription>Focuses on stablecoin yields with minimal volatility</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">30-day return</span>
                          <span className="font-medium text-green-500">+6.2%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Assets</span>
                          <span>BUSD, USDT, USDC</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Min. Investment</span>
                          <span>$50</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[30%] rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Risk</span>
                          <span>Return</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full gap-2"
                        onClick={() =>
                          handleDeployClick({
                            name: "Stablecoin Maximizer",
                            risk: "Low Risk",
                            return: "+6.2%",
                            assets: "BUSD, USDT, USDC",
                            minInvestment: "$50",
                          })
                        }
                      >
                        Deploy Strategy <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
                          New
                        </Badge>
                        <Badge variant="outline">High Risk</Badge>
                      </div>
                      <CardTitle className="mt-2">Volatility Harvester</CardTitle>
                      <CardDescription>Profits from market volatility through advanced derivatives</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">30-day return</span>
                          <span className="font-medium text-green-500">+22.5%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Assets</span>
                          <span>BNB, ETH, BTC</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Min. Investment</span>
                          <span>$300</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[95%] rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Risk</span>
                          <span>Return</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full gap-2"
                        onClick={() =>
                          handleDeployClick({
                            name: "Volatility Harvester",
                            risk: "High Risk",
                            return: "+22.5%",
                            assets: "BNB, ETH, BTC",
                            minInvestment: "$300",
                          })
                        }
                      >
                        Deploy Strategy <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                <div className="flex items-center justify-center">
                  <Button variant="outline">Load More Strategies</Button>
                </div>
              </TabsContent>
              <TabsContent value="recommended">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Recommended
                        </Badge>
                        <Badge variant="outline">Moderate Risk</Badge>
                      </div>
                      <CardTitle className="mt-2">Balanced Growth</CardTitle>
                      <CardDescription>Multi-asset strategy with dynamic rebalancing</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">30-day return</span>
                          <span className="font-medium text-green-500">+12.8%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Assets</span>
                          <span>BNB, CAKE, BUSD</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Min. Investment</span>
                          <span>$100</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[70%] rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Risk</span>
                          <span>Return</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full gap-2"
                        onClick={() =>
                          handleDeployClick({
                            name: "Balanced Growth",
                            risk: "Moderate Risk",
                            return: "+12.8%",
                            assets: "BNB, CAKE, BUSD",
                            minInvestment: "$100",
                          })
                        }
                      >
                        Deploy Strategy <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Recommended
                        </Badge>
                        <Badge variant="outline">Low Risk</Badge>
                      </div>
                      <CardTitle className="mt-2">Yield Optimizer</CardTitle>
                      <CardDescription>Automated yield farming with impermanent loss protection</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">30-day return</span>
                          <span className="font-medium text-green-500">+8.5%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Assets</span>
                          <span>BUSD, USDT, DAI</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Min. Investment</span>
                          <span>$50</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[40%] rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Risk</span>
                          <span>Return</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full gap-2"
                        onClick={() =>
                          handleDeployClick({
                            name: "Yield Optimizer",
                            risk: "Low Risk",
                            return: "+8.5%",
                            assets: "BUSD, USDT, DAI",
                            minInvestment: "$50",
                          })
                        }
                      >
                        Deploy Strategy <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="active">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                          Active
                        </Badge>
                        <Badge variant="outline">Moderate Risk</Badge>
                      </div>
                      <CardTitle className="mt-2">Balanced Growth</CardTitle>
                      <CardDescription>Multi-asset strategy with dynamic rebalancing</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Current allocation</span>
                          <span className="font-medium">$1,190</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">30-day return</span>
                          <span className="font-medium text-green-500">+8.2%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Assets</span>
                          <span>BNB, CAKE, BUSD</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[70%] rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Portfolio %</span>
                          <span>70%</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Manage Strategy
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="new">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
                          New
                        </Badge>
                        <Badge variant="outline">High Risk</Badge>
                      </div>
                      <CardTitle className="mt-2">Momentum Trader</CardTitle>
                      <CardDescription>Capitalizes on trending markets with volatility protection</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">30-day return</span>
                          <span className="font-medium text-green-500">+18.2%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Assets</span>
                          <span>BNB, ETH, CAKE</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Min. Investment</span>
                          <span>$200</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[90%] rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Risk</span>
                          <span>Return</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full gap-2"
                        onClick={() =>
                          handleDeployClick({
                            name: "Momentum Trader",
                            risk: "High Risk",
                            return: "+18.2%",
                            assets: "BNB, ETH, CAKE",
                            minInvestment: "$200",
                          })
                        }
                      >
                        Deploy Strategy <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
                          New
                        </Badge>
                        <Badge variant="outline">High Risk</Badge>
                      </div>
                      <CardTitle className="mt-2">Volatility Harvester</CardTitle>
                      <CardDescription>Profits from market volatility through advanced derivatives</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">30-day return</span>
                          <span className="font-medium text-green-500">+22.5%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Assets</span>
                          <span>BNB, ETH, BTC</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Min. Investment</span>
                          <span>$300</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[95%] rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Risk</span>
                          <span>Return</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full gap-2"
                        onClick={() =>
                          handleDeployClick({
                            name: "Volatility Harvester",
                            risk: "High Risk",
                            return: "+22.5%",
                            assets: "BNB, ETH, BTC",
                            minInvestment: "$300",
                          })
                        }
                      >
                        Deploy Strategy <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Add the modal dialog */}
      <Dialog open={deployModalOpen} onOpenChange={setDeployModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deploy {selectedStrategy?.name}</DialogTitle>
            <DialogDescription>Deploy this AI-powered trading strategy to start generating returns.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-lg border p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{selectedStrategy?.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedStrategy?.risk}</p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-500">{selectedStrategy?.return}</div>
                  <p className="text-sm text-muted-foreground">Expected return</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="investment-amount" className="text-sm font-medium">
                  Investment Amount
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="investment-amount"
                    type="number"
                    className="pl-7"
                    value={investmentAmount}
                    onChange={(e) => {
                      const value = e.target.value
                      const minValue = Number(selectedStrategy?.minInvestment.replace("$", ""))
                      setInvestmentAmount(value === "" ? "" : Math.max(minValue, Number(value)))
                    }}
                    min={selectedStrategy?.minInvestment.replace("$", "")}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Minimum investment: {selectedStrategy?.minInvestment}
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <h4 className="text-sm font-medium mb-2">Potential Returns</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Expected Return Rate:</span>
                    <span className="font-medium text-green-500">{selectedStrategy?.return}</span>
                  </div>
                  {typeof investmentAmount === "number" && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Potential Profit:</span>
                        <span className="font-medium text-green-500">
                          +$
                          {(
                            investmentAmount *
                            (Number.parseFloat(selectedStrategy?.return?.replace("+", "").replace("%", "")) / 100)
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Final Value:</span>
                        <span className="font-medium">
                          $
                          {(
                            investmentAmount *
                            (1 + Number.parseFloat(selectedStrategy?.return?.replace("+", "").replace("%", "")) / 100)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Assets:</span>
                  <span className="font-medium">{selectedStrategy?.assets}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">30 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gas Fee:</span>
                  <span className="font-medium">$2.50</span>
                </div>
                <div className="flex justify-between text-sm font-medium pt-2 border-t mt-2">
                  <span>Total Cost:</span>
                  <span>${typeof investmentAmount === "number" ? (investmentAmount + 2.5).toFixed(2) : "--"}</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex sm:justify-between">
            <Button variant="outline" onClick={() => setDeployModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                // Here you would handle the deployment logic
                setDeployModalOpen(false)
              }}
              disabled={!investmentAmount}
            >
              <Rocket className="mr-2 h-4 w-4" />
              Confirm Deployment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
