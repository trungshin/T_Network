import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const showSuccessMsg = (msg) => {
	return (
		<Stack sx={{ width: "100%" }} spacing={2}>
			<Alert variant="filled" severity="success">
				{msg}
			</Alert>
		</Stack>
	);
};

export default showSuccessMsg;
