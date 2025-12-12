import { Order } from "@/types/order";

export const mockOrders: Order[] = [
    {
        id: "ORD-2023-001",
        date: "2023-10-25",
        status: "delivered",
        total: 12500,
        paymentMethod: "Credit Card",
        shippingAddress: {
            name: "Rahul Sharma",
            street: "123, MG Road, Indiranagar",
            city: "Bangalore",
            state: "Karnataka",
            zip: "560038",
            phone: "+91 98765 43210"
        },
        items: [
            {
                id: "prod-1",
                name: "Michelin Primacy 4ST",
                price: 6250,
                quantity: 2,
                image: "/placeholder.svg?height=80&width=80",
                variant: "195/65 R15"
            }
        ]
    },
    {
        id: "ORD-2023-002",
        date: "2023-11-05",
        status: "processing",
        total: 3400,
        paymentMethod: "UPI",
        shippingAddress: {
            name: "Rahul Sharma",
            street: "123, MG Road, Indiranagar",
            city: "Bangalore",
            state: "Karnataka",
            zip: "560038",
            phone: "+91 98765 43210"
        },
        items: [
            {
                id: "prod-2",
                name: "Bosch Wiper Blades",
                price: 850,
                quantity: 4,
                image: "/placeholder.svg?height=80&width=80",
                variant: "21 inch"
            }
        ]
    },
    {
        id: "ORD-2023-003",
        date: "2023-11-12",
        status: "shipped",
        total: 18900,
        paymentMethod: "Net Banking",
        shippingAddress: {
            name: "Rahul Sharma",
            street: "Flat 402, Sunshine Apartments",
            city: "Mysore",
            state: "Karnataka",
            zip: "570001",
            phone: "+91 98765 43210"
        },
        items: [
            {
                id: "prod-3",
                name: "Bridgestone Sturdo",
                price: 9450,
                quantity: 2,
                image: "/placeholder.svg?height=80&width=80",
                variant: "205/60 R16"
            }
        ]
    },
    {
        id: "ORD-2023-004",
        date: "2023-09-15",
        status: "cancelled",
        total: 4500,
        paymentMethod: "Cash on Delivery",
        shippingAddress: {
            name: "Rahul Sharma",
            street: "123, MG Road, Indiranagar",
            city: "Bangalore",
            state: "Karnataka",
            zip: "560038",
            phone: "+91 98765 43210"
        },
        items: [
            {
                id: "prod-4",
                name: "Car Cover - Waterproof",
                price: 4500,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80"
            }
        ]
    }
];

export const mockRequests = [
    {
        id: "TYR12345",
        tyreName: "MRF ZVTS 185/65 R15",
        vehicle: "Maruti Swift VXi",
        quotesReceived: 5,
        bestQuote: 4299,
        requestedAt: "2 hours ago",
        status: "Active"
    },
    {
        id: "TYR12346",
        tyreName: "Apollo Alnac 4G 195/55 R16",
        vehicle: "Hyundai i20 Asta",
        quotesReceived: 3,
        bestQuote: 5100,
        requestedAt: "1 day ago",
        status: "Active"
    },
    {
        id: "TYR12347",
        tyreName: "Bridgestone B290 165/80 R14",
        vehicle: "Maruti Swift Dzire",
        quotesReceived: 8,
        bestQuote: 3850,
        requestedAt: "3 days ago",
        status: "Completed"
    }
];

export const mockVehicles = [
    {
        id: "VEH-001",
        name: "Maruti Swift VXi",
        registration: "MH 02 AB 1234",
        year: 2020,
        tyreSize: "185/65 R15",
        lastService: "Dec 4, 2025",
        isPrimary: true,
        image: "/placeholder.svg?height=80&width=80" // Placeholder for now
    },
    {
        id: "VEH-002",
        name: "Honda City ZX",
        registration: "MH 12 CD 5678",
        year: 2018,
        tyreSize: "175/65 R14",
        lastService: "Nov 20, 2025",
        isPrimary: false,
        image: "/placeholder.svg?height=80&width=80" // Placeholder for now
    }
];
