import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { PersonOutlined, NewspaperOutlined } from "@mui/icons-material";

const SideBar = () => {
	const user = useSelector((state) => state.user.user?.currentUser);

	return (
		<Box
			sx={{
				position: "sticky",
				top: 85,
				left: 0,
				padding: 2,

				"& svg": {
					color: "#666"
				}
			}}
		>
			<Pages user_id={user && user._id} />

			<Divider sx={{ marginTop: 1, marginBottom: 1 }} />
		</Box>
	);
};

export default SideBar;

const Groups = () => {
	const groups = [
		{ img: "", name: "", link: "" },
		{ img: "", name: "", link: "" },
		{ img: "", name: "", link: "" },
		{ img: "", name: "", link: "" },
		{ img: "", name: "", link: "" }
	];

	return (
		<Stack flexDirection="column">
			{groups.map((item, index) => {
				return (
					<Stack flexDirection="row" key={index}>
						<Box>
							<img src="" alt="" />
						</Box>
						<Typography>Tên nhóm</Typography>
					</Stack>
				);
			})}
		</Stack>
	);
};

const Pages = ({ user_id }) => {
	const dummySidebar = [
		{ id: 1, name: "Newsfeed", icon: <NewspaperOutlined />, link: "/newsfeed" },
		{ id: 1, name: "Profile", icon: <PersonOutlined />, link: `/user/${user_id}` }
	];

	return (
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
	);
};
