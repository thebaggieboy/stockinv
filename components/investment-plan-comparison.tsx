interface InvestmentPlanComparisonProps {
  plans: {
    id: string
    name: string
    minimum: number
    dailyInterest: number
    cumulativeROI: number
    duration: number
    finalAmount: number
  }[]
}

export default function InvestmentPlanComparison({ plans }: InvestmentPlanComparisonProps) {
  return (
    <div className="bg-[#0a1022] rounded-lg p-6 border border-gray-800">
      <h2 className="text-xl font-bold mb-1">Investment Plan Comparison</h2>
      <p className="text-sm text-gray-400 mb-4">
        Compare our investment plans to find the best option for your financial goals.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-800">
              <th className="pb-2">Plan</th>
              <th className="pb-2">Minimum</th>
              <th className="pb-2">Duration</th>
              <th className="pb-2">Weekly Interest</th>
              <th className="pb-2">Total ROI</th>
              <th className="pb-2">Final Amount</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.id} className="border-b border-gray-800">
                <td className="py-3">{plan.name.replace(" Plan", "")}</td>
                <td className="py-3">${plan.minimum.toLocaleString()}</td>
                <td className="py-3">{plan.duration} Weeks</td>
                <td className="py-3">${plan.dailyInterest.toFixed(2)}</td>
                <td className="py-3">{plan.cumulativeROI}%</td>
                <td className="py-3">${plan.finalAmount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
