"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CreditCard, Home, LineChart, Wallet } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()

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
      name: "Portfolio",
      href: "/dashboard/portfolio",
      icon: BarChart3,
    },
    {
      name: "Wallet",
      href: "/dashboard/wallet",
      icon: Wallet,
    },
  
  ]

  return (
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
  )
}
