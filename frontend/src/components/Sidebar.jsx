import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { PersonOutlined, NewspaperOutlined } from "@mui/icons-material";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ViewTimelineOutlinedIcon from "@mui/icons-material/ViewTimelineOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import AddToQueueOutlinedIcon from "@mui/icons-material/AddToQueueOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
			<Pages user_id={user && user._id} />

			<Divider sx={{ marginTop: 1, marginBottom: 1 }} />

			<Nav />

			<Rule />
		</Box>
	);
};

export default SideBar;

const Rule = () => {
	const rules = [
		{ name: "Privacy", link: "" },
		{ name: "Rules", link: "" },
		{ name: "Advertisement", link: "" },
		// { name: "Advertising Selection", link: "" },
		{ name: "Cookie", link: "" },
		// { name: "See more", link: "" },
		{ name: "T-Network @ 2023", link: "" }
	];

	return (
		<Stack flexDirection="row" marginTop={2}>
			{rules.map((item, index) => {
				return (
					<Box display="inline" key={index}>
						<Stack
							flexDirection="row"
							className="item"
							sx={{
								":after": {
									content: `'${index === rules.length - 1 ? "" : "•"}'`,
									marginRight: 1,
									marginLeft: 1
								}
							}}
						>
							<Typography
								whiteSpace="nowrap"
								fontSize={13}
								color="#666"
								sx={{
									":hover": {
										textDecorationLine: "underline",
										cursor: "pointer"
									}
								}}
							>
								{item.name}
							</Typography>
						</Stack>
					</Box>
				);
			})}
		</Stack>
	);
};

const Nav = () => {
	const [showing, setShow] = useState(7);

	const handleClick = () => {
		// Collapse is origin
		if (showing >= dummyNav.length) {
			setShow(7);
			return;
		}

		setShow(showing + 7);
	};

	const dummyNav = [
		{ name: "Find friend", icon: <GroupAddOutlinedIcon />, link: "" },
		{ name: "Groups", icon: <Groups2OutlinedIcon />, link: "" },
		{ name: "Pages", icon: <FlagOutlinedIcon />, link: "" },
		{ name: "Most recent", icon: <ViewTimelineOutlinedIcon />, link: "" },
		{ name: "Marketplace", icon: <StorefrontOutlinedIcon />, link: "" },
		{ name: "Watch", icon: <AddToQueueOutlinedIcon />, link: "" },
		{ name: "Celebrate", icon: <CelebrationOutlinedIcon />, link: "" },
		{ name: "Gaming", icon: <SportsEsportsOutlinedIcon />, link: "" },
		{ name: "Gaming", icon: <SportsEsportsOutlinedIcon />, link: "" },
		{ name: "Gaming", icon: <SportsEsportsOutlinedIcon />, link: "" },
		{ name: "Gaming", icon: <SportsEsportsOutlinedIcon />, link: "" },
		{ name: "Gaming", icon: <SportsEsportsOutlinedIcon />, link: "" },
		{ name: "Gaming", icon: <SportsEsportsOutlinedIcon />, link: "" },
		{ name: "Gaming", icon: <SportsEsportsOutlinedIcon />, link: "" },
		{ name: "Gaming", icon: <SportsEsportsOutlinedIcon />, link: "" },
		{ name: "Gaming", icon: <SportsEsportsOutlinedIcon />, link: "" },
		{ name: "Gaming", icon: <SportsEsportsOutlinedIcon />, link: "" },
		{ name: "Gaming", icon: <SportsEsportsOutlinedIcon />, link: "" }
	];

	return (
		<Stack flexDirection="column" justifyContent="center" alignItems="center">
			{dummyNav.slice(0, showing).map((item, index) => {
				return (
					<Link
						to={item.link}
						className="link"
						style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}
					>
						<Stack
							flexDirection="row"
							justifyContent="start"
							alignItems="center"
							width="100%"
							key={index}
							sx={{
								padding: "16px 16px",
								borderRadius: 1,
								cursor: "pointer",

								":hover": {
									backgroundColor: "#eee"
								}
							}}
						>
							<Stack
								justifyContent="center"
								alignItems="center"
								sx={{
									"& svg": {
										marginRight: 1,
										fontSize: 25
									}
								}}
							>
								{item.icon}
							</Stack>
							<Typography color="#000" fontWeight={400}>
								{item.name}
							</Typography>
						</Stack>
					</Link>
				);
			})}

			{/* Button see more */}
			<Link
				className="link"
				style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}
				onClick={handleClick}
			>
				<Stack
					flexDirection="row"
					justifyContent="start"
					alignItems="center"
					width="100%"
					sx={{
						padding: "16px 16px",
						borderRadius: 1,
						cursor: "pointer",

						":hover": {
							backgroundColor: "#eee",

							"& svg, p": {
								color: "var(--color-main)"
							}
						}
					}}
				>
					<Stack
						justifyContent="center"
						alignItems="center"
						sx={{
							"& svg": {
								marginRight: 1,
								fontSize: 25,
								fontWeight: 500
							}
						}}
					>
						{/* if equal is not thing show -> collapse */}
						{showing >= dummyNav.length ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</Stack>
					<Typography color="#000" fontWeight={500}>
						{showing >= dummyNav.length ? "Collapse" : "See More"}
					</Typography>
				</Stack>
			</Link>
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
