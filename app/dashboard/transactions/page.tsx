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
import { useState, useEffect } from "react"
import { USER_TYPES, selectUser, selectUserType, setUser, setUserType } from "../../../features/user/userSlice";
import { selectUserEmail,  setUserEmail } from "../../../features/user/userActiveEmail";
import {selectToken, setToken} from "../../../features/token/tokenSlice";
import { useSelector } from "react-redux"
import { WalletWithdraw } from "@/components/wallet-withdraw"
import { WalletReceive } from "@/components/wallet-receive"
import { WalletSend } from "@/components/wallet-send"

export default function WalletPage() {
  const router = useRouter()
   const [wallets, setWallets] = useState([]);
   const [btcBalance, setBtcBalance] = useState([]);
   const [transactions, setTransactions] = useState([]);
    const user = useSelector(selectUser);

    const usdAmount = wallets.balance;
      // Format date function
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

  useEffect(() => {
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
      convertUsdToBitcoin();
    }
    
    }
    
    fetchBalance()
    
    async function convertUsdToBitcoin() {
    
      try {
        // Try a different API
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        
        // Calculate and display conversion
        const btcPrice = data.bitcoin.usd;
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
   
    async function fetchTransaction(){
      const res =  await fetch(`https://avantrades-api.onrender.com/api/transactions/`, {
        method: "GET",
        headers: {
        
            "Content-Type": "application/json"
        },
    })
    
    const data = await res.json()
    if (res.status >= 200 & res.status <= 209) {
      setTransactions(data)
      console.log("Transactions [STATE]: ", data);
    }
    
    }
    fetchTransaction()



       

  
  }, [btcBalance, user, usdAmount])
  // console.log("Wallets [STATE]: ", wallets);
  // Function to get all transactions for the current user
const getCurrentUserTransactions = () => {
  if (!transactions || !transactions.length) return [];
  
  return transactions.filter(transaction => 
    transaction.email === user[0]?.email
  );
};


  const getUserTransactionsByType = (type) => {
    if (!transactions || !transactions.length) return [];
    
    return transactions.filter(transaction => 
      transaction.email === user[0]?.email && 
      transaction.type === type
    );
  };
  
  
  const userTransactions = getUserTransactionsByType('deposit');
  console.log("User Deposits:", userTransactions);
   
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 pl-2 text-[hsl(var(--primary))]" />
            <span className="text-xl font-bold">Bluevest</span>
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
        <div className="dashboard-container p-2">
          <div className="dashboard-grid">
          
 
          
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
                   {<TabsTrigger value="investments">Investments</TabsTrigger>}
                  </TabsList>


                  <TabsContent value="all">
    <div className="space-y-4">
      {getCurrentUserTransactions("all").length > 0 ? (
        // Sort by date (newest first) before mapping
        getCurrentUserTransactions("all")
          .sort((a, b) => new Date(b.transaction_date || 0) - new Date(a.transaction_date || 0))
          .map((transaction, index) => {
            const isDeposit = transaction.type === "deposit";
            
            return (
              <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className={`rounded-full ${isDeposit ? "bg-[hsl(var(--primary)_/_0.2)]" : "bg-red-100"} p-2`}>
                    {isDeposit ? (
                      <ArrowDown className="h-4 w-4 text-[hsl(var(--primary))]" />
                    ) : (
                      <ArrowUp className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {isDeposit ? "Deposit" : "Withdrawal"} ({transaction.cryptoType || "Bitcoin"})
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(transaction.transaction_date) || "Recent"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {isDeposit ? "+" : "-"}${Number(transaction.amount).toFixed(2)}
                  </p>
                  <p className={`text-sm ${
                    transaction.status === "completed" ? "text-green-500" : 
                    transaction.status === "rejected" ? "text-red-500" : "text-yellow-500"
                  }`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </p>
                </div>
              </div>
            );
          })
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No transactions found
        </div>
      )}
    </div>
  </TabsContent>

                  <TabsContent value="deposits">
    <div className="space-y-4">
      {getUserTransactionsByType("deposit").length > 0 ? (
        getUserTransactionsByType("deposit").map((transaction, index) => (
          <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-[hsl(var(--primary)_/_0.2)] p-2">
                <ArrowDown className="h-4 w-4 text-[hsl(var(--primary))]" />
              </div>
              <div>
                <p className="font-medium">Deposit ({transaction.cryptoType || "Bitcoin"})</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(transaction.transaction_date) || "Recent"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">+${Number(transaction.amount).toFixed(2)}</p>
              <p className={`text-sm ${transaction.status === "completed" ? "text-green-500" : "text-yellow-500"}`}>
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No deposit transactions found
        </div>
      )}
    </div>
  </TabsContent>

            
                
  <TabsContent value="withdrawals">
    <div className="space-y-4">
      {getUserTransactionsByType("withdraw").length > 0 ? (
        getUserTransactionsByType("withdraw").map((transaction, index) => (
          <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-red-100 p-2">
                <ArrowUp className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <p className="font-medium">Withdrawal ({transaction.cryptoType || "Bitcoin"})</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(transaction.transaction_date) || "Recent"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">-${Number(transaction.amount).toFixed(2)}</p>
              <p className={`text-sm ${
                transaction.status === "completed" ? "text-green-500" : 
                transaction.status === "rejected" ? "text-red-500" : "text-yellow-500"
              }`}>
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No withdrawal transactions found
        </div>
      )}
    </div>
  </TabsContent>


                
  <TabsContent value="investments">
    <div className="space-y-4">
      {getUserTransactionsByType("investments").length > 0 ? (
        getUserTransactionsByType("investments").map((transaction, index) => (
          <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-red-100 p-2">
                <ArrowUp className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <p className="font-medium">Investments ({transaction.cryptoType || "Bitcoin"})</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(transaction.createdAt) || "Recent"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">-${Number(transaction.amount).toFixed(2)}</p>
              <p className={`text-sm ${
                transaction.status === "completed" ? "text-green-500" : 
                transaction.status === "rejected" ? "text-red-500" : "text-yellow-500"
              }`}>
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No investment transactions found
        </div>
      )}
    </div>
  </TabsContent>

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
          <p className="text-sm text-muted-foreground">© 2025 Bluevest. All rights reserved.</p>
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
