import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { followUser, unFollowUser } from "../redux/apiRequests";

const FollowBtn = ({ user, marginProps }) => {
	const currentUser = useSelector((state) => state.user.user?.currentUser);
	const otherUser = useSelector((state) => state.user.otherUser?.otherUser);
	const [followed, setFollowed] = useState(false);
	const dispatch = useDispatch();
	console.log(followed);

	// const [load, setLoad] = useState(false)

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
				<Button variant="outlined" style={{ margin: marginProps }} onClick={handleUnFollow} color="error">
					UnFollow
				</Button>
			) : (
				<Button variant="outlined" style={{ margin: marginProps }} onClick={handleFollow}>
					Follow
				</Button>
			)}
		</>
	);
};

export default FollowBtn;
