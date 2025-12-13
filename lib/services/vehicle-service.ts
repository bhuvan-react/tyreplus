import { fetchWithMockFallback } from "../api-client"
import { API_CONFIG } from "../api-config"
import { mockVehicles } from "../mock-data"

export interface Vehicle {
    id: string
    name: string
    registration: string
    year: number
    tyreSize: string
    lastService: string
    isPrimary: boolean
    image: string
}

export const vehicleService = {
    getVehicles: async () => {
        return fetchWithMockFallback<Vehicle[]>(API_CONFIG.ENDPOINTS.VEHICLES.GET_ALL, {}, mockVehicles)
    },

    addVehicle: async (vehicle: Omit<Vehicle, "id">) => {
        // For mock, we just return the vehicle with a new ID
        const newVehicle = { ...vehicle, id: `VEH-${Date.now()}` }
        return fetchWithMockFallback<Vehicle>(
            API_CONFIG.ENDPOINTS.VEHICLES.ADD,
            {
                method: "POST",
                body: JSON.stringify(vehicle),
            },
            newVehicle
        )
    },

    deleteVehicle: async (id: string) => {
        return fetchWithMockFallback<{ success: boolean }>(
            API_CONFIG.ENDPOINTS.VEHICLES.DELETE(id),
            { method: "DELETE" },
            { success: true }
        )
    },
}
