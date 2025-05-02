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
 
    // Get current date in JavaScript
    const currentDate = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
  const prettyDate = formatter.format(currentDate);
  const formattedStartDate =  formatter.format(investment.startDate);
  const formattedEndDate =  formatter.format(investment.endDate);


  let dailyInterest;
  let weeklyInterest;
  let currentValue;
  let profit

  let totalCurrent;

  if(investment.investment_plan === "quick-gain"){
    dailyInterest = 0.02107 * investment.amount
    weeklyInterest = 0.2 * investment.amount
    currentValue = dailyInterest + investment.amount
    
 
  }
  if(investment.investment_plan === "rapid-growth"){
    dailyInterest = 0.0251 * investment.amount
    weeklyInterest = 0.25 * investment.amount
    currentValue = dailyInterest + investment.amount

  }
  if(investment.investment_plan === "aggressive-boost"){
    dailyInterest = 0.0251 * investment.amount
    weeklyInterest = 0.25 * investment.amount
    currentValue = dailyInterest + investment.amount
  }
   
  if(investment.investment_plan === "accelerated-wealth"){
    dailyInterest = 0.0287 * investment.amount
    weeklyInterest = 0.3 * investment.amount
    currentValue = dailyInterest + investment.amount
  }
  if(investment.investment_plan === "ultimate-prosperity"){  
    dailyInterest = 0.0287 * investment.amount
    weeklyInterest = 0.3 * investment.amount
    currentValue = dailyInterest + investment.amount
  }
  const totalProfit = currentValue - investment.amount
  const averageReturn = (totalProfit / investment.amount) * 100
 
  console.log("Is array?", Array.isArray(investment));
  
console.log("Investment: ", investment)
  
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
          <div className="text-sm">${currentValue}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">Daily Interest:</div>
          <div className="text-sm">${dailyInterest.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">Weekly Interest:</div>
          <div className="text-sm">${weeklyInterest}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400">Montly Interest:</div>
          <div className="text-sm text-green-500">+{investment.monthly_roi}%</div>
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
