import { Box } from "@mui/material";
import React from "react";

const BoxShadow = ({ children }) => {
	return (
		<Box
			sx={{
				":first-child": {
					boxShadow: "0 0 2px 1px rgba(0,0,0,0.2)",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					borderRadius: 2,
					margin: 1
				}
			}}
		>
			{children}
		</Box>
	);
};

export default BoxShadow;
