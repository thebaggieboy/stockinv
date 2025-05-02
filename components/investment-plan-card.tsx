"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"
import InvestmentFlow from "./investment-flow"

interface InvestmentPlanCardProps {
  plan: {
    id: string
    name: string
    minimum: number
    dailyInterest: number
    dailyInterestPercentage: number
    cumulativeROI: number
    cumulativeAmount: number
    duration: number
  }
}


export default function InvestmentPlanCard({ plan }: InvestmentPlanCardProps) {
  const [showFlow, setShowFlow] = useState(false)

  return (
    <>
      <div className="bg-[#0a1022] rounded-lg p-6 flex flex-col border border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <div className="bg-green-500 rounded-full p-2">
            <ArrowRight className="h-4 w-4 text-white" />
          </div>
          <div className="text-sm text-gray-400">{plan.duration} Weeks</div>
        </div>

        <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
        <div className="text-3xl font-bold mb-1">${plan.minimum.toLocaleString()}</div>
        <div className="text-xs text-gray-400 mb-4">Minimum Investment</div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <div className="text-xs text-gray-400">Weekly Interest:</div>
            <div className="text-sm">
              {plan.dailyInterestPercentage}% monthly
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Cumulative ROI:</div>
            <div className="text-sm">
              {plan.cumulativeROI}% 
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowFlow(true)}
          className="mt-auto bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Invest Now
        </button>
      </div>

      {showFlow && <InvestmentFlow plan={plan} onClose={() => setShowFlow(false)} />}
    </>
  )
}
