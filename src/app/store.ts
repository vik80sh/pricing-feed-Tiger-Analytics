import { configureStore } from "@reduxjs/toolkit";
import pricingReducer from "./../features/pricing/pricingSlice";

export const store = configureStore({
  reducer: {
    pricing: pricingReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
