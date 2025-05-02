"use client"

import { useEffect, useState } from "react"
import { TransactionPopup } from "@/components/transaction-popup"

// Transaction data types
type TransactionType = "withdrawal" | "deposit" | "investment"
type TransactionStatus = "completed" | "pending" | "failed"

interface Transaction {
  id: string
  type: TransactionType
  amount: number
  description: string
  status: TransactionStatus
  timestamp: Date
}

// Sample transaction descriptions
const withdrawalDescriptions = [
  "BTC withdrawal",
  "ETH withdrawal",
  "Transfer to savings",
  "BTC payment",
  "Rent payment",
  "SOL payment",
  "Credit card payment",
  "SOL purchase",
  "ETH payment",
  "USDT payment",
]

const depositDescriptions = [
  "Salary deposit",
  "Direct deposit",
  "Check deposit",
  "Transfer from savings",
  "Refund",
  "Interest payment",
  "Dividend payment",
  "Tax refund",
  "Client payment",
  "Bonus payment",
]

// Sample merchants/people
const entities = [
  "Amazon",
  "Netflix",
  "Spotify",
  "Uber",
  "DoorDash",
  "Walmart",
  "Target",
  "Starbucks",
  "Apple",
  "Google",
  "John Doe",
  "Jane Smith",
  "Electric Company",
  "Water Utility",
  "Gas Company",
]

export function TransactionNotificationSystem() {
  const [activeNotifications, setActiveNotifications] = useState<Transaction[]>([])
  const [transactionCount, setTransactionCount] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const maxActiveNotifications = 3 // Maximum number of notifications to show at once
  const totalTransactionsToShow = 40 // Total number of transactions to generate

  // Generate a random transaction
  const generateRandomTransaction = (): Transaction => {
    const type: TransactionType = Math.random() > 0.5 ? "deposit" : "withdrawal"
    const descriptions = type === "withdrawal" ? withdrawalDescriptions : depositDescriptions

    // Generate a random amount between $10 and $2000
    const amount = Math.floor(Math.random() * 1990) + 10

    // Randomly select a description
    let description = descriptions[Math.floor(Math.random() * descriptions.length)]

    // Sometimes add an entity to the description
    if (Math.random() > 0.5) {
      const entity = entities[Math.floor(Math.random() * entities.length)]
      description = type === "withdrawal" ? `${description} - ${entity}` : `${description} from ${entity}`
    }

    // Determine status (mostly completed, occasionally pending or failed)
    const statusRandom = Math.random()
    let status: TransactionStatus = "completed"
    if (statusRandom > 0.9) {
      status = "failed"
    } else if (statusRandom > 0.8) {
      status = "pending"
    }

    return {
      id: Math.random().toString(36).substring(2, 11),
      type,
      amount,
      description,
      status,
      timestamp: new Date(),
    }
  }

  // Remove a notification by ID
  const removeNotification = (id: string) => {
    setActiveNotifications((current) => current.filter((notification) => notification.id !== id))
  }

  // Add a new notification
  const addNotification = () => {
    if (transactionCount >= totalTransactionsToShow || isPaused) return

    const newTransaction = generateRandomTransaction()

    setActiveNotifications((current) => {
      // If we're at max capacity, remove the oldest notification
      if (current.length >= maxActiveNotifications) {
        return [...current.slice(1), newTransaction]
      }
      return [...current, newTransaction]
    })

    setTransactionCount((count) => count + 1)
  }

  useEffect(() => {
    // Start showing notifications after a short delay
    const initialDelay = setTimeout(() => {
      addNotification()
    }, 1000)

    return () => clearTimeout(initialDelay)
  }, [])

  useEffect(() => {
    if (transactionCount >= totalTransactionsToShow) return

    // Schedule the next notification after a random delay
    const nextDelay = Math.floor(Math.random() * 3000) + 1000 // 1-4 seconds
    const timer = setTimeout(() => {
      addNotification()
    }, nextDelay)

    return () => clearTimeout(timer)
  }, [transactionCount, isPaused])

  return (
    <div>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-4">
        {activeNotifications.map((transaction) => (
          <TransactionPopup
            key={transaction.id}
            show={true}
            onClose={() => removeNotification(transaction.id)}
            amount={transaction.amount}
            type={transaction.type}
            status={transaction.status}
            description={transaction.description}
            autoCloseDelay={6000}
            position="bottom-right"
          />
        ))}
      </div>

      <div className="fixed bottom-4 left-4 z-50 bg-card border shadow-md rounded-lg p-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium">
            Transactions: {transactionCount}/{totalTransactionsToShow}
          </div>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isPaused ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>
    </div>
  )
}
