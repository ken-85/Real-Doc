/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Utils/Interceptor/AxiosInstance";

export const uploadFile = createAsyncThunk(
  "file/uploadFile",
  async ({ file, email, name }) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("file", new File([file], name));
      formData.append("name", name);
      console.log(name);
      const response = await axiosInstance.post("/files/uploadFile", formData);
      return response.data.message;
    } catch (error) {
      throw error;
    }
  }
);

export const getAllFiles = createAsyncThunk(
  "file/getAllFiles",
  async ({ email }) => {
    try {
      const response = await axiosInstance.get("/files/getAllFiles", {
        params: {
          email: email,
        },
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);
