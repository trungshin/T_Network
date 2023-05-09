import React from "react";
import { Grid, Typography, Box } from "@mui/material";

const GridLayout = ({ children, heading }) => {
	return (
		<>
			<Grid
				container
				spacing={2}
				direction="column"
				alignItems="center"
				justifyContent="center"
				style={{ minHeight: "100vh" }}
			>
				<Grid item>
					<Typography variant="h3">{heading}</Typography>
				</Grid>

				<Grid item>
					<Box
						sx={{
							width: 300,
							p: 5,
							borderRadius: 5,
							boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
						}}
					>
						{children}
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default GridLayout;
