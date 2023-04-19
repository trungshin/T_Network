import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Typography } from "@mui/material";
import { followUser, unFollowUser } from "../redux/apiRequests";
import { FiberManualRecord } from "@mui/icons-material";

const FollowBtn = ({ user }) => {
	const currentUser = useSelector((state) => state.user.user?.currentUser);
	const [followed, setFollowed] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user?.followers?.find((item) => item === currentUser?._id)) {
			setFollowed(true);
		} else {
			setFollowed(false);
		}
	}, [user?.followers, currentUser?._id]);

	const handleFollow = () => {
		setFollowed(true);
		const userId = {
			userId: currentUser?._id
		};
		followUser(dispatch, user?._id, userId, currentUser?.accessToken);
	};

	const handleUnFollow = () => {
		setFollowed(false);
		const userId = {
			userId: currentUser?._id
		};
		unFollowUser(dispatch, user?._id, userId, currentUser?.accessToken);
	};

	return (
		<>
			{followed ? (
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
