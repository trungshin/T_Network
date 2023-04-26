import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Stack, Typography } from "@mui/material";
import { PersonAddOutlined } from "@mui/icons-material";
import { followUser, unFollowUser } from "../../redux/apiRequests";

const FollowBtnProfile = ({ otherUser, user }) => {
	const [followed, setFollowed] = useState(otherUser?.followers?.find((item) => item === user?._id));

	const dispatch = useDispatch();

	useEffect(() => {
		if (otherUser?.followers?.find((item) => item === user?._id) === user?._id) {
			setFollowed(user?._id);
		} else {
			setFollowed(undefined);
		}
	}, [otherUser?.followers, user?._id]);

	const handleFollowAndUnFollow = () => {
		const userId = {
			userId: user?._id
		};
		if (followed === user?._id) {
			setFollowed(undefined);
			unFollowUser(dispatch, otherUser?._id, userId, user?.accessToken);
		} else {
			setFollowed(user?._id);
			followUser(dispatch, otherUser?._id, userId, user?.accessToken);
		}
	};

	return (
		<Stack
			flexDirection="row"
			justifyContent="center"
			alignItems="center"
			sx={{
				backgroundColor: `${followed === user?._id ? "crimson" : "#1976d2"}`, // crimson
				color: "#fff",
				padding: "5px 20px",
				borderRadius: 2,
				cursor: "pointer",

				":hover": {
					backgroundColor: `${followed === user?._id ? "#f56991" : "#1866b4"}` // #f56991
				}
			}}
			onClick={handleFollowAndUnFollow}
		>
			<PersonAddOutlined sx={{ mr: 1 }} />
			<Typography fontSize={16}>{followed === user?._id ? "UnFollow" : "Follow"}</Typography>
		</Stack>
	);
};

export default FollowBtnProfile;
