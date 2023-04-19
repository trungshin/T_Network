import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Stack } from "@mui/material";
import { getAllUsers } from "../redux/apiRequests";
import UserCard from "./UserCard";

export const RightBar = () => {
	const { users } = useSelector((state) => state.user.allUsers);
	const user = useSelector((state) => state.user.user?.currentUser);
	const dispatch = useDispatch();

	useEffect(() => {
		getAllUsers(dispatch, user?.accessToken);
	}, [dispatch, user]);

	return (
		<Box sx={{ position: "sticky", top: 80, right: 0, padding: 2 }}>
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
		</Box>
	);
};

export default RightBar;
