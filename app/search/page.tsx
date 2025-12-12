"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { useAppSelector } from "@/lib/hooks"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { TyreCard } from "@/components/tyre-card"
import { TyreCardSkeleton } from "@/components/tyre-card-skeleton"
import { MobileFiltersSheet } from "@/components/mobile-filters-sheet"
import { tyreData } from "@/lib/tyre-data"
import { ChevronRight, SlidersHorizontal, Grid, List } from "lucide-react"

export default function SearchPage() {
  const search = useAppSelector((state) => state.search)

  // Filter states
  const [tyreType, setTyreType] = useState<"new" | "used" | "all">("all")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high" | "rating">("popular")
  const [selectedTyre, setSelectedTyre] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(12)

  // Simulate loading on mount and filter change
  useEffect(() => {
    setIsLoading(true)
    setVisibleCount(12) // Reset visible count on filter change
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [tyreType, selectedBrands, selectedPriceRange, minRating, sortBy])

  // Filter and sort tyres
  const filteredTyres = useMemo(() => {
    let result = [...tyreData]

    // Filter by type
    if (tyreType !== "all") {
      result = result.filter((t) => t.type === tyreType)
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      result = result.filter((t) => selectedBrands.includes(t.brand))
    }

    // Filter by price range
    if (selectedPriceRange) {
      result = result.filter((t) => t.price >= selectedPriceRange.min && t.price <= selectedPriceRange.max)
    }

    // Filter by rating
    if (minRating > 0) {
      result = result.filter((t) => t.rating >= minRating)
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount)
    }

    return result
  }, [tyreType, selectedBrands, selectedPriceRange, minRating, sortBy])

  const vehicleString = search.vehicleType
    ? `${search.make || ""} ${search.model || ""} ${search.variant || ""}`.trim()
    : "All Vehicles"

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-[#6B7280] hover:text-[#DC2626] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
            <span className="text-[#1F2937] font-medium">Search Results</span>
            {search.vehicleType && (
              <>
                <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
                <span className="text-[#DC2626] font-medium">{vehicleString}</span>
              </>
            )}
            {search.pincode && (
              <>
                <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
                <span className="text-[#6B7280]">📍 {search.pincode}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937]">
              {search.vehicleType ? `Tyres for ${vehicleString}` : "🛞 Browse All Tyres"}
            </h1>
            <p className="text-[#6B7280] mt-1">
              {filteredTyres.length} tyres found{search.pincode ? ` • Delivery to ${search.pincode}` : ""}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-xl hover:border-[#DC2626] transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5 text-[#6B7280]" />
              <span className="text-[#1F2937] font-medium">Filters</span>
            </button>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-white border border-[#E5E7EB] rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-[#DC2626] text-white" : "text-[#6B7280] hover:bg-[#F9FAFB]"
                  }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-[#DC2626] text-white" : "text-[#6B7280] hover:bg-[#F9FAFB]"
                  }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FiltersSidebar
              tyreType={tyreType}
              setTyreType={setTyreType}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
              minRating={minRating}
              setMinRating={setMinRating}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div
                className={
                  viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6" : "flex flex-col gap-4"
                }
              >
                {[...Array(6)].map((_, i) => (
                  <TyreCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredTyres.length > 0 ? (
              <>
                <div
                  className={
                    viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6" : "flex flex-col gap-4"
                  }
                >
                  {filteredTyres.slice(0, visibleCount).map((tyre) => (
                    <TyreCard
                      key={tyre.id}
                      tyre={tyre}
                      isSelected={selectedTyre === tyre.id}
                      onSelect={() => setSelectedTyre(selectedTyre === tyre.id ? null : tyre.id)}
                    />
                  ))}
                </div>
                {visibleCount < filteredTyres.length && (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 12)}
                      className="px-6 py-3 bg-white border border-[#E5E7EB] text-[#1F2937] font-semibold rounded-xl hover:border-[#DC2626] hover:text-[#DC2626] transition-colors shadow-sm"
                    >
                      Load More Tyres
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-xl font-semibold text-[#1F2937] mb-2">No tyres found</h3>
                <p className="text-[#6B7280] mb-6">Try adjusting your filters to see more results</p>
                <button
                  onClick={() => {
                    setTyreType("all")
                    setSelectedBrands([])
                    setSelectedPriceRange(null)
                    setMinRating(0)
                  }}
                  className="px-6 py-3 bg-[#DC2626] text-white font-semibold rounded-xl hover:bg-[#B91C1C] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Bottom Sheet */}
      <MobileFiltersSheet
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        tyreType={tyreType}
        setTyreType={setTyreType}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
        minRating={minRating}
        setMinRating={setMinRating}
        resultCount={filteredTyres.length}
      />
    </div>
  )
}
