import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
	name: "comment",
	initialState: {
		// userComments: {
		// 	comments: null,
		// 	pending: false,
		// 	success: false,
		// 	error: false
		// },
		createComments: {
			pending: false,
			success: false,
			error: false
		},
		deleteComments: {
			pending: false,
			success: false,
			error: false
		}
	},
	reducers: {
		createCommentStart: (state) => {
			state.createComments.pending = true;
			state.createComments.success = false;
			state.createComments.error = false;
		},
		createCommentSuccess: (state) => {
			state.createComments.pending = false;
			state.createComments.success = true;
		},
		createCommentFailed: (state) => {
			state.createComments.pending = false;
			state.createComments.error = true;
		},
		// getUserCommentStart: (state) => {
		// 	state.userComments.pending = true;
		// 	state.userComments.success = false;
		// 	state.userComments.error = false;
		// },
		// getUserCommentSuccess: (state, action) => {
		// 	state.userComments.pending = false;
		// 	state.userComments.success = true;
		// 	state.userComments.error = false;
		// 	state.userComments.comments = action.payload;
		// },
		// getUserCommentFailed: (state) => {
		// 	state.userComments.pending = false;
		// 	state.userComments.success = false;
		// 	state.userComments.error = true;
		// },
		deleteCommentStart: (state) => {
			state.deleteComments.pending = true;
			state.deleteComments.success = false;
			state.deleteComments.error = false;
		},
		deleteCommentSuccess: (state) => {
			state.deleteComments.pending = false;
			state.deleteComments.success = true;
		},
		deleteCommentFailed: (state) => {
			state.deleteComments.pending = false;
			state.deleteComments.error = true;
		}
	}
});

export const {
	createCommentStart,
	createCommentSuccess,
	createCommentFailed,
	// getUserCommentStart,
	// getUserCommentSuccess,
	// getUserCommentFailed,
	deleteCommentStart,
	deleteCommentSuccess,
	deleteCommentFailed
} = commentSlice.actions;
export default commentSlice.reducer;
