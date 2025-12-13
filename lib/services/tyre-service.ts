import { fetchWithMockFallback } from "../api-client"
import { API_CONFIG } from "../api-config"
import { tyreData, type Tyre } from "../tyre-data"

export const tyreService = {
    getAllTyres: async () => {
        return fetchWithMockFallback<Tyre[]>(API_CONFIG.ENDPOINTS.TYRES.GET_ALL, {}, tyreData)
    },

    getTyreById: async (id: string) => {
        // For mock implementation, we filter the mock data
        const mockTyre = tyreData.find((t) => t.id === id)
        return fetchWithMockFallback<Tyre | undefined>(
            API_CONFIG.ENDPOINTS.TYRES.GET_BY_ID(id),
            {},
            mockTyre
        )
    },
}
