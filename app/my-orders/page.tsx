import { RequestCard } from "@/components/request-card"
import { mockRequests } from "@/lib/mock-data"
import { ClipboardList, CheckCircle2 } from "lucide-react"

export default function MyOrdersPage() {
    return (
        <div className="container mx-auto px-4 py-10">
            <main className="w-full">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                        <ClipboardList className="w-8 h-8 text-gray-600" />
                        MY DASHBOARD
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Track and manage all your tyre requests
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl">
                            🎯
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Active Requests</p>
                            <p className="text-3xl font-bold text-[#DC2626]">3</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-[#059669]" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Completed</p>
                            <p className="text-3xl font-bold text-[#DC2626]">12</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-2xl">
                            💰
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Total Saved</p>
                            <p className="text-3xl font-bold text-[#DC2626]">₹8,450</p>
                        </div>
                    </div>
                </div>

                {/* Recent Requests */}
                <div>
                    <h2 className="text-xl font-bold text-[#1F2937] mb-6">Recent Requests</h2>
                    <div className="space-y-6">
                        {mockRequests.length > 0 ? (
                            mockRequests.map((request) => (
                                <RequestCard key={request.id} request={request} />
                            ))
                        ) : (
                            <div className="text-center py-12 border rounded-lg bg-muted/20">
                                <h3 className="text-lg font-medium">No requests found</h3>
                                <p className="text-muted-foreground">You haven't made any requests yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
