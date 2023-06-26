import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';
import ModeratorService from '../services/moderator.service';
import pollService from '../services/poll.service';

export const createPoll = createAsyncThunk(
  'poll/createPoll',
  async (poll, thunkAPI) => {
    try {
      const data = await pollService.createPoll(poll);
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

export const getAllPoll = createAsyncThunk(
  'poll/getAllPoll',
  async (date, thunkAPI) => {
    try {
      const data = await pollService.getAllPoll(date);

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

export const deletePoll = createAsyncThunk(
  'poll/deletePoll',
  async (_id, thunkAPI) => {
    try {
      await pollService.removePoll(_id);
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

export const addVote = createAsyncThunk(
  'poll/addVote',
  async (vote, thunkAPI) => {
    try {
      const data = await pollService.addVote(vote);
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
  allPoll: [],
};

const pollSlice = createSlice({
  name: 'poll',
  initialState,
  extraReducers: {
    [createPoll.fulfilled]: (state, action) => {
      state.isSuccess = true;
      //   state.floors = action.payload.floors;
    },
    [createPoll.rejected]: (state, action) => {
      state.isSuccess = false;
    },

    [getAllPoll.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.allPoll = action.payload;
    },
    [getAllPoll.rejected]: (state, action) => {
      state.isSuccess = false;
      state.allPoll = [];
    },

    [deletePoll.fulfilled]: (state, action) => {
      state.isSuccess = true;
    },
    [deletePoll.rejected]: (state, action) => {
      state.isSuccess = false;
    },

    [addVote.fulfilled]: (state, action) => {
      state.isSuccess = true;
    },
    [addVote.rejected]: (state, action) => {
      state.isSuccess = false;
    },
  },
});

const { reducer } = pollSlice;
export default reducer;
