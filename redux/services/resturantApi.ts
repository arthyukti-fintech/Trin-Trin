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
  isCloudKitchen?: boolean;
  freeDelivery?: boolean;
  deliveryFee?: number;
  rating?: number;
  totalRatings?: number;
  createdAt?: string;
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

export interface RestaurantResponse {
  success: boolean;
  data: {
    restaurants: Restaurant[];
  };
}

export interface RestaurantQueryParams {
  filterBy?:
  | "all"
  | "freeDelivery"
  | "fastDelivery"
  | "topRated"
  | "cloudKitchen"
  | "newlyOpened";
  isVegOnly?: boolean;
  search?: string;
}

/* ===========================
   API
=========================== */

export const resturantApi = createApi({
  reducerPath: "resturantApi",
  baseQuery,
  tagTypes: ["Restaurant"],
  endpoints: (builder) => ({
    getAllRestaurants: builder.query<
      RestaurantResponse,
      RestaurantQueryParams | undefined
    >({
      query: (params) => {
        // ✅ Strip out default/empty values so they don't pollute the URL
        const cleanParams: Record<string, string | boolean> = {};

        if (params?.filterBy && params.filterBy !== "all") {
          cleanParams.filterBy = params.filterBy;
        }

        if (params?.isVegOnly === true) {
          cleanParams.isVegOnly = true;
        }

        if (params?.search && params.search.trim() !== "") {
          cleanParams.search = params.search.trim();
        }

        // 🔍 Debug — remove once confirmed working
        console.log("📡 API URL: /restaurants/getall");
        console.log("📦 Params being sent:", cleanParams);
        console.log("🔗 Full query string:", new URLSearchParams(
          Object.entries(cleanParams).map(([k, v]) => [k, String(v)])
        ).toString());

        return {
          url: "/restaurants/getall",
          method: "GET",
          params: Object.keys(cleanParams).length > 0 ? cleanParams : undefined,
        };
      },
      providesTags: ["Restaurant"],
    }),
  }),
});

export const { useGetAllRestaurantsQuery } = resturantApi;