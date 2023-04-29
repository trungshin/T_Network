import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
	name: "comment",
	initialState: {
		oneComment: {
			comment: [],
			pending: false,
			error: false
		},
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
		updateCommentStart: (state) => {
			state.oneComment.pending = true;
		},
		updateCommentSuccess: (state, action) => {
			state.oneComment.pending = false;
			state.oneComment.error = false;
			state.oneComment.comment = action.payload;
		},
		updateCommentError: (state) => {
			state.oneComment.error = true;
			state.oneComment.pending = false;
		},
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
	updateCommentStart,
	updateCommentSuccess,
	updateCommentFailed,
	deleteCommentStart,
	deleteCommentSuccess,
	deleteCommentFailed
} = commentSlice.actions;
export default commentSlice.reducer;
