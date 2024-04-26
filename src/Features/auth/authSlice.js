import { createSlice } from "@reduxjs/toolkit";
import { signInWithGoogle } from "../../firebase/firebase";

const initialState = {
  user: null,
  token: null,
  isSignedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isSignedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInWithGoogle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.isSignedIn = true;
      state.user = action.payload;
      state.token = action.payload.stsTokenManager.accessToken;
    });
    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setLogout } = authSlice.actions;
export default authSlice.reducer;
