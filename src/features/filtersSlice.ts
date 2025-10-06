import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type TimePreset = "last7" | "last30" | "custom";
export interface CustomRange {
  from: string | null;
  to: string | null;
}
export interface FiltersState {
  timePreset: TimePreset;
  customRange: CustomRange;
  salesperson: "All" | "Alice" | "Bob" | "Charlie";
  user: "All" | "User1" | "User2" | "User3";
  salesView: "total" | "perSalesperson";
}

const initialState: FiltersState = {
  timePreset: "last7",
  customRange: { from: null, to: null },
  salesperson: "All",
  user: "All",
  salesView: "total",
};
const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setTimePreset(state, action: PayloadAction<TimePreset>) {
      state.timePreset = action.payload;
      if (action.payload !== "custom")
        state.customRange = { from: null, to: null };
    },
    setCustomRange(state, action: PayloadAction<CustomRange>) {
      state.customRange = action.payload;
      state.timePreset = "custom";
    },
    setSalesperson(state, action: PayloadAction<FiltersState["salesperson"]>) {
      state.salesperson = action.payload;
    },
    setUser(state, action: PayloadAction<FiltersState["user"]>) {
      state.user = action.payload;
    },
    setSalesView(state, action: PayloadAction<FiltersState["salesView"]>) {
      state.salesView = action.payload;
    },
  },
});
export const {
  setTimePreset,
  setCustomRange,
  setSalesperson,
  setUser,
  setSalesView,
} = slice.actions;
export default slice.reducer;
