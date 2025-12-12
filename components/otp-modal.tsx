"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Phone, ArrowRight, Check } from "lucide-react"
import { useAppDispatch } from "@/lib/hooks"
import { setUser } from "@/lib/store"

interface OtpModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function OtpModal({ isOpen, onClose, onSuccess }: OtpModalProps) {
  const dispatch = useAppDispatch()
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [timer, setTimer] = useState(30)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (step === "otp" && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [step, timer])

  const handlePhoneSubmit = async () => {
    if (phone.length !== 10) return
    setIsLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
    setStep("otp")
    setTimer(30)
    setTimeout(() => otpRefs.current[0]?.focus(), 100)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpSubmit = async () => {
    if (otp.join("").length !== 6) return
    setIsLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000))

    // Create user and save to localStorage
    const user = {
      id: `user_${Date.now()}`,
      name: "Guest User",
      mobile: phone,
    }
    localStorage.setItem("tyreplus_user", JSON.stringify(user))
    dispatch(setUser(user))

    setIsLoading(false)
    setStep("success")

    setTimeout(() => {
      onSuccess()
      onClose()
    }, 1500)
  }

  const handleResendOtp = async () => {
    if (timer > 0) return
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
    setTimer(30)
    setOtp(["", "", "", "", "", ""])
    otpRefs.current[0]?.focus()
  }

  const resetModal = () => {
    setStep("phone")
    setPhone("")
    setOtp(["", "", "", "", "", ""])
    setTimer(30)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => {
            resetModal()
            onClose()
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-[#FEF2F2] px-6 py-8 text-center">
              <button
                onClick={() => {
                  resetModal()
                  onClose()
                }}
                className="absolute top-4 right-4 p-2 hover:bg-white/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
              <div className="w-16 h-16 bg-[#DC2626] rounded-full flex items-center justify-center mx-auto mb-4">
                {step === "success" ? (
                  <Check className="w-8 h-8 text-white" />
                ) : (
                  <Phone className="w-8 h-8 text-white" />
                )}
              </div>
              <h3 className="text-xl font-bold text-[#1F2937]">
                {step === "phone" && "Verify Your Number"}
                {step === "otp" && "Enter OTP"}
                {step === "success" && "Verified! 🎉"}
              </h3>
              <p className="text-[#6B7280] mt-2">
                {step === "phone" && "We'll send you a one-time password"}
                {step === "otp" && `OTP sent to +91 ${phone}`}
                {step === "success" && "You're all set to search tyres"}
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === "phone" && (
                  <motion.div
                    key="phone"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">+91</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="Enter mobile number"
                        className="w-full pl-14 pr-4 py-3 border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
                        autoFocus
                      />
                    </div>
                    <button
                      onClick={handlePhoneSubmit}
                      disabled={phone.length !== 10 || isLoading}
                      className={`w-full mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                        phone.length === 10 && !isLoading
                          ? "bg-[#DC2626] text-white hover:bg-[#B91C1C]"
                          : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                      }`}
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send OTP
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </motion.div>
                )}

                {step === "otp" && (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="flex justify-center gap-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            otpRefs.current[index] = el
                          }}
                          type="text"
                          inputMode="numeric"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-12 h-12 text-center text-xl font-semibold border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
                        />
                      ))}
                    </div>
                    <button
                      onClick={handleOtpSubmit}
                      disabled={otp.join("").length !== 6 || isLoading}
                      className={`w-full mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                        otp.join("").length === 6 && !isLoading
                          ? "bg-[#DC2626] text-white hover:bg-[#B91C1C]"
                          : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                      }`}
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Verify OTP
                          <Check className="w-5 h-5" />
                        </>
                      )}
                    </button>
                    <div className="mt-4 text-center">
                      <button
                        onClick={handleResendOtp}
                        disabled={timer > 0 || isLoading}
                        className={`text-sm ${timer > 0 ? "text-[#9CA3AF]" : "text-[#DC2626] hover:underline"}`}
                      >
                        {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <p className="mt-4 text-[#6B7280]">Redirecting to search...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
