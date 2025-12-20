import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/baseQueryWithAuth";
import { Profile } from "@/app/types";

interface ProfileResponse {
    statusCode: number;
    message: string;
    data: Profile;
}

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery,
    tagTypes: ["Profile"],
    endpoints: (builder) => ({

        // 👤 Fetch logged-in user's profile
        getMyProfile: builder.query<ProfileResponse, void>({
            query: () => ({
                url: "api/profile/me",
                method: "GET",
            }),
            providesTags: ["Profile"],
        }),

        // ✏️ Update logged-in user's profile
        updateMyProfile: builder.mutation<ProfileResponse, Partial<Profile>>({
            query: (body) => ({
                url: "api/profile/me",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Profile"],
        }),
    }),
});

export const {
    useGetMyProfileQuery,
    useUpdateMyProfileMutation,
} = profileApi;
