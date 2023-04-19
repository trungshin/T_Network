import React from "react";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

const Logo = () => {
	return (
		<Stack justifyContent="center" alignItems="center">
			<Link to="/newsfeed" className="link">
				<Typography fontSize={35} fontWeight={500} color="var(--color-main)" sx={{ cursor: "pointer" }}>
					T-Network
				</Typography>
			</Link>
		</Stack>
	);
};

export default Logo;
