import { ArrowDown, ArrowUp, FileText } from "lucide-react"
import Link from "next/link"

interface Transaction {
  id: number | string
  type: string
  asset: string
  amount: number
  date: string
  status: string
  isPositive: boolean
}

export function TransactionCard({ transaction }: { transaction: Transaction }) {
  const getIcon = () => {
    switch (transaction.type) {
      case "Deposit":
        return <ArrowDown className="h-5 w-5 text-gray-500" />
      case "Withdrawal":
        return <ArrowUp className="h-5 w-5 text-gray-500" />
      case "Investment":
        return <FileText className="h-5 w-5 text-gray-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Link
      href={`/transactions/${transaction.id}`}
      className="border-b border-gray-200 py-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="flex items-center">
        <div className="bg-gray-200 rounded-full p-2 mr-4">{getIcon()}</div>
        <div>
          <div className="font-medium">
            {transaction.type} ({transaction.asset})
          </div>
          <div className="text-gray-500 text-sm">{transaction.date}</div>
        </div>
      </div>
      <div className="text-right">
        <div className={`font-bold ${transaction.isPositive ? "text-green-600" : "text-red-600"}`}>
          {transaction.isPositive ? "+" : "-"}$
          {transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="text-gray-500 text-sm">{transaction.status}</div>
      </div>
    </Link>
  )
}
