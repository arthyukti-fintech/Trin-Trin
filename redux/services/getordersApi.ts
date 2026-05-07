import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/baseQueryWithAuth";

/* =====================================================
   ADMIN ORDER TYPES (Dashboard)
===================================================== */

export interface AdminOrderItem {
  _id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface AdminOrder {
  _id: string;
  orderId: string;
  restaurantId: string;
  userId: string;
  items: AdminOrderItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  paymentMode: "online" | "cash";
  createdAt: string;
}

export interface OrderListResponse {
  success: boolean;
  data: {
    orders: AdminOrder[];
  };
}

/* =====================================================
   CUSTOMER ORDER TYPES (App User Side)
===================================================== */

export interface CustomerOrderAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CustomerOrderRestaurant {
  id: string;
  name: string;
  address: CustomerOrderAddress;
}

export interface CustomerOrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface CustomerOrder {
  orderId: string;
  orderNumber: string;
  restaurant: CustomerOrderRestaurant;
  items: CustomerOrderItem[];
  totalAmount: number;
  status: string;
  preparationStatus?: string;
  statusMessage?: string;
  progressPercentage?: number;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  canCancel?: boolean;
  orderDate: string;
  completedAt?: string;
  isInProgress?: boolean;
}

export interface MyOrdersResponse {
  statusCode: number;
  message: string;
  data: {
    allOrderList: CustomerOrder[];
    inProgress: {
      count: number;
      orders: CustomerOrder[];
    };
    completed: {
      count: number;
      orders: CustomerOrder[];
    };
  };
}

export interface SingleOrderResponse {
  statusCode: number;
  message: string;
  data: CustomerOrder;
}

/* =====================================================
   RTK QUERY
===================================================== */

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery,
  tagTypes: ["Order"],
  endpoints: (builder) => ({

    /* =============================
       Admin - Get Orders
    ============================== */
    getOrders: builder.query<OrderListResponse, string>({
      query: (restaurantId) => ({
        url: `/comman/read/all-order/single-returnats/${restaurantId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    /* =============================
       Customer - Get My Orders
       (With Backend Filtering)
    ============================== */
    getMyOrders: builder.query<MyOrdersResponse, string | undefined>({
      query: (status) => ({
        url: `/user/read/my-all-orders`,
        method: "GET",
        params: status
          ? { progressOrderStatus: status }
          : undefined,
      }),
      providesTags: ["Order"],
    }),

    /* =============================
       Customer - Get Single Order
    ============================== */
    getSingleOrder: builder.query<SingleOrderResponse, string>({
      query: (orderId) => ({
        url: `/user/read/my-single-order/detail/${orderId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

  }),
});

export const {
  useGetOrdersQuery,
  useGetMyOrdersQuery,
  useGetSingleOrderQuery,
} = orderApi;
