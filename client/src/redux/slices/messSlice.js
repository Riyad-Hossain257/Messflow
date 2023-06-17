import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ManagerService from "../services/manager.service";

////////////////////////// MessInfo  ////////////////////////
export const createMess = createAsyncThunk(
  "man/createMess",
  async (messInfo, thunkAPI) => {
    try {
      await ManagerService.createMess(messInfo);
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

export const getMessInfo = createAsyncThunk(
  "man/getMessInfo",
  async (args, thunkAPI) => {
    try {
      const data = await ManagerService.getMessInfo();

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

export const updateMessInfo = createAsyncThunk(
  "man/updateMess",
  async (updatedData, thunkAPI) => {
    try {
      const data = await ManagerService.updateMessInfo(updatedData);
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

////////////////////////// Expense  ////////////////////////
export const createExpense = createAsyncThunk(
  "man/createExpense",
  async (expenseInfo, thunkAPI) => {
    try {
      await ManagerService.createExpense(expenseInfo);
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

export const getMonthlyExpense = createAsyncThunk(
  "man/getMonthlyExpense",
  async ({ month, year }, thunkAPI) => {
    try {
      const data = await ManagerService.getMonthlyExpense({ month, year });

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

export const updateExpense = createAsyncThunk(
  "man/updateExpense",
  async (updatedData, thunkAPI) => {
    try {
      const data = await ManagerService.updateExpense(updatedData);
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

////////////////////////// User  ////////////////////////

export const getUser = createAsyncThunk(
  "man/getUser",
  async (args, thunkAPI) => {
    try {
      const data = await ManagerService.getAllUser();

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

export const removeUser = createAsyncThunk(
  "man/removeUser",
  async (_id, thunkAPI) => {
    try {
      await ManagerService.removeUser(_id);
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

////////////////////////// Bills  ////////////////////////

export const createBill = createAsyncThunk(
  "man/createBill",
  async (billData, thunkAPI) => {
    try {
      await ManagerService.createBill(billData);
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

export const getMonthlyBill = createAsyncThunk(
  "man/getMonthlyBill",
  async ({ month, year }, thunkAPI) => {
    try {
      const data = await ManagerService.getMonthlyBill({ month, year });

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

export const updateBill = createAsyncThunk(
  "man/updateBill",
  async (updatedData, thunkAPI) => {
    try {
      const data = await ManagerService.updateBill(updatedData);
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

export const removeBill = createAsyncThunk(
  "man/removeBill",
  async (_id, thunkAPI) => {
    try {
      await ManagerService.removeBill(_id);
      // return { apatrments: data };
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

////////////////////////// Meal  ////////////////////////
export const updateMeal = createAsyncThunk(
  "man/updateMeal",
  async (updatedData, thunkAPI) => {
    try {
      const data = await ManagerService.updateMeal(updatedData);
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
  messInfo: {},
  monthlyExpense: [],
  monthlyBill: [],
  allusers: [],
};

const managerSlice = createSlice({
  name: "man",
  initialState,
  extraReducers: {
    ////////////////////////// MessInfo  ////////////////////////
    [createMess.pending]: (state, action) => {
      state.isPending = true;
    },
    [createMess.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [createMess.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    [getMessInfo.pending]: (state, action) => {
      state.isPending = true;
    },
    [getMessInfo.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.messInfo = action.payload;
    },
    [getMessInfo.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
      state.messInfo = {};
    },
    [updateMessInfo.pending]: (state, action) => {
      state.isPending = true;
    },
    [updateMessInfo.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [updateMessInfo.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    ////////////////////////// Expense  ////////////////////////
    [createExpense.pending]: (state, action) => {
      state.isPending = true;
      state.isSuccess = false;
    },
    [createExpense.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [createExpense.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    [getMonthlyExpense.pending]: (state, action) => {
      state.isPending = true;
    },
    [getMonthlyExpense.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.monthlyExpense = action.payload;
    },
    [getMonthlyExpense.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
      state.monthlyExpense = [];
    },

    [updateExpense.pending]: (state, action) => {
      state.isPending = true;
    },
    [updateExpense.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [updateExpense.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    ////////////////////////// user  ////////////////////////
    [getUser.pending]: (state, action) => {
      state.isPending = true;
      state.isSuccess = false;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.allusers = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
      state.allusers = [];
    },

    [removeUser.pending]: (state, action) => {
      state.isPending = true;
      state.isSuccess = false;
    },
    [removeUser.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [removeUser.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    ////////////////////////// Bills  ////////////////////////
    [createBill.pending]: (state, action) => {
      state.isPending = true;
      state.isSuccess = false;
    },
    [createBill.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [createBill.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    [getMonthlyBill.pending]: (state, action) => {
      state.isPending = true;
    },
    [getMonthlyBill.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
      state.monthlyBill = action.payload;
    },
    [getMonthlyBill.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
      state.monthlyBill = [];
    },

    [updateBill.pending]: (state, action) => {
      state.isPending = true;
    },
    [updateBill.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [updateBill.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },
    [removeBill.pending]: (state, action) => {
      state.isPending = true;
      state.isSuccess = false;
    },
    [removeBill.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [removeBill.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },

    ////////////////////////// Bills  ////////////////////////

    [updateMeal.pending]: (state, action) => {
      state.isPending = true;
    },
    [updateMeal.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isPending = false;
    },
    [updateMeal.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isPending = false;
    },
  },
});

const { reducer } = managerSlice;
export default reducer;
