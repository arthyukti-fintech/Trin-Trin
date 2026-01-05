import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/baseQueryWithAuth";

/* ===========================
   TYPES
=========================== */

export interface MenuImage {
  imageUrl: string;
  hash: string;
  _id: string;
}

export interface MenuItem {
  _id: string;
  restaurant: string;
  menuName?: string;
  description?: string;
  price?: number;
  isVeg: boolean;
  category: string;
  image: MenuImage[];
  maxMenuItems: number | null;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MenuResponse {
  statusCode: number;
  message: string;
  data: {
    menuList: MenuItem[];
  };
}

/* ===========================
   API
=========================== */

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery,
  tagTypes: ["Menu"],
  endpoints: (builder) => ({
    // 🍽️ Get menu by restaurant ID
    getMenuByRestaurantId: builder.query<MenuResponse, string>({
      query: (restaurantId) => ({
        url: `/menu/read/${restaurantId}`,
        method: "GET",
      }),
      providesTags: ["Menu"],
    }),
  }),
});




export const {
  useGetMenuByRestaurantIdQuery,
} = menuApi;
