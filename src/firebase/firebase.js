import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4bKNGlJ_7o8HF-decEaGojiEZd3lcZe4",
  authDomain: "dell-ef886.firebaseapp.com",
  projectId: "dell-ef886",
  storageBucket: "dell-ef886.appspot.com",
  messagingSenderId: "608550656691",
  appId: "1:608550656691:web:36519c4c68cec18c6aeec6",
  measurementId: "G-98SPHRD6TL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
export { db, app, auth };

const provider = new GoogleAuthProvider();

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (dispatch) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userId = result.user.uid;
      const email = result.user.email;
      const name = result.user.displayName;
      //   dispatch(register({ userId, email, name }));
      window.location.href = "/dashboard";
      return result.user;
    } catch (error) {
      console.log(error.message);
      throw error; // This will ensure that any error is propagated to the caller
    }
  }
);
