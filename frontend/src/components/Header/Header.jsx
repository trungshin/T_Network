import React from "react";
import { useSelector } from "react-redux";
import { Box, Container, Grid, Stack } from "@mui/material";
import SearchUser from "./Search";
import Logo from "./Logo";
import RightHeader from "./RightHeader";

const Header = () => {
	const user = useSelector((state) => state.user.user?.currentUser);
	return (
		<Box
			sx={{
				marginBottom: 2,
				position: "sticky",
				top: 0,
				left: 0,
				backgroundColor: "#fff",
				zIndex: 2,
				boxShadow: "0 3px 5px rgba(0,0,0,0.2)"
			}}
		>
			<Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
				<Container maxWidth="xl">
					<Grid container>
						<Grid item xs>
							<Stack justifyContent="center" alignItems="start" width="100%" height="100%">
								<Logo />
							</Stack>
						</Grid>
						<Grid item xs={5}>
							<Stack justifyContent="center" alignItems="center" width="100%" height="100%">
								<SearchUser user={user} />
							</Stack>
						</Grid>
						<Grid item xs>
							<Stack justifyContent="center" alignItems="end" width="100%" height="100%">
								<RightHeader />
							</Stack>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</Box>
	);
};

export default Header;
