"use client"

import { useState } from "react"
import { Bitcoin, Check, Copy, CreditCard, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function WalletDeposit() {
  const [amount, setAmount] = useState("")
  const [cryptoType, setCryptoType] = useState("bitcoin")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // Wallet addresses for different cryptocurrencies
  const walletAddresses = {
    bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    ethereum: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
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
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
          onClick={handleDeposit}
          disabled={!amount || isLoading}
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
