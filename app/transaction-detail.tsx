import { ArrowDown, ArrowLeft, ArrowUp, Calendar, Check, Clock, FileText } from "lucide-react"
import Link from "next/link"

interface TransactionDetailProps {
  id: string
}

export default function TransactionDetail({ id }: TransactionDetailProps) {
  // In a real app, you would fetch the transaction details based on the ID
  // This is mock data for demonstration
  const getTransactionById = (id: string) => {
    const transactions = [
      {
        id: "1",
        type: "Deposit",
        asset: "Bitcoin",
        amount: 5000.0,
        date: "Apr 15, 2025",
        time: "14:32:45 UTC",
        status: "Completed",
        txHash: "0x3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f",
        fromAddress: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
        toAddress: "0x9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0t",
        fee: 0.0025,
        confirmations: 56,
        notes: "Monthly investment",
      },
      {
        id: "2",
        type: "Investment",
        asset: "Aggressive Boost Plan",
        amount: 10000.0,
        date: "Apr 14, 2025",
        time: "10:15:22 UTC",
        status: "Completed",
        txHash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x",
        fromAddress: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
        toAddress: "0x8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0t1u2v",
        fee: 0.0035,
        confirmations: 72,
        notes: "Aggressive investment portfolio allocation",
      },
      {
        id: "3",
        type: "Deposit",
        asset: "Ethereum",
        amount: 3500.0,
        date: "Apr 10, 2025",
        time: "09:45:33 UTC",
        status: "Completed",
        txHash: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
        fromAddress: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w",
        toAddress: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
        fee: 0.0018,
        confirmations: 128,
        notes: "ETH purchase",
      },
      {
        id: "4",
        type: "Withdrawal",
        asset: "Bank Transfer",
        amount: 2000.0,
        date: "Apr 5, 2025",
        time: "16:20:10 UTC",
        status: "Completed",
        txHash: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a",
        fromAddress: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
        toAddress: "Bank Account ****4567",
        fee: 0.001,
        confirmations: 256,
        notes: "Monthly withdrawal to checking account",
      },
    ]

    return transactions.find((t) => t.id === id) || transactions[0]
  }

  const transaction = getTransactionById(id)

  const getIcon = () => {
    switch (transaction.type) {
      case "Deposit":
        return <ArrowDown className="h-6 w-6 text-green-500" />
      case "Withdrawal":
        return <ArrowUp className="h-6 w-6 text-red-500" />
      case "Investment":
        return <FileText className="h-6 w-6 text-blue-500" />
      default:
        return <Clock className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link href="/transactions" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Transactions
      </Link>

      <div className="bg-white rounded-xl border p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-gray-100 rounded-full p-3 mr-4">{getIcon()}</div>
            <div>
              <h1 className="text-2xl font-bold">
                {transaction.type} ({transaction.asset})
              </h1>
              <div className="text-gray-500">Transaction ID: {id}</div>
            </div>
          </div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Check className="h-4 w-4 mr-1" />
            {transaction.status}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-3xl font-bold mb-4">
              {transaction.type === "Withdrawal" ? "-" : "+"}$
              {transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Date & Time</div>
                  <div>
                    {transaction.date} at {transaction.time}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Confirmations</div>
                  <div>{transaction.confirmations}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Transaction Hash</div>
              <div className="bg-gray-100 p-2 rounded text-sm font-mono break-all">{transaction.txHash}</div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">From</div>
              <div className="bg-gray-100 p-2 rounded text-sm font-mono break-all">{transaction.fromAddress}</div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">To</div>
              <div className="bg-gray-100 p-2 rounded text-sm font-mono break-all">{transaction.toAddress}</div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Fee</div>
              <div>${transaction.fee}</div>
            </div>
          </div>
        </div>

        {transaction.notes && (
          <div className="mt-6 pt-6 border-t">
            <div className="text-sm text-gray-500 mb-1">Notes</div>
            <div>{transaction.notes}</div>
          </div>
        )}
      </div>
    </div>
  )
}
