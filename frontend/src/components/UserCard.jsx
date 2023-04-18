import React, { useEffect, useState } from "react";
import { Card, CardHeader, IconButton, Avatar, Stack, Box, styled, Badge, Typography, Button } from "@mui/material";
import FollowBtn from "./FollowBtn";
// import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
// import { deleteComment } from "../redux/apiRequests";
import moment from "moment";
import { deleteUser } from "../redux/apiRequests";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloseIcon from "@mui/icons-material/Close";

const UserCard = ({ user }) => {
	const currentUser = useSelector((state) => state.user.user?.currentUser);
	const dispatch = useDispatch();

	const handleDeleteUser = (id) => {
		deleteUser(dispatch, currentUser?.accessToken, id);
		window.location.reload();
	};

	return (
		<>
			{currentUser?._id === user?._id ? null : (
				// <Card style={{ margin: 5, height: 66 }}>
				// 	<CardHeader
				// 		style={{ padding: 0 }}
				// 		avatar={
				// 			<NavLink to={`/user/${user._id}`}>
				// 				<IconButton
				// 					size="small"
				// 					edge="end"
				// 					aria-label="account of current user"
				// 					aria-haspopup="true"
				// 					color="inherit"
				// 				>
				// 					<Avatar alt="Remy Sharp" src={user.avatar} />
				// 				</IconButton>
				// 			</NavLink>
				// 		}
				// 		action={
				// 			<>
				// 				{currentUser?.admin ? (
				// 					<Stack>
				// 						<IconButton
				// 							style={{ marginLeft: 88, padding: 0, width: 24 }}
				// 							onClick={() => handleDeleteUser(user?._id)}
				// 						>
				// 							<Close />
				// 						</IconButton>
				//						<FollowBtn user={user} marginProps={"0 15px 15px 15px"} />
				// 					</Stack>
				// 				) : (
				// 					<FollowBtn user={user} marginProps={15} />
				// 				)}
				// 			</>
				// 		}
				// 		title={user.username}
				// 		subheader={moment(user.createdAt).fromNow()}
				// 	/>
				// </Card>

				<Stack
					sx={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						padding: 1,
						borderRadius: 1,
						cursor: "pointer",

						":hover": {
							backgroundColor: "#ddd",

							".userName": {
								transition: "all .3s ease",
								color: "dodgerblue !important"
							}
						}
					}}
				>
					<Stack flexDirection="row" justifyContent="center" alignItems="center">
						<Box classNames="avatar" sx={{ marginRight: 1 }}>
							<Link to={`/user/${user._id}`} className="link">
								<StyledBadge
									overlap="circular"
									anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
									variant="dot"
								>
									<Avatar alt="" src={user.avatar} />
								</StyledBadge>
							</Link>
						</Box>

						<Stack flexDirection="column" flex={1}>
							<Stack flexDirection="row">
								<Link to={`/user/${user._id}`} className="link">
									<Typography sx={{ marginRight: 1 }} className="userName">
										{user.username}
									</Typography>
								</Link>
								<FollowBtn user={user}/>
								{/* <Stack flexDirection="row" marginRight={1} justifyContent="center" alignItems="center">
									<FiberManualRecordIcon sx={{ fontSize: 10 }} />
									<FollowBtn user={user}/>
								</Stack> */}
							</Stack>

							<Link to={`/user/${user._id}`} className="link">
								<Typography>{moment(user.createdAt).fromNow()}</Typography>
							</Link>
						</Stack>
					</Stack>
					
					{currentUser?.admin && (
						<Stack>
							<IconButton>
								<CloseIcon />
							</IconButton>
						</Stack>
					)}
				</Stack>
			)}
		</>
	);
};

export default UserCard;

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
