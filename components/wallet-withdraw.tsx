"use client"

import { useState } from "react"
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
export function WalletWithdraw() {
  
  const [withdrawMethod, setWithdrawMethod] = useState("bank")
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
   
  
    function createTransaction(){
      console.log("Creating transaction...")
      // Simulate API call
  
  
    }
  
      const [formData, setFormData] = useState({
          email:user[0].email,  
          amount: "",
          type: "withdraw",
          status: "pending",	
           
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
      // Perform your deposit logic here
      // For example, you can send the data to your server or API
      handleWithdraw();
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
         if (res.status >= 200 & res.status <= 209) {
            console.log("New User Registered.")
            console.log(data)
            setTransactions(data)
            setIsWithdrawSuccess(true)
                   
                }
    
                const error = { ...data }
                throw error
  
    }
  

  const handleWithdraw = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)
      // Reset and close after showing success
      setTimeout(() => {
        setSuccess(false)
        setOpen(false)
        setAmount("")
      }, 2000)
    }, 1500)
  }

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
                <p className="text-xs text-muted-foreground">Available balance: $12,234.00</p>
              </div>
              <div className="space-y-2">
                <Label>Withdrawal Method</Label>
                <RadioGroup defaultValue="bank" onValueChange={setWithdrawMethod}>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Bank Transfer</span>
                      </div>
                    </Label>
                  </div>
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
              )}

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
