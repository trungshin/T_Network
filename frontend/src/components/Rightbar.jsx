import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Stack, Divider, Avatar, IconButton, styled, Badge } from "@mui/material";
import { getAllUsers } from "../redux/apiRequests";
import UserCard from "./UserCard";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import LoupeOutlinedIcon from "@mui/icons-material/LoupeOutlined";

export const RightBar = () => {
	const { users } = useSelector((state) => state.user.allUsers);
	const user = useSelector((state) => state.user.user?.currentUser);
	const dispatch = useDispatch();

	useEffect(() => {
		getAllUsers(dispatch, user?.accessToken);
	}, [dispatch, user]);

	return (
		<Box
			sx={{
				position: "fixed",
				height: "calc(100vh - 90px)",
				width: 350,
				top: 80,
				right: 0,
				padding: 2,
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
				}
			}}
		>
			<Box className="section">
				<Box sx={{ marginBottom: 1, paddingLeft: 1 }}>
					<Typography fontSize={18} color="#666" fontWeight={500}>
						Discover people
					</Typography>
				</Box>

				<Stack flexDirection="column">
					{users.length > 0 && users?.map((user) => <UserCard key={user._id} user={user} />)}
				</Stack>
			</Box>

			<Divider sx={{ my: 2 }} />

			<Friends />

			<Divider sx={{ my: 2 }} />

			<Groups />
		</Box>
	);
};

export default RightBar;

const Friends = () => {
	const dummy = [
		{ avatar: "", name: "ha van duoc", link: "" },
		{ avatar: "", name: "ha van duoc", link: "" },
		{ avatar: "", name: "ha van duoc", link: "" },
		{ avatar: "", name: "ha van duoc", link: "" },
		{ avatar: "", name: "ha van duoc", link: "" }
	];

	return (
		<Stack>
			<Stack flexDirection="row" justifyContent="space-between" alignItems="center" padding="4px 16px">
				<Typography fontWeight={500} color="#666">
					Contact
				</Typography>

				<Stack
					flexDirection="row"
					justifyContent="center"
					alignItems="center"
					sx={{
						"& svg": {
							color: "#666"
						}
					}}
				>
					<IconButton>
						<VideocamOutlinedIcon />
					</IconButton>
					<IconButton>
						<SearchOutlinedIcon />
					</IconButton>
					<IconButton>
						<MoreHorizOutlinedIcon />
					</IconButton>
				</Stack>
			</Stack>

			{dummy.slice(0, 10).map((item, index) => {
				return (
					<Stack
						key={index}
						flexDirection="row"
						alignItems="center"
						justifyContent="start"
						width="100%"
						padding="8px 16px"
						sx={{
							borderRadius: 1,
							cursor: "pointer",
							":hover": {
								backgroundColor: "#eee"
							}
						}}
					>
						<Stack marginRight={1}>
							<StyledBadge
								overlap="circular"
								anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
								variant="dot"
							>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
							</StyledBadge>
						</Stack>
						<Typography>Ha Van Duoc</Typography>
					</Stack>
				);
			})}
		</Stack>
	);
};

const Groups = () => {
	const groups = [
		{ img: "", name: "", link: "" },
		{ img: "", name: "", link: "" },
		{ img: "", name: "", link: "" }
	];

	return (
		<Stack flexDirection="column">
			<Stack flexDirection="row" justifyContent="space-between" alignItems="center" padding="4px 16px">
				<Typography fontWeight={500} color="#666">
					Group chat
				</Typography>

				<Stack
					flexDirection="row"
					justifyContent="center"
					alignItems="center"
					sx={{
						"& svg": {
							color: "#666"
						}
					}}
				>
					<Typography
						fontSize={14}
						color="#666"
						fontWeight={500}
						sx={{
							":hover": {
								cursor: "pointer",
								color: "dodgerblue"
							}
						}}
					>
						Edit
					</Typography>
				</Stack>
			</Stack>

			{groups.map((item, index) => {
				return (
					<Stack
						key={index}
						flexDirection="row"
						alignItems="center"
						justifyContent="start"
						width="100%"
						padding="8px 16px"
						sx={{
							borderRadius: 1,
							cursor: "pointer",
							":hover": {
								backgroundColor: "#eee"
							}
						}}
					>
						<Stack marginRight={1}>
							<StyledBadge
								overlap="circular"
								anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
								variant="dot"
							>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
							</StyledBadge>
						</Stack>
						<Typography>Ha Van Duoc</Typography>
					</Stack>
				);
			})}

			<Stack
				flexDirection="row"
				alignItems="center"
				justifyContent="start"
				width="100%"
				padding="8px 16px"
				sx={{
					borderRadius: 1,
					cursor: "pointer",
					":hover": {
						backgroundColor: "#eee",
						"& svg, p": {
							color: "dodgerblue"
						}
					}
				}}
			>
				<Stack marginRight={1} height={35} alignItems="center" justifyContent="center" width={40}>
					<LoupeOutlinedIcon sx={{ fontSize: 30, color: "#444" }} />
				</Stack>
				<Typography>Create new group</Typography>
			</Stack>
		</Stack>
	);
};

const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#44b700",
		color: "#44b700",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		"&::after": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			borderRadius: "50%",
			animation: "ripple 1.2s infinite ease-in-out",
			border: "1px solid currentColor",
			content: '""'
		}
	},
	"@keyframes ripple": {
		"0%": {
			transform: "scale(.8)",
			opacity: 1
		},
		"100%": {
			transform: "scale(2.4)",
			opacity: 0
		}
	}
}));
