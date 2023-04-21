import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const Follows = ({ otherUser }) => {
	const StackFollow = ({ children }) => {
		return (
			<Stack
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				marginTop={2}
				marginBottom={2}
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
					paddingBottom: 1,
					pointerEvents: "none"
				}}
			>
				<Typography
					fontSize={18}
					fontWeight={500}
					paddingBottom={1}
					marginBottom={1}
					borderBottom="2px solid #ccc"
				>
					{otherUser?.username}
				</Typography>

				<StackFollow>
					<Typography sx={{ fontWeight: 500 }}>Followings</Typography>
					<Typography>{otherUser?.followings?.length}</Typography>
				</StackFollow>
				<StackFollow>
					<Typography sx={{ fontWeight: 500 }}>Followers</Typography>
					<Typography>{otherUser?.followings?.length}</Typography>
				</StackFollow>
			</Box>
		</Stack>
	);
};

export default Follows;
