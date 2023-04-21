import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import RequireAuth from "./components/RequireAuth/RequireAuth";
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
									{/* <RequireAuth> */}
									<Layout>
										<Page />
									</Layout>
									{/* </RequireAuth> */}
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
