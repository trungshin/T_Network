import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const ShowSuccessMsg = (succesMsg) => {
	return (
		<Stack sx={{ width: "100%" }} spacing={2}>
			<Alert variant="filled" severity="success">
				{succesMsg}
			</Alert>
		</Stack>
	);
};

export default ShowSuccessMsg;
