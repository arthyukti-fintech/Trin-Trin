import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/baseQueryWithAuth";

interface LoginRequest {
    phoneNumber: string;
}

interface LoginResponse {
    success: boolean;
    message: string;
    data?: any;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => {
                return {
                    url: "auth/login",
                    method: "POST",
                    body,
                };
            },
        }),

        logout: builder.mutation<{ success: boolean; message: string }, void>({
            query: () => ({
                url: "auth/logout",
                method: "POST"
            })
        })
    }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;