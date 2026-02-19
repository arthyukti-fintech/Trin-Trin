import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { profileApi } from "./services/profileApi";
import { resturantApi } from "./services/resturantApi";
import { menuApi } from "./services/MenuApi";
import { orderApi } from "./services/getordersApi";
import { restaurentOwnerRestaurentsApi } from "./services/restaurentOwnerRestaurentsApi";
import { getAllmenuofRestaurentApi } from "./services/getAllmenuofRestaurentApi";
import { startCallingApi } from "./services/startcallingpostResApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [resturantApi.reducerPath]: resturantApi.reducer,
        [menuApi.reducerPath]: menuApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [restaurentOwnerRestaurentsApi.reducerPath]: restaurentOwnerRestaurentsApi.reducer,
        [getAllmenuofRestaurentApi.reducerPath]: getAllmenuofRestaurentApi.reducer,
        [startCallingApi.reducerPath]: startCallingApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            profileApi.middleware,
            resturantApi.middleware,
            menuApi.middleware,
            orderApi.middleware,
            restaurentOwnerRestaurentsApi.middleware,
            getAllmenuofRestaurentApi.middleware,
            startCallingApi.middleware

        ),
});