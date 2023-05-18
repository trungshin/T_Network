import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	login: {
		currentUser: null,
		error: false,
		isFetching: false,
		success: false,
		message: null
	},
	register: {
		error: false,
		isFetching: false,
		success: false,
		successMsg: null,
		errorMsg: null
	},
	activationEmail: {
		error: false,
		success: false
	},
	forgotPassword: {
		error: false,
		success: false
	},
	resetPassword: {
		error: false,
		success: false
	},
	logout: {
		error: false,
		isFetching: false,
		success: false
	}
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginStart: (state) => {
			state.login.isFetching = true;
		},
		loginSuccess: (state, action) => {
			state.login.isFetching = false;
			state.login.error = false;
			state.login.success = true;
			state.login.currentUser = action.payload;
		},
		loginFailed: (state, action) => {
			state.login.isFetching = false;
			state.login.error = true;
			state.login.success = false;
			state.login.message = action.payload;
		},
		registerStart: (state) => {
			state.register.isFetching = true;
		},
		registerSuccess: (state, action) => {
			state.register.isFetching = false;
			state.register.success = true;
			state.register.error = false;
			state.register.successMsg = action.payload;
		},
		registerFailed: (state, action) => {
			state.register.isFetching = false;
			state.register.success = false;
			state.register.error = true;
			state.register.errorMsg = action.payload;
		},
		activationEmailSuccess: (state) => {
			state.activationEmail.success = true;
			state.activationEmail.error = false;
		},
		activationEmailFailed: (state) => {
			state.activationEmail.success = false;
			state.activationEmail.error = true;
		},
		forgotPasswordSuccess: (state) => {
			state.forgotPassword.success = true;
			state.forgotPassword.error = false;
		},
		forgotPasswordFailed: (state) => {
			state.forgotPassword.success = false;
			state.forgotPassword.error = true;
		},
		resetPasswordSuccess: (state) => {
			state.resetPassword.success = true;
			state.resetPassword.error = false;
		},
		resetPasswordFailed: (state) => {
			state.resetPassword.success = false;
			state.resetPassword.error = true;
		},
		logoutStart: (state) => {
			state.logout.isFetching = true;
		},
		logoutSuccess: (state) => {},
		logoutFailed: (state) => {
			state.logout.isFetching = false;
			state.logout.error = true;
			state.logout.success = false;
		}
	}
});

export const {
	loginStart,
	loginSuccess,
	loginFailed,
	registerStart,
	registerSuccess,
	registerFailed,
	activationEmailSuccess,
	activationEmailFailed,
	forgotPasswordSuccess,
	forgotPasswordFailed,
	resetPasswordSuccess,
	resetPasswordFailed,
	logoutStart,
	logoutSuccess,
	logoutFailed
} = authSlice.actions;
export default authSlice.reducer;
