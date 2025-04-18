import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  DollarSign,
  Lock,
  Percent,
  Shield,
  TrendingUp,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-[hsl(var(--primary))]" />
            <span className="text-xl font-bold">StockGrowth</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors"
            >
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-[hsl(var(--primary))] transition-colors">
              Login
            </Link>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48 border-b border-zinc-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Maximize Your Investment Returns with{" "}
                    <span className="text-[hsl(var(--primary))]">StockGrowth</span>
                  </h1>
                  <p className="max-w-[600px] text-zinc-400 md:text-xl">
                    Our platform offers advanced stock analysis, real-time ROI tracking, and secure crypto deposits to
                    help you build wealth efficiently.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">Start Investing Now</Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    <Link href="#demo" className="flex items-center">
                      Watch Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Shield className="mr-1 h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>Secure Platform</span>
                  </div>
                  <div className="flex items-center">
                    <Percent className="mr-1 h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>High ROI</span>
                  </div>
                  <div className="flex items-center">
                    <Wallet className="mr-1 h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>Crypto Deposits</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
                  <Image
                    src="/vv.jpg"
                    alt="Investment Dashboard Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 border-b border-zinc-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="inline-block rounded-lg bg-[hsl(var(--primary)_/_0.1)] px-3 py-1 text-sm text-[hsl(var(--primary))]">
                Trade Top Stocks
              </div>
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Access the World's Leading Companies</h2>
              <p className="max-w-[700px] text-zinc-400">
                Invest in popular stocks from various sectors with our easy-to-use platform
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {/* Apple */}
              <div className="flex flex-col items-center p-4 rounded-lg bg-zinc-900 border border-zinc-800 w-[100px] transition-transform hover:scale-105">
                <div className="rounded-full bg-white p-2 mb-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.0301 12.42C17.0201 10.58 18.5101 9.59 18.5701 9.56C17.6201 8.17 16.1901 7.98 15.6801 7.96C14.4201 7.82 13.2101 8.7 12.5701 8.7C11.9101 8.7 10.9201 7.97 9.87007 7.99C8.53007 8.01 7.28007 8.77 6.62007 9.98C5.25007 12.44 6.26007 16.04 7.57007 17.99C8.22007 18.95 8.98007 20.02 9.98007 19.99C10.9601 19.96 11.3201 19.37 12.5001 19.37C13.6701 19.37 14.0101 19.99 15.0301 19.97C16.0801 19.96 16.7401 19.01 17.3701 18.04C18.1101 16.94 18.4201 15.86 18.4301 15.83C18.4101 15.82 17.0401 15.28 17.0301 12.42Z"
                      fill="black"
                    />
                    <path
                      d="M15.5099 6.42C16.0499 5.75 16.4099 4.84 16.3099 3.92C15.5499 3.95 14.6099 4.45 14.0499 5.11C13.5499 5.7 13.1199 6.64 13.2299 7.52C14.0799 7.58 14.9599 7.09 15.5099 6.42Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">AAPL</span>
                <span className="text-xs text-[hsl(var(--primary))]">+1.2%</span>
              </div>

              {/* Microsoft */}
              <div className="flex flex-col items-center p-4 rounded-lg bg-zinc-900 border border-zinc-800 w-[100px] transition-transform hover:scale-105">
                <div className="rounded-full bg-white p-2 mb-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.4 3H3V11.4H11.4V3Z" fill="#F25022" />
                    <path d="M11.4 12.6H3V21H11.4V12.6Z" fill="#00A4EF" />
                    <path d="M21 3H12.6V11.4H21V3Z" fill="#7FBA00" />
                    <path d="M21 12.6H12.6V21H21V12.6Z" fill="#FFB900" />
                  </svg>
                </div>
                <span className="text-sm font-medium">MSFT</span>
                <span className="text-xs text-[hsl(var(--primary))]">+0.8%</span>
              </div>

              {/* Amazon */}
              <div className="flex flex-col items-center p-4 rounded-lg bg-zinc-900 border border-zinc-800 w-[100px] transition-transform hover:scale-105">
                <div className="rounded-full bg-white p-2 mb-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.0295 16.9168C12.8285 17.8087 10.9642 18.2547 9.39747 18.2547C7.0285 18.2547 4.93747 17.3628 3.37074 15.8421C3.19747 15.6688 3.35747 15.4261 3.56747 15.5648C5.30747 16.6034 7.45747 17.2421 9.67747 17.2421C11.1975 17.2421 12.8975 16.9168 14.4642 16.2434C14.7202 16.1394 14.9415 16.4301 14.7202 16.6728C14.5335 16.7768 14.2775 16.8461 14.0295 16.9168Z"
                      fill="#FF9900"
                    />
                    <path
                      d="M14.7202 16.1047C14.5335 15.9314 13.2635 16.0354 12.7135 16.1047C12.5269 16.1394 12.4962 15.9661 12.6829 15.8274C13.7895 15.0847 15.5295 15.2581 15.6855 15.3967C15.8415 15.5354 15.6549 17.1254 14.6175 17.9374C14.4615 18.0761 14.3055 18.0067 14.3669 17.8334C14.4922 17.4221 14.9069 16.2781 14.7202 16.1047Z"
                      fill="#FF9900"
                    />
                    <path
                      d="M13.2329 7.38007V6.66407C13.2329 6.52807 13.3582 6.42407 13.4835 6.42407H16.0435C16.1689 6.42407 16.2942 6.52807 16.2942 6.66407V7.27607C16.2942 7.41207 16.1689 7.58607 15.9822 7.86007L14.6509 9.79207C15.1702 9.76074 15.7202 9.83341 16.1995 10.0761C16.3249 10.1454 16.3555 10.2801 16.3555 10.4161V11.2281C16.3555 11.3641 16.2302 11.5374 16.0742 11.4681C15.2129 11.0567 14.1369 11.0221 13.2942 11.4681C13.1689 11.5374 13.0129 11.3641 13.0129 11.2281V10.4854C13.0129 10.3494 13.0129 10.1067 13.1689 9.89607L14.7355 7.58607H13.4835C13.3582 7.58607 13.2329 7.48207 13.2329 7.38007Z"
                      fill="black"
                    />
                    <path
                      d="M5.86747 11.5721H5.02614C4.93081 11.5721 4.83547 11.4708 4.83547 11.3694V6.68941C4.83547 6.58808 4.93081 6.48674 5.05747 6.48674H5.83614C5.93147 6.48674 6.02681 6.58808 6.02681 6.68941V7.33608H6.05814C6.27014 6.75808 6.67014 6.38008 7.22614 6.38008C7.78214 6.38008 8.11547 6.75808 8.35881 7.33608C8.57081 6.75808 9.06547 6.38008 9.58147 6.38008C9.95481 6.38008 10.3595 6.55208 10.6301 6.93008C10.9321 7.34941 10.8681 7.96474 10.8681 8.51541V11.3348C10.8681 11.4361 10.7728 11.5374 10.6775 11.5374H9.83614C9.74081 11.5374 9.64547 11.4361 9.64547 11.3348V9.09608C9.64547 8.89274 9.67681 8.41341 9.61414 8.21008C9.52081 7.89074 9.30881 7.79474 9.03414 7.79474C8.79081 7.79474 8.54747 7.95741 8.45414 8.24541C8.36081 8.53341 8.36081 9.01274 8.36081 9.09608V11.3348C8.36081 11.4361 8.26547 11.5374 8.17014 11.5374H7.32881C7.23347 11.5374 7.13814 11.4361 7.13814 11.3348V9.09608C7.13814 8.48074 7.26481 7.76008 6.49347 7.76008C5.72214 7.76008 5.75347 8.48074 5.75347 9.09608V11.3348C5.75347 11.4361 5.65814 11.5374 5.56281 11.5374L5.86747 11.5721Z"
                      fill="black"
                    />
                    <path
                      d="M19.9415 6.38007C21.2728 6.38007 22.0128 7.76007 22.0128 9.54407C22.0128 11.2594 21.2095 12.6047 19.9415 12.6047C18.6415 12.6047 17.9015 11.2247 17.9015 9.47407C17.9015 7.72407 18.6415 6.38007 19.9415 6.38007ZM19.9415 7.65607C19.1702 7.65607 19.1395 8.75607 19.1395 9.40274C19.1395 10.0494 19.1395 11.3254 19.9415 11.3254C20.7435 11.3254 20.7742 10.1907 20.7742 9.50941C20.7742 9.09007 20.7742 8.60541 20.6482 8.22074C20.5222 7.83607 20.2815 7.65607 19.9415 7.65607Z"
                      fill="black"
                    />
                    <path
                      d="M2.29547 11.5721H1.45414C1.35881 11.5721 1.26347 11.4708 1.26347 11.3694V6.68941C1.26347 6.58808 1.35881 6.48674 1.45414 6.48674H2.23081C2.32614 6.48674 2.42147 6.58808 2.42147 6.68941V7.40474H2.45281C2.66481 6.75808 3.06481 6.38008 3.62081 6.38008C4.17681 6.38008 4.51014 6.75808 4.75347 7.33608C4.96547 6.75808 5.46014 6.38008 5.97614 6.38008C6.34947 6.38008 6.75414 6.55208 7.02481 6.93008C7.32681 7.34941 7.26414 7.96474 7.26414 8.51541V11.3348C7.26414 11.4361 7.16881 11.5374 7.07347 11.5374H6.23214C6.13681 11.5374 6.04147 11.4361 6.04147 11.3348V9.09608C6.04147 8.89274 6.07281 8.41341 6.01014 8.21008C5.91681 7.89074 5.70481 7.79474 5.43014 7.79474C5.18681 7.79474 4.94347 7.95741 4.85014 8.24541C4.75681 8.53341 4.75681 9.01274 4.75681 9.09608V11.3348C4.75681 11.4361 4.66147 11.5374 4.56614 11.5374H3.72481C3.62947 11.5374 3.53414 11.4361 3.53414 11.3348V9.09608C3.53414 8.48074 3.66081 7.76008 2.88947 7.76008C2.11814 7.76008 2.14947 8.48074 2.14947 9.09608V11.3348C2.14947 11.4361 2.05414 11.5374 1.95881 11.5374L2.29547 11.5721Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">AMZN</span>
                <span className="text-xs text-[hsl(var(--primary))]">+1.5%</span>
              </div>

              {/* Tesla */}
              <div className="flex flex-col items-center p-4 rounded-lg bg-zinc-900 border border-zinc-800 w-[100px] transition-transform hover:scale-105">
                <div className="rounded-full bg-white p-2 mb-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.0002 3C7.03016 3 3.00016 7.03 3.00016 12C3.00016 16.97 7.03016 21 12.0002 21C16.9702 21 21.0002 16.97 21.0002 12C21.0002 7.03 16.9702 3 12.0002 3ZM12.0002 4.25C16.2702 4.25 19.7502 7.73 19.7502 12C19.7502 16.27 16.2702 19.75 12.0002 19.75C7.73016 19.75 4.25016 16.27 4.25016 12C4.25016 7.73 7.73016 4.25 12.0002 4.25ZM11.9902 7C10.1602 7 8.24016 7.39 6.56016 8.12C6.19016 8.29 5.99016 8.7 6.16016 9.08C6.33016 9.45 6.74016 9.65 7.12016 9.48C8.57016 8.85 10.2702 8.5 11.9902 8.5C13.7102 8.5 15.4102 8.85 16.8602 9.48C17.2402 9.65 17.6502 9.45 17.8202 9.08C17.9902 8.7 17.7902 8.29 17.4202 8.12C15.7402 7.39 13.8202 7 11.9902 7ZM12.0002 10C10.9002 10 10.0002 10.9 10.0002 12C10.0002 13.1 10.9002 14 12.0002 14C13.1002 14 14.0002 13.1 14.0002 12C14.0002 10.9 13.1002 10 12.0002 10ZM12.0002 11.5C12.2802 11.5 12.5002 11.72 12.5002 12C12.5002 12.28 12.2802 12.5 12.0002 12.5C11.7202 12.5 11.5002 12.28 11.5002 12C11.5002 11.72 11.7202 11.5 12.0002 11.5ZM7.00016 15C6.72016 15 6.50016 15.22 6.50016 15.5C6.50016 15.78 6.72016 16 7.00016 16H17.0002C17.2802 16 17.5002 15.78 17.5002 15.5C17.5002 15.22 17.2802 15 17.0002 15H7.00016Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">TSLA</span>
                <span className="text-xs text-[hsl(var(--primary))]">+2.3%</span>
              </div>

              {/* Google */}
              <div className="flex flex-col items-center p-4 rounded-lg bg-zinc-900 border border-zinc-800 w-[100px] transition-transform hover:scale-105">
                <div className="rounded-full bg-white p-2 mb-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.2461 10.3672H21.9961C22.1602 11.1328 22.2422 11.8984 22.2422 12.6641C22.2422 15.2578 21.3828 17.4141 19.6641 19.1328C17.9453 20.8516 15.8125 21.7109 13.3125 21.7109C10.7188 21.7109 8.53906 20.8047 6.77344 18.9922C5.00781 17.1797 4.125 14.9766 4.125 12.3828C4.125 9.78906 5.00781 7.58594 6.77344 5.77344C8.53906 3.96094 10.7188 3.05469 13.3125 3.05469C15.9062 3.05469 18.0391 3.96094 19.7109 5.77344L17.5547 7.92969C16.3828 6.75781 14.9531 6.17188 13.2656 6.17188C11.4531 6.17188 9.91406 6.82031 8.64844 8.11719C7.38281 9.41406 6.75 10.7578 6.75 12.3828C6.75 14.0078 7.38281 15.3516 8.64844 16.6484C9.91406 17.9453 11.4531 18.5938 13.2656 18.5938C14.7031 18.5938 15.9297 18.1406 16.9453 17.2344C17.9609 16.3281 18.5625 15.1562 18.75 13.7188H12.2461V10.3672Z"
                      fill="#4285F4"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">GOOGL</span>
                <span className="text-xs text-[hsl(var(--primary))]">+0.7%</span>
              </div>

              {/* Meta */}
              <div className="flex flex-col items-center p-4 rounded-lg bg-zinc-900 border border-zinc-800 w-[100px] transition-transform hover:scale-105">
                <div className="rounded-full bg-white p-2 mb-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM8.5 9.5C8.5 8.12 9.62 7 11 7C12.38 7 13.5 8.12 13.5 9.5C13.5 10.88 12.38 12 11 12C9.62 12 8.5 10.88 8.5 9.5ZM17.5 14.5C17.5 15.88 16.38 17 15 17C13.62 17 12.5 15.88 12.5 14.5C12.5 13.12 13.62 12 15 12C16.38 12 17.5 13.12 17.5 14.5Z"
                      fill="#0668E1"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">META</span>
                <span className="text-xs text-[hsl(var(--primary))]">+1.1%</span>
              </div>

              {/* Netflix */}
              <div className="flex flex-col items-center p-4 rounded-lg bg-zinc-900 border border-zinc-800 w-[100px] transition-transform hover:scale-105">
                <div className="rounded-full bg-white p-2 mb-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 4.77V19.25C6.04 19.17 7.11 19.05 8.21 18.92L8.21 18.92V8.99C8.21 8.63 8.5 8.34 8.86 8.34C9.22 8.34 9.51 8.63 9.51 8.99V18.75C10.62 18.61 11.77 18.46 12.96 18.32V8.99C12.96 8.63 13.25 8.34 13.61 8.34C13.97 8.34 14.26 8.63 14.26 8.99V18.15C15.46 18.01 16.69 17.88 17.96 17.76V4.77C16.59 4.89 15.27 5.03 14 5.19V14.53C14 14.88 13.71 15.18 13.35 15.18C12.99 15.18 12.7 14.88 12.7 14.53V5.36C11.51 5.5 10.36 5.65 9.25 5.79V14.53C9.25 14.88 8.96 15.18 8.6 15.18C8.24 15.18 7.95 14.88 7.95 14.53V5.96C6.85 6.09 5.78 6.21 4.74 6.32V19.77C4.83 19.76 4.91 19.75 5 19.74V19.25Z"
                      fill="#E50914"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">NFLX</span>
                <span className="text-xs text-[hsl(var(--primary))]">+0.9%</span>
              </div>

              {/* Nvidia */}
              <div className="flex flex-col items-center p-4 rounded-lg bg-zinc-900 border border-zinc-800 w-[100px] transition-transform hover:scale-105">
                <div className="rounded-full bg-white p-2 mb-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.49609 4.49609H15.5039V11.5039H8.49609V4.49609ZM8.49609 12.4961H15.5039V19.5039H8.49609V12.4961Z"
                      fill="#76B900"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">NVDA</span>
                <span className="text-xs text-[hsl(var(--primary))]">+3.2%</span>
              </div>

              {/* JPMorgan */}
              <div className="flex flex-col items-center p-4 rounded-lg bg-zinc-900 border border-zinc-800 w-[100px] transition-transform hover:scale-105">
                <div className="rounded-full bg-white p-2 mb-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 3L3 8.25V15.75L12 21L21 15.75V8.25L12 3ZM12 5.25L18 9V15L12 18.75L6 15V9L12 5.25Z"
                      fill="#2F3BA9"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">JPM</span>
                <span className="text-xs text-[hsl(var(--primary))]">+0.5%</span>
              </div>

              {/* Disney */}
              <div className="flex flex-col items-center p-4 rounded-lg bg-zinc-900 border border-zinc-800 w-[100px] transition-transform hover:scale-105">
                <div className="rounded-full bg-white p-2 mb-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.5 7C6.33 7 7 6.33 7 5.5C7 4.67 6.33 4 5.5 4C4.67 4 4 4.67 4 5.5C4 6.33 4.67 7 5.5 7ZM5.5 5C5.78 5 6 5.22 6 5.5C6 5.78 5.78 6 5.5 6C5.22 6 5 5.78 5 5.5C5 5.22 5.22 5 5.5 5ZM19 12C17.62 12 16.5 13.12 16.5 14.5C16.5 15.88 17.62 17 19 17C20.38 17 21.5 15.88 21.5 14.5C21.5 13.12 20.38 12 19 12ZM19 16C18.17 16 17.5 15.33 17.5 14.5C17.5 13.67 18.17 13 19 13C19.83 13 20.5 13.67 20.5 14.5C20.5 15.33 19.83 16 19 16ZM17.74 7.76C18.13 7.37 18.13 6.75 17.74 6.36L15.64 4.26C15.25 3.87 14.63 3.87 14.24 4.26L12.14 6.36C11.75 6.75 11.75 7.37 12.14 7.76L14.24 9.86C14.63 10.25 15.25 10.25 15.64 9.86L17.74 7.76ZM14.94 8.46L13.54 7.06L14.94 5.66L16.34 7.06L14.94 8.46ZM7.76 17.74C7.37 18.13 6.75 18.13 6.36 17.74L4.26 15.64C3.87 15.25 3.87 14.63 4.26 14.24L6.36 12.14C6.75 11.75 7.37 11.75 7.76 12.14L9.86 14.24C10.25 14.63 10.25 15.25 9.86 15.64L7.76 17.74ZM7.06 16.34L5.66 14.94L7.06 13.54L8.46 14.94L7.06 16.34ZM10.5 5C11.33 5 12 4.33 12 3.5C12 2.67 11.33 2 10.5 2C9.67 2 9 2.67 9 3.5C9 4.33 9.67 5 10.5 5ZM10.5 3C10.78 3 11 3.22 11 3.5C11 3.78 10.78 4 10.5 4C10.22 4 10 3.78 10 3.5C10 3.22 10.22 3 10.5 3ZM14.5 22C15.33 22 16 21.33 16 20.5C16 19.67 15.33 19 14.5 19C13.67 19 13 19.67 13 20.5C13 21.33 13.67 22 14.5 22ZM14.5 20C14.78 20 15 20.22 15 20.5C15 20.78 14.78 21 14.5 21C14.22 21 14 20.78 14 20.5C14 20.22 14.22 20 14.5 20Z"
                      fill="#0063E5"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">DIS</span>
                <span className="text-xs text-[hsl(var(--primary))]">+0.3%</span>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-24 lg:py-32 bg-zinc-900 border-b border-zinc-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[hsl(var(--primary)_/_0.1)] px-3 py-1 text-sm text-[hsl(var(--primary))]">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything You Need for Successful Investing
                </h2>
                <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform combines cutting-edge technology with user-friendly interfaces to provide you with the
                  best investment experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-zinc-800 bg-zinc-950 p-6 shadow-sm">
                <div className="rounded-full bg-[hsl(var(--primary)_/_0.1)] p-3">
                  <BarChart3 className="h-6 w-6 text-[hsl(var(--primary))]" />
                </div>
                <h3 className="text-xl font-bold">Real-time ROI Tracking</h3>
                <p className="text-center text-zinc-400">
                  Monitor your investment performance with detailed analytics and real-time ROI metrics.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-zinc-800 bg-zinc-950 p-6 shadow-sm">
                <div className="rounded-full bg-[hsl(var(--primary)_/_0.1)] p-3">
                  <Wallet className="h-6 w-6 text-[hsl(var(--primary))]" />
                </div>
                <h3 className="text-xl font-bold">Crypto Deposits</h3>
                <p className="text-center text-zinc-400">
                  Easily fund your investment account using various cryptocurrencies with low transaction fees.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-zinc-800 bg-zinc-950 p-6 shadow-sm">
                <div className="rounded-full bg-[hsl(var(--primary)_/_0.1)] p-3">
                  <Lock className="h-6 w-6 text-[hsl(var(--primary))]" />
                </div>
                <h3 className="text-xl font-bold">Advanced Security</h3>
                <p className="text-center text-zinc-400">
                  Your investments are protected with enterprise-grade security and encryption protocols.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="dashboard-preview" className="py-12 md:py-24 lg:py-32 border-b border-zinc-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-[hsl(var(--primary)_/_0.1)] px-3 py-1 text-sm text-[hsl(var(--primary))]">
                    Dashboard
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Powerful Investment Dashboard
                  </h2>
                  <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our intuitive dashboard gives you complete control over your investments with comprehensive
                    analytics and portfolio management tools.
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>Portfolio performance tracking with detailed metrics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>Customizable watchlists and alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>Advanced charting and technical analysis tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>One-click deposit and withdrawal options</span>
                  </li>
                </ul>
                <div>
                  <Button asChild>
                    <Link href="/signup">Access Dashboard</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-xl border border-zinc-800">
                  <Image src="/stock.jpg" alt="Investment Dashboard" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="wallet" className="py-12 md:py-24 lg:py-32 bg-zinc-900 border-b border-zinc-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-xl border border-zinc-800 bg-zinc-950">
                  <Image src="/bbcc.png" alt="Crypto Wallet" fill className="object-cover" />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-[hsl(var(--primary)_/_0.1)] px-3 py-1 text-sm text-[hsl(var(--primary))]">
                    Crypto Wallet
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Seamless Crypto Deposits
                  </h2>
                  <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Fund your investment account instantly using your preferred cryptocurrency with our secure wallet
                    integration.
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>Support for Bitcoin, Ethereum, and other major cryptocurrencies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>Instant deposits with minimal fees</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>Secure multi-signature wallet technology</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[hsl(var(--primary))]" />
                    <span>Automated conversion to fiat for stock purchases</span>
                  </li>
                </ul>
                <div>
                  <Button asChild>
                    <Link href="/signup">Try Crypto Deposits</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-12 md:py-24 lg:py-32 border-b border-zinc-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[hsl(var(--primary)_/_0.1)] px-3 py-1 text-sm text-[hsl(var(--primary))]">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Investors Say</h2>
                <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied investors who have grown their portfolios with our platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-between space-y-4 rounded-lg border border-zinc-800 bg-zinc-950 p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <DollarSign key={i} className="h-4 w-4 fill-[hsl(var(--primary))] text-[hsl(var(--primary))]" />
                    ))}
                  </div>
                  <p className="text-zinc-400">
                    "The ROI tracking feature has completely transformed how I monitor my investments. I've seen a 32%
                    increase in my portfolio since joining."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-zinc-800 h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-xs text-zinc-400">Retail Investor</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border border-zinc-800 bg-zinc-950 p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <DollarSign key={i} className="h-4 w-4 fill-[hsl(var(--primary))] text-[hsl(var(--primary))]" />
                    ))}
                  </div>
                  <p className="text-zinc-400">
                    "The crypto deposit feature is a game-changer. I can quickly move funds from my crypto holdings to
                    invest in stocks without delays."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-zinc-800 h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">Michael Chen</p>
                    <p className="text-xs text-zinc-400">Crypto Enthusiast</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border border-zinc-800 bg-zinc-950 p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <DollarSign key={i} className="h-4 w-4 fill-[hsl(var(--primary))] text-[hsl(var(--primary))]" />
                    ))}
                  </div>
                  <p className="text-zinc-400">
                    "As a financial advisor, I recommend this platform to all my clients. The analytics and security
                    features are unmatched in the industry."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-zinc-800 h-10 w-10"></div>
                  <div>
                    <p className="text-sm font-medium">Robert Williams</p>
                    <p className="text-xs text-zinc-400">Financial Advisor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="py-12 md:py-24 lg:py-32 bg-[hsl(var(--primary)_/_0.1)]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Maximize Your Investment Returns?
                </h2>
                <p className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of investors who are growing their wealth with our platform. Get started today with
                  just a few clicks.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/signup">Create Your Account</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#demo">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="container flex flex-col gap-6 py-8 md:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-12">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-[hsl(var(--primary))]" />
                <span className="text-xl font-bold">StockGrowth</span>
              </div>
              <p className="text-sm text-zinc-400 max-w-[300px]">
                Empowering investors with advanced tools, real-time analytics, and secure crypto deposits.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Platform</h3>
                <ul className="flex flex-col gap-2 text-sm text-zinc-400">
                  <li>
                    <Link href="#" className="hover:text-[hsl(var(--primary))]">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-[hsl(var(--primary))]">
                      Security
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-[hsl(var(--primary))]">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-[hsl(var(--primary))]">
                      Resources
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Company</h3>
                <ul className="flex flex-col gap-2 text-sm text-zinc-400">
                  <li>
                    <Link href="#" className="hover:text-[hsl(var(--primary))]">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-[hsl(var(--primary))]">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-[hsl(var(--primary))]">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-[hsl(var(--primary))]">
                      Press
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Legal</h3>
                <ul className="flex flex-col gap-2 text-sm text-zinc-400">
                  <li>
                    <Link href="#" className="hover:text-[hsl(var(--primary))]">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-[hsl(var(--primary))]">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-[hsl(var(--primary))]">
                      Cookies
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-[hsl(var(--primary))]">
                      Licenses
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Support</h3>
                <ul className="flex flex-col gap-2 text-sm text-zinc-400">
                  <li>
                    <Link href="#" className="hover:text-[hsl(var(--primary))]">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-[hsl(var(--primary))]">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-[hsl(var(--primary))]">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-[hsl(var(--primary))]">
                      Community
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 border-t border-zinc-800 pt-6 text-sm text-zinc-400 lg:flex-row lg:justify-between lg:pt-8">
            <p>© 2025 StockGrowth. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-[hsl(var(--primary))]">
                Twitter
              </Link>
              <Link href="#" className="hover:text-[hsl(var(--primary))]">
                LinkedIn
              </Link>
              <Link href="#" className="hover:text-[hsl(var(--primary))]">
                Facebook
              </Link>
              <Link href="#" className="hover:text-[hsl(var(--primary))]">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
