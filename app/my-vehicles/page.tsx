import { VehicleCard } from "@/components/vehicle-card"
import { mockVehicles } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function MyVehiclesPage() {
    return (
        <div className="container mx-auto px-4 py-10">
            <main className="w-full">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        🚗 MY VEHICLES
                    </h1>
                    <Button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white rounded-lg hover:opacity-90 transition-opacity">
                        <Plus className="w-4 h-4 mr-2" /> Add Vehicle
                    </Button>
                </div>
                <p className="text-muted-foreground mb-8">
                    Manage your vehicle information for faster tyre searches
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockVehicles.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}

                    {/* Add New Vehicle Card */}
                    <button className="bg-red-50 rounded-xl border-2 border-dashed border-red-300 p-6 flex flex-col items-center justify-center min-h-[400px] hover:bg-red-100 transition-colors group">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Plus className="w-8 h-8 text-[#0D9488]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#1F2937] mb-2">Add New Vehicle</h3>
                        <p className="text-sm text-gray-500">Click to add another vehicle</p>
                    </button>
                </div>
            </main>
        </div>
    )
}
