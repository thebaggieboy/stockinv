"use client"

import { useState } from "react"
import { Check, ChevronRight, CreditCard, DollarSign, X } from "lucide-react"
import {useRouter} from "next/navigation"
interface InvestmentFlowProps {
  plan: {
    id: string
    name: string
    minimum: number
    cumulativeROI: number
    cumulativeAmount: number
    duration: number
  }
  onClose: () => void
}
import { WalletReceive } from "./wallet-receive"
export default function InvestmentFlow({ plan, onClose }: InvestmentFlowProps) {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("crypto")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const router = useRouter()
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }

    if (step === 3) {
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        handleNext()

      }, 2000)
    }
  }

  const completeInvestment = () =>{
    router.push("/dashboard/active-investments")  
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const calculateReturn = () => {
    return amount * (plan.cumulativeROI / 100)
  }

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
                  value={amount}
                  min={plan.minimum}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-md py-2 pl-8 pr-3 text-white"
                 
                />
              </div>

              <div className="bg-[#172136] p-3 rounded-md">
                <div className="flex justify-between text-sm mb-2">
                  <span>Expected return:</span>
                  <span>${calculateReturn().toLocaleString()}</span>
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
              onClick={completeInvestment}
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
