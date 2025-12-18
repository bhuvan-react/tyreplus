"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const categories = [
    {
        id: "car-tyres",
        title: "Car Tyres",
        image: "/mrf-car-tyre.jpg",
        link: "/search?vehicleType=4W",
        gradient: "from-blue-500 to-cyan-400",
        bg: "bg-blue-50",
        text: "text-blue-700",
    },
    {
        id: "auto-tyres",
        title: "Auto Tyres",
        image: "/auto-icon.png",
        link: "/search?vehicleType=3W",
        gradient: "from-amber-400 to-orange-500",
        bg: "bg-orange-50",
        text: "text-orange-700",
    },
    {
        id: "two-wheeler-tyres",
        title: "2-Wheeler Tyres",
        image: "/motorcycle-tyre.jpg",
        link: "/search?vehicleType=2W",
        gradient: "from-red-500 to-rose-400",
        bg: "bg-red-50",
        text: "text-red-700",
    },
    {
        id: "alloy-wheels",
        title: "Alloy Wheels",
        image: "/alloy-wheel-new.jpg",
        link: "/search?category=alloy-wheels",
        gradient: "from-violet-500 to-purple-500",
        bg: "bg-purple-50",
        text: "text-purple-700",
    },
]

export function ShopByCategory() {
    return (
        <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <h2 className="text-2xl font-bold text-[#1F2937]">Shop by Category</h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={category.link}
                                className={`group relative block w-full h-32 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-100 ${category.bg}`}
                            >
                                {/* Decorative Gradient Blob */}
                                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${category.gradient} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`} />

                                <div className="absolute top-4 left-4 z-10">
                                    <h3 className={`text-lg font-bold ${category.text} leading-tight`}>
                                        {category.title.replace(" ", "\n")}
                                    </h3>
                                </div>

                                <div className="absolute -bottom-2 -right-2 w-28 h-28 transition-transform duration-300 group-hover:scale-110 drop-shadow-lg">
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
