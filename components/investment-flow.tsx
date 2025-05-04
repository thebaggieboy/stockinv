"use client"

import { useState, useEffect } from "react"
import { Check, ChevronRight, CreditCard, DollarSign, X } from "lucide-react"
import {useRouter} from "next/navigation"
import { USER_TYPES, selectUser, selectUserType, setUser, setUserType } from "../features/user/userSlice";
import { selectUserEmail,  setUserEmail } from "../features/user/userActiveEmail";
import {selectToken, setToken} from "../features/token/tokenSlice";
import { useSelector } from "react-redux"
import { WalletDeposit } from "@/components/wallet-deposit"
import { WalletWithdraw } from "@/components/wallet-withdraw"
import { WalletSend } from "@/components/wallet-send"
interface InvestmentFlowProps {
  plan: {
    id: string
    name: string
    minimum: number
    weeklyInterest: number
    weeklyInterestPercentage: number
    cumulativeROI: number
    cumulativeAmount: number
    duration: number
  }
  onClose: () => void
}
import { WalletReceive } from "./wallet-receive"

/**
 * Generates a random transaction ID with customizable options
 * @param {Object} options - Configuration options
 * @param {number} options.length - Length of the ID (default: 16)
 * @param {boolean} options.includeTimestamp - Whether to include timestamp prefix (default: true)
 * @param {string} options.prefix - Optional prefix for the ID (default: 'TXN')
 * @param {boolean} options.uppercaseOnly - Whether to use only uppercase characters (default: false)
 * @returns {string} - The generated transaction ID
 */
export function generateTransactionId({
  length = 16,
  includeTimestamp = true,
  prefix = 'TXN',
  uppercaseOnly = false
} = {}) {
  // Characters to use for random part
  const characters = uppercaseOnly
    ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  // Generate random string
  let randomPart = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomPart += characters.charAt(randomIndex);
  }
  
  // Add timestamp if requested
  const timestamp = includeTimestamp ? new Date().getTime().toString() : '';
  
  // Combine components
  return `${prefix}${timestamp ? '-' + timestamp : ''}-${randomPart}`;
}

// Example usage
// const transactionId = generateTransactionId();
// const customTransactionId = generateTransactionId({ 
//   length: 12, 
//   includeTimestamp: true, 
//   prefix: 'PAYMENT', 
//   uppercaseOnly: true 
// });

export default function InvestmentFlow({ plan, onClose }: InvestmentFlowProps) {
  const user = useSelector(selectUser)
  const userEmail = useSelector(selectUserEmail)
  const [wallets, setWallets] = useState([])
  const [btcBalance, setBtcBalance] = useState([])
  const [usdAmount, setUsdAmount] = useState(0)
  const [step, setStep] = useState(1)
  const [amounts, setAmounts] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("crypto")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isDeposit, setIsDeposit] = useState(false)
  const [isWithdraw, setIsWithdraw] = useState(false)
  const [isTransaction, setIsTransaction] = useState(false)
  const [isDepositSuccess, setIsDepositSuccess] = useState(false)
  const [isWithdrawSuccess, setIsWithdrawSuccess] = useState(false)
  const [totalReturn, setTotalReturn] = useState(0)
   const [transactions, setTransactions] = useState([])
  const router = useRouter()
  const transactionId = generateTransactionId();

  // Get current date in JavaScript
  const currentDate = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const prettyDate = formatter.format(currentDate);
  
  const calculateFutureDates = () => {
    // Get current date
    const currentDate = new Date();
    
    // Calculate date two weeks from now
    const twoWeeksFromNow = new Date(currentDate);
    twoWeeksFromNow.setDate(currentDate.getDate() + 14);
    
    // Calculate date one month from now
    const oneMonthFromNow = new Date(currentDate);
    oneMonthFromNow.setMonth(currentDate.getMonth() + 1);
    
    // Store both dates in variables
    const futureDates = {
      twoWeeks: twoWeeksFromNow,
      oneMonth: oneMonthFromNow
    };
    
    return futureDates;
  };
  
  // Example usage
  const { twoWeeks, oneMonth } = calculateFutureDates();
  console.log('Two weeks from now:', twoWeeks.toDateString());
  console.log('One month from now:', oneMonth.toDateString());

      const [formData, setFormData] = useState({
            email: user[0]?.email,  
            amount: amounts,
            type: "investments",
            status: "Pending",	
            investment_plan:plan.id,
            investment_duration:plan.duration,
            investment_date:currentDate,
            weekly_roi:plan.weeklyInterestPercentage,
            monthly_roi:plan.cumulativeROI,
            weekly_roi_date:twoWeeks,
            monthly_roi_date:oneMonth,
          })
          // Handle form submission
    const { email, amount, type, status, investment_plan, investment_date,  investment_duration, weekly_roi, monthly_roi, weekly_roi_date, monthly_roi_date } = formData
    
  
    const inputChangeHandler = (e) => {
      const { name, value } = e.target
     
      setFormData((prevValue) => {
        setAmounts(e.target.value)
        return {
          ...prevValue,
          [name]: value
        }
        
      })
  
    } 

   const createNewTransaction = async() => { 
    try {
      const res = await fetch("https://avantrades-api.onrender.com/api/transactions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, amount, type, status, transaction_date: prettyDate, transaction_id: transactionId }),
        credentials: "include"
      })
      
      const data = await res.json()
      console.log("Response data:", data) 
      
      if (res.status >= 200 && res.status <= 209) {
        console.log("Investment plan added to transactions.")
    
        setTransactions(data)       
    
                      
      } 
      else {
        const error = { ...data }
        throw error
      }
    } catch (error) {
      console.error("Transaction failed:", error)
      // Handle error state here
    }
   }

    const createNewInvestment = async() => {
      setTimeout(() => {
        console.log("Creating a new transaction...")
        createNewTransaction()

      }, 2000)
    
   
      try {
        const res = await fetch("https://avantrades-api.onrender.com/api/investment-plans/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, amount, type, status, investment_plan, investment_duration,  investment_date, weekly_roi, monthly_roi, weekly_roi_date, monthly_roi_date }),
          credentials: "include"
        })
        
        const data = await res.json()
        console.log("Response data:", data) 
        
        if (res.status >= 200 && res.status <= 209) {
          console.log("New Investment Plan Registered.")
        
          setStep(step + 1)
          setIsProcessing(false)
          setIsComplete(true)
                        
        } 
        else {
          const error = { ...data }
          throw error
        }
      } catch (error) {
        console.error("Investment failed:", error)
        // Handle error state here
      }
    }
    const handleNext = async() => {
  
      if (step < 4) {
        setStep(step + 1)
      }
  
      if (step === 3) {
        setIsProcessing(true)
          setTimeout(() => {
          setIsProcessing(false)
          
          console.log("Form submitted:", formData)
          
          createNewInvestment()
      
          //completeInvestment()
  
        }, 2000)
      }
    }
              
   
  
    useEffect(() => {
     // Call the function
      
       async function fetchTransaction(){
         const res =  await fetch(`https://avantrades-api.onrender.com/api/transactions/`, {
           method: "GET",
           headers: {
           
               "Content-Type": "application/json"
           },
       })
       
       const data = await res.json()
       if (res.status >= 200 & res.status <= 209) {
         
         console.log("Transactions [STATE]: ", data);
       }
       
       }
       fetchTransaction()
      
     }, [])
     // console.log("Wallets [STATE]: ", wallets);
     // Function to get all transactions for the current user
    const getCurrentUserTransactions = () => {
     if (!transactions || !transactions.length) return [];
     
     return transactions.filter(transaction => 
       transaction.email === user[0]?.email
     );
    };
    
    
    
  const completeInvestment = async() =>{
    router.push("/dashboard/active-investments")  
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const calculateReturn = () => {
    const expected_return = amount * (plan.cumulativeROI / 100)
   
   
    return expected_return
  }
  
  const calculateTotalReturn = () => {
    const expected_return = Number(amount) * (Number(plan.cumulativeROI) / 100)
    const total_return = Number(amount) + expected_return
    
    return total_return
  }

  console.log("Form Data: ", formData)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a1022] rounded-lg max-w-md w-full border border-gray-800">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h3 className="font-semibold">Invest in {plan.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          {/* Progress indicator */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step > i ? "bg-green-500" : step === i ? "bg-blue-500" : "bg-gray-700"
                  }`}
                >
                  {step > i ? (
                    <Check className="h-4 w-4 text-white" />
                  ) : (
                    <span className="text-white text-sm">{i}</span>
                  )}
                </div>
                <div className="text-xs mt-1 text-gray-400">
                  {i === 1 ? "Amount" : i === 2 ? "Payment" : i === 3 ? "Review" : "Complete"}
                </div>
              </div>
            ))}
          </div>

          {/* Step 1: Investment Amount */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-medium">Investment Amount</h4>
              <p className="text-sm text-gray-400">
                Enter the amount you wish to invest. Minimum investment is ${plan.minimum.toLocaleString()}.
              </p>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={amount}
                  min={plan.minimum}
                  onChange={inputChangeHandler}
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-md py-2 pl-8 pr-3 text-white"
                 
                />
              </div>

              <div className="bg-[#172136] p-3 rounded-md">
                <div className="flex justify-between text-sm mb-2">
                  <span>Profit:</span>
                  <span>${calculateReturn().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Expected Return:</span>
                  <span>${calculateTotalReturn()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Duration:</span>
                  <span>{plan.duration} weeks</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-medium">Payment Method</h4>
              <p className="text-sm text-gray-400">Select your preferred payment method.</p>

              <div className="space-y-2">
                <div
                  className={`p-3 border rounded-md flex items-center cursor-pointer ${
                    paymentMethod === "crypto" ? "border-blue-500 bg-[#172136]" : "border-gray-700"
                  }`}
                  onClick={() => setPaymentMethod("crypto")}
                >
                  <div className="bg-orange-500 rounded-full p-2 mr-3">
                    <DollarSign className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Cryptocurrency</div>
                    <div className ="text-xs text-gray-400">Pay with Bitcoin, Ethereum, or USDT</div>
                  </div>
                </div>

                <div
                  className={`p-3 border rounded-md flex items-center cursor-pointer ${
                    paymentMethod === "card" ? "border-blue-500 bg-[#172136]" : "border-gray-700"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className="bg-blue-500 rounded-full p-2 mr-3">
                    <CreditCard className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-xs text-gray-400">Pay with Visa, Mastercard, or other cards</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="font-medium"></h4>
            
              <WalletReceive/>
              <div className="text-xs text-gray-400">
                By clicking Confirm, you agree to our Terms of Service and Privacy Policy.
              </div>
            </div>
          )}

          {/* Step 4: Complete */}
          {step === 4 && (
            <div className="space-y-4 text-center">
              {isProcessing ? (
                <div className="py-8 flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                  <h4 className="font-medium">Processing Your Investment</h4>
                  <p className="text-sm text-gray-400">Please wait while we process your investment...</p>
                </div>
              ) : isComplete ? (
                <div className="py-8 flex flex-col items-center">
                  <div className="bg-green-500 rounded-full p-4 mb-4">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-medium text-xl">Investment Successful!</h4>
                  <p className="text-sm text-gray-400 mt-2 mb-4">
                    Your investment of ${amount.toLocaleString()} in {plan.name} has been successfully processed.
                  </p>
                  <div className="bg-[#172136] p-4 rounded-md w-full text-left space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Transaction ID:</span>
                      <span className="text-xs">BV{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Start Date:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">End Date:</span>
                      <span>{new Date(Date.now() + plan.duration * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-800 flex justify-between">
          {step > 1 && step < 4 ? (
            <button onClick={handleBack} className="px-4 py-2 text-sm text-gray-300 hover:text-white">
              Back
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm flex items-center hover:bg-blue-600"
            >
              {step === 3 ? "Confirm Investment" : "Continue"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          ) : isComplete ? (
            <button
              onClick={onClose}
              className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600"
            >
              View Dashboard
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
