import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { getAllUsers } from "../../redux/apiRequests";
import UserCard from "./UserCard";
import Friends from "./Friends";

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

				<Stack
					flexDirection="column"
					sx={{
						height: "calc(50vh - 90px)",
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
					{users.length > 0 && users?.map((user) => <UserCard key={user._id} user={user} />)}
				</Stack>
			</Box>

			<Divider sx={{ my: 2 }} />

			<Friends />
		</Box>
	);
};

export default RightBar;
