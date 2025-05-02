"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDownLeft, ArrowUpRight, Check, Clock, X } from "lucide-react"

type TransactionStatus = "completed" | "pending" | "failed"
type TransactionType = "withdrawal" | "deposit" | "transfer"
type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left"

interface TransactionPopupProps {
  show: boolean
  onClose: () => void
  amount: number
  type: TransactionType
  status?: TransactionStatus
  currency?: string
  autoCloseDelay?: number
  description?: string
  position?: Position
}

export function TransactionPopup({
  show,
  onClose,
  amount,
  type,
  status = "completed",
  currency = "USD",
  autoCloseDelay = 5000,
  description,
  position = "top-right",
}: TransactionPopupProps) {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    setIsVisible(show)

    let timer: NodeJS.Timeout
    if (show && autoCloseDelay > 0) {
      timer = setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, autoCloseDelay)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [show, autoCloseDelay, onClose])

  const handleClose = () => {
    setIsVisible(false)
    onClose()
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(value)
  }

  const getIcon = () => {
    switch (type) {
      case "withdrawal":
        return <ArrowDownLeft className="h-5 w-5 text-red-500" />
      case "deposit":
        return <ArrowUpRight className="h-5 w-5 text-green-500" />
      case "transfer":
        return <ArrowUpRight className="h-5 w-5 text-blue-500" />
      default:
        return <ArrowDownLeft className="h-5 w-5 text-red-500" />
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "failed":
        return <X className="h-4 w-4 text-red-500" />
      default:
        return <Check className="h-4 w-4 text-green-500" />
    }
  }

  const getTitle = () => {
    switch (type) {
      case "withdrawal":
        return "Withdrawal"
      case "deposit":
        return "Deposit"
      case "transfer":
        return "Transfer"
      default:
        return "Transaction"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "completed":
        return "Completed"
      case "pending":
        return "Pending"
      case "failed":
        return "Failed"
      default:
        return "Completed"
    }
  }

  const getPositionClasses = () => {
    switch (position) {
      case "top-right":
        return "top-4 right-4"
      case "top-left":
        return "top-4 left-4"
      case "bottom-right":
        return "bottom-4 right-4"
      case "bottom-left":
        return "bottom-4 left-4"
      default:
        return "top-4 right-4"
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: position.startsWith("top") ? -20 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position.startsWith("top") ? -20 : 20 }}
          transition={{ duration: 0.2 }}
          className="max-w-sm w-full shadow-lg rounded-lg overflow-hidden"
        >
          <div className="bg-card border p-4 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 bg-muted rounded-full p-2">{getIcon()}</div>
                <div>
                  <h3 className="font-medium text-foreground">{getTitle()}</h3>
                  <p className="text-2xl font-semibold text-foreground">
                    {type === "withdrawal" ? "-" : "+"}
                    {formatCurrency(amount)}
                  </p>
                  {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    {getStatusIcon()}
                    <span className="ml-1">{getStatusText()}</span>
                    <span className="mx-1">•</span>
                    <span>{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close notification"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
