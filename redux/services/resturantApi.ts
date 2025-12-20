import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/baseQueryWithAuth";

interface Restaurant {
    _id: string;
    name: string;
    cuisine: string;
    address?: any;
    isActive: boolean;
}

interface RestaurantResponse {
    success: boolean;
    message: string;
    data: Restaurant[];
}

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
