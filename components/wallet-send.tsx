"use client"

import { useState } from "react"
import { AlertCircle, ArrowRight, Check, Upload } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function WalletSend({ cryptoType = "bitcoin", balance = "0" }: { cryptoType?: string; balance?: string }) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoType)
  const [recipientAddress, setRecipientAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [fee, setFee] = useState("medium")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Crypto balances
  const balances = {
    bitcoin: balance || "0.1458 BTC",
    ethereum: "1.245 ETH",
    usdc: "2,500 USDC",
  }

  // Fee options
  const feeOptions = {
    slow: { bitcoin: "0.00001 BTC", ethereum: "0.0005 ETH", usdc: "1 USDC" },
    medium: { bitcoin: "0.00005 BTC", ethereum: "0.001 ETH", usdc: "2 USDC" },
    fast: { bitcoin: "0.0001 BTC", ethereum: "0.002 ETH", usdc: "5 USDC" },
  }

  const handleCryptoChange = (value: string) => {
    setSelectedCrypto(value)
  }

  const handleContinue = () => {
    // Validate inputs
    if (!recipientAddress) {
      setError("Recipient address is required")
      return
    }
    if (!amount || Number.parseFloat(amount) <= 0) {
      setError("Please enter a valid amount")
      return
    }

    // Clear any previous errors
    setError("")
    setStep(2)
  }

  const handleSend = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStep(3)
    }, 2000)
  }

  const handleClose = () => {
    setOpen(false)
    // Reset form after dialog closes
    setTimeout(() => {
      setStep(1)
      setRecipientAddress("")
      setAmount("")
      setFee("medium")
      setError("")
    }, 300)
  }

  const getCryptoSymbol = () => {
    switch (selectedCrypto) {
      case "bitcoin":
        return "BTC"
      case "ethereum":
        return "ETH"
      case "usdc":
        return "USDC"
      default:
        return ""
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          setTimeout(() => {
            setStep(1)
            setRecipientAddress("")
            setAmount("")
            setFee("medium")
            setError("")
          }, 300)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-[48%]">
          <Upload className="mr-2 h-4 w-4" />
          Send
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Send {selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1)}</DialogTitle>
              <DialogDescription>Send cryptocurrency to an external wallet address.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4 py-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

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
                <p className="text-xs text-muted-foreground">
                  Available balance: {balances[selectedCrypto as keyof typeof balances]}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Address</Label>
                <Input
                  id="recipient"
                  placeholder={`Enter ${selectedCrypto} address`}
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Double-check the address. Transactions cannot be reversed.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount ({getCryptoSymbol()})</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder={`Enter amount in ${getCryptoSymbol()}`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="flex justify-between">
                  <p className="text-xs text-muted-foreground">Enter the amount you want to send</p>
                  <button
                    className="text-xs text-primary hover:underline"
                    onClick={() => {
                      // Set max amount (would need to calculate this properly in a real app)
                      const maxAmount = balances[selectedCrypto as keyof typeof balances].split(" ")[0]
                      setAmount(maxAmount)
                    }}
                  >
                    Max
                  </button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleContinue}>Continue</Button>
            </DialogFooter>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Transaction</DialogTitle>
              <DialogDescription>Review the details of your transaction</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4 py-4">
              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">From</span>
                  <span className="text-sm font-medium">Your {selectedCrypto.toUpperCase()} Wallet</span>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="text-muted-foreground" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">To</span>
                  <span className="text-sm font-mono truncate max-w-[200px]">{recipientAddress}</span>
                </div>
                <div className="border-t my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="text-sm font-medium">
                    {amount} {getCryptoSymbol()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Transaction Fee</Label>
                <RadioGroup value={fee} onValueChange={setFee}>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="slow" id="slow" />
                    <Label htmlFor="slow" className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>Slow</span>
                        <span className="font-mono text-sm">
                          {feeOptions.slow[selectedCrypto as keyof typeof feeOptions.slow]}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">May take several hours</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium" className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>Medium</span>
                        <span className="font-mono text-sm">
                          {feeOptions.medium[selectedCrypto as keyof typeof feeOptions.medium]}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Usually within an hour</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="fast" id="fast" />
                    <Label htmlFor="fast" className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>Fast</span>
                        <span className="font-mono text-sm">
                          {feeOptions.fast[selectedCrypto as keyof typeof feeOptions.fast]}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Usually within minutes</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">
                    {amount} {getCryptoSymbol()} +{" "}
                    {feeOptions[fee as keyof typeof feeOptions][selectedCrypto as keyof typeof feeOptions.slow]}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleSend} disabled={isLoading}>
                {isLoading ? "Processing..." : "Send Now"}
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 3 && (
          <>
            <DialogHeader>
              <DialogTitle>Transaction Submitted</DialogTitle>
              <DialogDescription>Your transaction has been submitted to the network</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium">Transaction Successful</h3>
                <p className="text-sm text-muted-foreground">
                  You've sent {amount} {getCryptoSymbol()} to the recipient address
                </p>
              </div>
              <div className="rounded-lg border p-4 w-full mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Amount</span>
                    <span className="text-sm font-medium">
                      {amount} {getCryptoSymbol()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Fee</span>
                    <span className="text-sm font-medium">
                      {feeOptions[fee as keyof typeof feeOptions][selectedCrypto as keyof typeof feeOptions.slow]}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Transaction ID</span>
                    <span className="text-sm font-mono truncate max-w-[150px]">
                      0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleClose} className="w-full">
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
