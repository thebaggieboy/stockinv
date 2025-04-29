import { DollarSign, TrendingUp, Percent, BarChart } from "lucide-react"

interface InvestmentSummaryProps {
  totalInvested: number
  totalCurrent: number
  totalProfit: number
  averageReturn: number
  activeInvestments: number
}

export default function InvestmentSummary({
  totalInvested,
  totalCurrent,
  totalProfit,
  averageReturn,
  activeInvestments,
}: InvestmentSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-[#0a1022] rounded-lg p-4 border border-gray-800">
        <div className="flex items-center mb-2">
          <div className="bg-green-500 rounded-full p-2 mr-2">
            <DollarSign className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm text-gray-400">Total Invested</span>
        </div>
        <div className="text-2xl font-bold">${totalInvested.toLocaleString()}</div>
      </div>

      <div className="bg-[#0a1022] rounded-lg p-4 border border-gray-800">
        <div className="flex items-center mb-2">
          <div className="bg-blue-500 rounded-full p-2 mr-2">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm text-gray-400">Current Value</span>
        </div>
        <div className="text-2xl font-bold">${totalCurrent.toLocaleString()}</div>
      </div>

      <div className="bg-[#0a1022] rounded-lg p-4 border border-gray-800">
        <div className="flex items-center mb-2">
          <div className="bg-purple-500 rounded-full p-2 mr-2">
            <Percent className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm text-gray-400">Average Return</span>
        </div>
        <div className="text-2xl font-bold text-green-500">+{averageReturn.toFixed(2)}%</div>
      </div>

      <div className="bg-[#0a1022] rounded-lg p-4 border border-gray-800">
        <div className="flex items-center mb-2">
          <div className="bg-orange-500 rounded-full p-2 mr-2">
            <BarChart className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm text-gray-400">Active Investments</span>
        </div>
        <div className="text-2xl font-bold">{activeInvestments}</div>
      </div>
    </div>
  )
}
