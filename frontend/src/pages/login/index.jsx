import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequests";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";

const Login = () => {
	const user = useSelector((state) => state.auth.login?.currentUser);
	const error = useSelector((state) => state.auth.login?.message);
	const [email, setEmail] = useState("email");
	const [password, setPassword] = useState("password");
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
	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, []);
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
				<Typography variant="h3">Login</Typography>
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
								<TextField
									required
									fullWidth
									id="password"
									name="password"
									label="Password"
									type="password"
									onChange={(e) => setPassword(e.target.value)}
								/>
								{error && <p>{error}</p>}
								<Typography marginTop={2}>
									<Link style={{ textDecoration: "none", color: "unset" }} to="/user/forgotPassword">
										Forgot password?
									</Link>
								</Typography>
							</Grid>

							<Grid item>
								<Button color="primary" variant="contained" fullWidth type="submit">
									Login
								</Button>
								<Typography marginTop={2}>
									Don't have an account yet?
									<Link to="/register">Register Now</Link>
								</Typography>
							</Grid>
						</Grid>
					</form>
					{/* {error && <Typography> {error} </Typography>} */}
				</Box>
			</Grid>
		</Grid>
	);
};

export default Login;
