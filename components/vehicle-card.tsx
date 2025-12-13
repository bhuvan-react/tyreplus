import { Button } from "@/components/ui/button"
import { Car } from "lucide-react"

interface VehicleCardProps {
    vehicle: {
        id: string
        name: string
        registration: string
        year: number
        tyreSize: string
        lastService: string
        isPrimary: boolean
        image: string
    }
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
    return (
        <div className={`bg-white rounded-xl border p-6 shadow-sm relative ${vehicle.isPrimary ? "border-red-500 ring-1 ring-red-500" : ""}`}>
            {vehicle.isPrimary && (
                <span className="absolute top-4 right-4 bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white text-xs font-bold px-2 py-1 rounded-full">
                    Primary
                </span>
            )}

            <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-4xl">
                    {/* Using emoji as placeholder for car image based on design */}
                    {vehicle.name.includes("Swift") ? "🚗" : "🚙"}
                </div>
                <h3 className="text-lg font-bold text-[#1F2937]">{vehicle.name}</h3>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Registration:</span>
                    <span className="font-semibold text-[#1F2937] uppercase">{vehicle.registration}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Year:</span>
                    <span className="font-semibold text-[#1F2937]">{vehicle.year}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Tyre Size:</span>
                    <span className="font-semibold text-[#1F2937]">{vehicle.tyreSize}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Last Service:</span>
                    <span className="font-semibold text-[#1F2937]">{vehicle.lastService}</span>
                </div>
            </div>

            <div className="space-y-3">
                <Button variant="outline" className="w-full text-[#059669] border-[#059669] hover:bg-green-50">
                    Edit
                </Button>
                <Button variant="outline" className="w-full text-[#059669] border-[#059669] hover:bg-green-50">
                    Search Tyres
                </Button>
                {!vehicle.isPrimary && (
                    <Button variant="outline" className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                        Delete
                    </Button>
                )}
            </div>
        </div>
    )
}
