import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { base_URL } from "../config/configURL";

export const baseQuery = fetchBaseQuery({
    baseUrl: base_URL,
    prepareHeaders: async (headers) => {
        // Always set content type
        headers.set("Content-Type", "application/json");

        // Get token from storage
        const token = await AsyncStorage.getItem("accessToken");

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});