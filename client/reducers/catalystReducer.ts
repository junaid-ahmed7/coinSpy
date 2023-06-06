import { createAction, createReducer } from "@reduxjs/toolkit";

interface CatalystState {
  catalystStartWindow: number | string;
  catalyst: number | string;
  catalystEndWindow: number | string;
  minTokens: number;
  sharkAccounts: Transaction[];
}

type Transaction = [
  string,
  {
    bought: number;
    firstPurchase: Date;
    sold: number;
  }
];

export const setCatalyst = createAction<number>("catalyst/setcatalyst");
export const setCatalystStart = createAction<number>(
  "catalyst/setcatalyststart"
);
export const setCatalystEnd = createAction<number>("catalyst/setcatalystend");
export const setTokens = createAction<number>("catalyst/settokens");
export const setSharkAccounts = createAction<Array<Transaction>>(
  "catalyst/setsharkaccounts"
);
export const resetState = createAction<number>("catalyst/resetstate");

const initialState: CatalystState = {
  catalystStartWindow: "2023-06-01T00:00",
  catalyst: "2023-06-01T00:00",
  catalystEndWindow: "2023-06-01T00:00",
  minTokens: 0,
  sharkAccounts: [],
};

const catalystReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCatalyst, (state, action) => {
      state.catalyst = action.payload;
    })
    .addCase(setCatalystStart, (state, action) => {
      state.catalystStartWindow = action.payload;
    })
    .addCase(setCatalystEnd, (state, action) => {
      state.catalystEndWindow = action.payload;
    })
    .addCase(setTokens, (state, action) => {
      state.minTokens = action.payload;
    })
    .addCase(setSharkAccounts, (state, action) => {
      state.sharkAccounts = action.payload;
    })
    .addCase(resetState, () => {
      return initialState;
    });
});

export default catalystReducer;
