import React, { useEffect, useState } from "react";
import { Card, CardHeader, IconButton, Avatar, Stack } from "@mui/material";
import FollowBtn from "./FollowBtn";
// import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
// import { deleteComment } from "../redux/apiRequests";
import moment from "moment";
import { Close } from "@mui/icons-material";
import { deleteUser } from "../redux/apiRequests";

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
				<Card style={{ margin: 5, border: "solid 1px", height: 66 }}>
					<CardHeader
						style={{ padding: 0 }}
						avatar={
							<NavLink to={`/user/${user._id}`}>
								<IconButton
									size="small"
									edge="end"
									aria-label="account of current user"
									aria-haspopup="true"
									color="inherit"
								>
									<Avatar alt="Remy Sharp" src={user.avatar} />
								</IconButton>
							</NavLink>
						}
						action={
							<>
								{currentUser?.admin ? (
									<Stack>
										<IconButton
											style={{ marginLeft: 88, padding: 0, width: 24 }}
											onClick={() => handleDeleteUser(user?._id)}
										>
											<Close />
										</IconButton>
										<FollowBtn user={user} marginProps={"0 15px 15px 15px"} />
									</Stack>
								) : (
									<FollowBtn user={user} marginProps={15} />
								)}
							</>
						}
						title={user.username}
						subheader={moment(user.createdAt).fromNow()}
					/>
				</Card>
			)}
		</>
	);
};

export default UserCard;
