"use client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ActiveInvestmentCard from "@/components/active-investment-card"
import InvestmentSummary from "@/components/investment-summary"
import { WalletDeposit } from "@/components/wallet-deposit"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { USER_TYPES, selectUser, selectUserType, setUser, setUserType } from "../../../features/user/userSlice";
import { selectUserEmail,  setUserEmail } from "../../../features/user/userActiveEmail";
import {selectToken, setToken} from "../../../features/token/tokenSlice";
import { useSelector, useDispatch } from "react-redux"
import { WalletWithdraw } from "@/components/wallet-withdraw"
import { WalletReceive } from "@/components/wallet-receive"
import { WalletSend } from "@/components/wallet-send"
import { selectBalance, setBalance } from "@/features/balance/balanceSlice"


export default function ActiveInvestmentsPage() {
  const router = useRouter()
   const dispatch = useDispatch()
   const balance = useSelector(selectBalance)
   const [transactions, setTransactions] = useState([]);
   const [activeInvestments, setActiveInvestments] = useState([]);
    const user = useSelector(selectUser);
 

  useEffect(() => {
   
    // Call the function
    async function fetchActiveInvestments(){
      const res =  await fetch(`https://avantrades-api.onrender.com/api/investment-plans/`, {
        method: "GET",
        headers: {
        
            "Content-Type": "application/json"
        },
    })
    
    const data = await res.json()
    if (res.status >= 200 & res.status <= 209) {
      setActiveInvestments(data)
   
     
    }
    
    }
    fetchActiveInvestments()
 



  }, [])
  
console.log("Active Investments BAL: ", balance)
  // Calculate total investment stats
  
  const totalInvested = activeInvestments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalCurrent = activeInvestments.reduce((sum, inv) => sum + inv.current_value, 0)
  const totalProfit = totalCurrent - totalInvested
  const averageReturn = (totalProfit / totalInvested) * 100
  console.log("Average Return: ", averageReturn)

  console.log("Total Invested: ", totalInvested)

 
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
