import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface PricingRecord {
  storeId: string;
  sku: string;
  productName: string;
  price: number;
  date: string;
}

interface PricingState {
  records: PricingRecord[];
}

const initialState: PricingState = {
  records: [],
};

const pricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {
    setRecords(state, action: PayloadAction<PricingRecord[]>) {
      state.records = action.payload;
    },
    addRecord(state, action: PayloadAction<PricingRecord>) {
      state.records.push(action.payload);
    },
    updateRecord(state, action: PayloadAction<PricingRecord>) {
      const index = state.records.findIndex(
        (r) =>
          r.storeId === action.payload.storeId &&
          r.sku === action.payload.sku
      );
      if (index !== -1) {
        state.records[index] = action.payload;
      }
    },
    deleteRecord(
      state,
      action: PayloadAction<{ storeId: string; sku: string }>
    ) {
      state.records = state.records.filter(
        (r) =>
          !(
            r.storeId === action.payload.storeId &&
            r.sku === action.payload.sku
          )
      );
    },
    clearRecords(state) {
      state.records = [];
    },
  },
});

export const {
  setRecords,
  addRecord,
  updateRecord,
  deleteRecord,
  clearRecords,
} = pricingSlice.actions;

export default pricingSlice.reducer;
