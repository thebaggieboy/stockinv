"use client"

import { ArrowDown, ArrowUp, FileText } from "lucide-react"
import { useState } from "react"
import { TransactionCard } from "../components/transaction-card"


export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("All")

  const tabs = ["All", "Deposits", "Withdrawals", "Investments"]

  const transactions = [
    {
      id: 1,
      type: "Deposit",
      asset: "Bitcoin",
      amount: 5000.0,
      date: "Apr 15, 2025",
      status: "Completed",
      icon: <ArrowDown className="h-5 w-5 text-gray-500" />,
      isPositive: true,
    },
    {
      id: 2,
      type: "Investment",
      asset: "Aggressive Boost Plan",
      amount: 10000.0,
      date: "Apr 14, 2025",
      status: "Completed",
      icon: <FileText className="h-5 w-5 text-gray-500" />,
      isPositive: false,
    },
    {
      id: 3,
      type: "Deposit",
      asset: "Ethereum",
      amount: 3500.0,
      date: "Apr 10, 2025",
      status: "Completed",
      icon: <ArrowDown className="h-5 w-5 text-gray-500" />,
      isPositive: true,
    },
    {
      id: 4,
      type: "Withdrawal",
      asset: "Bank Transfer",
      amount: 2000.0,
      date: "Apr 5, 2025",
      status: "Completed",
      icon: <ArrowUp className="h-5 w-5 text-gray-500" />,
      isPositive: false,
    },
  ]

  const filteredTransactions =
    activeTab === "All" ? transactions : transactions.filter((t) => t.type === activeTab.slice(0, -1))

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Transactions</h1>
        <p className="text-gray-500">Your transaction history</p>
      </div>

      <div className="rounded-lg p-1 flex mb-8 max-w-md">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
              activeTab === tab ? "bg-green-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-gray-600 font-medium hover:text-gray-900">View All Transactions</button>
      </div>
    </div>
  )
}
