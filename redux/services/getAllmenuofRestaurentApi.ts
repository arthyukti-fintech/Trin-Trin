import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/baseQueryWithAuth";

/* ===========================
   TYPES
=========================== */

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  restaurantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MenuResponse {
  statusCode: number;
  message: string;
  data: {
    menu: MenuItem[];
  };
}

/* ===========================
   API
=========================== */

export const getAllmenuofRestaurentApi = createApi({
  reducerPath: "getAllmenuofRestaurentApi",
  baseQuery,
  tagTypes: ["Menu"],
  endpoints: (builder) => ({

    /* GET MENU BY RESTAURANT ID */
    getMenuByRestaurantId: builder.query<MenuResponse, string>({
      query: (restaurantId) => ({
        url: `/menu/read/${restaurantId}`,
        method: "GET",
      }),
      providesTags: ["Menu"],
    }),

  }),
});

export const { useGetMenuByRestaurantIdQuery } =
  getAllmenuofRestaurentApi;
