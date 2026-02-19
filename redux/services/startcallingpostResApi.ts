import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/baseQueryWithAuth";

/* ===========================
   TYPES
=========================== */

interface StartCallingRequest {
  id: string;          // dynamic id
  body?: any;          // optional if API needs payload
}

interface StartCallingResponse {
  success: boolean;
  message: string;
  data?: any;
}

/* ===========================
   API
=========================== */

export const startCallingApi = createApi({
  reducerPath: "startCallingApi",
  baseQuery,
  endpoints: (builder) => ({
    startCalling: builder.mutation<StartCallingResponse, string>({
      query: (id) => ({
        url: `/user/v1/call-exotel/${id}`,
        method: "POST",
      }),
    }),
  }),
});


export const { useStartCallingMutation } = startCallingApi;
