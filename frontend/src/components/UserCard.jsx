import React, { useEffect, useState } from "react";
import { IconButton, Avatar, Stack, Box, styled, Badge, Typography } from "@mui/material";
import FollowBtn from "./FollowBtn";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { deleteUser } from "../redux/apiRequests";
import { Close } from "@mui/icons-material";

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
								<FollowBtn user={user} />
							</Stack>

							<Link to={`/user/${user._id}`} className="link">
								<Typography>{moment(user.createdAt).fromNow()}</Typography>
							</Link>
						</Stack>
					</Stack>

					{currentUser?.admin && (
						<Stack>
							<IconButton onClick={() => handleDeleteUser(user?._id)}>
								<Close />
							</IconButton>
						</Stack>
					)}
				</Stack>
			)}
		</>
	);
};

export default UserCard;
