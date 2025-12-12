"use client"

import { useState } from "react"
import { X, Truck, Shield, Wrench } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-[#DC2626] text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar flex-1">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Truck className="w-4 h-4" />
                <span className="text-sm font-medium">🎉 Free Installation on All Orders!</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 whitespace-nowrap">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Quality Assured Tyres</span>
              </div>
              <div className="hidden md:flex items-center gap-2 whitespace-nowrap">
                <Wrench className="w-4 h-4" />
                <span className="text-sm">Expert Fitment Services</span>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-4 p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
