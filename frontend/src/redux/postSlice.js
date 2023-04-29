import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
	name: "post",
	initialState: {
		allPosts: {
			posts: [],
			comments: [],
			postsLength: null,
			pending: false,
			error: false
		},
		onePost: {
			post: [],
			pending: false,
			error: false
		},
		userPost: {
			posts: null,
			pending: false,
			error: false
		},
		deletePost: {
			pending: false,
			error: null
		},
		createPost: {
			pending: false,
			error: null
		},
		interactPost: {
			pending: false,
			error: null,
			success: null
		}
	},
	reducers: {
		getAllPostStart: (state) => {
			state.allPosts.pending = true;
		},
		getAllPostSuccess: (state, action) => {
			state.allPosts.pending = false;
			state.allPosts.posts = action.payload;
		},
		getAllPostLengthSuccess: (state, action) => {
			state.allPosts.pending = false;
			state.allPosts.postsLength = action.payload;
		},
		getAllPostFailed: (state) => {
			state.allPosts.pending = false;
			state.allPosts.error = true;
		},
		getOnePostStart: (state) => {
			state.onePost.pending = true;
		},
		getOnePostSuccess: (state, action) => {
			state.onePost.post = action.payload;
		},
		getOnePostFailed: (state) => {
			state.onePost.error = true;
		},
		getUserPostStart: (state) => {
			state.userPost.pending = true;
		},
		getUserPostSuccess: (state, action) => {
			state.userPost.pending = false;
			state.userPost.posts = action.payload;
		},
		getUserPostFailed: (state) => {
			state.userPost.pending = false;
			state.userPost.error = true;
		},
		createPostStart: (state) => {
			state.createPost.pending = true;
			state.createPost.error = false;
		},
		createPostSuccess: (state) => {
			state.createPost.pending = false;
			state.createPost.error = false;
		},
		createPostFailed: (state) => {
			state.createPost.pending = false;
			state.createPost.error = true;
		},
		deletePostStart: (state) => {
			state.deletePost.pending = true;
		},
		deletePostSuccess: (state) => {
			state.deletePost.pending = false;
			state.deletePost.error = false;
		},
		deletePostFailed: (state) => {
			state.deletePost.error = true;
			state.deletePost.pending = false;
		},
		interactPostStart: (state) => {
			state.interactPost.pending = true;
			state.interactPost.success = false;
		},
		interactPostSuccess: (state, action) => {
			state.interactPost.pending = false;
			state.interactPost.error = false;
			state.interactPost.success = action.payload;
		},
		interactPostFailed: (state) => {
			state.interactPost.error = true;
			state.interactPost.success = false;
			state.interactPost.pending = false;
		},
		updatePostStart: (state) => {
			state.onePost.pending = true;
		},
		updatePostSuccess: (state, action) => {
			state.onePost.pending = false;
			state.onePost.error = false;
			state.onePost.post = action.payload;
		},
		updatePostError: (state) => {
			state.onePost.error = true;
			state.onePost.pending = false;
		}
	}
});

export const {
	createPostStart,
	createPostSuccess,
	createPostFailed,
	getAllPostStart,
	getAllPostSuccess,
	getAllPostLengthSuccess,
	getAllPostFailed,
	getOnePostStart,
	getOnePostSuccess,
	getOnePostFailed,
	getUserPostStart,
	getUserPostSuccess,
	getUserPostFailed,
	deletePostStart,
	deletePostFailed,
	deletePostSuccess,
	interactPostStart,
	interactPostSuccess,
	interactPostFailed,
	updatePostStart,
	updatePostSuccess,
	updatePostError
} = postSlice.actions;
export default postSlice.reducer;
