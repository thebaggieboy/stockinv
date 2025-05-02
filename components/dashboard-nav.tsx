"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, LineChart, Menu, Wallet, X} from "lucide-react"
import { cn } from "@/lib/utils"

export function DashboardNav() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Investment Plans",
      href: "/dashboard/investment-plans",
      icon: LineChart,
    },
    {
      name: "Active Investments",
      href: "/dashboard/active-investments",
      icon: BarChart3,
    },
    {
      name: "AI Strategies",
      href: "/dashboard/strategies",
      icon: Wallet,
    },

    {
      name: "Wallet",
      href: "/dashboard/wallet",
      icon: Wallet,
    },

    
    {
      name: "Transactions",
      href: "/dashboard/transactions",
      icon: Wallet,
      
    },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium flex items-center gap-1 transition-colors ${
                isActive ? "text-[hsl(var(--primary))]" : "hover:text-[hsl(var(--primary))]"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center p-2 -mr-2 text-[hsl(var(--foreground))]"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Mobile Menu Dropdown */}
        <div
          className={cn(
            "absolute top-full left-0 right-0 bg-[hsl(var(--background))] border-b border-[hsl(var(--border))] shadow-lg z-50 transition-all duration-200 ease-in-out",
            isMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none",
          )}
        >
          <div className="container py-4 px-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm font-medium flex items-center gap-2 p-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-[hsl(var(--accent))] text-[hsl(var(--primary))]"
                        : "hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--primary))]"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
