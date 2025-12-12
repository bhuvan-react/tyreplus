"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useAppDispatch } from "@/lib/hooks"
import { setUser } from "@/lib/store"
import { Eye, EyeOff, Phone, Lock, Shield, Truck, Star, Award, ArrowRight, Check } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Forgot Password OTP Flow
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotStep, setForgotStep] = useState<"phone" | "otp" | "newPassword" | "success">("phone")
  const [forgotPhone, setForgotPhone] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [timer, setTimer] = useState(30)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (forgotStep === "otp" && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [forgotStep, timer])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (mobile.length !== 10 || password.length < 6) {
      setError("Please enter valid credentials")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500))

    const user = {
      id: `user_${Date.now()}`,
      name: "John Doe",
      mobile,
    }

    localStorage.setItem("tyreplus_user", JSON.stringify(user))
    dispatch(setUser(user))
    router.push("/")
  }

  const handleForgotPhoneSubmit = async () => {
    if (forgotPhone.length !== 10) return
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
    setForgotStep("otp")
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

  const handleOtpVerify = async () => {
    if (otp.join("").length !== 6) return
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
    setForgotStep("newPassword")
  }

  const handleResetPassword = async () => {
    if (newPassword.length < 6 || newPassword !== confirmPassword) return
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
    setForgotStep("success")
    setTimeout(() => {
      setShowForgotPassword(false)
      setForgotStep("phone")
      setForgotPhone("")
      setOtp(["", "", "", "", "", ""])
      setNewPassword("")
      setConfirmPassword("")
    }, 2000)
  }

  const benefits = [
    { icon: <Shield className="w-6 h-6" />, title: "Secure Payments", desc: "100% safe & secure transactions" },
    { icon: <Truck className="w-6 h-6" />, title: "Free Installation", desc: "At your doorstep, pan India" },
    { icon: <Star className="w-6 h-6" />, title: "Quality Assured", desc: "Only verified tyres" },
    { icon: <Award className="w-6 h-6" />, title: "Best Prices", desc: "Guaranteed lowest prices" },
  ]

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-[#DC2626] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">T+</span>
              </div>
              <span className="text-2xl font-bold text-[#1F2937]">TyrePlus</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937] mb-2">Welcome Back! 👋</h1>
            <p className="text-[#6B7280]">Sign in to continue to your account</p>
          </div>

          <AnimatePresence mode="wait">
            {!showForgotPassword ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleLogin}
                className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8"
              >
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg text-[#DC2626] text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Mobile Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                    <span className="absolute left-12 top-1/2 -translate-y-1/2 text-[#6B7280]">+91</span>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="Enter mobile number"
                      className="w-full pl-20 pr-4 py-3 border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-12 pr-12 py-3 border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end mb-6">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-[#DC2626] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading || mobile.length !== 10 || password.length < 6}
                  className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    mobile.length === 10 && password.length >= 6 && !isLoading
                      ? "bg-[#DC2626] text-white hover:bg-[#B91C1C]"
                      : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E5E7EB]" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-[#9CA3AF]">New to TyrePlus?</span>
                  </div>
                </div>

                {/* Register Link */}
                <Link
                  href="/register"
                  className="block w-full py-3 text-center border-2 border-[#DC2626] text-[#DC2626] rounded-xl font-semibold hover:bg-[#FEF2F2] transition-colors"
                >
                  Create an Account
                </Link>
              </motion.form>
            ) : (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8"
              >
                {/* Back Button */}
                <button
                  onClick={() => {
                    setShowForgotPassword(false)
                    setForgotStep("phone")
                    setForgotPhone("")
                    setOtp(["", "", "", "", "", ""])
                  }}
                  className="text-[#6B7280] hover:text-[#1F2937] mb-4 flex items-center gap-1"
                >
                  ← Back to login
                </button>

                <AnimatePresence mode="wait">
                  {forgotStep === "phone" && (
                    <motion.div key="phone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-xl font-bold text-[#1F2937] mb-2">Forgot Password? 🔐</h2>
                      <p className="text-[#6B7280] mb-6">Enter your mobile number to receive OTP</p>
                      <div className="relative mb-4">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">+91</span>
                        <input
                          type="tel"
                          value={forgotPhone}
                          onChange={(e) => setForgotPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="Enter mobile number"
                          className="w-full pl-14 pr-4 py-3 border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
                          autoFocus
                        />
                      </div>
                      <button
                        onClick={handleForgotPhoneSubmit}
                        disabled={forgotPhone.length !== 10 || isLoading}
                        className={`w-full py-3 rounded-xl font-semibold transition-all ${
                          forgotPhone.length === 10 && !isLoading
                            ? "bg-[#DC2626] text-white hover:bg-[#B91C1C]"
                            : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                        }`}
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                        ) : (
                          "Send OTP"
                        )}
                      </button>
                    </motion.div>
                  )}

                  {forgotStep === "otp" && (
                    <motion.div key="otp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-xl font-bold text-[#1F2937] mb-2">Verify OTP 📱</h2>
                      <p className="text-[#6B7280] mb-6">OTP sent to +91 {forgotPhone}</p>
                      <div className="flex justify-center gap-2 mb-4">
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
                        onClick={handleOtpVerify}
                        disabled={otp.join("").length !== 6 || isLoading}
                        className={`w-full py-3 rounded-xl font-semibold transition-all ${
                          otp.join("").length === 6 && !isLoading
                            ? "bg-[#DC2626] text-white hover:bg-[#B91C1C]"
                            : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                        }`}
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                        ) : (
                          "Verify OTP"
                        )}
                      </button>
                      <div className="mt-4 text-center">
                        <button
                          onClick={() => timer === 0 && setTimer(30)}
                          disabled={timer > 0}
                          className={`text-sm ${timer > 0 ? "text-[#9CA3AF]" : "text-[#DC2626] hover:underline"}`}
                        >
                          {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {forgotStep === "newPassword" && (
                    <motion.div
                      key="newPassword"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h2 className="text-xl font-bold text-[#1F2937] mb-2">Create New Password 🔑</h2>
                      <p className="text-[#6B7280] mb-6">Enter your new password below</p>
                      <div className="space-y-4">
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New password"
                            className="w-full pl-12 pr-4 py-3 border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
                          />
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full pl-12 pr-4 py-3 border border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent"
                          />
                        </div>
                        {confirmPassword && newPassword !== confirmPassword && (
                          <p className="text-sm text-[#DC2626]">Passwords do not match</p>
                        )}
                      </div>
                      <button
                        onClick={handleResetPassword}
                        disabled={newPassword.length < 6 || newPassword !== confirmPassword || isLoading}
                        className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all ${
                          newPassword.length >= 6 && newPassword === confirmPassword && !isLoading
                            ? "bg-[#DC2626] text-white hover:bg-[#B91C1C]"
                            : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
                        }`}
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                        ) : (
                          "Reset Password"
                        )}
                      </button>
                    </motion.div>
                  )}

                  {forgotStep === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-[#1F2937] mb-2">Password Reset! 🎉</h2>
                      <p className="text-[#6B7280]">Redirecting to login...</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right Side - Benefits */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] p-12 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Why TyrePlus? 🛞</h2>
          <p className="text-white/80 mb-8">Join thousands of happy customers who trust us for their tyre needs.</p>

          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                  <p className="text-white/70">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-white/30 rounded-full border-2 border-white/50" />
                ))}
              </div>
              <span className="text-white font-semibold">50,000+ Happy Customers</span>
            </div>
            <p className="text-white/80 text-sm italic">
              "Best tyre shopping experience! Free installation saved me so much hassle." - Rahul M.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
