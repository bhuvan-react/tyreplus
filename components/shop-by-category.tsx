"use client"

import Image from "next/image"
import Link from "next/link"

const categories = [
    {
        id: "car-tyres",
        title: "Car Tyres",
        image: "/mrf-car-tyre.jpg",
        link: "/search?vehicleType=4W",
    },
    {
        id: "bike-scooter-tyres",
        title: "Bike / Scooter Tyres",
        image: "/bike-tyre.jpeg",
        link: "/search?vehicleType=2W",
    },
    {
        id: "alloy-wheels",
        title: "Alloy Wheels",
        image: "/alloy-wheel.jpeg",
        link: "/search?category=alloy-wheels",
    },
]

export function ShopByCategory() {
    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-3">
                        Shop By Categories
                    </h2>
                    <p className="text-lg text-[#6B7280]">Get your Carts ready!</p>
                </div>

                {/* Categories Grid - Perfect 3 Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={category.link}
                            className="group block"
                        >
                            <div className="w-full bg-white rounded-xl border border-gray-200 hover:border-[#0D9488] hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
                                {/* Image Container - Reduced Height (Half) */}
                                <div className="w-full aspect-[2/1] flex items-center justify-center p-4 md:p-6 bg-gradient-to-br from-gray-50 to-white group-hover:from-[#F0FDFA] group-hover:to-white transition-all duration-300 relative overflow-hidden">
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <div className="w-[180px] h-[90px] md:w-[200px] md:h-[100px] flex items-center justify-center">
                                            <Image
                                                src={category.image}
                                                alt={category.title}
                                                width={200}
                                                height={100}
                                                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                                                style={{
                                                    objectFit: "contain",
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Category Title - Elegant Typography */}
                                <div className="px-4 pb-4 pt-3 bg-white">
                                    <h3 className="text-base md:text-lg font-semibold text-[#1F2937] group-hover:text-[#0D9488] transition-colors duration-300 text-center">
                                        {category.title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
