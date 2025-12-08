export type Restaurant = {
    id: string;
    name: string;
    phone: string;
    address: string;
};

export type OrderStatus =
    | "WAITING_FOR_BILL"
    | "BILL_RECEIVED"
    | "PAID"
    | "PICKED_UP"
    | "DELIVERED";

export type Order = {
    orderId: string;
    restaurant: Restaurant;
    billAmount?: number;
    platformFee?: number;
    deliveryFee?: number;
    total?: number;
    status: OrderStatus;
    pickupOtp?: string;
    deliveryOtp?: string;
};
