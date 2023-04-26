import React from "react";
import { useSelector } from "react-redux";
import { Box, Stack, Typography, Link, Avatar } from "@mui/material";
import StyledBadge from "../StyleBadge";

const FollowersList = ({ otherUser }) => {
	const userFollwersList = useSelector((state) => state.user.followersList?.usersList);
	const currentUser = useSelector((state) => state.user.user?.currentUser);

	const StackFollow = ({ children }) => {
		return (
			<Stack
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				paddingBottom={1}
				marginBottom={1}
				borderBottom="2px solid #ccc"
			>
				{children}
			</Stack>
		);
	};

	return (
		<Stack flexDirection="column" marginBottom={2}>
			<Box
				sx={{
					boxShadow: "0 0 1.5px 1px rgba(0,0,0,0.2)",
					borderRadius: 1,
					paddingTop: 1,
					paddingLeft: 2,
					paddingRight: 2,
					paddingBottom: 1
				}}
			>
				<StackFollow>
					<Typography fontSize={18} fontWeight={500}>
						Followers
					</Typography>
					<Typography>{otherUser?.followers?.length}</Typography>
				</StackFollow>

				{userFollwersList?.length > 0 ? (
					userFollwersList?.map((user) => (
						<Stack
							key={user?._id}
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
							<Box classNames="avatar" sx={{ marginRight: 1 }}>
								<Link to={`/user/${user?._id}`} className="link">
									<StyledBadge
										overlap="circular"
										anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
										variant="dot"
									>
										<Avatar alt="" src={user?.avatar} />
									</StyledBadge>
								</Link>
							</Box>

							<Stack flex={1}>
								<Link to={`/user/${user?._id}`} className="link">
									<Typography sx={{ marginRight: 1 }} className="userName">
										{user?.username}
									</Typography>
								</Link>
							</Stack>
						</Stack>
					))
				) : (
					<Stack alignItems="center">
						<Typography position="relative">
							No one is following
						</Typography>
					</Stack>
				)}
			</Box>
		</Stack>
	);
};

export default FollowersList;
