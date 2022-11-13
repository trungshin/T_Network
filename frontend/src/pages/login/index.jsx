import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequests";
import { TextField, Button, Grid, Typography} from "@mui/material";
import GridLayout from "../../components/GridLayout";

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
		</GridLayout>
	);
};

export default Login;
