import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { PersonOutlined, NewspaperOutlined } from "@mui/icons-material";

const SideBar = () => {
	const user = useSelector((state) => state.user.user?.currentUser);

	const dummySidebar = [
		{ id: 1, name: "Newsfeed", icon: <NewspaperOutlined />, link: "/newsfeed" },
		{ id: 1, name: "Profile", icon: <PersonOutlined />, link: `/user/${user?._id}` }
	];

	return (
		<Box
			sx={{
				position: "sticky",
				top: 85,
				left: 0,
				// width: "100%",
				// height: "100vh",
				padding: 2,

				"& svg": {
					color: "#666"
				}
			}}
		>
			<Stack flexDirection="column">
				{dummySidebar.map((item, index) => {
					return (
						<Link to={item.link} key={index} className="link">
							<Stack
								flexDirection="row"
								justifyContent="start"
								alignItems="center"
								sx={{
									height: 45,
									padding: 1,
									borderRadius: 1,

									":hover": {
										backgroundColor: "#eee",

										"& svg, p": {
											color: "dodgerblue"
										}
									}
								}}
							>
								<Box
									sx={{
										display: "flex",
										alignContent: "center",
										justifyContent: "center",
										marginRight: 1,
										color: "#666"
									}}
								>
									{item.icon}
								</Box>
								<Box
									sx={{
										display: "flex",
										alignContent: "center",
										justifyContent: "center",
										color: "#666",
										textDecoration: "none"
									}}
								>
									<Typography>{item.name}</Typography>
								</Box>
							</Stack>
						</Link>
					);
				})}
			</Stack>
		</Box>
	);
};

export default SideBar;
