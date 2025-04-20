"use client"
import Link from "next/link"
import {
  ArrowDown,
  ArrowUp,
  Copy,
  DollarSign,
  Download,
  History,
  QrCode,
  TrendingUp,
  Upload,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardNav } from "@/components/dashboard-nav"
import { WalletDeposit } from "@/components/wallet-deposit"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function WalletPage() {
  const router = useRouter()
   const [wallets, setWallets] = useState([]);
   const [btcBalance, setBtcBalance] = useState([]);
  

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
 
// Simple function to convert $5000 to Bitcoin


}
fetchBalance()

async function convertUsdToBitcoin() {
  const usdAmount = wallets?.balance;
  
  try {
    // Fetch Bitcoin price
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    const data = await response.json();
    
    // Calculate and display conversion
    const btcPrice = data.bpi.USD.rate_float;
    const btcAmount = usdAmount / btcPrice;
    setBtcBalance(btcAmount)

    console.log(`$${usdAmount} USD = ${btcAmount.toFixed(8)} BTC`);
    console.log(`(Based on 1 BTC = $${btcPrice.toLocaleString()} USD)`);
    
    return btcAmount;
  } catch (error) {
    console.error('Failed to convert currency:', error);
    return null;
  }
}

// Call the function
convertUsdToBitcoin();
console.log("BTC Balance [STATE]: ", btcBalance);
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
              <History className="h-5 w-5" />
              <span className="sr-only">Transaction History</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-background">
        <div className="dashboard-container">
          <div className="dashboard-grid">
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">Wallet</h1>
                <p className="dashboard-subtitle">Manage your funds and cryptocurrency deposits</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export History
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="dashboard-card">
                <CardHeader className="dashboard-card-header">
                  <CardTitle className="dashboard-card-title">Available Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="dashboard-card-content">
                  <div className="dashboard-card-value">${wallets?.balance}</div>
                  <p className="dashboard-card-metric">Ready to invest</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link  href={"#deposit_funds"} style={{transition:"1", backgroundColor:"white", color:"black"}}   variant="outline" size="sm"  className="w-[48%] p-1 rounded-md text-center bold">
                    
                    Deposit
                  </Link>
                  <Button variant="outline" size="sm" className="w-[48%]">
                    <ArrowUp className="mr-2 h-4 w-4" />
                    Withdraw
                  </Button>
                </CardFooter>
              </Card>

              <Card className="dashboard-card">
                <CardHeader className="dashboard-card-header">
                  <CardTitle className="dashboard-card-title">Bitcoin Balance</CardTitle>
                  <div className="rounded-full bg-[#F7931A] p-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M23.6408 14.9193L20.1408 6.01931C19.7558 5.06181 18.7308 4.53931 17.7733 4.92431L15.7808 5.69681L13.4858 1.95181C12.9983 1.06681 11.9133 0.731311 11.0283 1.21881L3.82829 5.24931C2.94329 5.73681 2.60829 6.82181 3.09579 7.70681L5.39079 11.4518L3.39829 12.2243C2.44079 12.6093 1.91829 13.6343 2.30329 14.5918L5.80329 23.4918C6.18829 24.4493 7.21329 24.9718 8.17079 24.5868L23.0258 18.2868C23.9833 17.9018 24.5058 16.8768 24.1208 15.9193H23.6408V14.9193ZM6.29079 7.76681L12.0833 4.53181L13.7558 7.29931L7.96329 10.5343L6.29079 7.76681ZM22.1408 16.9193L7.28579 23.2193L3.78579 14.3193L18.6408 8.01931L22.1408 16.9193Z"
                        fill="white"
                      />
                      <path
                        d="M14.9694 14.0255L12.4969 14.9755C12.3044 15.048 12.1044 14.958 12.0319 14.7655C11.9594 14.573 12.0494 14.373 12.2419 14.3005L14.7144 13.3505C14.9069 13.278 15.1069 13.368 15.1794 13.5605C15.2519 13.753 15.1619 13.953 14.9694 14.0255Z"
                        fill="white"
                      />
                      <path
                        d="M16.8461 13.1999L11.3461 15.4499C11.1536 15.5224 10.9536 15.4324 10.8811 15.2399C10.8086 15.0474 10.8986 14.8474 11.0911 14.7749L16.5911 12.5249C16.7836 12.4524 16.9836 12.5424 17.0561 12.7349C17.1286 12.9274 17.0386 13.1274 16.8461 13.1999Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </CardHeader>
                <CardContent className="dashboard-card-content">
                  <div className="dashboard-card-value">{btcBalance} BTC</div>
                  <p className="dashboard-card-metric">≈ ${wallets?.balance}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="w-[48%]">
                    <QrCode className="mr-2 h-4 w-4" />
                    Receive
                  </Button>
                  <Button variant="outline" size="sm" className="w-[48%]">
                    <Upload className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </CardFooter>
              </Card>
{/* {
              <Card className="dashboard-card">
                <CardHeader className="dashboard-card-header">
                  <CardTitle className="dashboard-card-title">Ethereum Balance</CardTitle>
                  <div className="rounded-full bg-[#627EEA] p-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.9978 0L11.8799 0.399V16.4035L11.9978 16.5213L19.3641 12.2005L11.9978 0Z"
                        fill="white"
                      />
                      <path d="M11.9978 0L4.63147 12.2005L11.9978 16.5213V8.8488V0Z" fill="white" fillOpacity="0.8" />
                      <path
                        d="M11.9978 17.9037L11.9308 17.9857V23.5542L11.9978 23.7498L19.3688 13.5852L11.9978 17.9037Z"
                        fill="white"
                      />
                      <path
                        d="M11.9978 23.7498V17.9037L4.63147 13.5852L11.9978 23.7498Z"
                        fill="white"
                        fillOpacity="0.8"
                      />
                      <path
                        d="M11.9978 16.5213L19.3641 12.2005L11.9978 8.8488V16.5213Z"
                        fill="white"
                        fillOpacity="0.5"
                      />
                      <path
                        d="M4.63147 12.2005L11.9978 16.5213V8.8488L4.63147 12.2005Z"
                        fill="white"
                        fillOpacity="0.3"
                      />
                    </svg>
                  </div>
                </CardHeader>
                <CardContent className="dashboard-card-content">
                  <div className="dashboard-card-value">0.0000 ETH</div>
                  <p className="dashboard-card-metric">≈ $0.00</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="w-[48%]">
                    <QrCode className="mr-2 h-4 w-4" />
                    Receive
                  </Button>
                  <Button variant="outline" size="sm" className="w-[48%]">
                    <Upload className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </CardFooter>
              </Card>} */}
            </div>

            <div  className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 mt-6">
              <Card className="dashboard-card" >
                <CardHeader>
                  <CardTitle id="deposit_funds">Deposit Funds</CardTitle>
                  <CardDescription>Add funds to your account using cryptocurrency</CardDescription>
                </CardHeader>
                <CardContent>
                  <WalletDeposit />
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>Wallet Addresses</CardTitle>
                  <CardDescription>Your cryptocurrency deposit addresses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-[#F7931A] p-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M23.6408 14.9193L20.1408 6.01931C19.7558 5.06181 18.7308 4.53931 17.7733 4.92431L15.7808 5.69681L13.4858 1.95181C12.9983 1.06681 11.9133 0.731311 11.0283 1.21881L3.82829 5.24931C2.94329 5.73681 2.60829 6.82181 3.09579 7.70681L5.39079 11.4518L3.39829 12.2243C2.44079 12.6093 1.91829 13.6343 2.30329 14.5918L5.80329 23.4918C6.18829 24.4493 7.21329 24.9718 8.17079 24.5868L23.0258 18.2868C23.9833 17.9018 24.5058 16.8768 24.1208 15.9193H23.6408V14.9193ZM6.29079 7.76681L12.0833 4.53181L13.7558 7.29931L7.96329 10.5343L6.29079 7.76681ZM22.1408 16.9193L7.28579 23.2193L3.78579 14.3193L18.6408 8.01931L22.1408 16.9193Z"
                            fill="white"
                          />
                          <path
                            d="M14.9694 14.0255L12.4969 14.9755C12.3044 15.048 12.1044 14.958 12.0319 14.7655C11.9594 14.573 12.0494 14.373 12.2419 14.3005L14.7144 13.3505C14.9069 13.278 15.1069 13.368 15.1794 13.5605C15.2519 13.753 15.1619 13.953 14.9694 14.0255Z"
                            fill="white"
                          />
                          <path
                            d="M16.8461 13.1999L11.3461 15.4499C11.1536 15.5224 10.9536 15.4324 10.8811 15.2399C10.8086 15.0474 10.8986 14.8474 11.0911 14.7749L16.5911 12.5249C16.7836 12.4524 16.9836 12.5424 17.0561 12.7349C17.1286 12.9274 17.0386 13.1274 16.8461 13.1999Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">Bitcoin (BTC)</span>
                    </div>
                    <div className="wallet-address">
                     <span>bc1qlf5nr2zem75e6ewqxewzszdvpxxezpefgwzcu6</span>
                      
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-[#627EEA] p-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11.9978 0L11.8799 0.399V16.4035L11.9978 16.5213L19.3641 12.2005L11.9978 0Z"
                            fill="white"
                          />
                          <path
                            d="M11.9978 0L4.63147 12.2005L11.9978 16.5213V8.8488V0Z"
                            fill="white"
                            fillOpacity="0.8"
                          />
                          <path
                            d="M11.9978 17.9037L11.9308 17.9857V23.5542L11.9978 23.7498L19.3688 13.5852L11.9978 17.9037Z"
                            fill="white"
                          />
                          <path
                            d="M11.9978 23.7498V17.9037L4.63147 13.5852L11.9978 23.7498Z"
                            fill="white"
                            fillOpacity="0.8"
                          />
                          <path
                            d="M11.9978 16.5213L19.3641 12.2005L11.9978 8.8488V16.5213Z"
                            fill="white"
                            fillOpacity="0.5"
                          />
                          <path
                            d="M4.63147 12.2005L11.9978 16.5213V8.8488L4.63147 12.2005Z"
                            fill="white"
                            fillOpacity="0.3"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">Ethereum (ETH)</span>
                    </div>
                    <div className="wallet-address">
                      <span>0x792eb5501c3af4fd8e0f1cfddf802941a07854e2</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-[#2775CA] p-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                            fill="white"
                          />
                          <path
                            d="M15.9 14.25C15.9 12.15 14.55 11.4 11.85 11.1C9.75 10.8 9.3 10.35 9.3 9.45C9.3 8.55 9.9 7.95 11.4 7.95C12.75 7.95 13.35 8.4 13.65 9.3C13.8 9.6 14.1 9.75 14.4 9.75H15C15.45 9.75 15.75 9.45 15.75 9C15.6 7.65 14.55 6.45 13.05 6.15V4.95C13.05 4.5 12.75 4.2 12.3 4.2H11.7C11.25 4.2 10.95 4.5 10.95 4.95V6.15C9 6.45 7.65 7.8 7.65 9.6C7.65 11.55 8.85 12.45 11.55 12.75C13.5 13.05 14.25 13.35 14.25 14.4C14.25 15.45 13.35 16.2 12 16.2C10.2 16.2 9.6 15.45 9.45 14.55C9.3 14.1 9.15 14.1 8.7 14.1H8.1C7.65 14.1 7.35 14.4 7.35 14.85C7.5 16.5 8.55 17.85 10.95 18.15V19.35C10.95 19.8 11.25 20.1 11.7 20.1H12.3C12.75 20.1 13.05 19.8 13.05 19.35V18.15C15 17.85 15.9 16.35 15.9 14.25Z"
                            fill="#2775CA"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">USD Coin (USDC)</span>
                    </div>
                    <div className="wallet-address">
                      <span>0x742d35Cc6634C0532925a3b844Bc454e4438f44e</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="dashboard-card mt-6">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your recent wallet activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="deposits">Deposits</TabsTrigger>
                    <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                    <TabsTrigger value="investments">Investments</TabsTrigger>
                  </TabsList>
{/* {                  <TabsContent value="all">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-border pb-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-[hsl(var(--primary)_/_0.2)] p-2">
                            <ArrowDown className="h-4 w-4 text-[hsl(var(--primary))]" />
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
                            <Wallet className="h-4 w-4 text-[hsl(var(--chart-blue))]" />
                          </div>
                          <div>
                            <p className="font-medium">Investment (Aggressive Boost Plan)</p>
                            <p className="text-sm text-muted-foreground">Apr 14, 2025</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">-$10,000.00</p>
                          <p className="text-sm profit-text">Completed</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-b border-border pb-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-[hsl(var(--primary)_/_0.2)] p-2">
                            <ArrowDown className="h-4 w-4 text-[hsl(var(--primary))]" />
                          </div>
                          <div>
                            <p className="font-medium">Deposit (Ethereum)</p>
                            <p className="text-sm text-muted-foreground">Apr 10, 2025</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">+$3,500.00</p>
                          <p className="text-sm profit-text">Completed</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-[hsl(var(--loss)_/_0.2)] p-2">
                            <ArrowUp className="h-4 w-4 text-[hsl(var(--loss))]" />
                          </div>
                          <div>
                            <p className="font-medium">Withdrawal (Bank Transfer)</p>
                            <p className="text-sm text-muted-foreground">Apr 5, 2025</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">-$2,000.00</p>
                          <p className="text-sm profit-text">Completed</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="deposits">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-border pb-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-[hsl(var(--primary)_/_0.2)] p-2">
                            <ArrowDown className="h-4 w-4 text-[hsl(var(--primary))]" />
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-[hsl(var(--primary)_/_0.2)] p-2">
                            <ArrowDown className="h-4 w-4 text-[hsl(var(--primary))]" />
                          </div>
                          <div>
                            <p className="font-medium">Deposit (Ethereum)</p>
                            <p className="text-sm text-muted-foreground">Apr 10, 2025</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">+$3,500.00</p>
                          <p className="text-sm profit-text">Completed</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="withdrawals">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-[hsl(var(--loss)_/_0.2)] p-2">
                            <ArrowUp className="h-4 w-4 text-[hsl(var(--loss))]" />
                          </div>
                          <div>
                            <p className="font-medium">Withdrawal (Bank Transfer)</p>
                            <p className="text-sm text-muted-foreground">Apr 5, 2025</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">-$2,000.00</p>
                          <p className="text-sm profit-text">Completed</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="investments">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-[hsl(var(--chart-blue)_/_0.2)] p-2">
                            <Wallet className="h-4 w-4 text-[hsl(var(--chart-blue))]" />
                          </div>
                          <div>
                            <p className="font-medium">Investment (Aggressive Boost Plan)</p>
                            <p className="text-sm text-muted-foreground">Apr 14, 2025</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">-$10,000.00</p>
                          <p className="text-sm profit-text">Completed</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>} */}
                </Tabs>
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
