import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/baseQueryWithAuth";

/* ===========================
   TYPES
=========================== */

export interface OrderItem {
  _id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  orderId: string;
  restaurantId: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  paymentMode: "online" | "cash";
  createdAt: string;
}

/* ✅ Response type */
export interface OrderListResponse {
  success: boolean;
  data: {
    orders: Order[];
  };
}


export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery,
  tagTypes: ["Order"],
  endpoints: (builder) => ({

    getOrders: builder.query<OrderListResponse, string>({
      query: (restaurantId) => ({
        url: `/comman/read/all-order/single-returnats/${restaurantId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

  }),
});

export const { useGetOrdersQuery } = orderApi;