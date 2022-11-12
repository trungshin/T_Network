import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
// import {isEmail} from '../../utils/validation/Validation'
import showSuccessMsg from "./notification";
import { forgotPassword } from "../redux/apiRequests";
import { useDispatch } from "react-redux";

function ForgotPassword() {
	const [success, setSuccess] = useState("");
	const [email, setEmail] = useState("");
	// const [data, setData] = useState(initialState);
	const dispatch = useDispatch();

	const handleSumit = () => {
		forgotPassword(email, dispatch, setSuccess);
		// try {
		//     const res = await axios.post('/user/forgot', {email})

		//     return setData({...data, err: '', success: res.data.msg})
		// } catch (err) {
		//     err.response.data.msg && setData({...data, err:  err.response.data.msg, success: ''})
		// }
	};

	return (
		<div>
			<h2>Forgot Your Password?</h2>

			<div>
				{/* {err && showErrMsg(err)} */}
				{success && showSuccessMsg(success)}

				<label htmlFor="email">Enter your email address</label>
				<TextField
					required
					fullWidth
					id="email"
					name="email"
					label="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Button variant="contained" onClick={handleSumit}>
					Verify your email
				</Button>
			</div>
		</div>
	);
}

export default ForgotPassword;
