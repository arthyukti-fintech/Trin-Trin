export interface OrderItem {
  _id: string;
  itemName: string;
  price: number;
  quantity: number;
}

export interface OrderPlace {
  _id: string;
  items: OrderItem[];
  status: string;
  createdAt: string;
  timeSlot: string;
}
