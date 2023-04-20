import { APIPaths } from "../utils/index";
import axios from "axios";
import {
	loginFailed,
	loginStart,
	loginSuccess,
	logoutFailed,
	logoutStart,
	logoutSuccess,
	registerFailed,
	registerStart,
	registerSuccess,
	activationEmailSuccess,
	activationEmailFailed,
	forgotPasswordSuccess,
	forgotPasswordFailed,
	resetPasswordSuccess,
	resetPasswordFailed
} from "./authSlice";
import {
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
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailed
} from "./userSlice";
import {
	createPostFailed,
	createPostStart,
	createPostSuccess,
	deletePostFailed,
	deletePostStart,
	deletePostSuccess,
	getAllPostFailed,
	getAllPostStart,
	getAllPostSuccess,
	getOnePostFailed,
	getOnePostStart,
	getOnePostSuccess,
	getUserPostFailed,
	getUserPostStart,
	getUserPostSuccess,
	interactPostFailed,
	interactPostStart,
	interactPostSuccess,
	updatePostStart,
	updatePostSuccess,
	updatePostError
} from "./postSlice";
import {
	createCommentFailed,
	createCommentStart,
	createCommentSuccess,
	getUserCommentStart,
	getUserCommentFailed,
	getUserCommentSuccess,
	deleteCommentFailed,
	deleteCommentStart,
	deleteCommentSuccess
} from "./commentSlice";

//AUTH
export const loginUser = async (user, dispatch, navigate, state) => {
	dispatch(loginStart());
	dispatch(updateStart());
	try {
		const res = await axios.post(`${APIPaths.Auth}/login`, user);
		dispatch(loginSuccess(res.data));
		dispatch(updateSuccess(res.data));
		navigate(state?.path || "/newsfeed");
	} catch (e) {
		dispatch(loginFailed(e.response.data));
		dispatch(updateError());
	}
};

export const registerUser = async (user, dispatch, setSuccess) => {
	dispatch(registerStart());
	try {
		const res = await axios.post(`${APIPaths.Auth}/register`, user);
		dispatch(registerSuccess(setSuccess(res.data)));
	} catch (e) {
		console.log(e.response.data);
		dispatch(registerFailed(e.response.data));
	}
};

export const activationEmail = async (activationToken, dispatch, setSuccess) => {
	try {
		const res = await axios.post(`${APIPaths.Auth}/activation`, {
			activationToken
		});
		dispatch(activationEmailSuccess(setSuccess(res.data)));
	} catch (e) {
		console.log(e.response.data);
		dispatch(activationEmailFailed(e.response.data));
	}
};

export const forgotPassword = async (email, dispatch, setSuccess) => {
	try {
		const res = await axios.post(`${APIPaths.Auth}/forgot`, { email });
		dispatch(forgotPasswordSuccess(setSuccess(res.data)));
	} catch (e) {
		console.log(e.response.data);
		dispatch(forgotPasswordFailed(e.response.data));
	}
};

export const resetPassword = async (newPassword, dispatch, setSuccess, token) => {
	try {
		const res = await axios.post(
			`${APIPaths.Auth}/reset`,
			{ password: newPassword },
			{
				headers: { token: `Bearer ${token}` }
			}
		);

		dispatch(resetPasswordSuccess(setSuccess(res.data)));
	} catch (e) {
		console.log(e.response.data);
		dispatch(resetPasswordFailed(e.response.data));
	}
};

export const logOutUser = async (dispatch, token, userId, navigate) => {
	dispatch(logoutStart());
	try {
		await axios.post(`${APIPaths.Auth}/logout`, userId, {
			headers: { token: `Bearer ${token}` }
		});
		dispatch(logoutSuccess());
		localStorage.clear();
		navigate("/");
	} catch (err) {
		dispatch(logoutFailed());
	}
};

export const getUser = async (dispatch, id, token) => {
	dispatch(getUserStart());
	try {
		const res = await axios.get(`${APIPaths.Users}/${id}`, {
			headers: { token: `Bearer ${token}` }
		});

		dispatch(getUserSuccess(res.data));
	} catch (err) {
		dispatch(getUserFailed());
	}
};
// export const getUser = async (dispatch, id, token) => {
// 	dispatch(getUserStart());
// 	try {
// 		const res = await axios.post(`${APIPaths.Users}/${id}`, {
// 			headers: { token: `Bearer ${token}` },
// 			data: {
// 				user_id: id
// 			}
// 		});

// 		dispatch(getUserSuccess(res.data));
// 	} catch (err) {
// 		dispatch(getUserFailed());
// 	}
// };

export const getCurrentUser = async (dispatch, id, token) => {
	dispatch(getCurrentUserStart());
	try {
		const res = await axios.get(`${APIPaths.Users}/${id}`, {
			headers: { token: `Bearer ${token}` }
		});
		console.log(res);
		dispatch(getCurrentUserSuccess(res.data));
	} catch (err) {
		dispatch(getCurrentUserFailed());
	}
};

export const updateUser = async (dispatch, user, id, token) => {
	dispatch(updateStart());
	try {
		const res = await axios.put(`${APIPaths.Users}/${id}`, user, {
			headers: { token: `Bearer ${token}` }
		});
		// console.log(res.config);
		dispatch(updateFollowSuccess(res.data));
	} catch (err) {
		console.log(err);
		dispatch(updateError());
	}
};

export const searchUsername = async (dispatch, search, token, setResulsts) => {
	dispatch(getUserStart());
	try {
		const res = await axios.get(`${APIPaths.Search}?username=${search}`, {
			headers: { token: `Bearer ${token}` }
		});
		if (search === "") {
			setResulsts([]);
		} else {
			setResulsts(res.data);
		}
	} catch (err) {
		dispatch(getUserFailed());
	}
};

export const getAllUsers = async (dispatch, token) => {
	dispatch(getAllUsersStart());
	try {
		const res = await axios.get(`${APIPaths.Users}`, {
			headers: { token: `Bearer ${token}` }
		});
		dispatch(getAllUsersSuccess(res.data));
	} catch (err) {
		dispatch(getAllUsersFailed());
	}
};

export const followUser = async (dispatch, id, userId, token) => {
	dispatch(followUserStart());
	try {
		const res = await axios.put(`${APIPaths.Users}/${id}/follow`, userId, {
			headers: { token: `Bearer ${token}` }
		});
		const update = {
			...res.data,
			accessToken: token
		};
		dispatch(followUserSuccess(res.data));
		dispatch(updateFollowSuccess(update));
	} catch (err) {
		dispatch(followUserFailed());
	}
};

export const unFollowUser = async (dispatch, id, userId, token) => {
	dispatch(followUserStart());
	try {
		const res = await axios.put(`${APIPaths.Users}/${id}/unfollow`, userId, {
			headers: { token: `Bearer ${token}` }
		});
		const update = {
			...res.data,
			accessToken: token
		};
		dispatch(followUserSuccess(res.data));
		dispatch(updateFollowSuccess(update));
	} catch (err) {
		dispatch(followUserFailed());
	}
};

export const deleteUser = async (dispatch, token, id) => {
	dispatch(deleteUserStart());
	try {
		await axios.delete(`${APIPaths.Users}/${id}`, {
			headers: { token: `Bearer ${token}` }
		});
		dispatch(deleteUserSuccess());
	} catch (err) {
		dispatch(deleteUserFailed());
	}
};

export const createPost = async (dispatch, token, post, postToggle) => {
	dispatch(createPostStart());
	try {
		await axios.post(`${APIPaths.Posts}`, post, {
			headers: { token: `Bearer ${token}` }
		});
		dispatch(postToggle(false));
		dispatch(createPostSuccess());
	} catch (err) {
		dispatch(createPostFailed());
	}
};

export const updatePost = async (dispatch, token, id, newPost) => {
	dispatch(updatePostStart());
	try {
		const res = await axios.put(`${APIPaths.Posts}/${id}`, newPost, {
			headers: { token: `Bearer ${token}` }
		});
		dispatch(updatePostSuccess(res.data));
	} catch (err) {
		console.log(err);
		dispatch(updatePostError());
	}
};

export const deletePost = async (dispatch, token, id, userId) => {
	dispatch(deletePostStart());
	try {
		await axios.delete(`${APIPaths.Posts}/${id}`, {
			headers: { token: `Bearer ${token}` },
			data: { userId: userId }
		});
		dispatch(deletePostSuccess());
	} catch (err) {
		dispatch(deletePostFailed());
	}
};

// export const getAllPosts = async (
// 	dispatch,
// 	token,
// 	pageNumber,
// 	setHasMore
//   ) => {
// 	dispatch(getAllPostStart());
// 	try {
// 	  const res = await axios.get(
// 		`${APIPaths.Posts}?page=${pageNumber}&limit=2`,
// 		{
// 		  headers: { token: `Bearer ${token}` },
// 		}
// 	  );
// 	  setHasMore(res.data.results.length > 0);
// 	  dispatch(getAllPostSuccess(res.data.results));
// 	} catch (err) {
// 	  dispatch(getAllPostFailed());
// 	}
//   };

// pageNumber
export const getAllPosts = async (dispatch, token, page) => {
	dispatch(getAllPostStart());
	try {
		const res = await axios.get(
			// `${APIPaths.Posts}?page=${pageNumber}&limit=4`,
			`${APIPaths.Posts}?page=${page}&limit=10`,
			{
				headers: { token: `Bearer ${token}` }
			}
		);
		// if (!res.data.results.length) {
		// 	setWasLastList(true);
		// 	return;
		// }
		// setPrevPage(page);
		dispatch(getAllPostSuccess(res.data.results));
	} catch (e) {
		dispatch(getAllPostFailed());
	}
};

export const getOnePost = async (dispatch, token, postId) => {
	dispatch(getOnePostStart());
	try {
		const res = await axios.get(`${APIPaths.Posts}/${postId}`, {
			headers: { token: `Bearer ${token}` }
		});
		dispatch(getOnePostSuccess(res.data));
	} catch (err) {
		dispatch(getOnePostFailed());
	}
};

export const getUserPost = async (dispatch, token, userId) => {
	dispatch(getUserPostStart());
	try {
		const res = await axios.get(`${APIPaths.Posts}/user/${userId}`, {
			headers: { token: `Bearer ${token}` }
		});
		dispatch(getUserPostSuccess(res.data));
	} catch (err) {
		dispatch(getUserPostFailed());
	}
};

export const likePost = async (dispatch, token, postId, userId) => {
	dispatch(interactPostStart());
	try {
		await axios.patch(`${APIPaths.Posts}/${postId}/like`, userId, {
			headers: { token: `Bearer ${token}` }
		});
		dispatch(interactPostSuccess());
	} catch (err) {
		dispatch(interactPostFailed());
	}
};

export const unLikePost = async (dispatch, token, postId, userId) => {
	// const newPost = {...post, likes: post.likes.filter(like => like._id !== userId)}
	dispatch(interactPostStart());
	try {
		await axios.patch(`${APIPaths.Posts}/${postId}/unlike`, userId, {
			headers: { token: `Bearer ${token}` }
		});
		dispatch(interactPostSuccess());
	} catch (err) {
		dispatch(interactPostFailed());
	}
};

export const createComment = async (dispatch, token, id, comment) => {
	dispatch(createCommentStart());
	try {
		await axios.post(`${APIPaths.Posts}/comment/${id}`, comment, {
			headers: { token: `Bearer ${token}` }
		});
		dispatch(createCommentSuccess());
	} catch (err) {
		dispatch(createCommentFailed());
	}
};

export const getUserComment = async (dispatch, token, postId) => {
	dispatch(getUserCommentStart());
	try {
		const res = await axios.get(`${APIPaths.Posts}/comment/${postId}`, {
			headers: { token: `Bearer ${token}` }
		});
		dispatch(getUserCommentSuccess(res.data));
	} catch (err) {
		dispatch(getUserCommentFailed());
	}
};

export const deleteComment = async (dispatch, token, id, postUserId) => {
	dispatch(deleteCommentStart());
	try {
		await axios.delete(`${APIPaths.Posts}/comment/${id}`, {
			headers: { token: `Bearer ${token}` },
			data: { postUserId: postUserId }
		});
		dispatch(deleteCommentSuccess());
	} catch (err) {
		dispatch(deleteCommentFailed());
	}
};
