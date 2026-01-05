import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/baseQueryWithAuth";

/* ===========================
   TYPES
=========================== */

export interface Restaurant {
  _id: string;
  name: string;
  cuisine: string;
  phoneNumber: string;
  averageDeliveryTime: string;
  priceForTwo: number;
  isVegOnly: boolean;
  isActive: boolean;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  images: {
    exterior?: string;
    interior?: string;
    menuCard?: string;
  };
}

/* 🔥 THIS WAS THE BUG */
export interface RestaurantResponse {
  success: boolean;
  data: {
    restaurants: Restaurant[];
  };
}

/* ===========================
   API
=========================== */

export const resturantApi = createApi({
  reducerPath: "resturantApi",
  baseQuery,
  tagTypes: ["Restaurant"],
  endpoints: (builder) => ({
    // 🍽️ Get all restaurants
    getAllRestaurants: builder.query<RestaurantResponse, void>({
      query: () => ({
        url: "/restaurants/getall",
        method: "GET",
      }),
      providesTags: ["Restaurant"],
    }),
  }),
});

export const {
  useGetAllRestaurantsQuery,
} = resturantApi;
