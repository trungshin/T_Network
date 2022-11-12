import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { InputBase, Box, Card, CardHeader, IconButton, Avatar } from "@mui/material";
import { Search } from "@mui/icons-material";
import { searchUsername } from "../redux/apiRequests";

const SearchComponent = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25)
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "40%",
	[theme.breakpoints.down("sm")]: {
		width: "auto"
	}
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%"
	},
	display: "flex"
}));

const SearchUser = () => {
	const user = useSelector((state) => state.user.user?.currentUser);
	const [search, setSearch] = useState("");
	const [result, setResulsts] = useState([]);
	const [openSearch, setOpenSearch] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (search === "") {
			setOpenSearch(false);
		} else {
			setOpenSearch(true);
			searchUsername(dispatch, search, user?.accessToken, setResulsts);
		}
	}, [dispatch, search, user]);

	return (
		<>
			<SearchComponent>
				<SearchIconWrapper>
					<Search />
				</SearchIconWrapper>
				<StyledInputBase placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)} />
				{openSearch && (
					<Box>
						{result?.map((usersearch) => {
							return (
								<NavLink to={`/user/${usersearch._id}`}>
									<Card>
										<CardHeader
											style={{ padding: 0 }}
											avatar={
												<IconButton
													size="small"
													edge="end"
													aria-label="account of current user"
													aria-haspopup="true"
													color="inherit"
												>
													<Avatar alt="Remy Sharp" src={usersearch.avatar} />
												</IconButton>
											}
											title={usersearch.username}
										/>
									</Card>
								</NavLink>
							);
						})}
					</Box>
				)}
			</SearchComponent>
		</>
	);
};

export default SearchUser;
