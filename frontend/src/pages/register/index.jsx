import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/apiRequests";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextField, Button, Grid, Typography} from "@mui/material";
import showSuccessMsg from "../../components/notification";
import GridLayout from "../../components/GridLayout";

const Register = () => {
	const dispatch = useDispatch();
	const [success, setSuccess] = useState("");

	const formik = useFormik({
		initialValues: {
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
			success: ""
		},
		validationSchema: Yup.object({
			username: Yup.string().max(20, "Maximum 20 characters").min(3, "Minimum 3 characters").required("Required"),
			email: Yup.string()
				.max(50, "Maximum 50 character")
				.required("Required")
				.matches(
					// /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					"Please enter valid email address"
				),
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
			const newUser = {
				email: values.email,
				username: values.username,
				password: values.password,
				success: success
			};
			registerUser(newUser, dispatch, setSuccess);
		}
	});

	return (
		<GridLayout heading={"Register"}>
			<form onSubmit={formik.handleSubmit}>
				<Grid container spacing={3} direction="column">
					<Grid item>{success && showSuccessMsg(success)}</Grid>

					<Grid item>
						<TextField
							required
							fullWidth
							id="email"
							name="email"
							label="Email"
							value={formik.values.email}
							onChange={formik.handleChange}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
						/>
					</Grid>

					<Grid item>
						<TextField
							required
							fullWidth
							id="username"
							name="username"
							label="Username"
							type="Username"
							value={formik.values.username}
							onChange={formik.handleChange}
							error={formik.touched.username && Boolean(formik.errors.username)}
							helperText={formik.touched.username && formik.errors.username}
						/>
					</Grid>

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
							Create account
						</Button>
						<Typography marginTop={2} marginLeft={5}>
							{" "}
							Already have an account?
							<Link to="/">Log in</Link>
						</Typography>
					</Grid>
				</Grid>
			</form>
		</GridLayout>
	);
};

export default Register;
