import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { AuthRoutes, PublicRoutes } from "./routes";
import RequireAuth from "./components/RequireAuth";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{PublicRoutes.map((route, index) => {
					const path = route.path;
					const Page = route.page;

					return (
						<Route
							exact
							key={index}
							path={path}
							element={
								<div className="T_Network_App">
									<Page />
								</div>
							}
						/>
					);
				})}
				
				{AuthRoutes.map((route, index) => {
					const path = route.path;
					const Layout = route.layout;
					const Page = route.page;

					return (
						<Route
							exact
							key={index}
							path={path}
							element={
								<RequireAuth>
									<div className="T_Network_App">
										<Layout>
											<Page />
										</Layout>
									</div>
								</RequireAuth>
							}
						/>
					);
				})}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
