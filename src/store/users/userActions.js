import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../services/httpService";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await http.get("/users");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch users"
      );
    }
  }
);

export const deleteUserApi = createAsyncThunk(
  "users/deleteUserApi",
  async (userId, thunkAPI) => {
    try {
      await http.delete("/posts/1"); 
      return userId; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to delete user"
      );
    }
  }
);