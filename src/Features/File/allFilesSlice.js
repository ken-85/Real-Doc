import { createSlice } from "@reduxjs/toolkit";
import { getAllFiles } from "./FileActions";

const initialState = {
  files: [],
  isLoading: false,
  error: null,
};

const allFilesSlice = createSlice({
  name: "allFiles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllFiles.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getAllFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.files = action.payload;
    })
    .addCase(getAllFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
    })
  },
});

export default allFilesSlice.reducer;
