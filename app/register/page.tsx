"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useAppDispatch } from "@/lib/hooks"
import { setUser } from "@/lib/store"
import { Eye, EyeOff, User, Phone, Lock, MapPin, ArrowRight, Check, AlertCircle } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [step, setStep] = useState<"details" | "otp" | "success">("details")
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [pincode, setPincode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timer, setTimer] = useState(30)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (step === "otp" && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [step, timer])

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    let strength = 0
    if (pwd.length >= 6) strength++
    if (pwd.length >= 8) strength++
    if (/[A-Z]/.test(pwd)) strength++
    if (/[0-9]/.test(pwd)) strength++
    if (/[^A-Za-z0-9]/.test(pwd)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(password)
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
  const strengthColors = ["#DC2626", "#F59E0B", "#F59E0B", "#10B981", "#10B981"]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }
    if (mobile.length !== 10) {
      newErrors.mobile = "Enter a valid 10-digit mobile number"
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (pincode.length !== 6) {
      newErrors.pincode = "Enter a valid 6-digit pincode"
    }
    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
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

  const handleVerifyOtp = async () => {
    if (otp.join("").length !== 6) return
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))

    const user = {
      id: `user_${Date.now()}`,
      name,
      mobile,
      pincode,
    }

    localStorage.setItem("tyreplus_user", JSON.stringify(user))
    dispatch(setUser(user))

    setIsLoading(false)
    setStep("success")

    setTimeout(() => {
      router.push("/")
    }, 2000)
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

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-[#DC2626] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">T+</span>
            </div>
            <span className="text-2xl font-bold text-[#1F2937]">TyrePlus</span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-2">
            {step === "details" && "Create Account 🚀"}
            {step === "otp" && "Verify Mobile 📱"}
            {step === "success" && "Welcome Aboard! 🎉"}
          </h1>
          <p className="text-[#6B7280]">
            {step === "details" && "Join thousands of happy customers"}
            {step === "otp" && `OTP sent to +91 ${mobile}`}
            {step === "success" && "Your account has been created"}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {["Details", "Verify", "Done"].map((label, index) => {
            const stepIndex = step === "details" ? 0 : step === "otp" ? 1 : 2
            const isActive = index <= stepIndex
            const isCompleted = index < stepIndex

            return (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    isCompleted
                      ? "bg-[#10B981] text-white"
                      : isActive
                        ? "bg-[#DC2626] text-white"
                        : "bg-[#E5E7EB] text-[#9CA3AF]"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span className={`text-sm ${isActive ? "text-[#1F2937] font-medium" : "text-[#9CA3AF]"}`}>{label}</span>
                {index < 2 && <div className={`w-8 h-0.5 ${isActive ? "bg-[#DC2626]" : "bg-[#E5E7EB]"}`} />}
              </div>
            )
          })}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8">
          <AnimatePresence mode="wait">
            {step === "details" && (
              <motion.form
                key="details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSubmitDetails}
                className="space-y-4"
              >
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all ${
                        errors.name ? "border-[#DC2626]" : "border-[#D1D5DB]"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-[#DC2626] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                    <span className="absolute left-12 top-1/2 -translate-y-1/2 text-[#6B7280]">+91</span>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="Enter mobile number"
                      className={`w-full pl-20 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all ${
                        errors.mobile ? "border-[#DC2626]" : "border-[#D1D5DB]"
                      }`}
                    />
                  </div>
                  {errors.mobile && (
                    <p className="text-sm text-[#DC2626] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.mobile}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create password"
                      className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all ${
                        errors.password ? "border-[#DC2626]" : "border-[#D1D5DB]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {/* Password Strength Meter */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition-all ${
                              level <= passwordStrength ? "" : "bg-[#E5E7EB]"
                            }`}
                            style={{
                              backgroundColor: level <= passwordStrength ? strengthColors[passwordStrength - 1] : "",
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-xs" style={{ color: strengthColors[passwordStrength - 1] || "#9CA3AF" }}>
                        {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : "Enter a password"}
                      </p>
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-sm text-[#DC2626] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all ${
                        errors.confirmPassword ? "border-[#DC2626]" : "border-[#D1D5DB]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-[#DC2626] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">PIN Code 📍</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="Enter 6-digit pincode"
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all ${
                        errors.pincode ? "border-[#DC2626]" : "border-[#D1D5DB]"
                      }`}
                    />
                  </div>
                  {errors.pincode && (
                    <p className="text-sm text-[#DC2626] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.pincode}
                    </p>
                  )}
                </div>

                {/* Terms & Conditions */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                        agreedToTerms
                          ? "bg-[#DC2626] border-[#DC2626]"
                          : errors.terms
                            ? "border-[#DC2626]"
                            : "border-[#D1D5DB]"
                      }`}
                    >
                      {agreedToTerms && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="sr-only"
                    />
                    <span className="text-sm text-[#6B7280]">
                      I agree to the{" "}
                      <a href="#" className="text-[#DC2626] hover:underline">
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-[#DC2626] hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-sm text-[#DC2626] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.terms}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#DC2626] text-white rounded-xl font-semibold hover:bg-[#B91C1C] transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Login Link */}
                <p className="text-center text-[#6B7280]">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#DC2626] font-medium hover:underline">
                    Sign In
                  </Link>
                </p>
              </motion.form>
            )}

            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex justify-center gap-2 mb-6">
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
                      className="w-12 h-14 text-center text-2xl font-semibold border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
                    />
                  ))}
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={otp.join("").length !== 6 || isLoading}
                  className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    otp.join("").length === 6 && !isLoading
                      ? "bg-[#DC2626] text-white hover:bg-[#B91C1C]"
                      : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Verify & Create Account
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

                <button
                  onClick={() => setStep("details")}
                  className="w-full mt-4 py-2 text-[#6B7280] hover:text-[#1F2937] text-sm"
                >
                  ← Change mobile number
                </button>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#1F2937] mb-2">Account Created!</h2>
                <p className="text-[#6B7280] mb-6">Welcome to TyrePlus, {name.split(" ")[0]}!</p>
                <div className="w-8 h-8 border-2 border-[#DC2626] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-[#9CA3AF] mt-4">Redirecting to homepage...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
