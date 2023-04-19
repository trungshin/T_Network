import { Box } from "@mui/material";
import "./style.css";

export const DefaultStyles = ({ children }) => {
	return (
		<Box
			classNames="default-styles"
			sx={{
				"--color-main": "dodgerblue",

				".link": {
					textDecoration: "none",
					color: "inherit"
				},

				fontFamily: "'Roboto', sans-serif"
			}}
		>
			{children}
		</Box>
	);
};
