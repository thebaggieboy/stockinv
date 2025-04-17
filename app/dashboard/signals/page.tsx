import Link from "next/link"
import { Bell, Calendar, Check, ChevronDown, Clock, Filter, LineChart, TrendingDown, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardNav } from "@/components/dashboard-nav"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { PieChart } from "lucide-react" // Import PieChart

export default function SignalsPage() {
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
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-background">
        <div className="dashboard-container">
          <div className="dashboard-grid">
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">Trading Signals</h1>
                <p className="dashboard-subtitle">Get real-time trading signals and market insights</p>
              </div>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filter Signals
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Signal Type</DropdownMenuLabel>
                    <DropdownMenuItem>All Signals</DropdownMenuItem>
                    <DropdownMenuItem>Buy Signals</DropdownMenuItem>
                    <DropdownMenuItem>Sell Signals</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Asset Class</DropdownMenuLabel>
                    <DropdownMenuItem>Stocks</DropdownMenuItem>
                    <DropdownMenuItem>Crypto</DropdownMenuItem>
                    <DropdownMenuItem>Forex</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Timeframe</DropdownMenuLabel>
                    <DropdownMenuItem>Short-term</DropdownMenuItem>
                    <DropdownMenuItem>Medium-term</DropdownMenuItem>
                    <DropdownMenuItem>Long-term</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button>
                  <Bell className="mr-2 h-4 w-4" />
                  Set Alerts
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="mt-6">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Signals</TabsTrigger>
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
                <TabsTrigger value="forex">Forex</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Signal Card - Buy AAPL */}
                  <Card className="dashboard-card border-l-4 border-l-[hsl(var(--profit))]">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-[hsl(var(--profit))] hover:bg-[hsl(var(--profit))]">BUY</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>2 hours ago</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-2">AAPL (Apple Inc.)</CardTitle>
                      <CardDescription>Strong bullish pattern forming</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Entry Price</span>
                            <span className="font-medium">$182.50 - $183.20</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Target Price</span>
                            <span className="font-medium text-[hsl(var(--profit))]">$195.00</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Stop Loss</span>
                            <span className="font-medium text-[hsl(var(--loss))]">$178.30</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Risk/Reward</span>
                            <span className="font-medium">1:3.2</span>
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-muted-foreground">Timeframe:</span>
                            <span className="font-medium">Medium-term (2-4 weeks)</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs mt-1">
                            <span className="text-muted-foreground">Confidence:</span>
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Check key={i} className="h-3 w-3 text-[hsl(var(--profit))]" />
                              ))}
                              {[...Array(1)].map((_, i) => (
                                <Check key={i} className="h-3 w-3 text-muted-foreground" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <LineChart className="mr-2 h-4 w-4" />
                        View Chart
                      </Button>
                      <Button size="sm">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Trade Now
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Signal Card - Sell TSLA */}
                  <Card className="dashboard-card border-l-4 border-l-[hsl(var(--loss))]">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-[hsl(var(--loss))] hover:bg-[hsl(var(--loss))]">SELL</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>5 hours ago</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-2">TSLA (Tesla Inc.)</CardTitle>
                      <CardDescription>Bearish divergence on RSI</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Entry Price</span>
                            <span className="font-medium">$240.80 - $242.50</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Target Price</span>
                            <span className="font-medium text-[hsl(var(--loss))]">$225.00</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Stop Loss</span>
                            <span className="font-medium text-[hsl(var(--profit))]">$248.75</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Risk/Reward</span>
                            <span className="font-medium">1:2.5</span>
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-muted-foreground">Timeframe:</span>
                            <span className="font-medium">Short-term (1-2 weeks)</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs mt-1">
                            <span className="text-muted-foreground">Confidence:</span>
                            <div className="flex">
                              {[...Array(3)].map((_, i) => (
                                <Check key={i} className="h-3 w-3 text-[hsl(var(--loss))]" />
                              ))}
                              {[...Array(2)].map((_, i) => (
                                <Check key={i} className="h-3 w-3 text-muted-foreground" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <LineChart className="mr-2 h-4 w-4" />
                        View Chart
                      </Button>
                      <Button size="sm">
                        <TrendingDown className="mr-2 h-4 w-4" />
                        Trade Now
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Signal Card - Buy BTC */}
                  <Card className="dashboard-card border-l-4 border-l-[hsl(var(--profit))]">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-[hsl(var(--profit))] hover:bg-[hsl(var(--profit))]">BUY</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>12 hours ago</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-2">BTC/USD (Bitcoin)</CardTitle>
                      <CardDescription>Key support level bounce</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Entry Price</span>
                            <span className="font-medium">$61,200 - $61,800</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Target Price</span>
                            <span className="font-medium text-[hsl(var(--profit))]">$68,500</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Stop Loss</span>
                            <span className="font-medium text-[hsl(var(--loss))]">$58,900</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Risk/Reward</span>
                            <span className="font-medium">1:2.8</span>
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-muted-foreground">Timeframe:</span>
                            <span className="font-medium">Medium-term (2-4 weeks)</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs mt-1">
                            <span className="text-muted-foreground">Confidence:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Check key={i} className="h-3 w-3 text-[hsl(var(--profit))]" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <LineChart className="mr-2 h-4 w-4" />
                        View Chart
                      </Button>
                      <Button size="sm">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Trade Now
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Signal Card - Buy MSFT */}
                  <Card className="dashboard-card border-l-4 border-l-[hsl(var(--profit))]">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-[hsl(var(--profit))] hover:bg-[hsl(var(--profit))]">BUY</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>1 day ago</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-2">MSFT (Microsoft)</CardTitle>
                      <CardDescription>Breakout from consolidation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Entry Price</span>
                            <span className="font-medium">$415.20 - $417.50</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Target Price</span>
                            <span className="font-medium text-[hsl(var(--profit))]">$440.00</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Stop Loss</span>
                            <span className="font-medium text-[hsl(var(--loss))]">$405.80</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Risk/Reward</span>
                            <span className="font-medium">1:2.1</span>
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-muted-foreground">Timeframe:</span>
                            <span className="font-medium">Medium-term (2-4 weeks)</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs mt-1">
                            <span className="text-muted-foreground">Confidence:</span>
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Check key={i} className="h-3 w-3 text-[hsl(var(--profit))]" />
                              ))}
                              {[...Array(1)].map((_, i) => (
                                <Check key={i} className="h-3 w-3 text-muted-foreground" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <LineChart className="mr-2 h-4 w-4" />
                        View Chart
                      </Button>
                      <Button size="sm">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Trade Now
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Signal Card - Sell ETH */}
                  <Card className="dashboard-card border-l-4 border-l-[hsl(var(--loss))]">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-[hsl(var(--loss))] hover:bg-[hsl(var(--loss))]">SELL</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>1 day ago</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-2">ETH/USD (Ethereum)</CardTitle>
                      <CardDescription>Double top formation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Entry Price</span>
                            <span className="font-medium">$3,280 - $3,320</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Target Price</span>
                            <span className="font-medium text-[hsl(var(--loss))]">$3,050</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Stop Loss</span>
                            <span className="font-medium text-[hsl(var(--profit))]">$3,420</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Risk/Reward</span>
                            <span className="font-medium">1:2.3</span>
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-muted-foreground">Timeframe:</span>
                            <span className="font-medium">Short-term (1-2 weeks)</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs mt-1">
                            <span className="text-muted-foreground">Confidence:</span>
                            <div className="flex">
                              {[...Array(3)].map((_, i) => (
                                <Check key={i} className="h-3 w-3 text-[hsl(var(--loss))]" />
                              ))}
                              {[...Array(2)].map((_, i) => (
                                <Check key={i} className="h-3 w-3 text-muted-foreground" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <LineChart className="mr-2 h-4 w-4" />
                        View Chart
                      </Button>
                      <Button size="sm">
                        <TrendingDown className="mr-2 h-4 w-4" />
                        Trade Now
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Signal Card - Buy AMZN */}
                  <Card className="dashboard-card border-l-4 border-l-[hsl(var(--profit))]">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-[hsl(var(--profit))] hover:bg-[hsl(var(--profit))]">BUY</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>2 days ago</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-2">AMZN (Amazon)</CardTitle>
                      <CardDescription>Golden cross on daily chart</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Entry Price</span>
                            <span className="font-medium">$178.50 - $180.20</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Target Price</span>
                            <span className="font-medium text-[hsl(var(--profit))]">$195.00</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Stop Loss</span>
                            <span className="font-medium text-[hsl(var(--loss))]">$172.30</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Risk/Reward</span>
                            <span className="font-medium">1:2.4</span>
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-muted-foreground">Timeframe:</span>
                            <span className="font-medium">Long-term (1-3 months)</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs mt-1">
                            <span className="text-muted-foreground">Confidence:</span>
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Check key={i} className="h-3 w-3 text-[hsl(var(--profit))]" />
                              ))}
                              {[...Array(1)].map((_, i) => (
                                <Check key={i} className="h-3 w-3 text-muted-foreground" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <LineChart className="mr-2 h-4 w-4" />
                        View Chart
                      </Button>
                      <Button size="sm">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Trade Now
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="stocks">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Stock signals would go here - similar to the ones above but filtered for stocks */}
                  <Card className="dashboard-card border-l-4 border-l-[hsl(var(--profit))]">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-[hsl(var(--profit))] hover:bg-[hsl(var(--profit))]">BUY</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>2 hours ago</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-2">AAPL (Apple Inc.)</CardTitle>
                      <CardDescription>Strong bullish pattern forming</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Entry Price</span>
                            <span className="font-medium">$182.50 - $183.20</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Target Price</span>
                            <span className="font-medium text-[hsl(var(--profit))]">$195.00</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Stop Loss</span>
                            <span className="font-medium text-[hsl(var(--loss))]">$178.30</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Risk/Reward</span>
                            <span className="font-medium">1:3.2</span>
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-muted-foreground">Timeframe:</span>
                            <span className="font-medium">Medium-term (2-4 weeks)</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs mt-1">
                            <span className="text-muted-foreground">Confidence:</span>
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Check key={i} className="h-3 w-3 text-[hsl(var(--profit))]" />
                              ))}
                              {[...Array(1)].map((_, i) => (
                                <Check key={i} className="h-3 w-3 text-muted-foreground" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <LineChart className="mr-2 h-4 w-4" />
                        View Chart
                      </Button>
                      <Button size="sm">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Trade Now
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="crypto">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Crypto signals would go here */}
                  <Card className="dashboard-card border-l-4 border-l-[hsl(var(--profit))]">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-[hsl(var(--profit))] hover:bg-[hsl(var(--profit))]">BUY</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>12 hours ago</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-2">BTC/USD (Bitcoin)</CardTitle>
                      <CardDescription>Key support level bounce</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Entry Price</span>
                            <span className="font-medium">$61,200 - $61,800</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Target Price</span>
                            <span className="font-medium text-[hsl(var(--profit))]">$68,500</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Stop Loss</span>
                            <span className="font-medium text-[hsl(var(--loss))]">$58,900</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Risk/Reward</span>
                            <span className="font-medium">1:2.8</span>
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-muted-foreground">Timeframe:</span>
                            <span className="font-medium">Medium-term (2-4 weeks)</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs mt-1">
                            <span className="text-muted-foreground">Confidence:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Check key={i} className="h-3 w-3 text-[hsl(var(--profit))]" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <LineChart className="mr-2 h-4 w-4" />
                        View Chart
                      </Button>
                      <Button size="sm">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Trade Now
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="forex">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Forex signals would go here */}
                  <Card className="dashboard-card border-l-4 border-l-[hsl(var(--profit))]">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-[hsl(var(--profit))] hover:bg-[hsl(var(--profit))]">BUY</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>8 hours ago</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-2">EUR/USD</CardTitle>
                      <CardDescription>Bullish engulfing pattern</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Entry Price</span>
                            <span className="font-medium">1.0825 - 1.0835</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Target Price</span>
                            <span className="font-medium text-[hsl(var(--profit))]">1.0920</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Stop Loss</span>
                            <span className="font-medium text-[hsl(var(--loss))]">1.0780</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Risk/Reward</span>
                            <span className="font-medium">1:1.9</span>
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-muted-foreground">Timeframe:</span>
                            <span className="font-medium">Short-term (1-2 weeks)</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs mt-1">
                            <span className="text-muted-foreground">Confidence:</span>
                            <div className="flex">
                              {[...Array(3)].map((_, i) => (
                                <Check key={i} className="h-3 w-3 text-[hsl(var(--profit))]" />
                              ))}
                              {[...Array(2)].map((_, i) => (
                                <Check key={i} className="h-3 w-3 text-muted-foreground" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <LineChart className="mr-2 h-4 w-4" />
                        View Chart
                      </Button>
                      <Button size="sm">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Trade Now
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            <Card className="dashboard-card mt-8">
              <CardHeader>
                <CardTitle>Signal Performance History</CardTitle>
                <CardDescription>Track record of our previous trading signals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="dashboard-table">
                    <thead>
                      <tr className="border-b border-border">
                        <th>Asset</th>
                        <th>Signal Type</th>
                        <th>Date</th>
                        <th>Entry Price</th>
                        <th>Exit Price</th>
                        <th>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-medium">NVDA</td>
                        <td>
                          <Badge className="bg-[hsl(var(--profit))] hover:bg-[hsl(var(--profit))]">BUY</Badge>
                        </td>
                        <td>Apr 10, 2025</td>
                        <td>$880.50</td>
                        <td>$925.30</td>
                        <td className="profit-text">+5.1%</td>
                      </tr>
                      <tr>
                        <td className="font-medium">META</td>
                        <td>
                          <Badge className="bg-[hsl(var(--profit))] hover:bg-[hsl(var(--profit))]">BUY</Badge>
                        </td>
                        <td>Apr 8, 2025</td>
                        <td>$485.20</td>
                        <td>$510.75</td>
                        <td className="profit-text">+5.3%</td>
                      </tr>
                      <tr>
                        <td className="font-medium">SOL/USD</td>
                        <td>
                          <Badge className="bg-[hsl(var(--loss))] hover:bg-[hsl(var(--loss))]">SELL</Badge>
                        </td>
                        <td>Apr 5, 2025</td>
                        <td>$158.40</td>
                        <td>$152.20</td>
                        <td className="profit-text">+3.9%</td>
                      </tr>
                      <tr>
                        <td className="font-medium">GOOGL</td>
                        <td>
                          <Badge className="bg-[hsl(var(--profit))] hover:bg-[hsl(var(--profit))]">BUY</Badge>
                        </td>
                        <td>Apr 2, 2025</td>
                        <td>$152.80</td>
                        <td>$148.30</td>
                        <td className="loss-text">-2.9%</td>
                      </tr>
                      <tr>
                        <td className="font-medium">BTC/USD</td>
                        <td>
                          <Badge className="bg-[hsl(var(--profit))] hover:bg-[hsl(var(--profit))]">BUY</Badge>
                        </td>
                        <td>Mar 28, 2025</td>
                        <td>$58,200</td>
                        <td>$63,500</td>
                        <td className="profit-text">+9.1%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Full History
                </Button>
              </CardFooter>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 mt-8">
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>Signal Performance</CardTitle>
                  <CardDescription>Success rate of our trading signals</CardDescription>
                </CardHeader>
                <CardContent className="chart-container flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <PieChart className="mx-auto h-10 w-10 mb-2" />
                    <p>Signal performance chart</p>
                    <div className="flex justify-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-[hsl(var(--profit))]"></div>
                        <span>Profitable (78%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-[hsl(var(--loss))]"></div>
                        <span>Loss (22%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

           {/* {   <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>Signal Alerts</CardTitle>
                  <CardDescription>Configure your trading signal notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-[hsl(var(--primary))]" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-xs text-muted-foreground">Receive signals via email</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-[hsl(var(--primary))]" />
                        <div>
                          <p className="font-medium">Mobile Notifications</p>
                          <p className="text-xs text-muted-foreground">Push notifications on your phone</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-[hsl(var(--primary))]" />
                        <div>
                          <p className="font-medium">Custom Alerts</p>
                          <p className="text-xs text-muted-foreground">Set up alerts for specific assets</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Bell className="mr-2 h-4 w-4" />
                    Manage All Alerts
                  </Button>
                </CardFooter>
              </Card>} */}
            </div>
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
