"use client"

import { useState, useEffect } from "react"
import { ArrowUp, Check, CreditCard, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES, selectUser, selectUserType, setUser, setUserType } from "../features/user/userSlice";
import { selectUserEmail,  setUserEmail } from "../features/user/userActiveEmail";

export function generateTransactionId({
  length = 8,
  includeTimestamp = true,
  prefix = 'TXN',
  uppercaseOnly = false
} = {}) {
  // Characters to use for random part
  const characters = uppercaseOnly
    ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  // Generate random string
  let randomPart = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomPart += characters.charAt(randomIndex);
  }
  
  // Add timestamp if requested
  const timestamp = includeTimestamp ? new Date().getTime().toString() : '';
  
  // Combine components
  return `${prefix}${timestamp ? '-' + timestamp : ''}-${randomPart}`;
}
export function WalletWithdraw() {
  
  const [withdrawMethod, setWithdrawMethod] = useState("crypto")
  const [wallets, setWallets] = useState([]);
  const [btcBalance, setBtcBalance] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isDeposit, setIsDeposit] = useState(false)
  const [isWithdraw, setIsWithdraw] = useState(false)
  const [isTransaction, setIsTransaction] = useState(false)
  const [isDepositSuccess, setIsDepositSuccess] = useState(false)
  const [isWithdrawSuccess, setIsWithdrawSuccess] = useState(false)
   const [transactions, setTransactions] = useState([])
    const dispatch = useDispatch();
    const router = useRouter();
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
      const [formData, setFormData] = useState({
          email:user[0].email,  
          amount: "",
          type: "withdraw",
          status: "pending",	
          transaction_date: new Date().toISOString(),



           
        })
        // Handle form submission
  const { email, amount, type, status } = formData
  
    const inputChangeHandler = (e) => {
      const { name, value } = e.target
      setFormData((prevValue) => {
        return {
          ...prevValue,
          [name]: value
        }
      })
  
    }
  
  // Function to filter transactions by current user's email
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    
    try {
      const res = await fetch("https://avantrades-api.onrender.com/api/transactions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, amount, type, status }),
        credentials: "include"
      })
      
      const data = await res.json()
      console.log("Response data:", data) 
      
      if (res.status >= 200 && res.status <= 209) {
        console.log("New Withdrawal Registered.")
        console.log(data)
        
        // Properly update the wallet state with the new balance
        const newBalance = parseFloat(wallets.balance) - parseFloat(amount)
        setWallets({ ...wallets, balance: newBalance })
        
        console.log("New Balance:", newBalance)
        console.log("Previous Balance:", wallets?.balance)
        
        setTransactions(data)
        setIsWithdrawSuccess(true)
        handleWithdraw()
      } else {
        const error = { ...data }
        throw error
      }
    } catch (error) {
      console.error("Withdrawal failed:", error)
      // Handle error state here
    }
  }
 
  const handleWithdraw = () => {
    setIsLoading(true)


    setTimeout(() => {
          // Simulate API call
  
      setIsLoading(false)
  
      setSuccess(true)
      // Reset and close after showing success
      setTimeout(() => {
        setSuccess(false)
        setOpen(false)

      }, 2000)
    }, 1500)
  }





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
    console.log("User Withdrawals:", userTransactions);
     

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-[48%]">
          <ArrowUp className="mr-2 h-4 w-4" />
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>Withdraw your funds to your bank account or cryptocurrency wallet.</DialogDescription>
        </DialogHeader>
        {success ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-center">Withdrawal Successful</h3>
            <p className="text-center text-muted-foreground">
              Your withdrawal of ${amount} has been initiated and will be processed shortly.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={inputChangeHandler}
                />
                <p className="text-xs text-muted-foreground">Available balance: ${wallets?.balance}</p>
              </div>
              <div className="space-y-2">
                <Label>Withdrawal Method</Label>
                <RadioGroup defaultValue="bank" onValueChange={setWithdrawMethod}>
             {/* {     <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Bank Transfer</span>
                      </div>
                    </Label>
                  </div>} */}
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="crypto" id="crypto" />
                    <Label htmlFor="crypto" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4" />
                        <span>Cryptocurrency</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
{/* {
              {withdrawMethod === "bank" && (
                <div className="space-y-2">
                  <Label htmlFor="bank-account">Bank Account</Label>
                  <Select defaultValue="primary">
                    <SelectTrigger id="bank-account">
                      <SelectValue placeholder="Select bank account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary Account (****4567)</SelectItem>
                      <SelectItem value="savings">Savings Account (****7890)</SelectItem>
                      <SelectItem value="new">Add New Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}} */}

              {withdrawMethod === "crypto" && (
                <div className="space-y-2">
                  <Label htmlFor="crypto-wallet">Cryptocurrency</Label>
                  <Select defaultValue="bitcoin">
                    <SelectTrigger id="crypto-wallet">
                      <SelectValue placeholder="Select cryptocurrency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                      <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Label htmlFor="wallet-address" className="mt-2">
                    Wallet Address
                  </Label>
                  <Input id="wallet-address" placeholder="Enter your wallet address" />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!amount || isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? "Processing..." : "Withdraw Funds"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
