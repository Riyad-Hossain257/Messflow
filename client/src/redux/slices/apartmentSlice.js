import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ModeratorService from "../services/moderator.service";

export const createFloors = createAsyncThunk(
  "mod/createFloors",
  async (floors, thunkAPI) => {
    try {
      const data = await ModeratorService.createFloors(floors);
      return { apatrments: data };
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

export const addNewApartment = createAsyncThunk(
  "mod/addNewApartment",
  async (apartData, thunkAPI) => {
    try {
      await ModeratorService.addApartment(apartData);
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

export const allApartments = createAsyncThunk(
  "mod/getApartments",
  async (args, thunkAPI) => {
    try {
      const data = await ModeratorService.getApartments();

      return { apatrments: data };
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

export const update = createAsyncThunk(
  "mod/updateApartment",
  async (updatedData, thunkAPI) => {
    try {
      const data = await ModeratorService.updateApartment(updatedData);
      return { apatrments: data };
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

export const removeLevels = createAsyncThunk(
  "mod/removeLevels",
  async (apartmentId, thunkAPI) => {
    try {
      await ModeratorService.removeApartment(apartmentId);
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

// export const logout = createAsyncThunk("auth/logout", async () => {
//   await ModeratorService.logout();
// });
let apatrments;
const initialState = apatrments
  ? { isSuccess: true, apatrments }
  : { isSuccess: false, isAdded: false, apatrments: null };

const moderatorSlice = createSlice({
  name: "mod",
  initialState,
  extraReducers: {
    [createFloors.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      //   state.floors = action.payload.floors;
    },
    [createFloors.rejected]: (state, action) => {
      state.isSuccess = false;
      state.apatrments = null;
    },

    [addNewApartment.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      // state.apatrments = action.payload;
    },
    [addNewApartment.rejected]: (state, action) => {
      state.isSuccess = false;
      // state.apatrments = null;
    },

    [update.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
      // state.apatrments = action.payload;
    },
    [update.rejected]: (state, action) => {
      state.isSuccess = false;
      // state.apatrments = null;
    },

    [allApartments.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = false;
      state.apatrments = action.payload;
    },
    [allApartments.rejected]: (state, action) => {
      state.isSuccess = false;
      state.apatrments = null;
    },
    [removeLevels.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isAdded = true;
    },
    [removeLevels.rejected]: (state, action) => {
      state.isSuccess = false;
    },
  },
});

const { reducer } = moderatorSlice;
export default reducer;
