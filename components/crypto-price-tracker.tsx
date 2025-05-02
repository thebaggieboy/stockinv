"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUp, RefreshCw } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Cryptocurrency {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  price_change_percentage_24h: number
}

export default function CryptoPriceTracker() {
  const [cryptoData, setCryptoData] = useState<Cryptocurrency[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchCryptoData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en",
      )

      if (!response.ok) {
        throw new Error("Failed to fetch cryptocurrency data")
      }

      const data = await response.json()
      setCryptoData(data)
      setLastUpdated(new Date())
    } catch (err) {
      setError("Error fetching cryptocurrency data. Please try again later.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCryptoData()

    // Set up auto-refresh every 60 seconds
    const intervalId = setInterval(fetchCryptoData, 60000)

    return () => clearInterval(intervalId)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`
    } else {
      return formatCurrency(value)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {lastUpdated ? <>Last updated: {lastUpdated.toLocaleTimeString()}</> : <>Loading data...</>}
        </div>
        <button
          onClick={fetchCryptoData}
          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {error && <div className="bg-destructive/10 text-destructive p-4 rounded-md">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-32" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          : cryptoData.map((crypto) => (
              <Card key={crypto.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={crypto.image || "/placeholder.svg"}
                      alt={`${crypto.name} logo`}
                      className="h-8 w-8 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">{crypto.name}</CardTitle>
                      <CardDescription className="uppercase">{crypto.symbol}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{formatCurrency(crypto.current_price)}</div>
                    <div className="flex justify-between">
                      <div
                        className={`flex items-center text-sm ${
                          crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {crypto.price_change_percentage_24h >= 0 ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Market Cap: {formatMarketCap(crypto.market_cap)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  )
}
