"use client"

import { useState } from "react"
import { Check, Copy, QrCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES, selectUser, selectUserType, setUser, setUserType } from "../features/user/userSlice";
export function WalletReceive({
  cryptoType = "bitcoin",
  initialAddress = "",
}: { cryptoType?: string; initialAddress?: string }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoType)
 
    const [isLoading, setIsLoading] = useState(false)
    const [isDeposit, setIsDeposit] = useState(false)
    const [isWithdraw, setIsWithdraw] = useState(false)
    const [isTransaction, setIsTransaction] = useState(false)
    const [isDepositSuccess, setIsDepositSuccess] = useState(false)
    const [isWithdrawSuccess, setIsWithdrawSuccess] = useState(false)
    const [transactions, setTransactions] = useState([])
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(selectUser);

  // Wallet addresses for different cryptocurrencies
  const walletAddresses = {
    bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    ethereum: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    usdc: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  }

  const address = initialAddress || walletAddresses[selectedCrypto as keyof typeof walletAddresses]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCryptoChange = (value: string) => {
    setSelectedCrypto(value)
  }

  const getQrCodeUrl = (address: string, amount: string) => {
    const protocol =
      selectedCrypto === "bitcoin"
        ? "bitcoin"
        : selectedCrypto === "ethereum"
          ? "ethereum"
          : selectedCrypto === "usdc"
            ? "ethereum"
            : "crypto"

    const amountParam = amount ? `?amount=${amount}` : ""
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${protocol}:${address}${amountParam}`
  }

  
    const [formData, setFormData] = useState({
        email:user[0].email,  
        amount: "",
        type: "deposit",
        status: "pending",	
         
      })
      
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

 
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Perform your deposit logic here
    // For example, you can send the data to your server or API
    handleDeposit();
    setOpen(false)
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

 
  const handleDeposit = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert(`Successfully initiated deposit of ${amount} using ${cryptoType}`)
      setAmount("")
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-[48%]">
          <QrCode className="mr-2 h-4 w-4" />
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Receive Cryptocurrency</DialogTitle>
          <DialogDescription>Send funds to this address to deposit into your wallet.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="bg-white p-2 rounded-lg">
              <img src={getQrCodeUrl(address, amount) || "/placeholder.svg"} alt="QR Code" className="w-48 h-48" />
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Scan this QR code to deposit {selectedCrypto.toUpperCase()}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="crypto-type">Cryptocurrency</Label>
            <Select value={selectedCrypto} onValueChange={handleCryptoChange}>
              <SelectTrigger id="crypto-type">
                <SelectValue placeholder="Select cryptocurrency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (Optional)</Label>
            <Input
              id="amount"
              
              name="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={inputChangeHandler}
            />
            <p className="text-xs text-muted-foreground">Specifying an amount will include it in the QR code.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Deposit Address</Label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Input id="address" name="address" value={address} readOnly className="pr-10 font-mono text-sm" />
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
              Send only {selectedCrypto.toUpperCase()} to this address. Sending any other cryptocurrency may result in
              permanent loss.
            </p>
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button variant="outline" onClick={handleSubmit}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
