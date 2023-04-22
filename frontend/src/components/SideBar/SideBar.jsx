import React from "react";
import { useSelector } from "react-redux";
import { Box, Divider } from "@mui/material";
import MainNav from "./MainNav";
import OptionalNav from "./OptionalNav";
import Copyright from "./Copyright";

const SideBar = () => {
	const user = useSelector((state) => state.user.user?.currentUser);

	return (
		<Box
			sx={{
				position: "sticky",
				top: 85,
				left: 0,
				padding: 2,
				height: "calc(100vh - 100px)",
				overflowY: "scroll",

				"&::-webkit-scrollbar": {
					width: "10px"
				},

				"&::-webkit-scrollbar-track": {
					backgroundColor: "#fff"
				},

				"&::-webkit-scrollbar-thumb": {
					backgroundColor: "#fff",
					borderRadius: "10px",

					"&:hover": {
						backgroundColor: "#b4b0b0"
					}
				},

				":hover": {
					"&::-webkit-scrollbar-track": {
						backgroundColor: "#f1f1f1"
					},

					"&::-webkit-scrollbar-thumb": {
						backgroundColor: "#cdc9c9"
					}
				},

				"& svg": {
					color: "#666"
				}
			}}
		>
			<MainNav user_id={user?._id} />

			<Divider sx={{ marginTop: 1, marginBottom: 1 }} />

			<OptionalNav />

			<Copyright />
		</Box>
	);
};

export default SideBar;
