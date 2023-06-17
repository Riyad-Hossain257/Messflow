import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

export const reloadingOn = createAsyncThunk("reloadOn", async () => {
  return true;
});

export const reloadingOff = createAsyncThunk("reloadOff", async () => {
  return false;
});

const initialState = {
  isReload: false,
};

const reload = createSlice({
  name: "reload",
  initialState,
  extraReducers: {
    [reloadingOn.fulfilled]: (state, action) => {
      state.isReload = true;
    },
    [reloadingOff.fulfilled]: (state, action) => {
      state.isReload = false;
    },
  },
});

const { reducer } = reload;
export default reducer;
