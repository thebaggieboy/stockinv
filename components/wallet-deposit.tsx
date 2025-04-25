"use client"

import { useState } from "react"
import { Bitcoin, Check, Copy, CreditCard, Wallet } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES, selectUser, selectUserType, setUser, setUserType } from "../features/user/userSlice";
import { selectUserEmail,  setUserEmail } from "../features/user/userActiveEmail";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function WalletDeposit() {
 
  const [cryptoType, setCryptoType] = useState("bitcoin")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
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
        type: "deposit",
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
    handleDeposit();
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
          setIsDepositSuccess(true)
                 
              }
  
              const error = { ...data }
              throw error

  }


  // Wallet addresses for different cryptocurrencies
  const walletAddresses = {
    bitcoin: "bc1qlf5nr2zem75e6ewqxewzszdvpxxezpefgwzcu6",
    ethereum: "0x792eb5501c3af4fd8e0f1cfddf802941a07854e2",
    usdc: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  }

  const handleDeposit = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert(`Successfully initiated deposit of ${amount} using ${cryptoType}`)
      setAmount("")
    }, 1500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddresses[cryptoType as keyof typeof walletAddresses])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Tabs defaultValue="crypto" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="crypto" className="flex items-center">
          <Bitcoin className="mr-2 h-4 w-4" />
          Crypto
        </TabsTrigger>
        <TabsTrigger value="card" className="flex items-center">
          <CreditCard className="mr-2 h-4 w-4" />
          Card
        </TabsTrigger>
      </TabsList>
      <TabsContent value="crypto" className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label>Deposit Address</Label>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Input
                value={walletAddresses[cryptoType as keyof typeof walletAddresses]}
                readOnly
                className="pr-10 font-mono text-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Send only {cryptoType.toUpperCase()} to this address. Sending any other cryptocurrency may result in
            permanent loss.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (USD)</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            placeholder="Enter amount"
            
            onChange={inputChangeHandler}
          />
        </div>
        <div className="space-y-2">
          <Label>Select Cryptocurrency</Label>
          <RadioGroup defaultValue="bitcoin" onValueChange={setCryptoType}>
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value="bitcoin" id="bitcoin" />
              <Label htmlFor="bitcoin" className="flex-1 cursor-pointer">
                Bitcoin (BTC)
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value="ethereum" id="ethereum" />
              <Label htmlFor="ethereum" className="flex-1 cursor-pointer">
                Ethereum (ETH)
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <RadioGroupItem value="usdc" id="usdc" />
              <Label htmlFor="usdc" className="flex-1 cursor-pointer">
                USD Coin (USDC)
              </Label>
            </div>
          </RadioGroup>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={ amount == "" || isLoading}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isLoading ? "Processing..." : "Deposit Now"}
        </Button>
      </TabsContent>
      <TabsContent value="card" className="pt-4">
        <div className="rounded-md border p-4 flex items-center justify-center h-[200px]">
          <div className="text-center text-muted-foreground">
            <Wallet className="mx-auto h-10 w-10 mb-2" />
            <p>Card deposits coming soon</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
