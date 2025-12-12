export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    variant?: string;
}

export interface Address {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
}

export interface Order {
    id: string;
    date: string;
    status: OrderStatus;
    total: number;
    items: OrderItem[];
    shippingAddress: Address;
    paymentMethod: string;
}
