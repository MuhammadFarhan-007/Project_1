import { createSlice } from "@reduxjs/toolkit";
import { deleteUserApi, fetchUsers } from "./userActions";

const initialState = {
  users: [],
  loading: false,
  error: null,
};


const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
// Delete user api Case

      .addCase(deleteUserApi.fulfilled, (state, action) => {
        const id = action.payload;
        state.users = state.users.filter((user) => user.id !== id);
      })
      .addCase(deleteUserApi.rejected, (state, action) => {
        alert("Delete failed: " + action.payload);
      });
  },
});

export default userSlice.reducer;