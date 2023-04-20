import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
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
import DefaultLayout from "./layouts/DefaultLayout";
import { publicRoutes } from "./routes";

function App() {
	return (
		// <Router>
		// 	<Box className="App">
		// 		<DefaultStyles>
		// 			<Routes>
		// 				<>
		// 					<Route path="/" element={<Login />} />
		// 					<Route path="/register" element={<Register />} />
		// 					<Route
		// 						path="/newsfeed"
		// 						element={
		// 							<RequireAuth>
		// 								<DefaultLayout>
		// 									<Newsfeed />
		// 								</DefaultLayout>
		// 							</RequireAuth>
		// 						}
		// 					/>

		// 					<Route
		// 						path="/user/:id"
		// 						element={
		// 							<RequireAuth>
		// 								<Profile />
		// 							</RequireAuth>
		// 						}
		// 					/>

		// 					<Route path="/user/activate/:activationToken" element={<ActivationEmail />} />

		// 					<Route path="/user/forgotPassword" element={<ForgotPassword />} />

		// 					<Route path="/user/reset/:token" element={<ResetPassword />} />
		// 				</>
		// 			</Routes>
		// 		</DefaultStyles>
		// 	</Box>
		// </Router>

		<BrowserRouter>
			<Routes>
				{publicRoutes.map((route, index) => {
					const path = route.path;
					const Layout = route.layout || DefaultLayout;
					const Page = route.page;
					return (
						<Route
							exact
							key={index}
							path={path}
							element={
								<div className="__nguyenphanviettrung">
									<Layout>
										<Page />
									</Layout>
								</div>
							}
						/>
					);
				})}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
