export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://192.0.0.2:9090/api",
    MOCK_MODE: process.env.NEXT_PUBLIC_MOCK_MODE === "true" || false,
    ENDPOINTS: {
        AUTH: {
            QUICK: {
                SEND_OTP: "/auth/quick/send-otp",
                VERIFY_OTP: "/auth/quick/verify-otp",
            },
            LOGIN: "/auth/login",
            REGISTER: {
                SEND_OTP: "/auth/register/send-otp",
                COMPLETE: "/auth/register/complete",
            },
            PASSWORD_RESET: {
                SEND_OTP: "/auth/password-reset/send-otp",
                VERIFY_OTP: "/auth/password-reset/verify-otp",
                CONFIRM: "/auth/password-reset/confirm",
            },
        },
        USER: {
            PROFILE: "/user/profile",
        },
        VEHICLES: {
            MAKES: "/vehicles/makes",
            MODELS: "/vehicles/models",
            VARIANTS: "/vehicles/variants",
            // Keep generic ones for now if used elsewhere
            GET_ALL: "/vehicles",
            ADD: "/vehicles",
            DELETE: (id: string) => `/vehicles/${id}`,
        },
        LOCATION: {
            CHECK_PINCODE: "/location/check-pincode",
        },
        SELL_TYRES: {
            SUBMIT: "/sell-tyres/submit",
        },
        TYRES: {
            GET_ALL: "/tyres",
            GET_BY_ID: (id: string) => `/tyres/${id}`,
        },
        ORDERS: {
            GET_ALL: "/orders",
            GET_BY_ID: (id: string) => `/orders/${id}`,
        },
        REQUESTS: {
            GET_ALL: "/requests",
        },
    },
}
