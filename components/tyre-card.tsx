"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, Truck, ShoppingCart, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import type { Tyre } from "@/lib/tyre-data"
import useEmblaCarousel from "embla-carousel-react"
import { ImageViewer } from "./image-viewer"

interface TyreCardProps {
  tyre: Tyre
  isSelected: boolean
  onSelect: () => void
}

export function TyreCard({ tyre, isSelected, onSelect }: TyreCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<"new" | "used">(tyre.type === "used" ? "used" : "new")
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  // Mock 4 images for the carousel (using the same image for demo purposes)
  // In a real app, these would be different views from the API
  const images = [
    tyre.image || "/placeholder.svg",
    tyre.image || "/placeholder.svg",
    tyre.image || "/placeholder.svg",
    tyre.image || "/placeholder.svg",
  ]

  const discount = tyre.originalPrice ? Math.round(((tyre.originalPrice - tyre.price) / tyre.originalPrice) * 100) : 0

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    onSelect()

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  const scrollTo = (index: number) => {
    emblaApi && emblaApi.scrollTo(index)
  }

  const handleVariantSelect = (variant: "new" | "used") => {
    if (variant === "used" && !tyre.usedPrice) return
    setSelectedVariant(variant)
    if (!isSelected) {
      onSelect()
    }
  }

  const scrollPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    emblaApi?.scrollPrev()
  }

  const scrollNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    emblaApi?.scrollNext()
  }

  const openViewer = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsViewerOpen(true)
    setCurrentImageIndex(selectedIndex)
  }

  return (
    <div
      className={`bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden transition-all ${isSelected ? "ring-2 ring-[#0D9488]" : ""
        } ${!tyre.inStock ? "opacity-75" : ""}`}
    >
      {/* Image Section */}
      <div className="relative bg-[#F9FAFB] p-4">
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedVariant === "new" ? "bg-[#10B981] text-white" : "bg-[#9333EA] text-white"
              }`}
          >
            {selectedVariant === "new" ? "🆕 New" : "♻️ Used"}
          </span>
          {discount > 0 && (
            <span className="px-3 py-1 bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white rounded-full text-xs font-semibold">
              {discount}% OFF
            </span>
          )}
        </div>




        {/* Carousel */}
        <div className="relative group/carousel">
          <div className="overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex">
              {images.map((img, index) => (
                <div key={index} className="relative w-full aspect-square flex-[0_0_100%] min-w-0">
                  <Image
                    src={img}
                    alt={`${tyre.brand} ${tyre.model} view ${index + 1}`}
                    fill
                    className="object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={openViewer}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>

          {/* Maximize Button */}
          <button
            onClick={openViewer}
            className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
          >
            <Maximize2 className="w-4 h-4 text-gray-700" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  scrollTo(index)
                }}
                className={`w-2 h-2 rounded-full transition-all ${selectedIndex === index
                  ? "bg-[#0D9488] w-4"
                  : "bg-gray-300 hover:bg-gray-400"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {!tyre.inStock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="px-4 py-2 bg-[#1F2937] text-white rounded-lg font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Brand & Model */}
        <div className="mb-2">
          <span className="text-xs font-medium text-[#0D9488] uppercase tracking-wide">{tyre.brand}</span>
          <h3 className="text-lg font-semibold text-[#1F2937]">{tyre.model}</h3>
          <p className="text-sm text-[#6B7280]">{tyre.size}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(tyre.rating) ? "text-yellow-400 fill-yellow-400" : "text-[#E5E7EB]"}`}
              />
            ))}
          </div>
          <span className="text-sm text-[#6B7280]">
            {tyre.rating} ({tyre.reviewCount})
          </span>
        </div>

        {/* Used Tyre Details */}
        {selectedVariant === "used" && (
          <div className="flex gap-4 mb-2 text-sm">
            <span className="text-[#6B7280]">
              Condition: <span className="font-medium text-[#1F2937]">{tyre.condition || "Good"}</span>
            </span>
            <span className="text-[#6B7280]">
              Tread: <span className="font-medium text-[#1F2937]">{tyre.treadDepth || 5}mm</span>
            </span>
          </div>
        )}

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tyre.features.slice(0, 3).map((feature) => (
            <span key={feature} className="px-2 py-1 bg-[#F9FAFB] text-[#6B7280] text-xs rounded-md">
              {feature}
            </span>
          ))}
        </div>

        {/* Price Chips */}
        <div className="flex items-center gap-3 mb-3">
          {tyre.type !== "used" && (
            <button
              onClick={() => handleVariantSelect("new")}
              className={`flex-1 border rounded-lg p-2 text-center transition-all ${selectedVariant === "new"
                ? "bg-[#F0FDFA] border-[#0D9488] ring-1 ring-[#0D9488]"
                : "bg-white border-gray-100 hover:border-[#0D9488]"
                }`}
            >
              <div
                className={`text-[10px] uppercase font-bold tracking-wider mb-0.5 ${selectedVariant === "new" ? "text-[#0D9488]" : "text-gray-400"
                  }`}
              >
                New
              </div>
              <div className={`text-lg font-bold ${selectedVariant === "new" ? "text-gray-900" : "text-gray-500"}`}>
                ₹{tyre.newPrice?.toLocaleString()}
              </div>
            </button>
          )}

          <button
            onClick={() => handleVariantSelect("used")}
            disabled={!tyre.usedPrice}
            className={`flex-1 border rounded-lg p-2 text-center transition-all ${!tyre.usedPrice
              ? "bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed"
              : selectedVariant === "used"
                ? "bg-[#FAF5FF] border-[#9333EA] ring-1 ring-[#9333EA]"
                : "bg-white border-gray-100 hover:border-[#9333EA]"
              }`}
          >
            <div
              className={`text-[10px] uppercase font-bold tracking-wider mb-0.5 ${selectedVariant === "used" ? "text-[#9333EA]" : "text-gray-400"
                }`}
            >
              Used
            </div>
            <div className={`text-lg font-bold ${selectedVariant === "used" ? "text-gray-900" : "text-gray-500"}`}>
              {tyre.usedPrice ? `₹${tyre.usedPrice.toLocaleString()}` : "N/A"}
            </div>
          </button>
        </div>

        {/* Free Installation Badge */}
        {tyre.freeInstallation && (
          <div className="flex items-center gap-2 mb-3 text-[#10B981]">
            <Truck className="w-4 h-4" />
            <span className="text-sm font-medium">Free Installation</span>
          </div>
        )}

        {/* Show Interest Button */}
        <Link
          href={isSelected && tyre.inStock ? `/quote?tyreId=${tyre.id}` : "#"}
          className={`w-full py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${isSelected && tyre.inStock
            ? selectedVariant === "new"
              ? "bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white hover:opacity-90"
              : "bg-[#9333EA] text-white hover:opacity-90"
            : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed pointer-events-none"
            }`}
          aria-disabled={!isSelected || !tyre.inStock}
        >
          <ShoppingCart className="w-5 h-5" />
          Buy now
        </Link>
      </div>

      <ImageViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        images={images}
        initialIndex={currentImageIndex}
      />
    </div >
  )
}
