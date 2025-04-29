import Link from "next/link"
import { ArrowLeft, Calendar, DollarSign, TrendingUp } from "lucide-react"

interface InvestmentDetailPageProps {
  params: {
    id: string
  }
}

export default function InvestmentDetailPage({ params }: InvestmentDetailPageProps) {
  // In a real app, you would fetch this data based on the ID
  const investment = {
    id: params.id,
    planName:
      params.id === "inv-1" ? "Quick Gain Plan" : params.id === "inv-2" ? "Rapid Growth Plan" : "Aggressive Boost Plan",
    investedAmount: params.id === "inv-1" ? 1000 : params.id === "inv-2" ? 5000 : 10000,
    currentValue: params.id === "inv-1" ? 1250 : params.id === "inv-2" ? 7500 : 12000,
    returnPercentage: params.id === "inv-1" ? 25 : params.id === "inv-2" ? 50 : 20,
    startDate: params.id === "inv-1" ? "2025-04-15" : params.id === "inv-2" ? "2025-04-10" : "2025-04-20",
    endDate: params.id === "inv-1" ? "2025-04-29" : params.id === "inv-2" ? "2025-04-24" : "2025-05-04",
    dailyInterest: params.id === "inv-1" ? 35.71 : params.id === "inv-2" ? 178.57 : 357.14,
    progress: params.id === "inv-1" ? 50 : params.id === "inv-2" ? 75 : 25,
    transactions: [
      {
        date: "2025-04-22",
        type: "Interest",
        amount: params.id === "inv-1" ? 35.71 : params.id === "inv-2" ? 178.57 : 357.14,
      },
      {
        date: "2025-04-21",
        type: "Interest",
        amount: params.id === "inv-1" ? 35.71 : params.id === "inv-2" ? 178.57 : 357.14,
      },
      {
        date: "2025-04-20",
        type: "Interest",
        amount: params.id === "inv-1" ? 35.71 : params.id === "inv-2" ? 178.57 : 357.14,
      },
      {
        date: params.id === "inv-1" ? "2025-04-15" : params.id === "inv-2" ? "2025-04-10" : "2025-04-20",
        type: "Investment",
        amount: params.id === "inv-1" ? 1000 : params.id === "inv-2" ? 5000 : 10000,
      },
    ],
  }

  const profit = investment.currentValue - investment.investedAmount
  const formattedStartDate = new Date(investment.startDate).toLocaleDateString()
  const formattedEndDate = new Date(investment.endDate).toLocaleDateString()
  const daysLeft = Math.ceil((new Date(investment.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/dashboard/active-investments"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          <span>Back to Active Investments</span>
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">{investment.planName}</h1>
            <p className="text-sm text-gray-400">Investment ID: {investment.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0a1022] rounded-lg p-6 border border-gray-800">
            <h2 className="text-lg font-semibold mb-4">Investment Overview</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Invested Amount:</span>
                <span>${investment.investedAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Current Value:</span>
                <span>${investment.currentValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Profit:</span>
                <span className="text-green-500">+${profit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Return:</span>
                <span className="text-green-500">+{investment.returnPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Daily Interest:</span>
                <span>${investment.dailyInterest.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0a1022] rounded-lg p-6 border border-gray-800">
            <h2 className="text-lg font-semibold mb-4">Timeline</h2>

            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <div className="text-sm">Start Date</div>
                  <div className="text-gray-400">{formattedStartDate}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <div className="text-sm">End Date</div>
                  <div className="text-gray-400">{formattedEndDate}</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{investment.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${investment.progress}%` }}></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">{daysLeft} days remaining</div>
              </div>
            </div>
          </div>

          <div className="bg-[#0a1022] rounded-lg p-6 border border-gray-800">
            <h2 className="text-lg font-semibold mb-4">Projected Returns</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Return:</span>
                <span>${(investment.investedAmount * (1 + investment.returnPercentage / 100)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Profit:</span>
                <span className="text-green-500">
                  +${((investment.investedAmount * investment.returnPercentage) / 100).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ROI:</span>
                <span className="text-green-500">+{investment.returnPercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0a1022] rounded-lg p-6 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Transaction History</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {investment.transactions.map((transaction, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="py-3">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="py-3">
                      <div className="flex items-center">
                        {transaction.type === "Interest" ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <DollarSign className="h-4 w-4 text-blue-500 mr-2" />
                        )}
                        {transaction.type}
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={transaction.type === "Interest" ? "text-green-500" : ""}>
                        {transaction.type === "Interest" ? "+" : ""}${transaction.amount.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
