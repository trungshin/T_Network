import { createSlice } from "@reduxjs/toolkit";
import { EditData } from "./apiRequests";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		allUsers: {
			users: [],
			pending: false,
			error: false
		},
		followingsList: {
			usersList: [],
			pending: false,
			error: false
		},
		followersList: {
			usersList: [],
			pending: false,
			error: false
		},
		user: {
			currentUser: null,
			pending: false,
			error: false
		},
		otherUser: {
			otherUser: null,
			pending: false,
			error: false
		},
		followUser: {
			currentUser: null,
			pending: false,
			error: false
		},
		deleteUser: {
			pending: false,
			error: null
		}
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
		// getCurrentUserStart: (state) => {
		// 	state.user.pending = true;
		// },
		// getCurrentUserSuccess: (state, action) => {
		// 	state.user.pending = false;
		// 	state.user.currentUser = action.payload;
		// 	state.user.error = false;
		// },
		// getCurrentUserFailed: (state) => {
		// 	state.user.pending = false;
		// 	state.user.error = true;
		// },
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
		getFollowingsListStart: (state) => {
			state.followingsList.pending = false;
		},
		getFollowingsListSuccess: (state, action) => {
			state.followingsList.pending = false;
			state.followingsList.usersList = action.payload;
		},
		getFollowingsListFailed: (state) => {
			state.followingsList.pending = false;
			state.followingsList.error = true;
		},
		getFollowersListStart: (state) => {
			state.followersList.pending = false;
		},
		getFollowersListSuccess: (state, action) => {
			state.followersList.pending = false;
			state.followersList.usersList = action.payload;
		},
		getFollowersListFailed: (state) => {
			state.followersList.pending = false;
			state.followersList.error = true;
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
		deleteUserStart: (state) => {
			state.deleteUser.pending = true;
		},
		deleteUserSuccess: (state) => {
			state.deleteUser.pending = false;
			state.deleteUser.error = false;
		},
		deleteUserFailed: (state) => {
			state.deleteUser.error = true;
			state.deleteUser.pending = false;
		}
	}
});

export const {
	updateStart,
	updateSuccess,
	updateFollowSuccess,
	updateError,
	getUserStart,
	getUserSuccess,
	getUserFailed,
	// getCurrentUserStart,
	// getCurrentUserSuccess,
	// getCurrentUserFailed,
	getAllUsersStart,
	getAllUsersSuccess,
	getAllUsersFailed,
	getFollowingsListStart,
	getFollowingsListSuccess,
	getFollowingsListFailed,
	getFollowersListStart,
	getFollowersListSuccess,
	getFollowersListFailed,
	followUserStart,
	followUserSuccess,
	followUserFailed,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailed
} = userSlice.actions;
export default userSlice.reducer;
