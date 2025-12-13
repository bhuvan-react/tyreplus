import { fetchWithMockFallback } from "../api-client"
import { API_CONFIG } from "../api-config"
import { mockOrders, mockRequests } from "../mock-data"
import { Order } from "@/types/order"

export interface Request {
    id: string
    tyreName: string
    vehicle: string
    quotesReceived: number
    bestQuote: number
    requestedAt: string
    status: string
}

export const orderService = {
    getOrders: async () => {
        return fetchWithMockFallback<Order[]>(API_CONFIG.ENDPOINTS.ORDERS.GET_ALL, {}, mockOrders)
    },

    getRequests: async () => {
        return fetchWithMockFallback<Request[]>(API_CONFIG.ENDPOINTS.REQUESTS.GET_ALL, {}, mockRequests)
    },

    getOrderById: async (id: string) => {
        const mockOrder = mockOrders.find((o) => o.id === id)
        return fetchWithMockFallback<Order | undefined>(
            API_CONFIG.ENDPOINTS.ORDERS.GET_BY_ID(id),
            {},
            mockOrder
        )
    },
}
