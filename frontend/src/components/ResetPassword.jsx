import React, { useState } from "react";
import { useParams } from "react-router-dom";
import showSuccessMsg from "./notification";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import { resetPassword } from "../redux/apiRequests";

function ResetPassword() {
	const { token } = useParams();
	const dispatch = useDispatch();
	const [success, setSuccess] = useState("");

	const formik = useFormik({
		initialValues: {
			password: "",
			confirmPassword: ""
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.required("Required")
				.matches(
					/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{6,19}$/,
					"Minimum 6 characters, at least one letter, one number, one special character"
				),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref("password"), ""], "password must match")
				.required("Required")
		}),
		onSubmit: (values) => {
			const newPassword = values.password;
			resetPassword(newPassword, dispatch, setSuccess, token);
		}
	});
	return (
		<Grid
			container
			spacing={2}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: "100vh" }}
		>
			<Grid item>
				<Typography variant="h3">Reset Your Password</Typography>
			</Grid>

			<Grid item>
				<Box
					sx={{
						width: 300,
						p: 5,
						borderRadius: 5,
						boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
					}}
				>
					<form onSubmit={formik.handleSubmit}>
						<Grid container spacing={3} direction="column">
							<Grid item>{success && showSuccessMsg(success)}</Grid>

							<Grid item>
								<TextField
									required
									fullWidth
									id="password"
									name="password"
									label="Password"
									type="password"
									value={formik.values.password}
									onChange={formik.handleChange}
									error={formik.touched.password && Boolean(formik.errors.password)}
									helperText={formik.touched.password && formik.errors.password}
								/>
								{/* <p>{error && error.substring(50).replace("to be unique","already existed")}</p> */}
							</Grid>

							<Grid item>
								<TextField
									required
									fullWidth
									id="confirmPassword"
									name="confirmPassword"
									label="Confirm Password"
									type="password"
									value={formik.values.confirmPassword}
									onChange={formik.handleChange}
									error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
									helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
								/>
							</Grid>

							<Grid item>
								<Button color="primary" variant="contained" fullWidth type="submit">
									Reset Password
								</Button>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Grid>
		</Grid>
	);
}

export default ResetPassword;
