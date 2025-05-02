"use client"
import { Plus } from "lucide-react"
import Link from "next/link"
import InvestmentPlanCard from "@/components/investment-plan-card"
import InvestmentPlanComparison from "@/components/investment-plan-comparison"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { USER_TYPES, selectUser, selectUserType, setUser, setUserType } from "../../../features/user/userSlice";
import { selectUserEmail,  setUserEmail } from "../../../features/user/userActiveEmail";
import {selectToken, setToken} from "../../../features/token/tokenSlice";
import { useSelector } from "react-redux"
import { WalletDeposit } from "@/components/wallet-deposit"
import { WalletReceive } from "@/components/wallet-receive"
import { WalletSend } from "@/components/wallet-send"
import { DashboardNav } from "@/components/dashboard-nav"
export default function InvestmentPlans() {
  const plans = [
    {
      id: "quick-gain",
      name: "Quick Gain Plan",
      minimum: "100 - 1,000",
      dailyInterest: 200,
      dailyInterestPercentage: 20,
      cumulativeROI: 86.6,
      cumulativeAmount: 5000,
      duration: 2,
      finalAmount: 5000,
    },
    {
      id: "rapid-growth",
      name: "Rapid Growth Plan",
      minimum: "1000 - 10,000",
      dailyInterest: 1785.71,
      dailyInterestPercentage: 25,
      cumulativeROI: 108.25,
      cumulativeAmount: 25000,
      duration: 2,
      finalAmount: 25000,
    },
    {
      id: "aggressive-boost",
      name: "Aggressive Boost Plan",
      minimum: "10,000 - 20,000",
      dailyInterest: 3571.43,
      dailyInterestPercentage: 25,
      cumulativeROI: 108.25,
      cumulativeAmount: 40000,
      duration: 2,
      finalAmount: 40000,
    },
    {
      id: "accelerated-wealth",
      name: "Accelerated Wealth Plan",
      minimum: "20,000 - 50,000",
      dailyInterest: 5357.14,
      dailyInterestPercentage: 30,
      cumulativeROI: 129.29,
      cumulativeAmount: 65000,
      duration: 2,
      finalAmount: 65000,
    },
    {
      id: "ultimate-prosperity",
      name: "Ultimate Prosperity Plan",
      minimum: "50,000 - 100,000",
      dailyInterest: 7142.86,
      dailyInterestPercentage: 30,
      cumulativeROI: 300,
      cumulativeAmount: 80000,
      duration: 2,
      finalAmount: 80000,
    },
  ]
  const router = useRouter()
  const user_ = useSelector(selectUser)
  const [withdrawMethod, setWithdrawMethod] = useState("crypto")
  const [wallets, setWallets] = useState([]);
  const [btcBalance, setBtcBalance] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isDeposit, setIsDeposit] = useState(false)
 
  const [isWithdrawSuccess, setIsWithdrawSuccess] = useState(false)
   const [transactions, setTransactions] = useState([])
   const usdAmount = wallets.balance;
     // Format date function
 
  
  return (
    <>
   
     <div className="min-h-screen bg-[#020617] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-1">Investment Plans</h1>
        <p className="text-sm text-gray-400 mb-8">
          Choose from our high-yield investment plans to maximize your returns.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {plans.slice(0, 3).map((plan) => (
            <InvestmentPlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {plans.slice(3, 5).map((plan) => (
            <InvestmentPlanCard key={plan.id} plan={plan} />
          ))}

          <div className="bg-[#0a1022] rounded-lg p-6 flex flex-col items-center justify-center text-center border border-gray-800">
            <div className="bg-gray-700 rounded-full p-2 mb-4">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Custom Plan</h3>
            <p className="text-sm text-gray-400 mb-4">
              Need a tailored investment strategy? Contact our team for a custom plan.
            </p>
            <Link
              href="/contact"
              className="bg-transparent border border-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <InvestmentPlanComparison plans={plans} />
      </div>
    </div>
    </> 
   
  )
}
