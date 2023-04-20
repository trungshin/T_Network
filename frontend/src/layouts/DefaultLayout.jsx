import { Box, Grid } from "@mui/material";
import React from "react";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar";

const DefaultLayout = ({ children }) => {
	return (
		<Box classNames="default-layout">
			<Header />

			<Grid container spacing={2}>
				<Grid item xs={2.5}>
					<SideBar />
				</Grid>
				<Grid item xs>
					{children}
				</Grid>
			</Grid>
		</Box>
	);
};

export default DefaultLayout;
