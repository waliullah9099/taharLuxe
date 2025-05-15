import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/products/productSlice";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/users/userSlice";
import orderReducer from "./features/orders/orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    auth: authReducer,
    user: userReducer,
    orders: orderReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;