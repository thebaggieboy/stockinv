import Link from "next/link"
import { ArrowRight, TrendingUp } from "lucide-react"

interface ActiveInvestmentCardProps {
  investment: {
    id: string
    planName: string
    investedAmount: number
    currentValue: number
    returnPercentage: number
    startDate: string
    endDate: string
    weeklyInterest: number
    progress: number
  }
}

export default function ActiveInvestmentCard({ investment }: ActiveInvestmentCardProps) {
  const profit = investment.currentValue - investment.investedAmount
    // Get current date in JavaScript
    const currentDate = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
  const prettyDate = formatter.format(currentDate);
  const formattedEndDate = investment.endDate === "0000-00-00" ? prettyDate : investment.endDate;
  const formattedStartDate = investment.startDate === "0000-00-00" ? prettyDate : investment.startDate;
  const formattedInvestmentDate = investment.investment_date === "0000-00-00" ? prettyDate : investment.investment_date;  


  return (
    <div className="bg-[#0a1022] rounded-lg p-6 flex flex-col border border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-blue-500 rounded-full p-2">
          <TrendingUp className="h-4 w-4 text-white" />
        </div>
        <div className="text-sm text-gray-400">
          {formattedStartDate} - {formattedEndDate}
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">{investment.investment_plan}</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-400">Invested:</div>
          <div className="text-sm">${investment.amount}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">Current Value:</div>
          <div className="text-sm">${investment.currentValue}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">Weekly Interest:</div>
          <div className="text-sm">+{investment.weekly_roi}%</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">Return:</div>
          <div className="text-sm text-green-500">+{investment.monthly_roi}%</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span>Progress</span>
          <span>{investment.progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${investment.progress}%` }}></div>
        </div>
      </div>

      <Link
        href={`/active-investments/${investment.id}`}
        className="mt-auto flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors py-2"
      >
        <span>View Details</span>
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  )
}
