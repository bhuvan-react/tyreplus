import { fetchWithMockFallback } from "../api-client"
import { API_CONFIG } from "../api-config"

// Define types for Auth API
interface LoginResponse {
    success: boolean
    token?: string
    user?: any
    error?: string
}

interface OtpResponse {
    success: boolean
    message: string
    token?: string
    user?: any
    error?: string
}

export const authService = {
    // Quick Auth (Vehicle Selector)
    sendQuickOtp: async (mobile: string) => {
        return fetchWithMockFallback<OtpResponse>(
            API_CONFIG.ENDPOINTS.AUTH.QUICK.SEND_OTP,
            {
                method: "POST",
                body: JSON.stringify({ mobile }),
            },
            { success: true, message: "OTP sent successfully" }
        )
    },

    verifyQuickOtp: async (mobile: string, otp: string) => {
        // Mock user for fallback
        const mockUser = {
            id: "user_mock_123",
            name: "Guest User",
            mobile: mobile,
            role: "customer"
        }

        return fetchWithMockFallback<OtpResponse>(
            API_CONFIG.ENDPOINTS.AUTH.QUICK.VERIFY_OTP,
            {
                method: "POST",
                body: JSON.stringify({ mobile, otp }),
            },
            { success: true, message: "OTP verified", token: "mock_token_123", user: mockUser }
        )
    },

    // Full Login
    login: async (mobile: string, password: string) => {
        // Mock user for fallback
        const mockUser = {
            id: "user_mock_login",
            name: "John Doe",
            mobile: mobile,
            role: "customer"
        }

        return fetchWithMockFallback<LoginResponse>(
            API_CONFIG.ENDPOINTS.AUTH.LOGIN,
            {
                method: "POST",
                body: JSON.stringify({ mobile, password }),
            },
            { success: true, token: "mock_jwt_token", user: mockUser }
        )
    },

    // Registration
    sendRegisterOtp: async (mobile: string) => {
        return fetchWithMockFallback<OtpResponse>(
            API_CONFIG.ENDPOINTS.AUTH.REGISTER.SEND_OTP,
            {
                method: "POST",
                body: JSON.stringify({ mobile }),
            },
            { success: true, message: "OTP sent successfully" }
        )
    },

    completeRegistration: async (data: any) => {
        const mockUser = {
            id: `user_${Date.now()}`,
            name: data.name,
            mobile: data.mobile,
            pincode: data.pincode,
            city: data.city,
            state: data.state
        }

        return fetchWithMockFallback<LoginResponse>(
            API_CONFIG.ENDPOINTS.AUTH.REGISTER.COMPLETE,
            {
                method: "POST",
                body: JSON.stringify(data),
            },
            { success: true, token: "mock_reg_token", user: mockUser }
        )
    },
}
