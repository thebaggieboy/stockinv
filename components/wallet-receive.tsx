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

export function WalletReceive({
  cryptoType = "bitcoin",
  initialAddress = "",
}: { cryptoType?: string; initialAddress?: string }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoType)
  const [amount, setAmount] = useState("")

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-[48%]">
          <QrCode className="mr-2 h-4 w-4" />
          Receive
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
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Specifying an amount will include it in the QR code.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Deposit Address</Label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Input id="address" value={address} readOnly className="pr-10 font-mono text-sm" />
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
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
