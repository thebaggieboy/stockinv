"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useSearchParams } from "next/navigation"

export default function DepositSuccessPage() {
  const [copiedTxId, setCopiedTxId] = useState(false)
  const searchParams = useSearchParams()

  // Get transaction details from URL params or use defaults
  const currency = searchParams.get("currency") || "BTC"
  const amount = searchParams.get("amount") || "0.05"
  const txId = searchParams.get("txId") || "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b"
  const network = searchParams.get("network") || currency === "USDC" || currency === "USDT" ? "Ethereum (ERC-20)" : ""

  // Get currency color and icon
  const currencyDetails = {
    BTC: { color: "bg-[#F7931A]", icon: "₿", name: "Bitcoin" },
    USDC: { color: "bg-[#2775CA]", icon: "$", name: "USD Coin" },
    USDT: { color: "bg-[#26A17B]", icon: "$", name: "Tether" },
    SOL: { color: "bg-[#9945FF]", icon: "◎", name: "Solana" },
    ETH: { color: "bg-[#627EEA]", icon: "Ξ", name: "Ethereum" },
  }[currency] || { color: "bg-blue-500", icon: "$", name: currency }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(txId)
    setCopiedTxId(true)
    setTimeout(() => setCopiedTxId(false), 2000)
  }

  // Format date for display
  const formattedDate = new Date().toLocaleString()

  // Generate explorer URL based on currency
  const getExplorerUrl = () => {
    switch (currency) {
      case "BTC":
        return `https://www.blockchain.com/explorer/transactions/btc/${txId}`
      case "ETH":
      case "USDC":
      case "USDT":
        return `https://etherscan.io/tx/${txId}`
      case "SOL":
        return `https://explorer.solana.com/tx/${txId}`
      default:
        return "#"
    }
  }

  return (
    <div className="container max-w-2xl py-8">
      <Link href="/wallet" className="flex items-center text-sm text-blue-500 hover:text-blue-600 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Wallet
      </Link>

      <div className="flex flex-col items-center justify-center mb-8">
        <div className="bg-green-500 rounded-full p-4 mb-4">
          <Check className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Deposit Successful</h1>
        <p className="text-muted-foreground text-center">
          Your deposit has been successfully processed and added to your wallet.
        </p>
      </div>

      

      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex-1" asChild>
          <Link href="/wallet">Return to Wallet</Link>
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <Link href="/investment-plans">Explore Investment Plans</Link>
        </Button>
      </div>
    </div>
  )
}
