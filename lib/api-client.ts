import { API_CONFIG } from "./api-config"

interface ApiResponse<T> {
    data: T
    error?: string
    status: number
}

export async function fetchWithMockFallback<T>(
    endpoint: string,
    options: RequestInit = {},
    mockData?: T
): Promise<ApiResponse<T>> {
    // If MOCK_MODE is forced or no mockData provided (shouldn't happen in this pattern but safe to handle)
    if (API_CONFIG.MOCK_MODE && mockData !== undefined) {
        console.log(`[Mock API] Serving ${endpoint}`)
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800))
        return { data: mockData, status: 200 }
    }

    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        })

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`)
        }

        const data = await response.json()
        return { data, status: response.status }
    } catch (error) {
        console.warn(`[API Failed] ${endpoint} - Falling back to mock data`, error)

        if (mockData !== undefined) {
            return { data: mockData, status: 200 }
        }

        throw error
    }
}
