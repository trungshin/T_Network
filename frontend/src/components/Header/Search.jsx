import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Box, IconButton, MenuItem, Popper, Stack, Typography } from "@mui/material";
import { Close, SearchOutlined } from "@mui/icons-material";
import { searchUsername } from "../../redux/apiRequests";

const SearchUser = ({ user }) => {
	const { users } = useSelector((state) => state.user.allUsers);
	const [result, setResult] = useState(users);
	const [search, setSearch] = useState("");
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const dispatch = useDispatch();

	useEffect(() => {
		searchUsername(dispatch, search, user?.accessToken, setResult);
	}, [dispatch, search, user]);

	const handleFocus = (e) => {
		setAnchorEl(anchorEl ? null : e.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box
			sx={{
				position: "relative",
				backgroundColor: "#f0f2f5",
				padding: "5px",
				borderRadius: 15,
				boxShadow: "0 1px 1px rgba(0,0,0,0.2)",

				":hover": {
					".icon-search svg": {
						color: "var(--color-main)"
					}
				},

				".icon-search": {
					position: "absolute",
					left: 0,
					top: 0,
					width: 42,
					height: 42,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					cursor: "pointer",
					backgroundColor: "transparent",
					paddingLeft: 1,
					paddingRight: 1,

					"& svg": {
						color: "#666"
					}
				},

				".input input": {
					border: "none",
					outline: "none",
					width: 480,
					height: 30,
					lineHeight: 25,
					fontSize: 17,
					paddingLeft: "45px",
					paddingRight: 3,
					backgroundColor: "transparent",

					"::placeholder": {
						fontSize: 14
					}
				}
			}}
		>
			<Stack flexDirection="row" justifyContent="center" alignItems="center">
				<Box className="icon-search">
					<SearchOutlined />
				</Box>

				<Box className="input">
					<input
						placeholder="Search T-Network"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						onFocus={handleFocus}
					/>
				</Box>

				<Popper
					style={{
						backgroundColor: "#fff",
						zIndex: 100,
						boxShadow: "0 0 3px 1px rgba(0,0,0,0.2)",
						width: 550,
						borderRadius: 1
					}}
					anchorEl={anchorEl}
					id="account-menu-search"
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					transformOrigin={{ horizontal: "right", vertical: "top" }}
					anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				>
					<Stack
						flexDirection="row"
						justifyContent="space-between"
						alignItems="center"
						sx={{ padding: "2px 2px 1px 2px" }}
					>
						<Typography fontWeight={500}>Recent searchs</Typography>
						<Typography sx={{ cursor: "pointer", color: "dodgerblue" }}>Edit</Typography>
					</Stack>
					{result?.map((usersearch) => {
						return (
							<Link
								to={`/user/${usersearch._id}`}
								style={{
									textDecorationLine: "none",
									color: "#333"
								}}
							>
								<MenuItem
									onClick={handleClose}
									sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
								>
									<Stack flexDirection="row">
										<Avatar alt={usersearch.username} src={usersearch.avatar} />
										<Typography sx={{ margin: 1 }}>{usersearch.username}</Typography>
									</Stack>

									<IconButton>
										<Close fontSize="small" />
									</IconButton>
								</MenuItem>
							</Link>
						);
					})}
				</Popper>
			</Stack>
		</Box>
	);
};

export default SearchUser;
