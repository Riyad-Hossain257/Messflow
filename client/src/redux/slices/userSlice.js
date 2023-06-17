import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import UserService from "../services/user.service";

export const createMeal = createAsyncThunk(
  "user/createMeal",
  async (mealData, thunkAPI) => {
    try {
      const data = await UserService.createMeal(mealData);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getDailyMeals = createAsyncThunk(
  "man/getDailyMeals",
  async (args, thunkAPI) => {
    try {
      const data = await UserService.getDailyMeals();

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getMonthlyMeal = createAsyncThunk(
  "man/getMonthlyMeal",
  async (args, thunkAPI) => {
    try {
      const data = await UserService.getMonthlyMeal();

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAllMonthlyMeal = createAsyncThunk(
  "man/getAllMonthlyMeal",
  async ({ month, year }, thunkAPI) => {
    try {
      const data = await UserService.getMonthlyAllMeal({ month, year });

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getMonthlyMealRate = createAsyncThunk(
  "man/getMonthlyMealRate",
  async (args, thunkAPI) => {
    try {
      const data = await UserService.getMonthlyMealRate();

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getMonthlyUserBill = createAsyncThunk(
  "man/getMonthlyUserBill",
  async (args, thunkAPI) => {
    try {
      const data = await UserService.getMonthlyUserBill();

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getYearlyData = createAsyncThunk(
  "man/getYearlyData",
  async (args, thunkAPI) => {
    try {
      const data = await UserService.getYearlyData();

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  isSuccess: false,
  isPending: false,
  dailyMeals: [],
  monthlyUserMeal: [],
  allMonthlyMeal: [],
  monthlyMealRate: {},
  monthlyUserBill: {},
  yearlyData: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [createMeal.pending]: (state, action) => {
      state.isPending = true;
      state.isSuccess = false;
    },
    [createMeal.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [createMeal.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    [getDailyMeals.pending]: (state, action) => {
      state.isPending = true;
    },
    [getDailyMeals.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.dailyMeals = action.payload;
    },
    [getDailyMeals.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
      state.dailyMeals = [];
    },

    [getMonthlyMeal.pending]: (state, action) => {
      state.isPending = true;
    },
    [getMonthlyMeal.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.monthlyUserMeal = action.payload;
    },
    [getMonthlyMeal.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
      state.monthlyUserMeal = [];
    },

    [getAllMonthlyMeal.pending]: (state, action) => {
      state.isPending = true;
      state.isSuccess = false;
    },
    [getAllMonthlyMeal.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.allMonthlyMeal = action.payload;
    },
    [getAllMonthlyMeal.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
      state.allMonthlyMeal = [];
    },

    [getMonthlyMealRate.pending]: (state, action) => {
      state.isPending = true;
    },
    [getMonthlyMealRate.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.monthlyMealRate = action.payload;
    },
    [getMonthlyMealRate.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
      state.monthlyMealRate = {};
    },

    [getMonthlyUserBill.pending]: (state, action) => {
      state.isPending = true;
    },
    [getMonthlyUserBill.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.monthlyUserBill = action.payload;
    },
    [getMonthlyUserBill.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
      state.monthlyUserBill = {};
    },

    [getYearlyData.pending]: (state, action) => {
      state.isPending = true;
    },
    [getYearlyData.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.yearlyData = action.payload;
    },
    [getYearlyData.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
      state.yearlyData = {};
    },
  },
});

const { reducer } = userSlice;
export default reducer;
