// src/Features/dessertSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDesserts = createAsyncThunk(
  "desserts/getDesserts",
  async () => {
    const res = await axios.get("http://localhost:5000/getDesserts");
    return res.data.desserts;
  }
);

const initialState = {
  desserts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const dessertSlice = createSlice({
  name: "desserts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDesserts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDesserts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.desserts = action.payload;
      })
      .addCase(getDesserts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default dessertSlice.reducer;
