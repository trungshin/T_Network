import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const Copyright = () => {
	const copyright = [
		{ name: "Privacy", link: "" },
		{ name: "Terms", link: "" },
		{ name: "Cookie", link: "" },
		{ name: "T-Network @ 2023", link: "" }
	];

	return (
		<Stack flexDirection="row" marginTop={2}>
			{copyright.map((item, index) => {
				return (
					<Box display="inline" key={index}>
						<Stack
							flexDirection="row"
							className="item"
							sx={{
								":after": {
									content: `'${index === copyright.length - 1 ? "" : "•"}'`,
									marginRight: 1,
									marginLeft: 1
								}
							}}
						>
							<Typography
								whiteSpace="nowrap"
								fontSize={13}
								color="#666"
								sx={{
									":hover": {
										textDecorationLine: "underline",
										cursor: "pointer"
									}
								}}
							>
								{item.name}
							</Typography>
						</Stack>
					</Box>
				);
			})}
		</Stack>
	);
};

export default Copyright;
