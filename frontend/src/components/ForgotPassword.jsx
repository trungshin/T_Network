import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import showSuccessMsg from "./notification";
import { forgotPassword } from "../redux/apiRequests";
import { useDispatch } from "react-redux";
import GridLayout from "./GridLayout";

function ForgotPassword() {
	const [success, setSuccess] = useState("");
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSumit = () => {
		forgotPassword(email, dispatch, setSuccess);
	};

	return (
		<GridLayout heading={"Forgot Your Password?"}>
			<Grid container spacing={3} direction="column">
				<Grid item>
					{/* {err && showErrMsg(err)} */}
					{success && showSuccessMsg(success)}
					<label htmlFor="email">Enter your email address</label>
				</Grid>

				<Grid item>
					<TextField
						required
						fullWidth
						id="email"
						name="email"
						label="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Grid>

				<Grid item>
					<Button fullWidth variant="contained" onClick={handleSumit}>
						Verify your email
					</Button>
					<Button fullWidth variant="contained" onClick={() => navigate("/")} style={{ marginTop: 4 }}>
						Back
					</Button>
				</Grid>
			</Grid>
		</GridLayout>
	);
}

export default ForgotPassword;
