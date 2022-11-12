import { createSlice } from "@reduxjs/toolkit";

export const navigateSlice = createSlice({
	name: "nav",
	initialState: {
		sidebar: {
			open: false
		},
		createpost: {
			open: false
		},
		deleteState: {
			status: false,
			open: false,
			id: 0
		},
		fullPost: {
			open: false,
			postId: null
		},
		commentState: {
			open: false,
			postId: null
		}
	},
	reducers: {
		sideBarToggle: (state, action) => {
			state.sidebar.open = action.payload;
		},
		createPostToggle: (state, action) => {
			state.createpost.open = action.payload;
		},
		setDelete: (state, action) => {
			state.deleteState = action.payload;
		},
		fullPostToggle: (state, action) => {
			state.fullPost = action.payload;
		},
		setComments: (state, action) => {
			state.commentState = action.payload;
		}
	}
});

export const { sideBarToggle, createPostToggle, setDelete, fullPostToggle, setComments } = navigateSlice.actions;
export default navigateSlice.reducer;
