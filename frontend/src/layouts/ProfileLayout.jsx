import { Box, Stack } from "@mui/material";
import React from "react";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar";

const ProfileLayout = ({ children }) => {
	return (
		<Box classNames="profile-layout">
			<Header />

			<Stack flexDirection="row">
				<Stack width="35%" paddingTop={2}>
					<SideBar />
				</Stack>
				<Box sx={{ padding: 2 }}>{children}</Box>
			</Stack>
		</Box>
	);
};

export default ProfileLayout;
