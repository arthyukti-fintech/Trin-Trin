import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/baseQueryWithAuth";

/* ===========================
   TYPES
=========================== */

export interface Restaurant {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

/* ✅ Response Type */
export interface RestaurantListResponse {
  success: boolean;
  data: {
    restaurants: Restaurant[];
  };
}

/* ===========================
   API
=========================== */

export const restaurentOwnerRestaurentsApi = createApi({
  reducerPath: "restaurentOwnerRestaurentsApi",
  baseQuery,
  tagTypes: ["Restaurant"],
  endpoints: (builder) => ({
    // 📦 Get all restaurants
    getAllRestaurants: builder.query<RestaurantListResponse, void>({
      query: () => ({
        url: "/comman/read/all-resturant",
        method: "GET",
      }),
      providesTags: ["Restaurant"],
    }),
  }),
});

export const { useGetAllRestaurantsQuery } =
  restaurentOwnerRestaurentsApi;
