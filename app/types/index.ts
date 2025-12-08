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






export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Checkout: undefined;
  OrderStatus: { orderId?: string };
};

export type TabParamList = {
  Home: undefined;
  Menu: undefined;
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
};




export interface User {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  address?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  preparationTime: number;
  ingredients: string[];
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
  specialInstructions?: string;
}


export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}