import { createAction, createReducer } from "@reduxjs/toolkit";

interface CatalystState {
  catalystWindow: number;
  catalystDate: number | string;
  catalystTime: number | string;
  minTokens: number;
}

export const setWindow = createAction<number>("catalyst/sethours");
export const setDate = createAction<number>("catalyst/setdate");
export const setTime = createAction<number>("catalyst/settime");
export const setTokens = createAction<number>("catalyst/settokens");
export const resetState = createAction<number>("catalyst/resetstate");

const initialState: CatalystState = {
  catalystWindow: 0,
  catalystDate: "",
  catalystTime: "",
  minTokens: 0,
};

const catalystReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setWindow, (state, action) => {
      state.catalystWindow = action.payload;
    })
    .addCase(setDate, (state, action) => {
      state.catalystDate = action.payload;
    })
    .addCase(setTime, (state, action) => {
      state.catalystTime = action.payload;
    })
    .addCase(setTokens, (state, action) => {
      state.minTokens = action.payload;
    })
    .addCase(resetState, () => {
      return initialState;
    });
});

export default catalystReducer;
