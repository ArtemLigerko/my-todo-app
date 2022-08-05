//Redux-Slice
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface StatisticState {
  counterCreated: number;
  counterUpdated: number;
  counterDeleted: number;
}

const initialState: StatisticState = {
  counterCreated: 0,
  counterUpdated: 0,
  counterDeleted: 0,
}

export const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    createCount: (state, action: PayloadAction<number>) => {
      state.counterCreated += action.payload;
    },
    updateCount: (state, action: PayloadAction<number>) => {
      state.counterUpdated += action.payload;
    },
    deleteCount: (state, action: PayloadAction<number>) => {
      state.counterDeleted += action.payload;
    },
  },
})

export const { createCount, updateCount, deleteCount } = statisticSlice.actions;

export default statisticSlice.reducer;