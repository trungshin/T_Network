import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Wc, Phone, Home } from "@mui/icons-material";

const Introduce = ({ otherUser }) => {
	const StackIntro = ({ children }) => {
		return (
			<Stack
				justifyContent="center"
				alignItems="center"
				sx={{
					borderRadius: 1,
					backgroundColor: "#eee",
					padding: "7px",
					marginTop: 1,
					marginBottom: 2,
					cursor: "pointer",
					transition: "all .3s ease",
					// boxShadow: "0 0 0.5px 1px rgba(0,0,0,0.1)",

					":hover": {
						backgroundColor: "#ddd"
					}
				}}
			>
				{children}
			</Stack>
		);
	};

	return (
		<Stack flexDirection="column">
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
				<Typography fontSize={18} fontWeight={500}>
					Introduce
				</Typography>

				<Stack flexDirection="row">
					<Wc />
					<Typography pl={2} fontSize={14} fontWeight={500}>
						{otherUser?.gender}
					</Typography>
				</Stack>

				<StackIntro>
					<Typography fontSize={14} fontWeight={500}>
						Edit Gender
					</Typography>
				</StackIntro>

				<Stack flexDirection="row">
					<Phone />
					<Typography pl={2} fontSize={14} fontWeight={500}>
						{otherUser?.mobile === "" ? "No Mobile Number" : otherUser?.mobile}
					</Typography>
				</Stack>

				<StackIntro>
					<Typography fontSize={14} fontWeight={500}>
						Add/Edit Mobile Number
					</Typography>
				</StackIntro>

				<Stack flexDirection="row">
					<Home />
					{otherUser?.address === "" ? (
						<Typography pl={2} fontSize={14} fontWeight={500}>
							No Adress
						</Typography>
					) : (
						<Typography pl={2} fontSize={14} fontWeight={500}>
							Lives in {otherUser?.address}
						</Typography>
					)}
				</Stack>

				<StackIntro>
					<Typography fontSize={14} fontWeight={500}>
						Add/Edit Address
					</Typography>
				</StackIntro>
			</Box>
		</Stack>
	);
};

export default Introduce;
