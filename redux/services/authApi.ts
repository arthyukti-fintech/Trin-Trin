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
                console.log("Login request body:", body);

                return {
                    url: "auth/login",
                    method: "POST",
                    body,
                };
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;