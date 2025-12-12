import { Skeleton } from "@/components/ui/skeleton"

export function TyreCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden h-full flex flex-col">
            {/* Image Section Skeleton */}
            <div className="relative bg-[#F9FAFB] p-6 aspect-square">
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <Skeleton className="w-3/4 h-3/4 rounded-lg" />
                </div>
            </div>

            {/* Content Section Skeleton */}
            <div className="p-5 flex-1 flex flex-col">
                {/* Brand & Model */}
                <div className="mb-2 space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <Skeleton className="h-4 w-24" />
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <Skeleton className="h-6 w-16 rounded-md" />
                    <Skeleton className="h-6 w-20 rounded-md" />
                    <Skeleton className="h-6 w-14 rounded-md" />
                </div>

                {/* Price Chips */}
                <div className="flex items-center gap-3 mb-4 mt-auto">
                    <Skeleton className="flex-1 h-14 rounded-lg" />
                    <Skeleton className="flex-1 h-14 rounded-lg" />
                </div>

                {/* Button */}
                <Skeleton className="w-full h-12 rounded-xl" />
            </div>
        </div>
    )
}
