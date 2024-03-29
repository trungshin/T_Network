import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequests";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	TextField,
	Button,
	Grid,
	Typography,
	InputAdornment,
	IconButton,
	OutlinedInput,
	FormControl,
	InputLabel,
	Snackbar,
	Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GridLayout from "../../components/GridLayout";

const Login = () => {
	const user = useSelector((state) => state.auth.login?.currentUser);
	const error = useSelector((state) => state.auth.login?.message);
	const [email, setEmail] = useState("email");
	const [password, setPassword] = useState("password");
	const [showPassword, setShowPassword] = useState(false);
	// const errorNotify = () => toast.error(error, {
	// 	position: "top-center",
	// 	autoClose: 5000,
	// 	hideProgressBar: false,
	// 	closeOnClick: true,
	// 	pauseOnHover: true,
	// 	draggable: true,
	// 	progress: 0,
	// 	theme: "light",
	// 	});
	const [open, setOpen] = useState(false);
	const handleError = () => {
		if (error) {
			setOpen(true);	
		} else {
			setOpen(false);
		}
		return open;
	  };
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpen(false);
	  };

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogin = (e) => {
		e.preventDefault();
		const newUser = {
			email: email,
			password: password
		};
		loginUser(newUser, dispatch, navigate);
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, []);
	return (
		<GridLayout heading={"Login"}>
			<form onSubmit={handleLogin}>
				<Grid container spacing={3} direction="column">
					<Grid item>
						<TextField
							required
							fullWidth
							id="email"
							name="email"
							label="Email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Grid>

					<Grid item>
						<FormControl sx={{ width: 300 }} variant="outlined">
							<InputLabel htmlFor="password">Password</InputLabel>
							<OutlinedInput
								id="password"
								required
								fullWidth
								type={showPassword ? "text" : "password"}
								label="Password"
								onChange={(e) => setPassword(e.target.value)}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						
						<Typography marginTop={2}>
							<Link style={{ textDecoration: "none", color: "unset" }} to="/user/forgotPassword">
								Forgot password?
							</Link>
						</Typography>
					</Grid>

					<Grid item>
						<Button color="primary" variant="contained" fullWidth type="submit"  disabled={email && password ? false : true}>
							Login
						</Button>
						<Typography marginTop={2}>
							Don't have an account yet?
							<Link to="/register">Register Now</Link>
						</Typography>
					</Grid>
				</Grid>
			</form>
			{error &&
				<Snackbar
					autoHideDuration={6000}
					open={handleError}
					onClose={handleClose}
					anchorOrigin={{vertical: 'top', horizontal: 'center'}}
				>
					<Alert variant="filled" severity="warning" sx={{ width: '100%' }}>
						{error}
				  	</Alert>
				</Snackbar>
			}
			{/* <ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/> */}
			{/* {error && <Typography> {error} </Typography>} */}
		</GridLayout>
	);
};

export default Login;
