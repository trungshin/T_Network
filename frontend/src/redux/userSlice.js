import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: {
      users: [],
      pending: false,
      error: false,
    },
    user: {
      currentUser: null,
      pending: false,
      error: false,
    },
    otherUser: {
      otherUser: null,
      pending: false,
      error: false,
    },
    followUser: {
      currentUser: null,
      pending: false,
      error: false,
    },
  },
  reducers: {
    updateStart: (state) => {
      state.user.pending = true;
    },
    updateSuccess: (state, action) => {
      state.user.pending = false;
      state.user.error = false;
      state.user.currentUser = action.payload;
    },
    updateFollowSuccess: (state, action) => {
      state.otherUser.pending = false;
      state.otherUser.error = false;
      state.otherUser.otherUser = action.payload;
    },
    updateError: (state) => {
      state.user.error = true;
      state.user.pending = false;
    },
    getUserStart: (state) => {
      state.otherUser.pending = true;
    },
    getUserSuccess: (state, action) => {
      state.otherUser.pending = false;
      state.otherUser.otherUser = action.payload;
      state.otherUser.error = false;
    },
    getUserFailed: (state) => {
      state.otherUser.pending = false;
      state.otherUser.error = true;
    },
    getCurrentUserStart: (state) => {
      state.user.pending = true;
    },
    getCurrentUserSuccess: (state, action) => {
      state.user.pending = false;
      state.user.currentUser = action.payload;
      state.user.error = false;
    },
    getCurrentUserFailed: (state) => {
      state.user.pending = false;
      state.user.error = true;
    },
    getAllUsersStart: (state) => {
      state.allUsers.pending = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.allUsers.pending = false;
      state.allUsers.users = action.payload;
    },
    getAllUsersFailed: (state) => {
      state.allUsers.pending = false;
      state.allUsers.error = true;
    },
    followUserStart: (state) => {
      state.followUser.pending = false;
    },
    followUserSuccess: (state, action) => {
      state.followUser.currentUser = action.payload;
      state.followUser.pending = false;
    },
    followUserFailed: (state) => {
      state.followUser.pending = false;
      state.followUser.error = false;
    },
  },
});

export const {
  updateStart,
  updateSuccess,
  updateFollowSuccess,
  updateError,
  getUserStart,
  getUserSuccess,
  getUserFailed,
  getCurrentUserStart,
  getCurrentUserSuccess,
  getCurrentUserFailed,
  getAllUsersStart,
  getAllUsersSuccess,
  getAllUsersFailed,
  followUserStart,
  followUserSuccess,
  followUserFailed,
} = userSlice.actions;
export default userSlice.reducer;
