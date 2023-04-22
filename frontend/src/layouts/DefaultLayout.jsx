import { Box, Stack } from "@mui/material";
import React from "react";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";

const DefaultLayout = ({ children }) => {
	return (
		<Box classNames="default-layout">
			<Header />

			<Stack flexDirection="row">
				<Stack width="28%" paddingTop={2}>
					<SideBar />
				</Stack>
				<Box sx={{ padding: 2, width: "80%" }}>{children}</Box>
			</Stack>
		</Box>
	);
};

export default DefaultLayout;
