export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    MOCK_MODE: process.env.NEXT_PUBLIC_MOCK_MODE === "true" || true, // Default to true for now
    ENDPOINTS: {
        TYRES: {
            GET_ALL: "/tyres",
            GET_BY_ID: (id: string) => `/tyres/${id}`,
        },
        VEHICLES: {
            GET_ALL: "/vehicles",
            ADD: "/vehicles",
            DELETE: (id: string) => `/vehicles/${id}`,
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
