"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { tyreData } from "@/lib/tyre-data"
import { CheckCircle2, ClipboardList, Coins, SearchCheck, CalendarCheck, ChevronRight } from "lucide-react"

function QuoteContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const tyreId = searchParams.get("tyreId")
    const [tyre, setTyre] = useState<(typeof tyreData)[0] | null>(null)

    useEffect(() => {
        if (tyreId) {
            const foundTyre = tyreData.find((t) => t.id === tyreId)
            if (foundTyre) {
                setTyre(foundTyre)
            } else {
                // Handle invalid ID if needed, or just redirect back
                // router.push("/search")
            }
        }
    }, [tyreId])

    if (!tyre) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFF1F2]">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                </div>
            </div>
        )
    }

    const discount = tyre.originalPrice ? Math.round(((tyre.originalPrice - tyre.price) / tyre.originalPrice) * 100) : 0

    return (
        <div className="min-h-screen bg-[#FFF1F2]">
            {/* Navbar Placeholder - matching the screenshot's simple header */}

            <main className="max-w-3xl mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#1F2937] flex items-center gap-2">
                        <ClipboardList className="w-6 h-6 text-[#8B5CF6]" /> {/* Using a generic icon as placeholder for the clipboard */}
                        REQUEST QUOTE
                    </h1>
                    <p className="text-sm text-gray-600 ml-8">Get Best Prices from Verified Dealers</p>
                </div>

                {/* Success Banner */}
                <div className="bg-[#A7F3D0] border border-[#34D399] rounded-xl p-4 mb-6 flex items-start gap-3 shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-[#059669] flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-[#065F46] font-medium">
                            <span className="font-bold">Interest Submitted!</span> Review details below and confirm to get quotes from verified dealers.
                        </p>
                    </div>
                </div>

                {/* Product Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative w-32 h-32 flex-shrink-0">
                        <Image
                            src={tyre.image}
                            alt={`${tyre.brand} ${tyre.model}`}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-xl font-bold text-[#1F2937] mb-2">
                            {tyre.brand} {tyre.model} {tyre.size}
                        </h2>
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                            <span className="text-2xl font-bold text-[#DC2626]">
                                ₹{tyre.price.toLocaleString()}
                            </span>
                            {discount > 0 && (
                                <span className="text-sm font-medium text-[#059669]">
                                    ({discount}% OFF)
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Steps Section */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    <div className="text-center mb-8">
                        <h3 className="text-xl font-bold text-[#1F2937] flex items-center justify-center gap-2">
                            <span className="text-yellow-400">✨</span> What Happens Next?
                        </h3>
                    </div>

                    <div className="space-y-6">
                        {/* Step 1 */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold flex-shrink-0">
                                1
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1F2937] flex items-center gap-2">
                                    <SearchCheck className="w-4 h-4 text-gray-500" /> Dealers Review (15-30 mins)
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">
                                    Verified dealers in your area will review your request
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold flex-shrink-0">
                                2
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1F2937] flex items-center gap-2">
                                    <Coins className="w-4 h-4 text-gray-500" /> Receive Quotes
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">
                                    Get competitive pricing from multiple dealers
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold flex-shrink-0">
                                3
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1F2937] flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-[#059669]" /> Compare & Choose
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">
                                    Select the best offer based on price and service
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold flex-shrink-0">
                                4
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1F2937] flex items-center gap-2">
                                    <CalendarCheck className="w-4 h-4 text-gray-500" /> Confirm Installation
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">
                                    Schedule your preferred date and time
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold flex-shrink-0">
                                5
                            </div>
                            <div>
                                <h4 className="font-bold text-[#1F2937] flex items-center gap-2">
                                    <CalendarCheck className="w-4 h-4 text-gray-500" /> 🚀 Get Installed!
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">
                                    Professional installation at your doorstep
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default function QuotePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#FFF1F2]">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                </div>
            </div>
        }>
            <QuoteContent />
        </Suspense>
    )
}
