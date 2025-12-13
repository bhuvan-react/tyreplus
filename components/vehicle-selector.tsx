"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setVehicleType, setMake, setModel, setVariant, setPincode } from "@/lib/store"
import { getMakes, getModels, getVariants, type VehicleType } from "@/lib/vehicle-data"
import { ChevronDown, Bike, Car, Check } from "lucide-react"

interface VehicleSelectorProps {
  onSearch: () => void
}

export function VehicleSelector({ onSearch }: VehicleSelectorProps) {
  const dispatch = useAppDispatch()
  const search = useAppSelector((state) => state.search)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const vehicleTypes: { type: VehicleType; label: string; icon: React.ReactNode }[] = [
    { type: "2W", label: "2 Wheeler", icon: <Bike className="w-5 h-5" /> },
    { type: "3W", label: "3 Wheeler", icon: <span className="text-lg">🛺</span> },
    { type: "4W", label: "4 Wheeler", icon: <Car className="w-5 h-5" /> },
  ]

  const makes = search.vehicleType ? getMakes(search.vehicleType) : []
  const models = search.vehicleType && search.make ? getModels(search.vehicleType, search.make) : []
  const variants =
    search.vehicleType && search.make && search.model ? getVariants(search.vehicleType, search.make, search.model) : []

  const isSearchEnabled =
    search.vehicleType && search.make && search.model && search.variant && search.pincode?.length === 6

  const handleVehicleTypeSelect = (type: VehicleType) => {
    dispatch(setVehicleType(type))
  }

  const handleMakeSelect = (make: string) => {
    dispatch(setMake(make))
    setActiveDropdown(null)
  }

  const handleModelSelect = (model: string) => {
    dispatch(setModel(model))
    setActiveDropdown(null)
  }

  const handleVariantSelect = (variant: string) => {
    dispatch(setVariant(variant))
    setActiveDropdown(null)
  }

  const handlePincodeChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 6)
    dispatch(setPincode(numericValue))
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-[#1F2937] mb-6 text-center">
        🔍 Find the Perfect Tyres for Your Vehicle
      </h2>

      {/* Vehicle Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#6B7280] mb-3">Select Vehicle Type</label>
        <div className="grid grid-cols-3 gap-3">
          {vehicleTypes.map(({ type, label, icon }) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleVehicleTypeSelect(type)}
              className={`relative p-4 rounded-xl border-2 transition-all ${search.vehicleType === type
                ? "border-[#0D9488] bg-[#F0FDFA]"
                : "border-[#E5E7EB] bg-white hover:border-[#0D9488]/50"
                }`}
            >
              {search.vehicleType === type && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative top-2 right-2 w-5 h-5 bg-[#0D9488] rounded-full flex items-center justify-center"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
              <div className="flex flex-col items-center gap-2">
                <div className={search.vehicleType === type ? "text-[#0D9488]" : "text-[#6B7280]"}>{icon}</div>
                <span
                  className={`text-sm font-medium ${search.vehicleType === type ? "text-[#0D9488]" : "text-[#1F2937]"}`}
                >
                  {label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cascading Dropdowns */}
      <AnimatePresence mode="wait">
        {search.vehicleType && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Make Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-[#6B7280] mb-2">Select Make</label>
              <button
                onClick={() => setActiveDropdown(activeDropdown === "make" ? null : "make")}
                className="w-full px-4 py-3 border border-[#D1D5DB] rounded-xl flex items-center justify-between bg-white hover:border-[#0D9488] transition-colors"
              >
                <span className={search.make ? "text-[#1F2937]" : "text-[#9CA3AF]"}>
                  {search.make || "Choose a make"}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#6B7280] transition-transform ${activeDropdown === "make" ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {activeDropdown === "make" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute z-20 w-full mt-2 bg-white border border-[#E5E7EB] rounded-xl shadow-lg max-h-60 overflow-y-auto"
                  >
                    {makes.map((make) => (
                      <button
                        key={make}
                        onClick={() => handleMakeSelect(make)}
                        className={`w-full px-4 py-3 text-left hover:bg-[#F9FAFB] transition-colors ${search.make === make ? "bg-[#F0FDFA] text-[#0D9488]" : "text-[#1F2937]"
                          }`}
                      >
                        {make}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Model Dropdown */}
            {search.make && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="relative">
                <label className="block text-sm font-medium text-[#6B7280] mb-2">Select Model</label>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === "model" ? null : "model")}
                  className="w-full px-4 py-3 border border-[#D1D5DB] rounded-xl flex items-center justify-between bg-white hover:border-[#0D9488] transition-colors"
                >
                  <span className={search.model ? "text-[#1F2937]" : "text-[#9CA3AF]"}>
                    {search.model || "Choose a model"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6B7280] transition-transform ${activeDropdown === "model" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "model" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute z-20 w-full mt-2 bg-white border border-[#E5E7EB] rounded-xl shadow-lg max-h-60 overflow-y-auto"
                    >
                      {models.map((model) => (
                        <button
                          key={model}
                          onClick={() => handleModelSelect(model)}
                          className={`w-full px-4 py-3 text-left hover:bg-[#F9FAFB] transition-colors ${search.model === model ? "bg-[#F0FDFA] text-[#0D9488]" : "text-[#1F2937]"
                            }`}
                        >
                          {model}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Variant Dropdown */}
            {search.model && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="relative">
                <label className="block text-sm font-medium text-[#6B7280] mb-2">Select Variant</label>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === "variant" ? null : "variant")}
                  className="w-full px-4 py-3 border border-[#D1D5DB] rounded-xl flex items-center justify-between bg-white hover:border-[#0D9488] transition-colors"
                >
                  <span className={search.variant ? "text-[#1F2937]" : "text-[#9CA3AF]"}>
                    {search.variant || "Choose a variant"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6B7280] transition-transform ${activeDropdown === "variant" ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "variant" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute z-20 w-full mt-2 bg-white border border-[#E5E7EB] rounded-xl shadow-lg max-h-60 overflow-y-auto"
                    >
                      {variants.map((variant) => (
                        <button
                          key={variant}
                          onClick={() => handleVariantSelect(variant)}
                          className={`w-full px-4 py-3 text-left hover:bg-[#F9FAFB] transition-colors ${search.variant === variant ? "bg-[#F0FDFA] text-[#0D9488]" : "text-[#1F2937]"
                            }`}
                        >
                          {variant}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pincode Input */}
            {search.variant && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <label className="block text-sm font-medium text-[#6B7280] mb-2">Enter Pincode 📍</label>
                <input
                  type="text"
                  value={search.pincode || ""}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  placeholder="Enter 6-digit pincode"
                  className="w-full px-4 py-3 border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all"
                />
                {search.pincode && search.pincode.length === 6 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-[#10B981] mt-2 flex items-center gap-1"
                  >
                    <Check className="w-4 h-4" />
                    Service available in your area!
                  </motion.p>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Button */}
      <motion.button
        whileHover={isSearchEnabled ? { scale: 1.02 } : {}}
        whileTap={isSearchEnabled ? { scale: 0.98 } : {}}
        onClick={onSearch}
        disabled={!isSearchEnabled}
        className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all ${isSearchEnabled
          ? "bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white hover:opacity-90 shadow-lg shadow-teal-500/30"
          : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
          }`}
      >
        🔍 Search Available Tyres
      </motion.button>
    </div>
  )
}
