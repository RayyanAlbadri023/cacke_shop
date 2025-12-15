import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/userSlice";
import dessertReducer from "./Features/dessertSlice"; 
import cartReducer from "./Features/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    desserts: dessertReducer,
    cart: cartReducer,   // ← هذا مهم
  },
});

