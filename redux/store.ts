import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { profileApi } from "./services/profileApi";
import { resturantApi } from "./services/resturantApi";
import { menuApi } from "./services/MenuApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [resturantApi.reducerPath]: resturantApi.reducer,
         [menuApi.reducerPath]: menuApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            profileApi.middleware,
            resturantApi.middleware,
            menuApi.middleware
        ),
});