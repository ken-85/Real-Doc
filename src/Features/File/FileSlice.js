import { createSlice } from "@reduxjs/toolkit";
import { uploadFile } from "./FileActions";

const initialState = {
  file: null,
  isLoading: false,
  name: null,
  message: null,
  error: null,
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFile: (state, action) => {
      state.file = action.payload;
    },
    setFileName: (state, action) => {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadFile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(uploadFile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setFile, setFileName } = fileSlice.actions;
export default fileSlice.reducer;
