import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ActiveInvestmentCard from "@/components/active-investment-card"
import InvestmentSummary from "@/components/investment-summary"

export default function ActiveInvestmentsPage() {
  // Sample active investments data
  const activeInvestments = [
    {
      id: "inv-1",
      planName: "Quick Gain Plan",
      investedAmount: 1000,
      currentValue: 1250,
      returnPercentage: 25,
      startDate: "2025-04-15",
      endDate: "2025-04-29",
      dailyInterest: 35.71,
      progress: 50,
    },
    {
      id: "inv-2",
      planName: "Rapid Growth Plan",
      investedAmount: 5000,
      currentValue: 7500,
      returnPercentage: 50,
      startDate: "2025-04-10",
      endDate: "2025-04-24",
      dailyInterest: 178.57,
      progress: 75,
    },
    {
      id: "inv-3",
      planName: "Aggressive Boost Plan",
      investedAmount: 10000,
      currentValue: 12000,
      returnPercentage: 20,
      startDate: "2025-04-20",
      endDate: "2025-05-04",
      dailyInterest: 357.14,
      progress: 25,
    },
  ]

  // Calculate total investment stats
  const totalInvested = activeInvestments.reduce((sum, inv) => sum + inv.investedAmount, 0)
  const totalCurrent = activeInvestments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalProfit = totalCurrent - totalInvested
  const averageReturn = (totalProfit / totalInvested) * 100

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Active Investments</h1>
            <p className="text-sm text-gray-400">Track and manage your current investment portfolio.</p>
          </div>
          <Link
            href="/dashboard/investment-plans"
            className="mt-4 md:mt-0 flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>View Investment Plans</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <InvestmentSummary
          totalInvested={totalInvested}
          totalCurrent={totalCurrent}
          totalProfit={totalProfit}
          averageReturn={averageReturn}
          activeInvestments={activeInvestments.length}
        />

        <h2 className="text-xl font-semibold mt-8 mb-4">Your Active Investments</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeInvestments.map((investment) => (
            <ActiveInvestmentCard key={investment.id} investment={investment} />
          ))}
        </div>
      </div>
    </div>
  )
}
