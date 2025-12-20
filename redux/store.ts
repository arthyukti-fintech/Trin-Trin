import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { profileApi } from "./services/profileApi";
import { resturantApi } from "./services/resturantApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [resturantApi.reducerPath]: resturantApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            profileApi.middleware,
            resturantApi.middleware
        ),
});