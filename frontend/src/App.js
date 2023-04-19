import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Newsfeed from "./pages/newsFeed";
import Profile from "./pages/profile";
import ActivationEmail from "./components/ActivationEmail";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { Box } from "@mui/material";
import { DefaultStyles } from "./styles/DefaultStyles/GlobalStyles";

function App() {
	return (
		<Router>
			<Box className="App">
				<DefaultStyles>
					<Routes>
						<>
							<Route path="/" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route
								path="/newsfeed"
								element={
									<RequireAuth>
										<Newsfeed />
									</RequireAuth>
								}
							/>

							<Route
								path="/user/:id"
								element={
									<RequireAuth>
										<Profile />
									</RequireAuth>
								}
							/>

							<Route path="/user/activate/:activationToken" element={<ActivationEmail />} />

							<Route path="/user/forgotPassword" element={<ForgotPassword />} />

							<Route path="/user/reset/:token" element={<ResetPassword />} />
						</>
					</Routes>
				</DefaultStyles>
			</Box>
		</Router>
	);
}

export default App;
