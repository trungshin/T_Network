import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Typography } from "@mui/material";
import { followUser, unFollowUser } from "../redux/apiRequests";
import { FiberManualRecord } from "@mui/icons-material";

const FollowBtn = ({ user }) => {
	const currentUser = useSelector((state) => state.user.user?.currentUser);
	const [followed, setFollowed] = useState(user?.followers?.find((item) => item === currentUser?._id));
	const dispatch = useDispatch();

	

	useEffect(() => {
		if (user?.followers?.find((item) => item === currentUser?._id) === currentUser?._id) {
			setFollowed(currentUser?._id);
		} else {
			setFollowed(undefined);
		}
	}, [user?.followers, currentUser?._id]);

	const handleFollow = () => {
		console.log(followed);
		setFollowed(currentUser?._id);
		const userId = {
			userId: currentUser?._id
		};
		followUser(dispatch, user?._id, userId, currentUser?.accessToken);
	};

	const handleUnFollow = () => {
		console.log(followed);
		setFollowed(undefined);
		const userId = {
			userId: currentUser?._id
		};
		unFollowUser(dispatch, user?._id, userId, currentUser?.accessToken);
	};

	return (
		<>
			{followed === currentUser?._id ? (
				<Stack justifyContent="center">
					<Typography
						variant="outlined"
						textTransform="uppercase"
						fontWeight={600}
						fontSize={14}
						color="crimson"
						onClick={handleUnFollow}
					>
						<FiberManualRecord sx={{ fontSize: 10, marginRight: "5px" }} />
						UnFollow
					</Typography>
				</Stack>
			) : (
				<Stack justifyContent="center">
					<Typography
						variant="outlined"
						textTransform="uppercase"
						fontWeight={600}
						fontSize={14}
						color="dodgerblue"
						onClick={handleFollow}
					>
						<FiberManualRecord sx={{ fontSize: 10, marginRight: "5px" }} />
						Follow
					</Typography>
				</Stack>
			)}
		</>
	);
};

export default FollowBtn;
