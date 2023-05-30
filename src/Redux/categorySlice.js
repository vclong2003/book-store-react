import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await axios.get(`${api_endpoint}/category`);
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});
export default categorySlice.reducer;